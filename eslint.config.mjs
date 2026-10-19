import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "dist/",
      "build/",
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",
      ".env",
      ".env.local",
      "scripts/",
      "public/",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // Core correctness & safety
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-iterator": "error",
      "no-lone-blocks": "error",
      "no-loop-func": "error",
      "no-octal": "error",
      "no-octal-escape": "error",
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-void": "error",
      "no-with": "error",
      // Style
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true }],
      // Warnings (non-blocking for now via max-warnings 0, they still must not appear)
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": "warn",
    },
  },
  {
    files: ["**/*.config.{js,mjs,ts}", "vitest.config.ts", "next.config.ts", "eslint.config.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
