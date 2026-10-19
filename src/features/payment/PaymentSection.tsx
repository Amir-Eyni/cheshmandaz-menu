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
    <section aria-label={fa.payment.sectionTitle} className="mt-6 space-y-4">
      {methods.map((id, index) => {
        const { Component } = paymentRegistry[id];
        return (
          <div key={id}>
            {index > 0 && (
              <div
                className="mb-4 border-t border-dashed border-accent/60"
                aria-hidden="true"
              />
            )}
            <Component total={total} lines={lines} />
          </div>
        );
      })}
    </section>
  );
}
