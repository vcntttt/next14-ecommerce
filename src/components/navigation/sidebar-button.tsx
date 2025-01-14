"use client";

import { useUIStore } from "@/store/ui";
import { MenuIcon } from "lucide-react";

export const SidebarButton = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  return (
    <button onClick={openSideMenu}>
      <MenuIcon />
    </button>
  );
};
