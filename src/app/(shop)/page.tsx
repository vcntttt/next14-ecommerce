import { cacheConfig } from "@/config";
import { getPaginatedProducts } from "@/actions/products/pagination";
import { ProductsGrid } from "@/components/products/grid";
import { ProductsPagination } from "@/components/products/pagination";
import { Title } from "@/components/typography/title";
import { InfoIcon } from "lucide-react";
export const revalidate = cacheConfig.week;

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
      <div className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-sm">
        <InfoIcon/> Puedes experimentar demoras en la carga de la página debido a que se esta usando una base de datos gratuita. Gracias por su comprensión.
      </div>
      <ProductsGrid products={products} />
      <ProductsPagination totalPages={totalPages} />
    </>
  );
}
