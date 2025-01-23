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
import { Loader2, SquarePen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartProducts } from "@/components/checkout/cart-products";
import { useCartStore } from "@/store/cart";
import { useAddressStore } from "@/store/address";
import { placeOrder } from "@/actions/orders/place";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const address = useAddressStore((state) => state.address);
  const { cart, clearCart } = useCartStore();
  const router = useRouter()

  async function handlePlaceOrder() {
    setIsPlacingOrder(true);

    const products = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));

    const response = await placeOrder({ products, address });

    if (!response.ok) {
      setError(response.message);
      toast.error(response.message);
      return;
    }
    setIsPlacingOrder(false);
    toast.success(response.message);
    toast.loading("Redireccionando...", { duration: 1000 });
    clearCart()
    router.replace(`/orders/${response.order?.id}`)
  }

  return (
    <div>
      <Title title="Checkout" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 w-full">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-y-4">
          <CartProducts />
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
              {error && (
                <p className="px-4 py-2 bg-red-400 w-full text-center text-white">
                  {error}
                </p>
              )}
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
