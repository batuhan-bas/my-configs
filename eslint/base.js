const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
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

      // ================================================================
      // POSSIBLE PROBLEMS — Rules that catch potential bugs
      // ================================================================

      // Require return in array method callbacks (map/filter/reduce, etc.)
      "array-callback-return": "error",

      // Warn against await inside loops — prefer Promise.all()
      "no-await-in-loop": "warn",

      // Conditions that always evaluate to the same result: if (true), while (1)
      "no-constant-condition": "warn",

      // Disallow returning a value from a constructor
      "no-constructor-return": "error",

      // Catch debugger; statements — prevent them from being committed
      "no-debugger": "error",

      // Disallow importing the same module twice
      "no-duplicate-imports": "error",

      // Disallow returning from a Promise executor: new Promise((resolve) => { return value })
      "no-promise-executor-return": "error",

      // Catch self-comparisons like a === a
      "no-self-compare": "error",

      // Catch ${foo} in regular strings — backtick may have been forgotten
      "no-template-curly-in-string": "warn",

      // Catch unreachable code after return/throw/break
      "no-unreachable": "error",

      // Warn about assignments that could cause race conditions in async functions
      "require-atomic-updates": "warn",

      // Enforce isNaN() or Number.isNaN() for NaN comparisons
      "use-isnan": "error",

      // Enforce comparing typeof against valid strings ("string", "number", etc.)
      "valid-typeof": "error",


      // ================================================================
      // QUALITY — Best practices and readability
      // ================================================================

      // Keep arrow function bodies concise when possible: x => x*2, not { return x*2 }
      "arrow-body-style": ["warn", "as-needed"],

      // Enforce camelCase naming — except for object properties
      "camelcase": ["warn", { properties: "never" }],

      // Max number of branches (if/else/switch, etc.) per function: 10
      "complexity": ["warn", 10],

      // Require curly braces for if/else/for/while blocks — even for single statements
      "curly": ["error", "all"],

      // Require default case in switch — handle unexpected values
      "default-case": "warn",

      // Default case should be last in switch
      "default-case-last": "error",

      // Require === instead of == — prevents type coercion bugs
      "eqeqeq": ["error", "always"],

      // Max nesting depth of 4 — deeper is hard to read
      "max-depth": ["warn", 4],

      // Disallow alert(), confirm(), prompt() — use a UI framework instead
      "no-alert": "error",

      // Warn on console.log, etc. — prevent leaking into production
      "no-console": "warn",

      // Disallow unnecessary else after return — use early return pattern
      "no-else-return": "warn",

      // Disallow empty blocks like if (foo) {} — at least add a comment
      "no-empty": "warn",

      // Disallow eval() — security vulnerability and performance issue
      "no-eval": "error",

      // Disallow unnecessary .bind() on non-functions
      "no-extra-bind": "warn",

      // Use boolean directly instead of !!foo
      "no-extra-boolean-cast": "warn",

      // Disallow nested ternaries: a ? b ? c : d : e — unreadable
      "no-nested-ternary": "warn",

      // Warn against reassigning function parameters — risk of side effects
      "no-param-reassign": "warn",

      // Disallow var — use let/const instead
      "no-var": "error",

      // Use shorthand: { foo } instead of { foo: foo }
      "object-shorthand": "warn",

      // Prefer arrow functions in callbacks: .then(() => {}) instead of .then(function(){})
      "prefer-arrow-callback": "warn",

      // Require const for variables that are never reassigned
      "prefer-const": "error",

      // Encourage destructuring: const { a } = obj (optional for arrays)
      "prefer-destructuring": ["warn", { object: true, array: false }],

      // Prefer template literals: `Hello ${name}` instead of "Hello " + name
      "prefer-template": "warn",


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
      // Warn about unused variables — variables prefixed with _ are exempt
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

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
    },
  },
];

module.exports = config;
