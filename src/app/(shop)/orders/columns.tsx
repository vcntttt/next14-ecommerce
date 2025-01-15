"use client";

import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (row) => {
      return (
        <Link href={`/orders/${row.getValue("id")}`}>{row.getValue("id")}</Link>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: (row) => {
      return formatPrice(Number(row.getValue("total")));
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: (row) => {
      return new Date(row.getValue("createdAt")).toISOString().split("T")[0];
    },
  },
  {
    accessorKey: "isPaid",
    header: "Estado",
    cell: (row) => {
      return (
        <span className={row.isPaid ? "text-green-500" : "text-red-500"}>
          {row.isPaid ? "Pagado" : "Pendiente"}
        </span>
      );
    },
  },
];
