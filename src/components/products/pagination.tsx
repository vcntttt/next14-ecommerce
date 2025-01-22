"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  totalPages: number;
}

export const ProductsPagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentPage = Number(searchParams.get("page")) ?? 1;
  if (currentPage < 1) currentPage = 1;

  const createPageUrl = (page: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (page === "...") return `${pathname}?${params.toString()}`;

    if (+page <= 0) return pathname;

    if (+page > totalPages) return `${pathname}?${params.toString()}`;

    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(currentPage - 1)}
            content="Anterior"
            className={`${currentPage === 1 && "invisible"}`}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem
          className={`${currentPage === totalPages && "invisible"}`}
        >
          <PaginationNext href={createPageUrl(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
