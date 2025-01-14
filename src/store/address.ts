import { Address } from "@/interfaces/address";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address
  setAddress: (address: Address) => void
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
      },
      setAddress: (address: Address) => set({ address }),
    }),
    {
      name: "address",
    }
  )
);
