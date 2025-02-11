"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddressStore } from "@/store/address";
import { useEffect } from "react";
import { setUserAddress } from "@/actions/address/set";
import { useRouter } from "next/navigation";
import { deleteUserAddress } from "@/actions/address/delete";
import { Address } from "@/interfaces/address";
import { Country } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const formSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  postalCode: z.string(),
  city: z.string(),
  country: z.string().min(2, { message: "Debes seleccionar un país" }),
  phone: z.string(),
  remember: z.boolean(),
});

interface Props {
  countries: Country[];
  dbAddress?: Address | undefined;
  isEditable?: boolean;
}

export function AddressForm({ dbAddress, countries, isEditable = false }: Props) {
  const router = useRouter();
  const { address, setAddress } = useAddressStore();

  const { data: session } = useSession({ required: true });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dbAddress,
  });

  useEffect(() => {
    form.reset(address);
  }, [form, address]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    try {
      const { remember, ...address } = values;
      setAddress(address);

      if (remember) {
        const { message } = await setUserAddress(address, session!.user!.id!);
        toast.success(message);
      } else {
        await deleteUserAddress(session!.user!.id!);
        toast.success("Dirección eliminada correctamente");
      }
      router.push(isEditable ? "/profile" : "/checkout");
    } catch (error) {
      console.log(error);
      toast.error("No se pudo guardar la dirección");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-6 min-w-7xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
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
          name="address2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección 2 (Opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
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
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código Postal</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <Select
                value={field.value || ""}
                onValueChange={(value) => field.onChange(value)}
              >
                <FormControl>
                  <SelectTrigger className="bg-blue-100/40">
                    <SelectValue placeholder="Selecciona un país" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="text"
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
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 justify-start space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="bg-blue-100/40"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Recordar dirección</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div></div>
        <Button type="submit" className="w-full">
          {isEditable ? "Actualizar" : "Continuar"}
        </Button>
      </form>
    </Form>
  );
}
