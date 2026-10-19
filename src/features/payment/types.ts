import type { ComponentType } from "react";
import type { CartLine } from "@/features/cart/selectors";

export type PaymentMethodId = "gatewayLink" | "cardToCard";

export type PaymentProps = { total: number; lines: CartLine[] };

export type PaymentMethod = {
  id: PaymentMethodId;
  Component: ComponentType<PaymentProps>;
};
