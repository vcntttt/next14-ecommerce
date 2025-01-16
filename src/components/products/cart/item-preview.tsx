import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CartProduct } from "@/interfaces/products";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export const ItemCartPreview = ({ title, image, price, size }: Partial<CartProduct>) => {
  return (
    <Card className="rounded-none flex gap-2">
      <Image
        src={`/products/${image}`}
        alt="Product 1"
        width={80}
        height={80}
        className="rounded-none p-2"
      />
      <CardHeader className="p-2">
        { !size? <CardTitle>{title}</CardTitle> : <CardTitle>{`${size} - ${title}`}</CardTitle> }
        <span>{formatPrice(price!)}</span>
      </CardHeader>
    </Card>
  );
};
