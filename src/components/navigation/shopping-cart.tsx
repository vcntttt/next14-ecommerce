"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCartStore } from "@/store/cart";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPrice } from "../../lib/utils";
import { ItemCartPreview } from "../products/cart/item-preview";
import { Skeleton } from "../ui/skeleton";

export const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const carrito = useCartStore((state) => state.cart);
  const getSummary = useCartStore((state) => state.getSummary);
  const { subTotal, totalItems } = getSummary();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <Skeleton className="size-6"/>;
  }


  return (
    <Popover open={isCartOpen} onOpenChange={setIsCartOpen}>
      <PopoverTrigger>
        <div className="relative">
          {totalItems > 0 && (
            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-primary text-white">
              {totalItems}
            </span>
          )}
          <ShoppingCart />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <p className="font-semibold text-md">Productos en el carro:</p>
        <div className="flex flex-col gap-2">
          {carrito.map((item) => (
            <ItemCartPreview key={`${item.slug}-${item.size}`} {...item} />
          ))}
        </div>
        <div className="font-semibold text-md flex justify-between items-center">
          <p className=" my-2">Total: </p>
          <span>{formatPrice(subTotal)}</span>
        </div>

        <Button
          asChild
          className="w-full mt-2"
          onClick={() => setIsCartOpen(false)}
        >
          <Link href="/cart">Ir al carrito</Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
