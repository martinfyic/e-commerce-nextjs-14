import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';

async function main() {
  //1. Eliminamos todos los registros previos de la DB tener en cuenta las relaciones antes de eliminar
  //Sin relación

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  //con relación, ordenado de menor relación a mayor
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users } = initialData;

  //Crear Usuarios ------------
  await prisma.user.createMany({
    data: users,
  });

  //Creamos los países
  await prisma.country.createMany({
    data: countries,
  });

  //Crear Categories ------------
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  // Consultar las categorías a DB
  const categoriesDB = await prisma.category.findMany();

  // Creamos un mapa para que cambie en el seed el type por el id que tenemos en la db, por ejemplo:
  // en seed esta type: 'shirt' con el mapa vamos a cambiar el 'shirt' por un id ejemplo '7f456afa-648a-41e7-9b20-2c4257f74c7a'
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;

      return map;
    },
    {} as Record<string, string> // <string=shirt, string=categoryId>
  );

  //Crear Products ------------
  products.forEach(async (product) => {
    const { images, type, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //Agregamos las imágenes
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log('Seed Executed');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();
