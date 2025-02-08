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
          <div className="relative">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="peer pe-9 ps-9"
              placeholder="Buscar productos"
              type="search"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <SearchIcon size={16} strokeWidth={2} />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-6xl h-[500px] overflow-y-auto pt-8 fade-in-10 fade-out-10">
          <DialogHeader>
            <DialogDescription className="sr-only">
              Busca productos por nombre
            </DialogDescription>
            <div className="relative">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="peer pe-9 ps-9"
                placeholder="Buscar productos"
                type="search"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <SearchIcon size={16} strokeWidth={2} />
              </div>
            </div>
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
