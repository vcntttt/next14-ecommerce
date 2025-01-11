"use client";

import { getProductLiveDetails } from "@/actions/products/get-live-details-by-slug";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  slug: string;
}

export const ProductLiveDetails = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getDetails = async () => {
    const product = await getProductLiveDetails(slug);
    if (!product) return;
    setStock(product.stock);
    setPrice(product.price);
    setIsLoading(false);
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-between font-semibold">
      {isLoading ? (
        <>
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-20 h-8" />
        </>
      ) : (
        <>
          <span>Stock: {stock}</span>
          <span>{formatPrice(price)}</span>
        </>
      )}
    </div>
  );
};
