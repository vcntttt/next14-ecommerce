"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, LogOut, ShirtIcon, TicketIcon, UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Role } from "@prisma/client/edge";

export const Sidebar = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const role = session?.user?.role;

  const adminOptions = [
    {
      name: "Productos",
      href: "/admin/products",
      icon: ShirtIcon,
    },
    {
      name: "Ordenes",
      href: "/admin/orders",
      icon: TicketIcon,
    },
    {
      name: "Usuarios",
      href: "/admin/users",
      icon: UserIcon,
    },
  ];
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mb-20"></div>
        </SheetHeader>
        {isAuthenticated ? (
          <>
            <Link
              href={"/profile"}
              className="flex items-center p-2 my-4 hover:bg-gray-100 rounded transition-all"
            >
              <UserIcon />
              <span className="ml-3">Perfil</span>
            </Link>
            <Link
              href={"/profile/orders"}
              className="flex items-center p-2 my-4 hover:bg-gray-100 rounded transition-all"
            >
              <TicketIcon />
              <span className="ml-3">Mis pedidos</span>
            </Link>
            <Link
              href={"/api/auth/signout"}
              className="flex items-center p-2 my-4 hover:bg-gray-100 rounded transition-all w-full justify-start"
            >
              <LogOut />
              <span className="ml-3">Salir</span>
            </Link>
          </>
        ) : (
          <Link
            href={"/auth/login"}
            className="flex items-center p-2 my-4 hover:bg-gray-100 rounded transition-all"
          >
            <LogIn />
            <span className="ml-3">Iniciar sesion</span>
          </Link>
        )}
        {role === Role.ADMIN && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />
            {adminOptions.map((option) => (
              <Link
                key={option.name}
                href={option.href}
                className="flex items-center p-2 my-4 hover:bg-gray-100 rounded transition-all"
              >
                <option.icon />
                <span className="ml-3">{option.name}</span>
              </Link>
            ))}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
