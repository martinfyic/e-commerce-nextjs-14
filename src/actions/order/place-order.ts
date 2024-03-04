'use server';

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';
import { unknown } from 'zod';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productId: ProductToOrder[], address: Address) => {
  // Verifico si hay session de usuario
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: 'There is no user session',
    };
  }

  // Obtener información de los productos
  // Nota: Se puede llevar 2 o + prod con mismo id pero diferente size
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productId.map((p) => p.productId),
      },
    },
  });

  // calcular cantidad de artículos
  const itemsInOrder = productId.reduce((count, p) => count + p.quantity, 0);

  // calculamos los totales {subtotal, tax, total}
  const { subTotal, tax, total } = productId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      // Verifico que el producto exista
      if (!product)
        throw new Error(`Product with Id ${item.productId} does not exist - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.22;
      totals.total += subTotal * 1.22;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  //* crear transacción de base de datos ----

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. actualizar el stock de los productos
      const updatedProductPromise = products.map(async (product) => {
        //Acumulamos los valores
        const productQuantity = productId
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(
            `Product with id: ${product.id} does not have a defined quantity`
          );
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      //Verificar valores negativos en stock
      const updatedProducts = await Promise.all(updatedProductPromise);
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `We do not have enough inventory for product - ${product.title}`
          );
        }
      });

      // 2. Crear la orden - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productId.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((product) => product.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      //TODO validar si price === 0 lanzar error
      console.log(order.itemsInOrder);

      // 3. Crear la dirección de la orden
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
