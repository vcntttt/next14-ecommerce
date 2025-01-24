import { cacheConfig } from "@/config";
import { getPaginatedProducts } from "@/actions/products/pagination";
import { ProductsGrid } from "@/components/products/grid";
import { ProductsPagination } from "@/components/products/pagination";
import { genders } from "@/lib/genders";
import { Gender } from "@prisma/client";
import { Metadata } from "next";
import { Title } from "../../../../components/typography/title";
export const revalidate = cacheConfig.week;

interface Props {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gender } = await params;

  return {
    title: `Articulos de 
    ${genders.find((category) => category.url === gender)?.label}`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const sParams = await searchParams
  const currentPage = sParams.page ? parseInt(sParams.page) : 1;
  const { products, totalPages } = await getPaginatedProducts({
    currentPage,
    gender,
  });
  return (
    <>
      <Title
        title={`Articulos de ${
          genders.find((category) => category.url === gender)?.label
        }`}
      />
      <ProductsGrid products={products} />
      <ProductsPagination totalPages={totalPages} />
    </>
  );
}
