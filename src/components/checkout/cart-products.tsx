"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { ItemCart } from "@/components/products/cart/item";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  isEditable?: boolean;
}

export const CartProducts = ({ isEditable = false }: Props) => {
  const carrito = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <Skeleton className="size-6" />;
  }

  return (
    <>
      {carrito.length === 0 ? (
        <Card className="rounded-none">
          <CardHeader>Tu carrito está vacío</CardHeader>
          <CardContent>
            <Link href={"/"} className="underline">
              Ir a la tienda
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {carrito.map((item) => (
            <ItemCart key={`${item.slug}-${item.size}`} {...item} isEditable={isEditable} />
          ))}
          <p>
            <Link href={"/cart"} className="underline">
              {isEditable ? "Volver a la tienda" : "Volver al carrito"}
            </Link>
          </p>
        </>
      )}
    </>
  );
};
