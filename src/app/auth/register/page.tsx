import { RegisterForm } from "@/components/auth/register-form";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 py-4">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShoppingCart className="size-4" />
          </div>
          Teslo Shop
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
}