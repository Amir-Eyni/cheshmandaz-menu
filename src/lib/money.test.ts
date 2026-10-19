import { describe, expect, test } from "vitest";
import { formatToman, formatThousandToman, tomanToRial } from "@/lib/money";

describe("formatToman", () => {
  test("formats with Persian locale and toman suffix", () => {
    expect(formatToman(35000)).toBe("۳۵٬۰۰۰ تومان");
  });
  test("handles zero", () => {
    expect(formatToman(0)).toBe("۰ تومان");
  });
});

describe("formatThousandToman", () => {
  test("uses thousand unit when divisible by 1000", () => {
    expect(formatThousandToman(70000)).toBe("۷۰ هزار تومان");
  });
  test("falls back to formatToman when not divisible by 1000", () => {
    expect(formatThousandToman(35500)).toBe(formatToman(35500));
  });
});

describe("tomanToRial", () => {
  test("multiplies by 10", () => {
    expect(tomanToRial(1000)).toBe(10000);
    expect(tomanToRial(0)).toBe(0);
  });
});
