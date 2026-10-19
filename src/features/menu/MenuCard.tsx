import type { MenuItem } from "@/features/menu/types";
import { formatThousandToman } from "@/lib/money";
import { fa } from "@/content/fa";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

export interface MenuCardProps {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function MenuCard({ item, qty, onAdd, onRemove }: MenuCardProps) {
  const isSoldOut = item.available === false;

  return (
    <article
      className={[
        "bg-card border border-border rounded-xl p-3 relative group",
        isSoldOut ? "opacity-60" : "",
      ].filter(Boolean).join(" ")}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-20 object-cover rounded-lg mb-2"
        />
      ) : (
        <div
          className="w-12 h-12 rounded-full bg-border flex items-center justify-center text-lg mb-2 mx-auto"
          aria-hidden="true"
        >
          {item.icon}
        </div>
      )}

      {item.badge && (
        <Pill className="absolute top-2 right-2">{item.badge}</Pill>
      )}

      <h3 className="text-text font-bold text-base mb-1">{item.name}</h3>

      <div className="w-8 h-px bg-accent mx-auto mb-2" />

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-between w-full">
          <Pill>{formatThousandToman(item.price)}</Pill>
          <span className="text-xs text-muted" aria-hidden="true">
            {item.available === false ? "ناموجود" : "موجود"}
          </span>
        </div>

        <div className="flex items-center gap-1 w-full max-w-xs mx-auto">
          <Button
            variant="ghost"
            onClick={onRemove}
            disabled={isSoldOut || qty === 0}
            aria-label={fa.aria.remove(item.name)}
            className="size-10"
          >
            −
          </Button>
          <span className="w-6 text-center text-sm font-mono">{qty}</span>
          <Button
            variant="ghost"
            onClick={onAdd}
            disabled={isSoldOut}
            aria-label={fa.aria.add(item.name)}
            className="size-10"
          >
            +
          </Button>
        </div>
      </div>

      {isSoldOut && (
        <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
          <span className="text-accent font-bold text-xs uppercase tracking-widest">
            فروخته شده
          </span>
        </div>
      )}
    </article>
  );
}
