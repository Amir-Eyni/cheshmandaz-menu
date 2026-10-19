import { fa } from "@/content/fa";
import { Button } from "@/components/ui/Button";

export interface QuantityStepperProps {
  name: string;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function QuantityStepper({
  name,
  qty,
  onAdd,
  onRemove,
  disabled,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-1 w-full max-w-xs mx-auto">
      <Button
        variant="ghost"
        onClick={onRemove}
        disabled={disabled || qty === 0}
        aria-label={fa.aria.remove(name)}
        className="size-10"
      >
        −
      </Button>
      <span className="w-6 text-center text-sm font-mono">{qty}</span>
      <Button
        variant="ghost"
        onClick={onAdd}
        disabled={disabled}
        aria-label={fa.aria.add(name)}
        className="size-10"
      >
        +
      </Button>
    </div>
  );
}
