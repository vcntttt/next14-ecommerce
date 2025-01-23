import { columns } from "@/components/orders/columns";
import { DataTable } from "@/components/orders/data-table";
import { Title } from "@/components/typography/title";
import { getOrdersByAdmin } from "@/actions/orders/get";

export default async function OrdersPage() {
  const { orders } = await getOrdersByAdmin();

  return (
    <div className="container mx-auto py-10">
      <Title title="Todas las Ordenes" />
      <DataTable columns={columns} data={orders ?? []} />
    </div>
  );
}