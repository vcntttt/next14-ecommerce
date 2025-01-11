import "@/app/globals.css";
import { bodyFont } from "@/components/typography/fonts";
import type { Metadata } from "next";

export const metadata : Metadata =  {
  title: "Autenticación - Teslo Shop",
  description: "Autenticación - Teslo Shop",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
