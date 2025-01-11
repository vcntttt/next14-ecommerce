import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) return <div>No user</div>;

  return (
    <div>
      {JSON.stringify(session?.user)}
    </div>
  );
}