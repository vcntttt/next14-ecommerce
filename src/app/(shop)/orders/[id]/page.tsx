import { Title } from "../../../../components/typography/title";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getOrderById } from "@/actions/orders/get";
import { formatPrice } from "@/lib/utils";
import { ItemCart } from "@/components/products/cart/item";
import { redirect } from "next/navigation";
import { PaypalButton } from "@/components/checkout/paypal-button";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { ok, order } = await getOrderById(params.id);

  if (!ok) {
    redirect("/");
  }
  if (!order) {
    return null;
  }

  const address = order.OrderAddress!;
  const items = order.OrderItem.map((item) => {
    return {
      id: item.Product.id,
      title: item.Product.title,
      slug: item.Product.slug,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: item.Product.ProductImage[0].url,
    };
  });

  return (
    <div>
      <Title title={`Orden #${params.id}`} />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 w-full">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-y-4">
          {order.isPaid ? (
            <div className="bg-green-100 p-4 rounded">
              <p className="text-green-800">Esta orden ha sido pagada</p>
            </div>
          ) : (
            <div className="bg-yellow-100 p-4 rounded">
              <p className="text-yellow-800">
                Esta orden esta pendiente de pago
              </p>
            </div>
          )}
          {items.map((item) => (
            <ItemCart key={`${item.slug}-${item.size}`} {...item} />
          ))}
        </div>
        <div>
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="flex justify-between">
                Direccion de entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              <span>Nombre </span>
              <span className="text-right">
                {address.name} {address.lastName}
              </span>

              <span>Telefono </span>
              <span className="text-right">{address.phone}</span>

              <span>Direccion </span>
              <span className="text-right">
                {address.address}
                {address.address2}{" "}
              </span>

              <span>Ciudad </span>
              <span className="text-right">
                {address.city}, {address.countryId}
              </span>

              <span>Codigo Postal </span>
              <span className="text-right">{address.postalCode}</span>
            </CardContent>
            <CardContent>
              <div className="bg-gray-400 w-full h-px rounded" />
            </CardContent>
            <CardHeader>
              <CardTitle>Resumen de la compra</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? `${order?.itemsInOrder} artículo`
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{formatPrice(order?.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{formatPrice(order?.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {formatPrice(order?.total)}
              </span>
            </CardContent>
            <CardFooter className="flex flex-col gap-y-4">
              {order.isPaid ? (
                <Link href={"/"} className="underline">
                  Volver a la tienda
                </Link>
              ) : (
                <PaypalButton amount={order.total} orderId={order.id} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
