"use server";

import { prisma } from "@/lib/prisma";
// import { sleep } from "@/lib/utils";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  currentPage?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProducts = async ({
  currentPage = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(currentPage))) currentPage = 1;
  if (currentPage < 1) currentPage = 1;

  try {
    // await sleep(2)
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          gender,
        },
        take,
        skip: (currentPage - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true,
            },
          },
        },
        cacheStrategy: {
          ttl: 60 * 60 * 24 * 7,
          tags: ["products", `products_${gender}`],
        },
      }),
      prisma.product.count({
        where: {
          gender,
        },
        // cacheStrategy: {
        //   ttl: 60 * 60 * 24 * 7,
        //   tags: ["products", `products_${gender}`],
        // },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    // throw new Error("Error fetching products: " + error);
    console.log("Error fetching products: " + error);
    return {
      currentPage,
      totalPages: 0,
      products: [],
    };
  }
};
