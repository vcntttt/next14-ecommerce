import { prisma } from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  console.log("Seeding database...");
  await Promise.all([
    prisma.user.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });
  
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name] = category.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { type, images, inStock, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        stock: inStock,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seeded!");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
