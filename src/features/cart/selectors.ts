import type { MenuItem } from "@/features/menu/types";

export type CartLine = {
  item: MenuItem;
  qty: number;
  subtotal: number;
};

/**
 * Builds the cart lines from the persisted quantities and the current menu.
 *
 * Quantities come from sessionStorage and therefore cannot be trusted:
 * negative, fractional or non-finite values are clamped here, and lines
 * that end up empty are dropped. Ids that are unknown to the menu or that
 * belong to an unavailable item are ignored as well, so a cart persisted
 * before a menu change never breaks the page.
 */
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
      const safeQty = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0;
      return { item, qty: safeQty, subtotal: item.price * safeQty };
    })
    .filter((line) => line.qty > 0);
}

export function getTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.subtotal, 0);
}
