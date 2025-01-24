"use server";

import { prisma } from "@/lib/prisma";

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
      // cacheStrategy: {
      //   ttl: 60 * 60 * 24 * 30,
      //   tags: ["countries"],
      // },
    });

    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
};
