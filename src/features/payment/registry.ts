import { GatewayLink } from "./providers/GatewayLink";
import { CardToCard } from "./providers/CardToCard";
import type { PaymentMethod } from "./types";
import type { PaymentMethodId } from "./types";

export const paymentRegistry: Record<PaymentMethodId, PaymentMethod> = {
  gatewayLink: { id: "gatewayLink", Component: GatewayLink },
  cardToCard: { id: "cardToCard", Component: CardToCard },
};
