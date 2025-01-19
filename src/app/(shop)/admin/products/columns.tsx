"use client";
import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ImageWrapper } from "@/components/products/image-wrapper";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "slug",
    header: "slug",
  },
  {
    accessorKey: "images",
    header: "Imagen",
    cell: ({ row }) => {
      const images = row.getValue("images") as string[];
      const imgUrl = images[0];

      return (
        <Link href={`/product/${row.getValue("slug")}`}>
          <ImageWrapper
            src={imgUrl}
            alt={row.getValue("title")}
            width={100}
            height={100}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <Link href={`/admin/products/${row.getValue("slug")}`} className="hover:underline">
          <span>{row.getValue("title")}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => {
      return formatPrice(Number(row.getValue("price")));
    },
  },
  {
    accessorKey: "stock",
    header: "Inventario",
  },
  {
    accessorKey: "sizes",
    header: "Tallas",
  },
];
