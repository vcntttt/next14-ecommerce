import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Size } from "@/interfaces/products";

interface Props {
  sizes: Size[];
  selectedSize: Size | undefined;
  onChange: (size: Size) => void;
}

export const ProductSizeSelector = ({
  sizes,
  selectedSize,
  onChange,
}: Props) => {
  return (
    <ToggleGroup type="single" value={selectedSize} onValueChange={onChange}>
      {sizes.map((size) => (
        <ToggleGroupItem
          key={size}
          value={size}
          aria-label={`Seleccionar talla ${size}`}
        >
          {size}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
