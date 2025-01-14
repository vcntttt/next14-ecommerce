"use client";
import { useAddressStore } from "@/store/address";
import { CardContent } from "@/components/ui/card";

export const AddressSummary = () => {
  const address = useAddressStore((state) => state.address);

  return (
    <CardContent className="grid grid-cols-2">
      <span>Nombre </span>
      <span className="text-right">
        {address.name} {address.lastName}
      </span>

      <span>Telefono </span>
      <span className="text-right">{address.phone}</span>

      <span>Direccion </span>
      <span className="text-right">
        {address.address}
        {address.address2}{" "}
      </span>

      <span>Ciudad </span>
      <span className="text-right">
        {address.city}, {address.country}
      </span>

      <span>Codigo Postal </span>
      <span className="text-right">{address.postalCode}</span>
    </CardContent>
  );
};
