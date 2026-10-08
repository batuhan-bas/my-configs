---
"@batuhan-bas/configs": major
---

ESLint 10 and ESM.

- **Breaking:** requires ESLint 10 and `@eslint/js` 10 (ESLint 9 is end-of-life).
- **Breaking:** requires Node.js `>=22.13`.
- **Breaking:** the package is ESM-only. Use `import` in `eslint.config.js`; from CommonJS, `require(...).default`.
- **Breaking (React):** `eslint-plugin-react` (no ESLint 10 support) is replaced by `@eslint-react/eslint-plugin`. Rule names in overrides change, e.g. `react/jsx-key` → `@eslint-react/no-missing-key`. Stylistic-only rules without an equivalent (`jsx-boolean-value`, `self-closing-comp`, `jsx-curly-brace-presence`, `jsx-fragments`, `jsx-pascal-case`, `function-component-definition`, `jsx-no-bind`, `no-unescaped-entities`) are dropped.
- React: new rules `@eslint-react/no-duplicate-key` and `@eslint-react/dom-no-missing-button-type`.
