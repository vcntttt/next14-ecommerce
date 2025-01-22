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
      <Dialog>
        <DialogTrigger asChild className="cursor-pointer">
          <SearchIcon />
        </DialogTrigger>
        <DialogContent className="sm:max-w-6xl h-[500px] overflow-y-auto pt-8">
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
