import { ChevronLeft, ChevronRight } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

// import { RefreshCcw } from "lucide-react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  refetchFn?: () => void;
}

export function DataTableViewOptions<TData>({
  table,
  // refetchFn,
}: DataTableViewOptionsProps<TData>) {
  
  return (
    <div className="flex items-center justify-end gap-x-4">
      {/* <Button size={"icon"} variant={"outline"} onClick={refetchFn ?? (() => {alert("refetchFn no definida")})}>
        <RefreshCcw size={20}/>
      </Button> */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
  );
}