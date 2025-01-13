import { auth } from "@/auth";
import { Title } from '@/components/typography/title';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) return <div>No user</div>;

  return (
    <>
    <Title title="Perfil" />
    <pre>
      {JSON.stringify(session?.user, null, 2)}
    </pre>
    </>
  );
}