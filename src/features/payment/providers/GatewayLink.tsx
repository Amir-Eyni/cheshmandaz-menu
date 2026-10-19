"use client";

import { payment } from "@/config/payment";
import { fa } from "@/content/fa";
import { copyText } from "@/lib/clipboard";
import { useToast } from "@/components/ui/ToastProvider";
import { Button } from "@/components/ui/Button";
import type { CartLine } from "@/features/cart/selectors";

export interface GatewayLinkProps {
  total: number;
  lines: CartLine[];
}

export function GatewayLink({ total }: GatewayLinkProps) {
  const toast = useToast();

  const handleClick = async () => {
    if (total <= 0) {
      return;
    }
    if (!payment.gatewayLink.url) {
      toast.show(fa.payment.gatewayMissing, "info");
      return;
    }
    if (payment.gatewayLink.copyAmountBeforeRedirect) {
      const copied = await copyText(String(total));
      toast.show(
        copied ? fa.toast.amountCopied : fa.toast.copyFailed,
        copied ? "success" : "error",
      );
    }
    window.open(payment.gatewayLink.url, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      disabled={total === 0}
      variant="primary"
      className="w-full"
    >
      {fa.payment.online}
    </Button>
  );
}
