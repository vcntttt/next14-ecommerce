"use client";
import { CartProduct, Product, Size } from "@/interfaces/products";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { Button } from "../ui/button";
import { ProductQuantitySelector } from "./quantity-selector";
import { ProductSizeSelector } from "./size-selector";

interface Props {
  product: Product;
}

export const AddProductToCart = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<Size | undefined>();

  const maxStock = product.stock

  function addProductToCart() {
    if (!size || !quantity) return;

    const productToCart: CartProduct = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      size,
      quantity,
    };

    addToCart(productToCart);
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductSizeSelector
        sizes={product.sizes}
        selectedSize={size}
        onChange={setSize}
      />
      <ProductQuantitySelector quantity={quantity} onChange={setQuantity}  maxQuantity={maxStock}/>
      <Button
      disabled={!size}
        onClick={addProductToCart}
      >
        Agregar al carrito
      </Button>
    </div>
  );
};
