"use server";

import { prisma } from "@/lib/prisma";

export async function getProductLiveDetails(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      select: {
       price: true,
       stock: true
      },
      where: { slug },
    });
    console.log("🚀 ~ getProductLiveDetails ~ product:", product);
    if (!product) return null;

    return {
      price: product.price,
      stock: product.stock,
    };
  } catch (error) {
    console.log("🚀 ~ getProductBySlug ~ error:", error);
  }
}
