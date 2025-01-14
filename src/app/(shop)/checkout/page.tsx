import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");
  
  return (
    <div>
      <h1>Checkout Page</h1>
    </div>
  );
}
