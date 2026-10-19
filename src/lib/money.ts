export const formatToman = (n: number) => `${n.toLocaleString("fa-IR")} تومان`;
export const formatThousandToman = (n: number) =>
  n % 1000 === 0 ? `${(n / 1000).toLocaleString("fa-IR")} هزار تومان` : formatToman(n);
export const tomanToRial = (n: number) => n * 10; // for gateways that need rial
