import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Title } from "../../../components/typography/title";
import { getOrdersByUser } from "@/actions/orders/get";

export default async function OrdersPage() {
  const orders = await getOrdersByUser();

  return (
    <div className="container mx-auto py-10">
      <Title title="Ordenes" />
      <DataTable columns={columns} data={orders.orders ?? []} />
    </div>
  );
}
