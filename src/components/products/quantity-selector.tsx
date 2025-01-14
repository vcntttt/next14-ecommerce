import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  quantity: number;
  maxQuantity: number;
  onChange: (quantity: number) => void;
}

export const ProductQuantitySelector = ({ quantity, onChange, maxQuantity }: Props) => {
  function onValueChange(value: number) {
    if (quantity + value < 1) return;

    if (quantity + value > maxQuantity){
      alert("No puedes llevar mas")
      return
    }
    onChange(quantity + value);
  }

  return (
    <div className="flex items-center gap-2 mx-auto">
      <Button variant={"ghost"} onClick={() => onValueChange(-1)}>
        <MinusCircleIcon />
      </Button>
      <span className="bg-gray-200 rounded-sm px-8 py-2">{quantity}</span>
      <Button variant={"ghost"} onClick={() => onValueChange(1)}>
        <PlusCircleIcon />
      </Button>
    </div>
  );
};
