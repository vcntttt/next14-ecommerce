import { columns } from "@/components/orders/columns";
import { DataTable } from "@/components/orders/data-table";
import { Title } from "../../../components/typography/title";
import { getOrdersByUser } from "@/actions/orders/get";

export default async function OrdersPage() {
  const { orders } = await getOrdersByUser();
  // console.log("🚀 ~ OrdersPage ~ orders:", orders);

  return (
    <div className="container mx-auto py-10">
      <Title title="Mis Ordenes" />
      <DataTable columns={columns} data={orders ?? []} />
    </div>
  );
}
