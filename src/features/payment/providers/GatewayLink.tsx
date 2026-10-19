"use client";

import { useState } from "react";
import { payment } from "@/config/payment";
import { fa } from "@/content/fa";
import { copyText } from "@/lib/clipboard";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import type { CartLine } from "@/features/cart/selectors";

export interface GatewayLinkProps {
  total: number;
  lines: CartLine[];
}

export function GatewayLink({ total }: GatewayLinkProps) {
  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const handleClick = () => {
    if (total <= 0) {
      return;
    }
    if (!payment.gatewayLink.url) {
      setToast({ open: true, message: fa.payment.gatewayMissing });
      return;
    }
    if (payment.gatewayLink.copyAmountBeforeRedirect) {
      copyText(String(total));
      setToast({ open: true, message: fa.toast.amountCopied });
    }
    window.open(payment.gatewayLink.url, "_blank");
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={total === 0 || !payment.gatewayLink.url}
        variant="primary"
        className="w-full"
      >
        {fa.payment.online}
      </Button>
      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: "" })}
      />
    </>
  );
}
