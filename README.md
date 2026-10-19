# Café QR Menu

A mobile-first, RTL, Persian web app for a small café. The customer scans a QR code on
the table, browses the menu, picks items, watches the total update, and pays online
(gateway link) or by card-to-card transfer.

The app is a **static export** — no server, no database, no API routes. It can be
hosted anywhere that serves files (cPanel, Netlify, Vercel, GitHub Pages, plain nginx).

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Copy `.env.example` to `.env.local` and set your public address before generating the QR:

```bash
NEXT_PUBLIC_SITE_URL=https://menu.example.com
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Development server with hot reload. |
| `pnpm build` | Production build → static site in `out/`. |
| `pnpm start` | Serves the production build (Next server; the deployable artefact is `out/`). |
| `pnpm lint` | ESLint, zero warnings allowed. |
| `pnpm typecheck` | `tsc --noEmit`. |
| `pnpm test` | Vitest unit tests (pure logic only). |
| `pnpm qr` | Regenerates the QR code from `NEXT_PUBLIC_SITE_URL`. |

Run `lint`, `typecheck`, `test` and `build` before pushing any change.

---

## How do I change X?

Everything below is a **one-file edit**. No component needs to be touched.

| I want to change | Edit only |
|---|---|
| Café name, taglines, footer text | `src/config/site.ts` |
| Colors | `site.theme` in `src/config/site.ts` |
| Add, remove or reprice an item | `src/config/menu.ts` |
| Mark an item as sold out | `available: false` in `src/config/menu.ts` |
| Add item photos | drop the file in `public/images/menu/`, set `image` in `src/config/menu.ts` |
| Gateway link | `payment.gatewayLink.url` in `src/config/payment.ts` |
| Card number | `payment.cardToCard.cardNumber` in `src/config/payment.ts` |
| Hide or reorder payment methods | `payment.methods` in `src/config/payment.ts` |
| Copy the amount before opening the gateway | `payment.gatewayLink.copyAmountBeforeRedirect` |
| Any button label, message or aria text | `src/content/fa.ts` |
| Site address used in the QR code | `NEXT_PUBLIC_SITE_URL` in `.env.local` |
| Add a new payment method | new file in `src/features/payment/providers/`, one entry in `src/features/payment/registry.ts`, the id in `src/features/payment/types.ts` and in `payment.methods` |

### About the theme colors

`src/config/site.ts` holds the real color values. `src/app/layout.tsx` writes them onto
`<html>` as CSS variables (`--bg`, `--card`, `--accent`, …) and `src/app/globals.css`
maps them to Tailwind utilities through `@theme inline`. So there is exactly one place
to change a color.

### About the menu

Item ids are stable keys — **never reuse an id** for a different product, and never
change the id of an existing item, or old carts (stored in the customer's browser
session) will point at the wrong product.

---

## Generating the QR code

```bash
pnpm qr
```

The script reads `NEXT_PUBLIC_SITE_URL` from the environment, then from `.env.local`,
then from `.env`, and writes:

- `public/qr/menu.svg` — vector, use this one on the printed poster
- `public/qr/menu.png` — raster fallback

Then run `pnpm build` so the QR is part of the deployed site.

> Pick the final domain **before** printing. Every QR code that points to an old
> address is dead, and the app cannot be updated on paper.

---

## Build & deploy

```bash
pnpm build
```

The deployable site is the **content of `out/`**. Upload it to the host root, or to a
subfolder:

```bash
NEXT_PUBLIC_BASE_PATH=/menu pnpm build
```

`trailingSlash` is enabled, so the host must serve `index.html` for directory paths
(this is the default on most static hosts).

---

## Project structure

```
src/
├─ app/          layout (font, theme, metadata), page, global CSS
├─ config/       site, menu, payment — the data single source of truth
├─ content/      fa.ts — every user-facing string
├─ features/
│  ├─ menu/      menu grid and cards
│  ├─ cart/      zustand store, pure selectors, cart panel, quantity stepper
│  └─ payment/   method registry and providers (gateway link, card to card)
├─ components/
│  ├─ layout/    header, footer
│  └─ ui/        button, pill, toast (generic, café-agnostic)
└─ lib/          money formatting, clipboard helper
```

Two rules keep the project maintainable:

1. **Nothing user-facing is hardcoded.** Strings live in `src/content/fa.ts`, data in
   `src/config/`, colors in `site.theme`.
2. **Business logic is pure and tested.** Totals and money formatting live in
   `src/features/cart/selectors.ts` and `src/lib/money.ts` and are covered by unit
   tests. Components stay thin.

---

## Known limitations

- **No payment verification.** The page cannot know whether the customer actually paid;
  the seller confirms manually (bank SMS or receipt).
- **The amount is not pre-filled in the gateway** unless the gateway supports an amount
  parameter. The app copies the amount to the clipboard instead.
- **The gateway link opens in a new tab.** The cart survives because it lives in
  `sessionStorage`, so the customer can come back with the browser Back button.
- **Clipboard access needs a secure context.** On a plain-HTTP host, copying fails and
  the app says so; the customer can then read the number manually.
