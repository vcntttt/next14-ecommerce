export const revalidate = 60 * 60 * 24 * 7;

import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { ProductLiveDetails } from "@/components/products/live-details";
import { ProductMobileSlideshow } from "@/components/products/slideshow/mobile-slideshow";
import { ProductSlideshow } from "@/components/products/slideshow/slideshow";
import { titleFont } from "@/components/typography/fonts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddProductToCart } from '@/components/products/add-to-cart';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  return {
    title: `${product?.title ?? ""}`,
    description: product?.description ?? "",
    openGraph: {
      title: `${product?.title ?? ""}`,
      description: product?.description ?? "",
      images: [product?.images[0] ?? ""],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 w-full">
      <div className="col-span1 md:col-span-2">
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className={`text-3xl font-bold ${titleFont}`}>{product.title}</h1>
        <ProductLiveDetails slug={slug} />
        <AddProductToCart product={product} />
        <p>{product.description}</p>
      </div>
    </div>
  );
}
