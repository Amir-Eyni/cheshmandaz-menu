import type { MenuItem } from "@/features/menu/types";

export type CartLine = {
  item: MenuItem;
  qty: number;
  subtotal: number;
};

export function buildLines(
  q: Record<string, number>,
  menu: MenuItem[]
): CartLine[] {
  const byId = new Map(menu.map((item) => [item.id, item]));
  return Object.entries(q)
    .filter(([id]) => {
      const item = byId.get(id);
      return item !== undefined && item.available !== false;
    })
    .map(([id, qty]) => {
      const item = byId.get(id)!;
      return { item, qty, subtotal: item.price * qty };
    });
}

export function getTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.subtotal, 0);
}
