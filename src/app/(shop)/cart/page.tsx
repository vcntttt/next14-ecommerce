import { CartProducts } from "@/components/checkout/cart-products";
import { Summary } from "@/components/checkout/summary";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CartPage() {
  return (
    <div>
      <Title title="Carrito de compras" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 w-full">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-y-4">
          <CartProducts isEditable/>
        </div>
        <div>
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <Summary />
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/checkout/address">Continuar</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
