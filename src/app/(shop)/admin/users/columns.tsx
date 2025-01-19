"use client";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { RoleSwitcher } from "./role-switcher";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => {
      return (
        <RoleSwitcher role={row.original.role} userId={row.original.id} />
      )
    },
  },
];
