import { formSchema } from "@/components/products/admin/product-form";
import { z } from "zod";

export interface Product {
  id: string;
  description: string;
  images: string[];
  stock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  //todo: type: Type;
  gender: Category;
}

export type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";

export interface CartProduct {
  id: string;
  title: string;
  image: string;
  size: Size;
  price: number;
  quantity: number;
  slug: string;
}

export interface ProductWithImage {
  id: string;
  url: string;
  productId: string;
}

export type EditableProduct = z.infer<typeof formSchema>;
