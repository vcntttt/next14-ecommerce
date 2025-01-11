"use client"
import Image from "next/image"
import { useState } from "react"

interface Props {
  images: string[]
  title: string
}

export const ProductImage = ({ images, title }: Props) => {
  const [display, setDisplay] = useState(images[0])
  return (
    <Image
      src={`/products/${display}`}
      alt={title}
      className="w-full object-cover"
      width={500}
      height={500}
      onMouseEnter={() => setDisplay(images[1])}
      onMouseLeave={() => setDisplay(images[0])}
    />
  )
}
