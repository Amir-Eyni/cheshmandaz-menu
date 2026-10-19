export const payment = {
  methods: ["gatewayLink", "cardToCard"] as const, // order = display order
  gatewayLink: {
    url: "", // paste the gateway link here; empty = show "not configured" toast
    copyAmountBeforeRedirect: true,
  },
  cardToCard: {
    cardNumber: "6219861804332251",
  },
};
