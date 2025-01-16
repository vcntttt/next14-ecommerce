"use client";

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (row) => {
      return (
        <Link href={`/orders/${row.getValue("id")}`} className="hover:underline">{row.getValue("id")}</Link>
      );
    },
  },
  {
    accessorKey: "OrderAddress",
    header: "Usuario",
    cell: (row) => {
      const orderAddress = row.getValue("OrderAddress");
      const clientName = `${orderAddress.name} ${orderAddress.lastName}`;
      console.log("🚀 ~ clientName:", clientName);
  
      return clientName;
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
      const isPaid = row.getValue("isPaid");
      return (
          isPaid ? (
            <Badge className="bg-green-600 text-white" >Pagado</Badge>
          ) : (
            <Badge className="bg-red-600 text-white" >Pendiente</Badge>
          )
      )
    },
  },
];
