import { auth } from "@/auth";
import { Title } from "@/components/typography/title";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </>
  );
}