"use server";

import { EditableProduct, Size } from "@/interfaces/products";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOrUpdateProduct = async (product: EditableProduct) => {
  console.log(product);
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...productData } = product;

  try {
    const prismaTx = await prisma.$transaction(async () => {
      let product: Product;
      const tagsArray = productData.tags
        ?.split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // si tiene id, es un producto existente

        product = await prisma.product.update({
          where: { id },
          data: {
            ...productData,
            sizes: {
              set: productData.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

      } // si no tiene id, es un producto nuevo
      else {
        product = await prisma.product.create({
          data: {
            ...productData,
            sizes: {
              set: productData.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

      }

      return { product }
    });

    return {
      ok: true,
      product: prismaTx.product,
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      product: null,
      message: "Error al crear o actualizar el producto",
    };
  } finally {
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);
  }
};