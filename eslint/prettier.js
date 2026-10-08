const eslintConfigPrettier = require("eslint-config-prettier");

// Turns off every ESLint rule that conflicts with Prettier formatting.
// Already included at the end of every preset — import it yourself only when you add
// other plugins after the preset, and put it last:
//   module.exports = [...sharedConfig, ...yourPlugins, ...require("@batuhan-bas/configs/eslint/prettier")];
//
// "Special" rules (curly, vue/html-self-closing, no-unexpected-multiline) are kept:
// they work with Prettier when configured with the right options, and the presets do that.
const rules = Object.fromEntries(
  Object.entries(eslintConfigPrettier.rules).filter(([, value]) => value !== 0),
);

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    name: "batuhan-bas/prettier",
    rules,
  },
];

module.exports = config;
