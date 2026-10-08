const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const coreRules = require("./rules/core");
const typescriptRules = require("./rules/typescript");
const { disableTypeChecked } = require("./utils");
const prettierConfig = require("./prettier");

// Core rules that TypeScript already checks (no-undef, no-dupe-keys, etc.) — turned off for TS
const typescriptOverrides = tseslint.configs["eslint-recommended"].overrides[0].rules;

/** @type {import("eslint").Linter.Config[]} */
const config = [
  // ================================================================
  // IGNORES — Build output and generated files
  // ================================================================
  {
    name: "batuhan-bas/base/ignores",
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/out/**",
      "**/coverage/**",
      "**/.next/**",
      "**/.nuxt/**",
      "**/.output/**",
      "**/.angular/**",
      "**/.vercel/**",
      "**/*.min.js",
    ],
  },

  // ================================================================
  // JAVASCRIPT FILES — Config files, scripts, plain JS sources
  // ================================================================
  {
    name: "batuhan-bas/base/javascript",
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...coreRules,
    },
  },
  {
    name: "batuhan-bas/base/commonjs",
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },

  // ================================================================
  // TYPESCRIPT FILES
  // ================================================================
  {
    name: "batuhan-bas/base/typescript",
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // Required for type-aware rules (no-floating-promises, await-thenable, etc.)
        // Automatically finds the project's tsconfig.json — standard for TypeScript projects
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptOverrides,
      ...coreRules,
      ...typescriptRules,
    },
  },

  // ================================================================
  // TOOLING CONFIG FILES — vite.config.ts, vitest.config.mts, etc.
  // These are often outside tsconfig.json, so lint them without type information
  // ================================================================
  ...disableTypeChecked(["**/*.config.{ts,mts,cts}"]),

  // Must stay last: turns off rules that conflict with Prettier
  ...prettierConfig,
];

module.exports = config;
