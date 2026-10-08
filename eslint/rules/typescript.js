// TypeScript rules shared by .ts/.tsx files and <script lang="ts"> blocks in .vue files.

import { unusedVarsOptions } from "./core.js";

/** @type {import("eslint").Linter.RulesRecord} */
const typescriptRules = {
  // ================================================================
  // TS EXTENSION RULES
  // Disable JS version, enable TS version.
  // These replace base rules that don't understand TypeScript syntax.
  // ================================================================

  // --- no-array-constructor ---
  "no-array-constructor": "off",
  // Use [] or Array.from() instead of new Array()
  "@typescript-eslint/no-array-constructor": "error",

  // --- dot-notation ---
  "dot-notation": "off",
  // Use obj.foo instead of obj["foo"]
  "@typescript-eslint/dot-notation": "error",

  // --- no-implied-eval ---
  "no-implied-eval": "off",
  // Disallow executing string as code: setTimeout("code string")
  "@typescript-eslint/no-implied-eval": "error",

  // --- no-shadow ---
  "no-shadow": "off",
  // Warn about variable declarations that shadow outer scope variables
  "@typescript-eslint/no-shadow": "warn",

  // --- no-unused-vars ---
  "no-unused-vars": "off",
  // Warn about unused variables — arguments and caught errors prefixed with _ are exempt
  "@typescript-eslint/no-unused-vars": ["warn", unusedVarsOptions],

  // --- no-use-before-define ---
  "no-use-before-define": "off",
  // Catch usage of variables/classes before they are defined (functions are exempt — hoisting)
  "@typescript-eslint/no-use-before-define": ["error", { functions: false }],

  // --- no-useless-constructor ---
  "no-useless-constructor": "off",
  // Disallow empty constructors or constructors that only call super()
  "@typescript-eslint/no-useless-constructor": "warn",

  // --- max-params ---
  "max-params": "off",
  // Max 4 function parameters — use an object for more
  "@typescript-eslint/max-params": ["warn", { max: 4 }],

  // --- require-await ---
  "require-await": "off",
  // Warn about async functions that contain no await — remove async if unnecessary
  "@typescript-eslint/require-await": "warn",


  // ================================================================
  // TYPESCRIPT — TypeScript-specific rules
  // Rules marked with ⚠ require type information (projectService: true)
  // ================================================================

  // Warn against the any type — use unknown or a specific type instead
  "@typescript-eslint/no-explicit-any": "warn",

  // Enforce type imports: import type { Foo }
  "@typescript-eslint/consistent-type-imports": "error",

  // Enforce type exports: export type { Foo }
  "@typescript-eslint/consistent-type-exports": "error",

  // T[] vs Array<T> consistency — prefer T[]
  "@typescript-eslint/array-type": ["warn", { default: "array" }],

  // ⚠ Disallow awaiting a non-Thenable value
  "@typescript-eslint/await-thenable": "error",

  // Use @ts-expect-error with a description instead of @ts-ignore
  "@typescript-eslint/ban-ts-comment": ["warn", {
    "ts-ignore": "allow-with-description",
    "ts-expect-error": "allow-with-description",
  }],

  // interface vs type consistency — prefer interface
  "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],

  // ⚠ Warn about usage of @deprecated APIs
  "@typescript-eslint/no-deprecated": "warn",

  // Disallow empty {} type — use unknown or object instead
  "@typescript-eslint/no-empty-object-type": "warn",

  // ⚠ Catch unhandled (floating) Promises — a silent source of bugs
  "@typescript-eslint/no-floating-promises": "error",

  // ⚠ Disallow for-in on arrays — use for-of or forEach instead
  "@typescript-eslint/no-for-in-array": "error",

  // ⚠ Catch incorrect Promise usage: if (promise) or promise && foo
  "@typescript-eslint/no-misused-promises": "error",

  // Warn against the ! non-null assertion operator — prefer safe checks
  "@typescript-eslint/no-non-null-assertion": "warn",

  // Enforce import instead of require()
  // Note: disable this rule per-project if the project uses CommonJS
  "@typescript-eslint/no-require-imports": "error",

  // ⚠ Warn about passing any-typed values as arguments
  "@typescript-eslint/no-unsafe-argument": "warn",

  // ⚠ Warn about assigning any-typed values
  "@typescript-eslint/no-unsafe-assignment": "warn",

  // ⚠ Warn about returning any-typed values
  "@typescript-eslint/no-unsafe-return": "warn",

  // Disallow throwing non-Error values: throw new Error() instead of throw "string"
  "@typescript-eslint/only-throw-error": "error",

  // ⚠ Prefer ?? (nullish coalescing) over ||
  // ?? only catches null/undefined, while || also catches 0 and ""
  "@typescript-eslint/prefer-nullish-coalescing": "warn",

  // Use optional chaining: a?.b instead of a && a.b
  "@typescript-eslint/prefer-optional-chain": "warn",

  // ⚠ Suggest readonly for private fields that are never modified
  "@typescript-eslint/prefer-readonly": "warn",

  // ⚠ Warn about switch statements that don't cover all union type cases
  "@typescript-eslint/switch-exhaustiveness-check": "warn",
};

export default typescriptRules;
