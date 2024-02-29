import { create } from 'zustand';
// persist nos permite guardar en el localStorage
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/interfaces';

interface State {
  cart: CartProduct[];

  //Métodos ----
  getSummaryInformation: () => {
    itemsInCart: number;
    subTotal: number;
    tax: number;
    total: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // Primero revisamos que el producto exista en el carrito con la talla seleccionada (
        // esto lo hacemos para independizar los productos de las tallas
        // ejemplo: para una camisa podemos llevar 2 talles diferentes, los cuales serán 2 productos diferentes
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        // -- si el producto no existe lo agrego --
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // -- en este punto ya se que el producto existe, solo queda incrementar la cantidad
        const updateCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updateCartProduct });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProduct });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const removeProductToCart = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: removeProductToCart });
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        const tax = subTotal * 0.22;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          itemsInCart,
          subTotal,
          tax,
          total,
        };
      },
    }),
    { name: 'shopping-cart' }
  )
);
