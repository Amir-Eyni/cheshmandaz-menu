import { menu } from "@/config/menu";
import { MenuCard } from "./MenuCard";

export interface MenuGridProps {
  quantities: Record<string, number>;
  onAdd: (_id: string) => void;
  onRemove: (_id: string) => void;
}

export function MenuGrid({ quantities, onAdd, onRemove }: MenuGridProps) {
  return (
    <section className="grid grid-cols-2 gap-3">
      {menu.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          qty={quantities[item.id] ?? 0}
          onAdd={() => onAdd(item.id)}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </section>
  );
}
