"use client";
import { ItemCart } from "@/components/products/cart/item";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const carrito = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);
  const getSummary = useCartStore((state) => state.getSummary);
  const { subTotal, totalItems, tax, total } = getSummary();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <Skeleton className="size-6" />;
  }

  return (
    <div>
      <Title title="Carrito de compras" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 w-full">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-y-4">
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
                <ItemCart key={`${item.slug}-${item.size}`} {...item} />
              ))}
              <p>
                Te falta algo?.{" "}
                <Link href={"/"} className="underline">
                  Sigue comprando
                </Link>
              </p>
            </>
          )}
        </div>
        <div>
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{totalItems === 1 ? `${totalItems} artículo` : `${totalItems} artículos`}</span>

              <span>Subtotal</span>
              <span className="text-right">{formatPrice(subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{formatPrice(tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{formatPrice(total)}</span>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/checkout">Continuar</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
