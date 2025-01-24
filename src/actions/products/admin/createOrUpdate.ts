"use server";

import { EditableProduct, Size } from "@/interfaces/products";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const createOrUpdateProduct = async (product: EditableProduct) => {
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, images: imgData, ...productData } = product;
  let message: string;
  try {
    const prismaTx = await prisma.$transaction(async () => {
      let product: Product;
      const tagsArray = productData.tags
        ?.split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // si tiene id, es un producto existente
        message = "Producto actualizado correctamente";
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
        message = "Producto creado correctamente";
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

      return { product, message };
    });

    return {
      ok: true,
      product: prismaTx.product,
      message: prismaTx.message,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      product: null,
      message: "Error al crear o actualizar el producto",
    };
  } finally {
    // await prisma.$accelerate.invalidate({
    //   tags: [
    //     "products",
    //     `products_${product.gender}`,
    //     `product_${product.slug}`,
    //     `product_details_${product.slug}`,
    //   ],
    // });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);
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
