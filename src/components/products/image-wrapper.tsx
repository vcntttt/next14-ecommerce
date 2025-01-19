import Image from "next/image"

interface Props {
  src?: string
  alt: string
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  width: number
  height: number
}

export const ImageWrapper = ({ src, alt, className, width, height, ...rest }: Props) => {

  const localSrc = ( src ) 
  ? src.startsWith('http')
    ? src
    : `/products/${ src }`
  : '/imgs/placeholder.jpg';

  return (
    <Image
      src={localSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      {...rest}
    />
  )
}