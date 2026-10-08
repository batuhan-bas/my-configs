---
"@batuhan-bas/configs": patch
---

Unused variables are now handled the same way in JavaScript and TypeScript files.

- JavaScript: `no-unused-vars` is a warning (was an error from `@eslint/js` recommended), like `@typescript-eslint/no-unused-vars` in TypeScript.
- Arguments and caught errors prefixed with `_` are ignored in both: `(value, _event) => value`, `catch (_error) {}`. Previously JavaScript reported both as errors and TypeScript reported `catch (_error)`.
