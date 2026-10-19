# Agent rules for this repo

- Stack: Next.js App Router, TypeScript strict, Tailwind v4, zustand, Vitest. Static export (`output: "export"`).
- NEVER hardcode cafe name, prices, colors, card number, gateway url or UI strings in components. Use `src/config/*` and `src/content/fa.ts`.
- NEVER use raw hex colors in components. Use theme tokens (Tailwind classes backed by CSS variables).
- Money is an integer in toman. Format only through `src/lib/money.ts`.
- Business logic (totals, formatting) is pure and lives in `selectors.ts` / `lib/`, with unit tests.
- Features live in `src/features/<name>`. Features must not import from each other's internals; share via `types.ts` or props.
- `components/ui/*` are generic and must not import from `config/` or `features/`.
- New payment method = new provider file + `registry.ts` entry + id in `types.ts` + id in `config/payment.ts`.
- No API routes, no server actions, no localStorage (sessionStorage via the zustand store only). Anything needing a server must be discussed first because the app is a static export.
- Keep dependencies minimal. Do not add libraries without a clear reason.
- Before finishing any task run: lint, typecheck, test, build.
- UI language is Persian (RTL). Code, comments and commit messages are English.
