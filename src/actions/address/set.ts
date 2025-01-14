"use server";
import { Address } from "@/interfaces/address";
import { prisma } from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {

    const storedAddress = await prisma.address.findUnique({
      where: { userId },
    });


    const addressToSave = {
      userId: userId,
      ...address,
    };

    if (!storedAddress) {
      const newAddress = await prisma.address.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.address.update({
      where: { userId },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la dirección");
  }
};
