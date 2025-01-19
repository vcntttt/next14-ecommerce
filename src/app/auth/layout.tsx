import "@/app/globals.css";
import { auth } from "@/auth";
import { bodyFont } from "@/components/typography/fonts";
import { companyName } from "@/config";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata : Metadata =  {
  title: `Autenticación - ${companyName}`,
  description: `Autenticación - ${companyName}`,
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) redirect("/");
  
  return (
    <html lang="es">
      <body className={`${bodyFont} antialiased`}>
        <main className="flex flex-col gap-8 ">
          {children}
        </main>
      </body>
    </html>
  );
}
