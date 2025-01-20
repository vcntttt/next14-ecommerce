"use server";

import { EditableProduct, Size } from "@/interfaces/products";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const createOrUpdateProduct = async (product: EditableProduct) => {
  console.log(product);
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, images: imgData, ...productData } = product;

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

        if (imgData && imgData.getAll("images")) {
          // [https://url.jpg, https://url.jpg]
          const images = await uploadImages(imgData.getAll("images") as File[]);
          if (!images) {
          throw new Error("No se pudo cargar las imágenes, rollingback");
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }
      
      return { product };
    });

    return {
      ok: true,
      product: prismaTx.product,
    };
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

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
