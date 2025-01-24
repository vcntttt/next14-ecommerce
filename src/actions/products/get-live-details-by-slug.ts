"use server";

import { prisma } from "@/lib/prisma";

export async function getProductLiveDetails(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      select: {
        price: true,
        stock: true,
      },
      where: { slug },
      cacheStrategy: {
        ttl: 60 * 60 * 24,
        tags: [`product_details_${slug}`],
      },
    });
    if (!product) return null;

    return {
      price: product.price,
      stock: product.stock,
    };
  } catch (error) {
    console.log("🚀 ~ getProductBySlug ~ error:", error);
  }
}
