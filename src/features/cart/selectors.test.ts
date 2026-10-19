import { describe, expect, test } from "vitest";
import { buildLines, getTotal, type CartLine } from "@/features/cart/selectors";
import type { MenuItem } from "@/features/menu/types";

const item: MenuItem = {
  id: "tea",
  name: "چای نبات",
  price: 35000,
  icon: "🍵",
  available: true,
};

const unavailableItem: MenuItem = {
  id: "sold",
  name: "ناموجود",
  price: 10000,
  icon: "🥤",
  available: false,
};

const menu: MenuItem[] = [item, unavailableItem];

describe("buildLines", () => {
  test("returns empty array for empty cart", () => {
    expect(buildLines({}, menu)).toEqual([]);
  });

  test("builds lines with correct quantities and subtotals", () => {
    const lines = buildLines({ tea: 2 }, menu);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({
      item: item,
      qty: 2,
      subtotal: 70000,
    });
  });

  test("ignores unknown ids not in menu", () => {
    const lines = buildLines({ tea: 1, unknown: 5 }, menu);
    expect(lines).toHaveLength(1);
    expect(lines[0].item.id).toBe("tea");
  });

  test("ignores unavailable items", () => {
    const lines = buildLines({ tea: 1, sold: 3 }, menu);
    expect(lines).toHaveLength(1);
    expect(lines[0].item.id).toBe("tea");
  });

  test("returns empty when only unavailable items remain", () => {
    expect(buildLines({ sold: 3 }, menu)).toEqual([]);
  });
});

describe("getTotal", () => {
  test("returns 0 for empty lines", () => {
    expect(getTotal([])).toBe(0);
  });

  test("sums subtotals of multiple lines", () => {
    const lines: CartLine[] = [
      { item, qty: 2, subtotal: item.price * 2 },
      { item, qty: 1, subtotal: item.price },
    ];
    expect(getTotal(lines)).toBe(105000);
  });
});
