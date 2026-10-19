export const fa = {
  cart: { title: "سبد شما", empty: "هنوز چیزی انتخاب نشده.", total: "جمع کل" },
  payment: {
    online: "پرداخت آنلاین",
    gatewayMissing: "لینک درگاه هنوز تنظیم نشده؛ کارت‌به‌کارت کنید.",
    cardToCard: "یا کارت‌به‌کارت کنید:",
    copyCard: "کپی شماره کارت",
    copyAmount: "کپی مبلغ",
  },
  toast: {
    amountCopied: "مبلغ کپی شد",
    cardCopied: "شماره کارت کپی شد",
    copyFailed: "کپی نشد، دستی کپی کنید",
  },
  aria: {
    add: (name: string) => `افزودن ${name}`,
    remove: (name: string) => `کم کردن ${name}`,
  },
};
