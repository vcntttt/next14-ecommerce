import { Title } from "@/components/typography/title";
import { ProductForm } from "@/components/products/admin/product-form";
interface Props {
  params: {
    slug: string;
  };
}

export default function AdminProductPage({ params }: Props) {
  const { slug } = params;
  return (
    <div>
      <Title title={slug === "new" ? "Nuevo producto" : "Editar producto"} />
      <ProductForm />
    </div>
  );
}
