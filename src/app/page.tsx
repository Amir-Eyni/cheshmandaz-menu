"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MenuGrid } from "@/features/menu/MenuGrid";

export default function Page() {
  const emptyQuantities: Record<string, number> = {};
  const noop = () => {};

  return (
    <main className="min-h-screen bg-bg text-text relative">
      {/* Decorative yellow circle clipped at top-left */}
      <div
        className="absolute top-0 left-0 w-32 h-32 bg-accent rounded-full -translate-y-1/3 -translate-x-1/6 opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[480px] mx-auto w-full px-4 py-6 min-h-screen">
        <Header />
        <MenuGrid
          quantities={emptyQuantities}
          onAdd={noop}
          onRemove={noop}
        />
        <Footer />
      </div>
    </main>
  );
}
