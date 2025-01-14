import { getUserAddress } from "@/actions/address/get";
import { auth } from "@/auth";
import { AddressForm } from "@/components/checkout/address-form";
import { Title } from "@/components/typography/title";
import { redirect } from "next/navigation";

export default async function AddressPage() {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");

  const userAddress = (await getUserAddress(session.user.id!)) ?? undefined;
  return (
    <div>
      <Title title="Dirección de Entrega" />
      <AddressForm dbAddress={userAddress} />
    </div>
  );
}