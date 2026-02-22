# @batuhan-bas/configs

Personal shared ESLint and Prettier configurations.
Supports React, Next.js, Vue, Nuxt, and Angular projects.

## Structure

```
my-configs/
├── eslint/
│   ├── base.js       ← TypeScript rules (shared across all frameworks)
│   ├── react.js      ← base + React/Next.js rules
│   ├── vue.js        ← base + Vue/Nuxt rules
│   └── angular.js    ← base + Angular rules
├── prettier.config.js ← Code formatting rules
└── package.json
```

## Installation

```bash
pnpm add -D github:batuhan-bas/my-configs
```

Add peer dependencies based on your framework:

| Framework | Additional Dependencies |
|-----------|------------------------|
| All (required) | `eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser` |
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
# Make changes in the config repo → push
git push

# Update in the consuming project
pnpm add -D github:batuhan-bas/my-configs
```

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
