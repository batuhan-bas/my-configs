# @batuhan-bas/configs

## 1.0.0

### Major Changes

- First npm release.
- ESLint flat configs: `base` (JavaScript + TypeScript), `react`, `vue`, `angular`.
- Shared Prettier config.
- Type-aware TypeScript rules, also inside `.vue` files.
- Tooling config files (`*.config.ts`, …) are linted without type information; `disableTypeChecked(files)` helper for other files outside `tsconfig.json`.
- Every preset ends with `eslint-config-prettier` (also exported as `eslint/prettier`).
- `createAngularConfig({ prefix })` for custom Angular selector prefixes.
