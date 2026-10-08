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
│   ├── prettier.js   ← turns off rules that conflict with Prettier (last in every preset)
│   ├── utils.js      ← disableTypeChecked(files)
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

Requirements: Node.js `>=22.13`, ESLint `10` (flat config). The package is ESM-only.

Add peer dependencies based on your framework:

| Framework | Additional Dependencies |
|-----------|------------------------|
| All (required) | `eslint @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser` |
| Prettier config | `prettier` |
| React / Next.js | `@eslint-react/eslint-plugin eslint-plugin-react-hooks` |
| Vue / Nuxt | `eslint-plugin-vue vue-eslint-parser` |
| Angular | `@angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser` |

## Usage

### React / Next.js

`eslint.config.js`:

```js
import sharedConfig from "@batuhan-bas/configs/eslint/react";

export default [
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
import sharedConfig from "@batuhan-bas/configs/eslint/vue";

export default [
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
import sharedConfig from "@batuhan-bas/configs/eslint/angular";

export default [
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
import { createAngularConfig } from "@batuhan-bas/configs/eslint/angular";

export default [
  ...createAngularConfig({ prefix: ["acme", "ui"] }),
];
```

Inline templates (``template: `...` ``) are linted with the same template rules as `.html` files.

### TypeScript Only (no framework)

```js
import sharedConfig from "@batuhan-bas/configs/eslint/base";

export default [...sharedConfig];
```

### Prettier (same for all projects)

`prettier.config.js`:

```js
export { default } from "@batuhan-bas/configs/prettier";
```

ESLint and Prettier don't fight: every preset ends with
[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier), which turns off
all ESLint rules that conflict with Prettier. If you add other plugins **after** the preset
(e.g. `@stylistic`), put the Prettier block last again:

```js
import prettier from "@batuhan-bas/configs/eslint/prettier";

export default [
  ...sharedConfig,
  ...yourOtherPlugins,
  ...prettier,
];
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

Tooling config files (`*.config.ts`, `*.config.mts`, `*.config.cts` — e.g. `vite.config.ts`) are
linted **without type information**, because they are often not part of `tsconfig.json`.

Other TypeScript files outside your `tsconfig.json` (scripts, tooling) fail with
_"was not found by the project service"_. Add them to a tsconfig, or lint them without types:

```js
import sharedConfig from "@batuhan-bas/configs/eslint/react";
import { disableTypeChecked } from "@batuhan-bas/configs/eslint/utils";

export default [
  ...sharedConfig,
  ...disableTypeChecked(["scripts/**"]),
];
```

## Rule Summary

### ESLint Base (every project)

- Possible Problems: `no-debugger`, `no-duplicate-imports`, `eqeqeq`, `use-isnan`, etc.
- Quality: `no-console`, `no-eval`, `prefer-const`, `prefer-template`, `curly`, etc.
- TypeScript: `no-explicit-any`, `consistent-type-imports`, `no-floating-promises`, `await-thenable`, etc.

### React / Next.js

Uses [`@eslint-react`](https://eslint-react.xyz) and the official `eslint-plugin-react-hooks`.

- Hooks: `rules-of-hooks`, `exhaustive-deps`
- JSX: `no-missing-key`, `no-leaked-conditional-rendering`, `dom-no-unsafe-target-blank`
- Component: `no-nested-component-definitions`, `no-array-index-key`, `dom-no-dangerously-set-innerhtml`
- Deprecated APIs: `ReactDOM.render`, legacy lifecycle methods

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

### Migrating from 1.x to 2.0

1. Update Node.js to `>=22.13` and ESLint + `@eslint/js` to `10`.
2. Switch `eslint.config.js` to `import` / `export default` (examples above). In a CommonJS
   config file, `require()` still works but returns the module namespace — use `.default`:
   `require("@batuhan-bas/configs/eslint/react").default`.
3. React: replace `eslint-plugin-react` with `@eslint-react/eslint-plugin` and rename overrides —
   `react/jsx-key` → `@eslint-react/no-missing-key`, `react/no-danger` →
   `@eslint-react/dom-no-dangerously-set-innerhtml`, etc. See `eslint/react.js` for the full list.

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
import sharedConfig from "@batuhan-bas/configs/eslint/react";

export default [
  ...sharedConfig,
  {
    rules: {
      "no-console": "off",                    // allow console in this project
      "@typescript-eslint/no-explicit-any": "off", // allow any
    },
  },
];
```

## Releasing

Versions and `CHANGELOG.md` are managed with [Changesets](https://github.com/changesets/changesets).

1. Add a changeset to every PR that changes the published configs:

   ```bash
   pnpm changeset
   ```

   Use `patch` for fixes, `minor` for new rules that only warn or new options, `major` for new
   `error` rules or anything else that can break a consumer's lint run.

2. After merging to `main`, the Release workflow opens a "chore: version packages" PR.
3. Merging that PR runs the tests, publishes to npm with provenance, pushes the `vX.Y.Z` tag and
   creates the GitHub release.

The Release workflow ([`changesets/action`](https://github.com/changesets/action) v2) is split into
jobs with minimal permissions: `select-mode` → `version` (opens the PR) or `pack` (tests + tarball,
read-only) → `publish` (the only job allowed to publish to npm; runs no project scripts).

Repository setting required: **Settings → Actions → General → Allow GitHub Actions to create and
approve pull requests**.

Publishing uses [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) — no npm
token is stored in the repository. The trusted publisher is configured on npmjs.com under
**Package settings → Trusted Publisher**: GitHub Actions, repository `batuhan-bas/my-configs`,
workflow `release.yml`.

## License

[MIT](LICENSE)
