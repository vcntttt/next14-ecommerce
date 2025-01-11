import { ProductCard } from "@/components/products/card";
import { Product } from "@/interfaces/products";

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((product) => (
        <ProductCard key={product.slug} {...product} />
      ))}
    </div>
  );
};
