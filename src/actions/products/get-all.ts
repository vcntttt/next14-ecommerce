"use server";

import { prisma } from "@/lib/prisma";

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      // cacheStrategy: {
      //   ttl: 60 * 60 * 24 * 7,
      //   tags: ["products"],
      // },
    });

    return products.map((product) => {
      return {
        ...product,
        images: product.ProductImage.map((image) => image.url),
      };
    });
  } catch (error) {
    console.log(error);
  }
}
