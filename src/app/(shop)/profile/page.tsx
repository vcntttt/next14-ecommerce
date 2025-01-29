import { auth } from "@/auth";
import { Title } from "@/components/typography/title";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <pre>{JSON.stringify(session.user, null, 2)}</pre> */}
      <Title title="Perfil" />
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Image src={session.user?.image ?? "/person.png"} alt="Avatar" width={100} height={100} className="rounded-full" />
          <CardTitle className="text-2xl font-bold">{session.user?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg">{session.user?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Rol</p>
            <p className="text-lg uppercase">{session.user?.role!.toLowerCase()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">User ID</p>
            <p className="text-lg font-mono">{session.user?.id}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-y-2">
          <Button asChild className="w-full">
            <Link href="/orders">
            Historial de compras
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/checkout/address/edit">
            Editar dirección de envío
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}