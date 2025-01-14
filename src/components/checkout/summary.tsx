'use client'
import { formatPrice } from "@/lib/utils";
import { CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/cart";

export const Summary = () => {
    const getSummary = useCartStore((state) => state.getSummary);
    const { subTotal, totalItems, tax, total } = getSummary();
  return (
    <CardContent className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {totalItems === 1
          ? `${totalItems} artículo`
          : `${totalItems} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{formatPrice(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{formatPrice(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{formatPrice(total)}</span>
    </CardContent>
  );
};
