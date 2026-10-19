import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartState = {
  quantities: Record<string, number>;
  add: (_id: string) => void;
  remove: (_id: string) => void; // never below 0, delete key at 0
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      quantities: {},
      add: (id) =>
        set((state) => {
          const qty = (state.quantities[id] ?? 0) + 1;
          return {
            quantities: { ...state.quantities, [id]: qty },
          };
        }),
      remove: (id) =>
        set((state) => {
          const qty = (state.quantities[id] ?? 0) - 1;
          if (qty <= 0) {
            const { [id]: _removed, ...rest } = state.quantities;
            return { quantities: rest };
          }
          return {
            quantities: { ...state.quantities, [id]: qty },
          };
        }),
      clear: () => set({ quantities: {} }),
    }),
    {
      name: "cart-v1",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
