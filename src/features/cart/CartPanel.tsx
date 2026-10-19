import { formatToman } from "@/lib/money";
import { fa } from "@/content/fa";
import { useCartStore } from "@/features/cart/store";
import { buildLines, getTotal, type CartLine } from "@/features/cart/selectors";
import type { MenuItem } from "@/features/menu/types";
import { Button } from "@/components/ui/Button";

export interface CartPanelProps {
  menu: MenuItem[];
  lines?: CartLine[];
  total?: number;
}

export function CartPanel({ menu, lines: propsLines, total: propsTotal }: CartPanelProps) {
  const quantities = useCartStore((state) => state.quantities);
  const clear = useCartStore((state) => state.clear);

  const lines = propsLines ?? buildLines(quantities, menu);
  const total = propsTotal ?? getTotal(lines);
  const isEmpty = lines.length === 0;

  return (
    <section className={["cart-panel", isEmpty ? "hidden" : ""].join(" ")}>
      <h2 className="text-text font-bold text-lg mb-3">{fa.cart.title}</h2>

      <ul className="space-y-3 mb-4">
        {lines.map((line) => (
          <li
            key={line.item.id}
            className="flex items-center justify-between bg-card border border-border rounded-lg p-2"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-text">{line.item.name}</span>
                <span className="text-muted text-sm">
                  {line.qty} ×
                </span>
              </div>
              <span className="text-sm text-muted">
                {formatToman(line.subtotal)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="bg-accent text-on-accent rounded-lg p-3">
        <div className="flex justify-between mb-1">
          <span className="font-bold">{fa.cart.total}</span>
          <span className="font-bold">{formatToman(total)}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <Button
          onClick={clear}
          variant="outline"
          disabled={isEmpty}
          className="w-full sm:w-1/2"
        >
          پاک‌سازی
        </Button>
        <Button
          onClick={() => {}}
          variant="primary"
          disabled={isEmpty}
          className="w-full sm:w-1/2"
        >
          ادامه به پرداخت
        </Button>
      </div>
    </section>
  );
}
