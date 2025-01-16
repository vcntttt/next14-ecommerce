import { getUsers } from "@/actions/users/get";
import { Title } from "../../../../components/typography/title";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UserPage() {
  const users = await getUsers();

  // console.log("🚀 ~ users:", users);
  return (
    <div>
      <Title title="Usuarios" />
      <DataTable columns={columns} data={users ?? []} />
    </div>
  );
}
