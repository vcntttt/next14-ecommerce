import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Size } from "@/interfaces/products";
import clsx from "clsx";
import { Button } from "../ui/button";

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

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Tallas disponibles</h3>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <Button
            variant={"ghost"}
            key={size}
            className={clsx("rounded-md text-md", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};
