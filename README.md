# @batuhan-bas/configs

Personal shared ESLint and Prettier configurations.
Supports React, Next.js, Vue, Nuxt, and Angular projects.

## Structure

```
my-configs/
├── eslint/
│   ├── rules/
│   │   ├── core.js       ← core ESLint rules (JS + TS)
│   │   └── typescript.js ← @typescript-eslint rules
│   ├── base.js       ← ignores + JavaScript + TypeScript configs (shared across all frameworks)
│   ├── react.js      ← base + React/Next.js rules
│   ├── vue.js        ← base + Vue/Nuxt rules
│   └── angular.js    ← base + Angular rules
├── prettier.config.js ← Code formatting rules
└── package.json
```

## Installation

```bash
pnpm add -D @batuhan-bas/configs
# or
npm install -D @batuhan-bas/configs
```

Add peer dependencies based on your framework:

| Framework | Additional Dependencies |
|-----------|------------------------|
| All (required) | `eslint @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser` |
| Prettier config | `prettier` |
| React / Next.js | `eslint-plugin-react eslint-plugin-react-hooks` |
| Vue / Nuxt | `eslint-plugin-vue vue-eslint-parser` |
| Angular | `@angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser` |

## Usage

### React / Next.js

`eslint.config.js`:

```js
const sharedConfig = require("@batuhan-bas/configs/eslint/react");

module.exports = [
  ...sharedConfig,
  {
    rules: {
      // project-specific overrides
    },
  },
];
```

### Vue / Nuxt

`eslint.config.js`:

```js
const sharedConfig = require("@batuhan-bas/configs/eslint/vue");

module.exports = [
  ...sharedConfig,
  {
    rules: {
      // project-specific overrides
    },
  },
];
```

### Angular

`eslint.config.js`:

```js
const sharedConfig = require("@batuhan-bas/configs/eslint/angular");

module.exports = [
  ...sharedConfig,
  {
    rules: {
      // project-specific overrides
    },
  },
];
```

To use a selector prefix other than `app`:

```js
const { createAngularConfig } = require("@batuhan-bas/configs/eslint/angular");

module.exports = [
  ...createAngularConfig({ prefix: ["acme", "ui"] }),
];
```

Inline templates (``template: `...` ``) are linted with the same template rules as `.html` files.

### TypeScript Only (no framework)

```js
const sharedConfig = require("@batuhan-bas/configs/eslint/base");

module.exports = [...sharedConfig];
```

### Prettier (same for all projects)

`prettier.config.js`:

```js
module.exports = require("@batuhan-bas/configs/prettier");
```

## What Gets Linted

| Files | Rules |
|-------|-------|
| `*.js`, `*.mjs`, `*.cjs`, `*.jsx` | `@eslint/js` recommended + core rules, browser and Node globals |
| `*.ts`, `*.tsx`, `*.mts`, `*.cts` | above + TypeScript rules (type-aware, uses your `tsconfig.json`) |
| `*.vue` | TypeScript rules for `<script>` + Vue rules (`.vue` files must be in `tsconfig.json`) |
| `*.html` (Angular preset) | Angular template rules |

Build output is ignored by default: `dist`, `build`, `out`, `coverage`, `.next`, `.nuxt`,
`.output`, `.angular`, `.vercel`, `*.min.js`.

TypeScript files that are not part of a `tsconfig.json` (e.g. `vite.config.ts` in some setups) need
to be added to a tsconfig, or excluded with type-checked rules disabled:

```js
const tseslint = require("@typescript-eslint/eslint-plugin");

module.exports = [
  ...sharedConfig,
  {
    files: ["*.config.ts"],
    languageOptions: { parserOptions: { projectService: false } },
    rules: tseslint.configs["disable-type-checked"].rules,
  },
];
```

## Rule Summary

### ESLint Base (every project)

- Possible Problems: `no-debugger`, `no-duplicate-imports`, `eqeqeq`, `use-isnan`, etc.
- Quality: `no-console`, `no-eval`, `prefer-const`, `prefer-template`, `curly`, etc.
- TypeScript: `no-explicit-any`, `consistent-type-imports`, `no-floating-promises`, `await-thenable`, etc.

### React / Next.js

- Hooks: `rules-of-hooks`, `exhaustive-deps`
- JSX: `jsx-key`, `jsx-no-leaked-render`, `jsx-no-target-blank`, `self-closing-comp`
- Component: `no-unstable-nested-components`, `no-array-index-key`, `no-danger`

### Vue / Nuxt

- Essential: `no-mutating-props`, `require-v-for-key`, `no-use-v-if-with-v-for`
- Vue 3: deprecated API detection, Composition API enforcement
- Template: `no-v-html`, `no-unused-components`, `no-undef-components`

### Angular

- Naming: `component-class-suffix`, `component-selector`, `directive-selector`
- Lifecycle: `use-lifecycle-interface`, `contextual-lifecycle`, `no-lifecycle-call`
- Modern: `prefer-inject`, `prefer-standalone`, `prefer-signals`
- Template: `banana-in-box`, `eqeqeq`, `prefer-control-flow`, a11y rules

### Prettier

- `semi: true` — semicolons
- `singleQuote: false` — double quotes
- `trailingComma: "all"` — trailing commas everywhere
- `printWidth: 100` — line width
- `arrowParens: "always"` — arrow function parentheses
- All options are documented in the file

## Updating

```bash
# Update in the consuming project
pnpm update @batuhan-bas/configs --latest
```

Requirements: Node.js `>=18.18`, ESLint `9` or `10` (flat config).

> The React preset needs ESLint 9 for now — `eslint-plugin-react` 7.x does not support ESLint 10 yet.

## Development

```bash
pnpm install
pnpm test
```

`pnpm test` lints the fixtures in `test/fixtures` with every preset. It fails when a config can't be
loaded (unknown rule, invalid options, parser error), when a preset stops reporting its expected
rule, or when a rule conflicts with Prettier.

## Project-Specific Overrides

You can override any rule on a per-project basis:

```js
const sharedConfig = require("@batuhan-bas/configs/eslint/react");

module.exports = [
  ...sharedConfig,
  {
    rules: {
      "no-console": "off",                    // allow console in this project
      "@typescript-eslint/no-explicit-any": "off", // allow any
    },
  },
];
```

## License

[MIT](LICENSE)
