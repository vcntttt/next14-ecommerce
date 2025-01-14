import { formSchema } from "@/components/checkout/address-form";
import { z } from "zod";

export interface Address extends z.infer<typeof formSchema> {
  id?: string; // solo para que no lo marque como supertipo
}
