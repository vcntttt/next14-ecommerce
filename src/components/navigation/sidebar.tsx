"use client"
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/ui-store";
import clsx from "clsx";
import {
  LogIn,
  LogOut,
  SearchIcon,
  ShirtIcon,
  TicketIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const isLoggedIn = false;
  const menuOptions = [
    {
      name: "Perfil",
      href: "/profile",
      icon: UserIcon,
    },
    {
      name: "Ordenes",
      href: "/",
      icon: TicketIcon,
    },
    {
      name: isLoggedIn ? "Salir" : "Ingresar",
      href: isLoggedIn ? "/auth/logout" : "/auth/login",
      icon: isLoggedIn ? LogOut : LogIn,
    },
    {
      name: "Productos",
      href: "/",
      icon: ShirtIcon,
    },
    {
      name: "Usuarios",
      href: "/",
      icon: UserIcon,
    },
  ];

  const indiceCorte = 3;
  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}
      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Side menu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <XIcon
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <div className="relative mt-10">
          <Input className="peer ps-9" placeholder="Buscar..." type="email" />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>

        {menuOptions.slice(0, indiceCorte).map((option) => (
          <Link
            key={option.name}
            href={option.href}
            className="flex items-center p-2 my-4 hover:bg-gray-100 rounded transition-all"
          >
            <option.icon />
            <span className="ml-3">{option.name}</span>
          </Link>
        ))}

        <div className="w-full h-px bg-gray-200 my-10" />

        {menuOptions.slice(indiceCorte).map((option) => (
          <Link
            key={option.name}
            href={option.href}
            className="flex items-center p-2 my-4 hover:bg-gray-100 rounded transition-all"
          >
            <option.icon />
            <span className="ml-3">{option.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
