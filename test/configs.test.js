const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { ESLint } = require("eslint");
const prettierCompat = require("eslint-config-prettier");

const fixturesDir = path.join(__dirname, "fixtures");
const eslintMajor = Number(ESLint.version.split(".")[0]);

const cases = [
  { name: "base", config: "../eslint/base", expectedRule: "@typescript-eslint/no-floating-promises" },
  {
    name: "react",
    config: "../eslint/react",
    expectedRule: "react/jsx-key",
    // eslint-plugin-react 7.x still calls context.getFilename(), removed in ESLint 10
    todo: eslintMajor >= 10 && "eslint-plugin-react does not support ESLint 10 yet",
  },
  { name: "vue", config: "../eslint/vue", expectedRule: "vue/require-v-for-key" },
  { name: "angular", config: "../eslint/angular", expectedRule: "@angular-eslint/component-selector" },
  { name: "angular", config: "../eslint/angular", expectedRule: "@angular-eslint/template/eqeqeq" },
];

const lintFixture = async (fixture, configPath) => {
  const eslint = new ESLint({
    cwd: path.join(fixturesDir, fixture),
    overrideConfigFile: true,
    overrideConfig: require(configPath),
  });
  return eslint.lintFiles(["src"]);
};

const fatalMessages = (results) =>
  results.flatMap((result) =>
    result.messages
      .filter((message) => message.fatal || message.ruleId === null)
      .map((message) => `${path.relative(fixturesDir, result.filePath)}: ${message.message}`),
  );

describe("eslint configs", () => {
  for (const { name, config, expectedRule, todo = false } of cases) {
    it(`${name}: loads, parses every fixture file and reports ${expectedRule}`, { todo }, async () => {
      const results = await lintFixture(name, config);

      assert.ok(results.length > 0, "no files were linted");
      assert.deepEqual(fatalMessages(results), []);

      const ruleIds = results.flatMap((result) => result.messages.map((message) => message.ruleId));
      assert.ok(ruleIds.includes(expectedRule), `expected ${expectedRule}, got: ${ruleIds.join(", ")}`);
    });
  }

  it("eslint.config.js re-exports the base config", () => {
    assert.equal(require("../eslint.config"), require("../eslint/base"));
  });
});

describe("prettier compatibility", () => {
  // eslint-config-prettier marks plain conflicting rules as "off" and
  // "special" rules (usable with care, e.g. curly: all) as 0.
  const conflictingRules = new Set(
    Object.entries(prettierCompat.rules)
      .filter(([, value]) => value === "off")
      .map(([rule]) => rule),
  );

  const isEnabled = (entry) => {
    const severity = Array.isArray(entry) ? entry[0] : entry;
    return severity !== "off" && severity !== 0;
  };

  for (const name of ["base", "react", "vue", "angular"]) {
    it(`${name}: enables no rule that conflicts with Prettier`, () => {
      const configs = require(`../eslint/${name}`);
      const conflicts = configs
        .flatMap((entry) => Object.entries(entry.rules ?? {}))
        .filter(([rule, value]) => conflictingRules.has(rule) && isEnabled(value))
        .map(([rule]) => rule);

      assert.deepEqual(conflicts, []);
    });
  }

  it("prettier config is valid", async () => {
    const prettier = require("prettier");
    const formatted = await prettier.format("const a = {b:1}", {
      ...require("../prettier.config"),
      parser: "typescript",
    });
    assert.equal(formatted, "const a = { b: 1 };\n");
  });
});
