"use client";

import { useState } from "react";
import { payment } from "@/config/payment";
import { fa } from "@/content/fa";
import { copyText } from "@/lib/clipboard";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import type { CartLine } from "@/features/cart/selectors";

export interface CardToCardProps {
  total: number;
  lines: CartLine[];
}

export function CardToCard({ total }: CardToCardProps) {
  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const formattedCard = payment.cardToCard.cardNumber.replace(
    /(\d{4})(?=\d)/g,
    "$1 "
  );

  const copyCard = async () => {
    const copied = await copyText(payment.cardToCard.cardNumber);
    setToast({
      open: true,
      message: copied ? fa.toast.cardCopied : fa.toast.copyFailed,
    });
  };

  const copyAmount = async () => {
    const copied = await copyText(String(total));
    setToast({
      open: true,
      message: copied ? fa.toast.amountCopied : fa.toast.copyFailed,
    });
  };

  return (
    <>
      <div className="space-y-2">
        <p className="text-text text-sm">{fa.payment.cardToCard}</p>
        <div className="ltr text-left">
          <span
            dir="ltr"
            className="text-lg font-mono text-accent select-text"
            aria-label={payment.cardToCard.cardNumber}
          >
            {formattedCard}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={copyCard}
            disabled={total === 0}
            variant="ghost"
            size="sm"
          >
            {fa.payment.copyCard}
          </Button>
          <Button
            onClick={copyAmount}
            disabled={total === 0}
            variant="ghost"
            size="sm"
          >
            {fa.payment.copyAmount}
          </Button>
        </div>
      </div>
      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: "" })}
      />
    </>
  );
}
