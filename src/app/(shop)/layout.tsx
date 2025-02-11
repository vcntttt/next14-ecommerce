import "@/app/globals.css";
import { Header } from "@/components/navigation/header";
import { bodyFont } from "@/components/typography/fonts";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { companyName } from "@/config";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: `%s - ${companyName}`,
    default: `${companyName}`,
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${bodyFont}`}>
        <div className="max-w-7xl mx-auto">
          <Providers>
            <Header />
            <main className="flex flex-col gap-8 py-4 md:py-10 px-4 md:px-0">
              {children}
            </main>
            <Toaster richColors/>
          </Providers>
        </div>
      </body>
    </html>
  );
}
