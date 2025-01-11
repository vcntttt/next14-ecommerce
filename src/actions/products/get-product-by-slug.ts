"use server";

import { prisma } from "@/lib/prisma";

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: { slug },
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
