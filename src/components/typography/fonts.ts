import { Doppio_One, Inter } from "next/font/google";

const doppioOne = Doppio_One({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const titleFont = doppioOne.className
export const bodyFont = inter.className
