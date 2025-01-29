import { Product } from "@/interfaces/products";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ProductImage } from "./image";

export const ProductCard = ({ title, images, price, slug, stock }: Product) => {
  return (
    <Link
      href={`/product/${slug}`}
      className="rounded-md fade-in overflow-hidden"
    >
        <ProductImage images={images} title={title} />

      <div className="flex flex-col gap-2 py-2">
        <h3 className="hover:underline flex justify-between items-center">{title} <span className="text-xs text-gray-500">{stock} disponibles</span></h3>
        <span>
          {formatPrice(price)}
        </span>
      </div>
    </Link>
  );
};
