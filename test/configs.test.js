const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { ESLint } = require("eslint");
const prettierCompat = require("eslint-config-prettier");

const fixturesDir = path.join(__dirname, "fixtures");
const eslintMajor = Number(ESLint.version.split(".")[0]);

const reactTodo =
  // eslint-plugin-react 7.x still calls context.getFilename(), removed in ESLint 10
  eslintMajor >= 10 && "eslint-plugin-react does not support ESLint 10 yet";

// [fixture file, rule that must be reported in it]
const cases = [
  {
    name: "base",
    config: require("../eslint/base"),
    expected: [
      ["src/index.ts", "@typescript-eslint/no-floating-promises"],
      ["src/legacy.js", "no-var"],
    ],
  },
  {
    name: "react",
    config: require("../eslint/react"),
    todo: reactTodo,
    expected: [
      ["src/App.tsx", "react/jsx-key"],
      ["src/List.jsx", "react/jsx-key"],
    ],
  },
  {
    name: "vue",
    config: require("../eslint/vue"),
    expected: [
      ["src/UserCard.vue", "vue/require-v-for-key"],
      ["src/SaveButton.vue", "@typescript-eslint/no-floating-promises"],
    ],
  },
  {
    name: "angular",
    config: require("../eslint/angular"),
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
  for (const { name, config, expected, todo = false } of cases) {
    it(`${name}: loads, parses every fixture file and reports the expected rules`, { todo }, async () => {
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
    const results = await lintFixture("base", require("../eslint/base"));
    assert.deepEqual(
      results.filter(({ file }) => file.startsWith("dist")),
      [],
    );
  });

  it("base: lints tooling config files outside tsconfig without type information", async () => {
    const results = await lintFixture("base", require("../eslint/base"));
    const viteConfig = results.find(({ file }) => file === "vite.config.ts");
    assert.ok(viteConfig, "vite.config.ts was not linted");
    assert.deepEqual(viteConfig.messages, []);
  });

  it("utils: disableTypeChecked lints files outside tsconfig without type information", async () => {
    const { disableTypeChecked } = require("../eslint/utils");
    const results = await lintFixture("tooling", [
      ...require("../eslint/base"),
      ...disableTypeChecked(["scripts/**"]),
    ]);
    const seed = results.find(({ file }) => file === path.join("scripts", "seed.ts"));
    assert.ok(seed, "scripts/seed.ts was not linted");
    assert.deepEqual(seed.messages, []);
  });

  it("angular: createAngularConfig applies a custom selector prefix", async () => {
    const { createAngularConfig } = require("../eslint/angular");
    const results = await lintFixture("angular", createAngularConfig({ prefix: ["app", "user"] }));
    const selectorWarnings = results
      .flatMap(({ messages }) => messages)
      .filter((m) => m.ruleId === "@angular-eslint/component-selector");
    assert.deepEqual(selectorWarnings, []);
  });

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
