"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageWrapper } from "./image-wrapper";

interface Props {
  images: string[];
  title: string;
}

export const ProductImage = ({ images, title }: Props) => {
  const [display, setDisplay] = useState(images[0]);
  return images.length > 0 ? (
    <Image
      src={`/products/${display}`}
      alt={title}
      className="w-full object-cover"
      width={500}
      height={500}
      onMouseEnter={() => setDisplay(images[1])}
      onMouseLeave={() => setDisplay(images[0])}
    />
  ) : (
    <div className="h-[400px] flex items-center justify-center">
      <ImageWrapper alt={title} width={400} height={500} />
    </div>
  );
};
