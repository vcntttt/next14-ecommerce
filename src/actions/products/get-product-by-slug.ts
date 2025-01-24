"use server";

import { prisma } from "@/lib/prisma";

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
            productId: true,
          },
        },
      },
      where: { slug },
      // cacheStrategy: {
      //   ttl: 60 * 60 * 24 * 7,
      //   tags: [`product_${slug}`],
      // },
    });

    if (!product) return null;
    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log("🚀 ~ getProductBySlug ~ error:", error);
  }
}
