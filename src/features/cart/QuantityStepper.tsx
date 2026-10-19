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
    <div className="flex items-center justify-center gap-1 w-full max-w-xs mx-auto">
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={disabled || qty === 0}
        aria-label={fa.aria.remove(name)}
      >
        −
      </Button>
      <span className="w-6 text-center text-base font-mono">{qty}</span>
      <Button
        variant="accent"
        size="icon"
        onClick={onAdd}
        disabled={disabled}
        aria-label={fa.aria.add(name)}
      >
        +
      </Button>
    </div>
  );
}
