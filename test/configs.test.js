import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { ESLint } from "eslint";
import prettier from "prettier";
import prettierCompat from "eslint-config-prettier";
import baseConfig from "../eslint/base.js";
import reactConfig from "../eslint/react.js";
import vueConfig from "../eslint/vue.js";
import angularConfig, { createAngularConfig } from "../eslint/angular.js";
import prettierEslintConfig from "../eslint/prettier.js";
import { disableTypeChecked } from "../eslint/utils.js";
import rootConfig from "../eslint.config.js";
import prettierConfig from "../prettier.config.js";

const fixturesDir = path.join(import.meta.dirname, "fixtures");

// [fixture file, rule that must be reported in it]
const cases = [
  {
    name: "base",
    config: baseConfig,
    expected: [
      ["src/index.ts", "@typescript-eslint/no-floating-promises"],
      ["src/legacy.js", "no-var"],
    ],
  },
  {
    name: "react",
    config: reactConfig,
    expected: [
      ["src/App.tsx", "@eslint-react/no-missing-key"],
      ["src/List.jsx", "@eslint-react/no-missing-key"],
      ["src/Counter.tsx", "react-hooks/rules-of-hooks"],
      ["src/Missing.jsx", "no-undef"],
    ],
  },
  {
    name: "vue",
    config: vueConfig,
    expected: [
      ["src/UserCard.vue", "vue/require-v-for-key"],
      ["src/SaveButton.vue", "@typescript-eslint/no-floating-promises"],
    ],
  },
  {
    name: "angular",
    config: angularConfig,
    expected: [
      ["src/user-card.component.ts", "@angular-eslint/component-selector"],
      ["src/user-card.component.html", "@angular-eslint/template/eqeqeq"],
      ["src/badge.component.ts", "@angular-eslint/template/eqeqeq"],
    ],
  },
];

const lintFixture = async (fixture, config) => {
  const eslint = new ESLint({
    cwd: path.join(fixturesDir, fixture),
    overrideConfigFile: true,
    overrideConfig: config,
  });
  const results = await eslint.lintFiles(["."]);
  return results.map((result) => ({
    file: path.relative(path.join(fixturesDir, fixture), result.filePath),
    messages: result.messages,
  }));
};

describe("eslint configs", () => {
  for (const { name, config, expected } of cases) {
    it(`${name}: loads, parses every fixture file and reports the expected rules`, async () => {
      const results = await lintFixture(name, config);

      const fatal = results.flatMap(({ file, messages }) =>
        messages.filter((m) => m.fatal || m.ruleId === null).map((m) => `${file}: ${m.message}`),
      );
      assert.deepEqual(fatal, []);

      for (const [file, rule] of expected) {
        const result = results.find((r) => r.file === file);
        assert.ok(result, `${file} was not linted`);
        const ruleIds = result.messages.map((m) => m.ruleId);
        assert.ok(ruleIds.includes(rule), `${file}: expected ${rule}, got: ${ruleIds.join(", ")}`);
      }
    });
  }

  it("base: ignores build output", async () => {
    const results = await lintFixture("base", baseConfig);
    assert.deepEqual(
      results.filter(({ file }) => file.startsWith("dist")),
      [],
    );
  });

  it("base: lints tooling config files outside tsconfig without type information", async () => {
    const results = await lintFixture("base", baseConfig);
    const viteConfig = results.find(({ file }) => file === "vite.config.ts");
    assert.ok(viteConfig, "vite.config.ts was not linted");
    assert.deepEqual(viteConfig.messages, []);
  });

  it("utils: disableTypeChecked lints files outside tsconfig without type information", async () => {
    const results = await lintFixture("tooling", [
      ...baseConfig,
      ...disableTypeChecked(["scripts/**"]),
    ]);
    const seed = results.find(({ file }) => file === path.join("scripts", "seed.ts"));
    assert.ok(seed, "scripts/seed.ts was not linted");
    assert.deepEqual(seed.messages, []);
  });

  it("angular: createAngularConfig applies a custom selector prefix", async () => {
    const results = await lintFixture("angular", createAngularConfig({ prefix: ["app", "user"] }));
    const selectorWarnings = results
      .flatMap(({ messages }) => messages)
      .filter((m) => m.ruleId === "@angular-eslint/component-selector");
    assert.deepEqual(selectorWarnings, []);
  });

  it("eslint.config.js re-exports the base config", () => {
    assert.equal(rootConfig, baseConfig);
  });
});

describe("prettier compatibility", () => {
  // eslint-config-prettier marks plain conflicting rules as "off" and
  // "special" rules (usable with the right options, e.g. curly: all) as 0.
  const conflictingRules = new Set(
    Object.entries(prettierCompat.rules)
      .filter(([, value]) => value === "off")
      .map(([rule]) => rule),
  );

  // Rules resolved by ESLint for one file: { ruleId: [severity, ...options] }
  const resolvedRules = async (fixture, config, file) => {
    const eslint = new ESLint({
      cwd: path.join(fixturesDir, fixture),
      overrideConfigFile: true,
      overrideConfig: config,
    });
    const { rules } = await eslint.calculateConfigForFile(file);
    return rules;
  };

  for (const { name, config, expected } of cases) {
    it(`${name}: no rule that conflicts with Prettier is enabled in the final config`, async () => {
      assert.equal(config.at(-1).name, "batuhan-bas/prettier", "Prettier block must be last");

      for (const [file] of expected) {
        const rules = await resolvedRules(name, config, file);
        const conflicts = Object.entries(rules)
          .filter(([rule, [severity]]) => conflictingRules.has(rule) && severity !== 0)
          .map(([rule]) => rule);
        assert.deepEqual(conflicts, [], file);
      }
    });
  }

  it("special rules use Prettier-compatible options", async () => {
    const baseRules = await resolvedRules("base", baseConfig, "src/index.ts");
    assert.deepEqual(baseRules.curly, [2, "all"]);

    const vueRules = await resolvedRules("vue", vueConfig, "src/UserCard.vue");
    assert.equal(vueRules["vue/html-self-closing"][1].html.void, "any");
  });

  it("eslint/prettier is exported and keeps special rules untouched", () => {
    const [prettierBlock] = prettierEslintConfig;
    assert.equal(prettierBlock.rules.curly, undefined);
    assert.equal(prettierBlock.rules["vue/html-self-closing"], undefined);
    assert.equal(prettierBlock.rules.indent, "off");
  });

  it("prettier config is valid", async () => {
    const formatted = await prettier.format("const a = {b:1}", {
      ...prettierConfig,
      parser: "typescript",
    });
    assert.equal(formatted, "const a = { b: 1 };\n");
  });
});
