import { formSchema } from "@/components/checkout/address-form";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: z.infer<typeof formSchema>;
  setAddress: (address: z.infer<typeof formSchema>) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        name: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
        remember: false,
      },
      setAddress: (address: z.infer<typeof formSchema>) => set({ address }),
    }),
    {
      name: "address",
    }
  )
);
