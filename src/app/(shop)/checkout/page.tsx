"use client";

import { AddressSummary } from "@/components/checkout/address-summary";
import { Summary } from "@/components/checkout/summary";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sleep } from "@/lib/utils";
import { Loader2, SquarePen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartProducts } from "@/components/checkout/cart-products";

export default function CheckoutPage() {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  async function handlePlaceOrder() {
    setIsPlacingOrder(true);
    await sleep(2);

    setIsPlacingOrder(false);
  }

  return (
    <div>
      <Title title="Checkout" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 w-full">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-y-4">
          <CartProducts/>
        </div>
        <div>
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="flex justify-between">
                Direccion de entrega
                <Link href={"/checkout/address"} className="text-sm underline">
                  <SquarePen size={18} />
                </Link>
              </CardTitle>
            </CardHeader>
            <AddressSummary />
            <CardContent>
              <div className="bg-gray-400 w-full h-px rounded" />
            </CardContent>
            <CardHeader>
              <CardTitle>Resumen de la compra</CardTitle>
            </CardHeader>
            <Summary />
            <CardFooter className="flex flex-col gap-y-4">
              <Button
                className="w-full"
                disabled={isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                {isPlacingOrder && <Loader2 className="animate-spin" />}
                {isPlacingOrder ? "Esperando" : "Colocar orden"}
              </Button>
              <span className="text-xs">
                Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
                <a href="#" className="underline">
                  términos y condiciones
                </a>{" "}
                y{" "}
                <a href="#" className="underline">
                  política de privacidad
                </a>
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
