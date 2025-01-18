import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ProductTableActions = () => {
  return (
    <div className="flex justify-end w-full">
      <Button>
        <Link href={`/admin/products/new`}>
          Agregar Producto
        </Link>
      </Button>
    </div>
  );
};
