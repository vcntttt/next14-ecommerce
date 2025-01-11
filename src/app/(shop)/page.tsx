export const revalidate = 60 * 60 * 24;
import { getPaginatedProducts } from "@/actions/products/pagination";
import { ProductsGrid } from "@/components/products/grid";
import { ProductsPagination } from "@/components/products/pagination";
import { Title } from "@/components/typography/title";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProducts({ currentPage });

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductsGrid products={products} />
      <ProductsPagination totalPages={totalPages} />
    </>
  );
}
