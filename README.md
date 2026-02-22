# @batuhan-bas/configs

Kişisel paylaşımlı ESLint ve Prettier konfigürasyonları.
React, Next.js, Vue, Nuxt ve Angular projelerini destekler.

## Yapı

```
my-configs/
├── eslint/
│   ├── base.js       ← TypeScript kuralları (tüm framework'lerde ortak)
│   ├── react.js      ← base + React/Next.js kuralları
│   ├── vue.js        ← base + Vue/Nuxt kuralları
│   └── angular.js    ← base + Angular kuralları
├── prettier.config.js ← Kod format kuralları
└── package.json
```

## Kurulum

```bash
pnpm add -D github:batuhan-bas/my-configs
```

Kullandığın framework'e göre peer dependency'leri ekle:

| Framework | Ekstra bağımlılıklar |
|-----------|----------------------|
| Hepsi (zorunlu) | `eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser` |
| React / Next.js | `eslint-plugin-react eslint-plugin-react-hooks` |
| Vue / Nuxt | `eslint-plugin-vue vue-eslint-parser` |
| Angular | `@angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser` |

## Kullanım

### React / Next.js

`eslint.config.js`:

```js
const sharedConfig = require("@batuhan-bas/configs/eslint/react");

module.exports = [
  ...sharedConfig,
  {
    rules: {
      // proje-spesifik overrides
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
      // proje-spesifik overrides
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
      // proje-spesifik overrides
    },
  },
];
```

### Sadece TypeScript (framework yok)

```js
const sharedConfig = require("@batuhan-bas/configs/eslint/base");

module.exports = [...sharedConfig];
```

### Prettier (tüm projelerde aynı)

`prettier.config.js`:

```js
module.exports = require("@batuhan-bas/configs/prettier");
```

## Kural Özeti

### ESLint Base (her projede)

- Olası Problemler: `no-debugger`, `no-duplicate-imports`, `eqeqeq`, `use-isnan` vb.
- Kalite: `no-console`, `no-eval`, `prefer-const`, `prefer-template`, `curly` vb.
- TypeScript: `no-explicit-any`, `consistent-type-imports`, `no-floating-promises`, `await-thenable` vb.

### React / Next.js

- Hooks: `rules-of-hooks`, `exhaustive-deps`
- JSX: `jsx-key`, `jsx-no-leaked-render`, `jsx-no-target-blank`, `self-closing-comp`
- Component: `no-unstable-nested-components`, `no-array-index-key`, `no-danger`

### Vue / Nuxt

- Essential: `no-mutating-props`, `require-v-for-key`, `no-use-v-if-with-v-for`
- Vue 3: deprecated API tespiti, Composition API zorunluluğu
- Template: `no-v-html`, `no-unused-components`, `no-undef-components`

### Angular

- Naming: `component-class-suffix`, `component-selector`, `directive-selector`
- Lifecycle: `use-lifecycle-interface`, `contextual-lifecycle`, `no-lifecycle-call`
- Modern: `prefer-inject`, `prefer-standalone`, `prefer-signals`
- Template: `banana-in-box`, `eqeqeq`, `prefer-control-flow`, a11y kuralları

### Prettier

- `semi: true` — noktalı virgül
- `singleQuote: false` — çift tırnak
- `trailingComma: "all"` — son virgül her yerde
- `printWidth: 100` — satır genişliği
- `arrowParens: "always"` — arrow function parantez
- Tüm seçenekler dosyada açıklamalı

## Güncelleme

```bash
# Config repo'da değişiklik yap → push
git push

# Kullanan projede güncelle
pnpm add -D github:batuhan-bas/my-configs
```

## Proje-Spesifik Override

Herhangi bir kuralı projeye özel olarak değiştirebilirsin:

```js
const sharedConfig = require("@batuhan-bas/configs/eslint/react");

module.exports = [
  ...sharedConfig,
  {
    rules: {
      "no-console": "off",                    // bu projede console serbest
      "@typescript-eslint/no-explicit-any": "off", // any kullanılabilir
    },
  },
];
```
