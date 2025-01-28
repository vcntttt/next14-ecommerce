"use client";
import { SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { ItemCartPreview } from "../products/cart/item-preview";
import { getAllProducts } from "@/actions/products/get-all";
import Link from "next/link";

interface AuxiliarProduct extends Product {
  images: string[];
}

export const Search = () => {
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState<AuxiliarProduct[]>([]);
  const [filteredResults, setFilteredResults] = useState<AuxiliarProduct[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getAllProducts();
      if (!allProducts) return;
      setProducts(allProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const lowerCaseTitle = title.toLowerCase();
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseTitle)
    );
    setFilteredResults(results);
  }, [title, products]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 py-2 rounded-md">
            <SearchIcon/>
            {/* <span className="text-sm">Buscar productos...</span> */}
            <span className="text-xs bg-zinc-100 px-2 py-1 rounded-md text-zinc-800">
              Ctrl + K
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-6xl h-[500px] overflow-y-auto pt-8 fade-in-10 fade-out-10">
          {/* <DialogTitle></DialogTitle> */}
          <DialogHeader>
            <DialogDescription className="sr-only">
              Busca productos por nombre
            </DialogDescription>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Buscar productos"
            />
          </DialogHeader>
          <div className="">
            {filteredResults.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <ItemCartPreview
                  key={product.id}
                  title={product.title}
                  image={product.images[0]}
                  price={product.price}
                  quantity={0}
                />
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
