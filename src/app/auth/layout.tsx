import "@/app/globals.css";
import { auth } from "@/auth";
import { bodyFont } from "@/components/typography/fonts";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata : Metadata =  {
  title: "Autenticación - Teslo Shop",
  description: "Autenticación - Teslo Shop",
}


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) redirect("/");
  
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`${bodyFont} antialiased`}>
        <main className="flex flex-col gap-8 ">
          {children}
        </main>
      </body>
    </html>
  );
}
