import { Title } from "@/components/typography/title";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllProducts } from "@/actions/products/get-all";

export default async function ProductPage() {
  const products = await getAllProducts();

  // console.log("🚀 ~ products:", products);
  return (
    <div>
      <Title title="Productos" />
      <DataTable columns={columns} data={products ?? []} />
    </div>
  );
}
