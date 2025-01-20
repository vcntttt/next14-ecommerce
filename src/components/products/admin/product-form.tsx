"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category, Gender } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { genders } from "@/lib/genders";
import { Product, ProductWithImage } from "@/interfaces/products";
import { TrashIcon } from "lucide-react";
import { createOrUpdateProduct } from "@/actions/products/admin/createOrUpdate";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";
import { ImageWrapper } from "@/components/products/image-wrapper";
import { deleteProductImage } from "@/actions/products/admin/delete-image";

export const formSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  stock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
  images: z.any().optional(),
});

interface Props {
  categories: Category[];
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
}

export const ProductForm = ({ categories, product }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...product,
      tags: product.tags?.join(","),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.images) {
        const imgData = new FormData();

        Array.from(values.images).forEach((file) => {
          imgData.append("images", file as Blob);
        });

        values.images = imgData;
      }

      const response = await createOrUpdateProduct(values);

      if (!response) {
        throw new Error("No se recibió respuesta del servidor");
      }

      const { ok, product: updatedProduct, message } = response;

      if (!ok) {
        throw new Error(message);
      }

      router.replace(`/admin/products/${updatedProduct?.slug}`);
    } catch (error) {
      console.error(error);
    }
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 min-w-7xl"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="bg-blue-100/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="bg-blue-100/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea className="h-32 bg-blue-100/40" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <div className="relative flex rounded-lg shadow-sm shadow-black/5">
                    <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground">
                      $
                    </span>
                    <Input
                      {...field}
                      className="-me-px rounded-e-none ps-6 shadow-none bg-blue-100/40"
                      placeholder="0.00"
                      type="text"
                    />
                    <span className="-z-10 inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                      USD
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="bg-blue-100/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-blue-100/40">
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem key={gender.url} value={gender.url}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-blue-100/40">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventario</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    {...field}
                    className="bg-blue-100/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tallas</FormLabel>
                <FormControl>
                  <ToggleGroup
                    size="lg"
                    type="multiple"
                    className="flex flex-wrap gap-2"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    {sizes.map((size) => (
                      <ToggleGroupItem
                        key={size}
                        value={size}
                        aria-label={`Seleccionar talla ${size}`}
                        className="flex-1"
                      >
                        {size}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imágenes</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files)}
                    className="bg-blue-100/40 p-0 file:px-4 file:py-2 file:bg-background file:text-muted-foreground"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => {
              console.log(image)
              return (
                <div key={image.url} className="relative">
                  {image.url.startsWith("http") && (
                    <Button
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                      onClick={() => deleteProductImage(image.id, image.url)}
                    >
                      <TrashIcon />
                    </Button>
                  )}
                  <ImageWrapper
                    alt={product.title ?? ""}
                    src={image.url}
                    width={400}
                    height={400}
                    className="rounded-t shadow-md"
                  />
                </div>
              );
            })}
          </div>
          <p className="italic text-sm text-muted-foreground">
            *Sólo se pueden borrar imágenes que se encuentren en la nube
          </p>
        </div>
        <Button type="submit" className="w-full">
          Continuar
        </Button>
      </form>
    </Form>
  );
};
