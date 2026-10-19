#!/usr/bin/env node
/**
 * Generates the menu QR code from NEXT_PUBLIC_SITE_URL.
 *
 *   pnpm qr
 *
 * Writes:
 *   public/qr/menu.svg   -> vector, best for printing on posters
 *   public/qr/menu.png   -> raster, for apps that cannot embed SVG
 *
 * The site URL is read from the process environment first, then from
 * `.env.local` and `.env` in the repository root. No extra dependency is
 * needed for that, so the file parser below stays dependency-free.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "qr");
const envFiles = [".env.local", ".env"];

/** Minimal .env reader: KEY=VALUE lines, `#` comments, optional quotes. */
async function readEnvFile(file) {
  const { readFile } = await import("node:fs/promises");
  let raw;
  try {
    raw = await readFile(path.join(root, file), "utf8");
  } catch {
    return {};
  }
  const values = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

async function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim();
  }
  for (const file of envFiles) {
    const values = await readEnvFile(file);
    if (values.NEXT_PUBLIC_SITE_URL) {
      return values.NEXT_PUBLIC_SITE_URL.trim();
    }
  }
  return "";
}

const siteUrl = await resolveSiteUrl();

if (!siteUrl) {
  console.error(
    "NEXT_PUBLIC_SITE_URL is not set.\n" +
      "Set it in .env.local (recommended) or pass it inline:\n" +
      "  NEXT_PUBLIC_SITE_URL=https://menu.example.com pnpm qr",
  );
  process.exit(1);
}

const target = siteUrl.replace(/\/+$/, "");

await mkdir(outDir, { recursive: true });

const svgPath = path.join(outDir, "menu.svg");
const pngPath = path.join(outDir, "menu.png");

const options = {
  errorCorrectionLevel: "M",
  margin: 2,
  color: { dark: "#101e3c", light: "#ffffff" },
};

await writeFile(svgPath, await QRCode.toString(target, { ...options, type: "svg" }));
await writeFile(
  pngPath,
  await QRCode.toBuffer(target, { ...options, type: "png", width: 1024 }),
);

console.log(`QR generated for ${target}`);
console.log(`  ${path.relative(root, svgPath)}`);
console.log(`  ${path.relative(root, pngPath)}`);
console.log("Print the SVG on the table poster. Do not change the URL afterwards:");
console.log("every printed QR pointing to an old URL is dead.");
