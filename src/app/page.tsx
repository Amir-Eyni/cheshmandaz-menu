"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MenuGrid } from "@/features/menu/MenuGrid";
import { CartPanel } from "@/features/cart/CartPanel";
import { PaymentSection } from "@/features/payment/PaymentSection";
import { useCartStore } from "@/features/cart/store";
import { buildLines, getTotal } from "@/features/cart/selectors";
import { menu } from "@/config/menu";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const quantities = useCartStore((state) => state.quantities);
  const add = useCartStore((state) => state.add);
  const remove = useCartStore((state) => state.remove);

  // SSR/hydration safety: render an empty shell on the server so the
  // persisted cart (loaded from sessionStorage on the client) does not
  // cause a hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  const lines = buildLines(mounted ? quantities : {}, menu);
  const total = getTotal(lines);

  const emptyHandlers = { onAdd: () => {}, onRemove: () => {} };

  return (
    <main className="min-h-dvh bg-bg text-text relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-32 h-32 bg-accent rounded-full -translate-y-1/3 -translate-x-1/6 opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-[480px] mx-auto w-full px-4 py-6 min-h-dvh">
        <Header />
        <MenuGrid
          quantities={mounted ? quantities : {}}
          onAdd={mounted ? add : emptyHandlers.onAdd}
          onRemove={mounted ? remove : emptyHandlers.onRemove}
        />
        {mounted && (
          <>
            <CartPanel menu={menu} lines={lines} total={total} />
            <PaymentSection total={total} lines={lines} />
          </>
        )}
        <Footer />
      </div>
    </main>
  );
}
