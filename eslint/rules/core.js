// Core ESLint rules shared by JavaScript and TypeScript files.
// Applied on top of @eslint/js "recommended".

/** @type {import("eslint").Linter.RulesRecord} */
const coreRules = {
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
};

export default coreRules;
