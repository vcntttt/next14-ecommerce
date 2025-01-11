import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartProduct } from "@/interfaces/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";
import { ProductQuantitySelector } from "../quantity-selector";

export const ItemCart = ({
  image,
  title,
  price,
  quantity,
  slug,
  id,
  size,
}: CartProduct) => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  function onRemoveFromCart() {
    removeFromCart({ id, title, slug, price, image, size, quantity });
  }

  function onQuantityChange(quantity: number) {
    updateProductQuantity(
      { id, title, slug, price, image, size, quantity },
      quantity
    );
  }

  return (
    <Card className="rounded-none">
      <CardContent className="flex gap-8 pt-6">
        <Image
          src={`/products/${image}`}
          alt="Product 1"
          width={150}
          height={150}
          className="rounded-md"
        />
        <div className="w-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <Link href={`/product/${slug}`} className="font-semibold hover:underline">{`${size} - ${title}`}</Link>
            <span>{formatPrice(price)}</span>
          </div>
          <div className="justify-start">
            <ProductQuantitySelector
              quantity={quantity}
              onChange={onQuantityChange}
            />
          </div>
          <Button
            variant={"ghost"}
            className="justify-end underline mt-3 p-0 hover:bg-white"
            onClick={onRemoveFromCart}
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
