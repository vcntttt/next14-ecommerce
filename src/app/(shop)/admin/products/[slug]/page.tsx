import { Title } from "@/components/typography/title";
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
    </div>
  );
}
