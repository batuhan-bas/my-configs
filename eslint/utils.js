import tseslint from "@typescript-eslint/eslint-plugin";

const disableTypeCheckedConfig = tseslint.configs["disable-type-checked"];

/**
 * Lints the given TypeScript files without type information.
 * Use it for files that are not part of any tsconfig.json (scripts, tooling, etc.) —
 * otherwise the parser fails with "was not found by the project service".
 *
 * @example
 * import { disableTypeChecked } from "@batuhan-bas/configs/eslint/utils";
 * export default [...sharedConfig, ...disableTypeChecked(["scripts/**"])];
 *
 * @param {string[]} files Glob patterns
 * @returns {import("eslint").Linter.Config[]}
 */
const disableTypeChecked = (files) => [
  {
    name: "batuhan-bas/disable-type-checked",
    files,
    languageOptions: {
      parserOptions: disableTypeCheckedConfig.parserOptions,
    },
    rules: disableTypeCheckedConfig.rules,
  },
];

export { disableTypeChecked };
