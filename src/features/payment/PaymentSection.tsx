import { payment } from "@/config/payment";
import { fa } from "@/content/fa";
import { paymentRegistry } from "@/features/payment/registry";
import type { CartLine } from "@/features/cart/selectors";
import type { PaymentMethodId } from "@/features/payment/types";

export interface PaymentSectionProps {
  total: number;
  lines: CartLine[];
}

export function PaymentSection({ total, lines }: PaymentSectionProps) {
  const methods = payment.methods as unknown as PaymentMethodId[];

  return (
    <section id="payment" aria-label={fa.payment.sectionTitle} className="mt-6 space-y-4 scroll-mt-4">
      {methods.map((id) => {
        const { Component } = paymentRegistry[id];
        return (
          <div key={id}>
            <Component total={total} lines={lines} />
          </div>
        );
      })}
    </section>
  );
}
