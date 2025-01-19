import { Title } from "@/components/typography/title";
import { ProductForm } from "@/components/products/admin/product-form";
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { getCategories } from "@/actions/category/get";
import { redirect } from "next/navigation";
interface Props {
  params: {
    slug: string;
  };
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = params;
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") redirect("/admin/products");

  return (
    <div>
      <Title title={slug === "new" ? "Nuevo producto" : "Editar producto"} />
      <ProductForm categories={categories} product={product ?? {}} />
    </div>
  );
}
