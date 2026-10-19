const DEFAULT_SITE_URL = "http://localhost:3000";

export const site = {
  name: "چشم‌انداز",
  tagline: "GOOD VIBES • GREAT COFFEE",
  footerText: "Small Café, Big Moments",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
  theme: {
    bg: "#101e3c",
    card: "#142548",
    border: "#25396b",
    accent: "#fdc84a",
    text: "#ffffff",
    muted: "#a9b6d6",
    onAccent: "#101e3c",
  },
} as const;

/** True once NEXT_PUBLIC_SITE_URL points at the real (public) address. */
export const hasCustomSiteUrl = site.url !== DEFAULT_SITE_URL;
