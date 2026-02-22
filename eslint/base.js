const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // Type-aware kurallar için gerekli (no-floating-promises, await-thenable vb.)
        // Projenin tsconfig.json'ını otomatik bulur — TypeScript projelerinde standart
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {

      // ================================================================
      // OLASI PROBLEMLER — Bug'a doğrudan yol açabilecek kurallar
      // ================================================================

      // map/filter/reduce gibi array metodlarında return zorunlu
      "array-callback-return": "error",

      // for döngüsü içinde await kullanımını uyarır — Promise.all() tercih et
      "no-await-in-loop": "warn",

      // if (true), while (1) gibi her zaman aynı sonucu veren condition'lar
      "no-constant-condition": "warn",

      // constructor içinden değer return etmeyi yasaklar
      "no-constructor-return": "error",

      // debugger; satırlarını yakalar — commit'e kaçmasın
      "no-debugger": "error",

      // Aynı modülü iki kez import etmeyi yasaklar
      "no-duplicate-imports": "error",

      // new Promise((resolve) => { return value }) — executor'dan return yasaklar
      "no-promise-executor-return": "error",

      // a === a gibi kendisiyle karşılaştırmayı yakalar
      "no-self-compare": "error",

      // Normal string içinde ${foo} yazmayı yakalar — backtick unutulmuş olabilir
      "no-template-curly-in-string": "warn",

      // return/throw/break'ten sonraki ulaşılamaz kodu yakalar
      "no-unreachable": "error",

      // async fonksiyonlarda race condition'a yol açan atamaları yakalar
      "require-atomic-updates": "warn",

      // NaN karşılaştırmasında isNaN() veya Number.isNaN() kullanımını zorlar
      "use-isnan": "error",

      // typeof sonucunu geçerli bir string ile karşılaştırmayı zorlar ("string", "number" vb.)
      "valid-typeof": "error",


      // ================================================================
      // KALİTE — İyi pratikler ve okunabilirlik
      // ================================================================

      // Arrow function body gereksizse kısa tut: x => x*2, { return } değil
      "arrow-body-style": ["warn", "as-needed"],

      // camelCase isimlendirme zorunlu — obje property'leri hariç
      "camelcase": ["warn", { properties: "never" }],

      // Fonksiyon içindeki dal sayısı (if/else/switch vb.) max 10
      "complexity": ["warn", 10],

      // if/else/for/while bloklarında süslü parantez zorunlu — tek satır olsa bile
      "curly": ["error", "all"],

      // switch'te default case zorunlu — beklenmedik değerler kapsansın
      "default-case": "warn",

      // switch'te default en son olmalı
      "default-case-last": "error",

      // == yerine === zorunlu — type coercion hatalarını önler
      "eqeqeq": ["error", "always"],

      // İç içe blok derinliği max 4 — daha fazlası okunaksız
      "max-depth": ["warn", 4],

      // alert(), confirm(), prompt() yasaklar — UI framework kullan
      "no-alert": "error",

      // console.log vb. — production'a kaçmasın
      "no-console": "warn",

      // return'den sonraki gereksiz else yasaklar — erken return pattern
      "no-else-return": "warn",

      // if (foo) {} gibi boş blokları yasaklar — en azından yorum olsun
      "no-empty": "warn",

      // eval() yasaklar — güvenlik açığı ve performans sorunu
      "no-eval": "error",

      // Fonksiyon olmayan yerde .bind() kullanımını yasaklar
      "no-extra-bind": "warn",

      // !!foo yerine doğrudan boolean kullan
      "no-extra-boolean-cast": "warn",

      // İç içe ternary yasaklar: a ? b ? c : d : e — okunaksız
      "no-nested-ternary": "warn",

      // Fonksiyon parametresini yeniden atamayı uyarır — yan etki riski
      "no-param-reassign": "warn",

      // var kullanımını yasaklar — let/const kullan
      "no-var": "error",

      // { foo: foo } yerine { foo } shorthand kullan
      "object-shorthand": "warn",

      // callback'lerde arrow function tercih et: .then(function(){}) yerine .then(() => {})
      "prefer-arrow-callback": "warn",

      // Değeri değiştirilmeyen değişkende const zorunlu
      "prefer-const": "error",

      // const { a } = obj — destructuring kullanımını teşvik eder (array'de opsiyonel)
      "prefer-destructuring": ["warn", { object: true, array: false }],

      // "Hello " + name yerine `Hello ${name}` — template literal tercih et
      "prefer-template": "warn",


      // ================================================================
      // TS EXTENSION KURALLARI
      // JS versiyonunu kapat, TS versiyonunu aç.
      // TypeScript syntax'ını anlamayan base kuralların yerine geçer.
      // ================================================================

      // --- no-array-constructor ---
      "no-array-constructor": "off",
      // new Array() yerine [] veya Array.from() kullan
      "@typescript-eslint/no-array-constructor": "error",

      // --- dot-notation ---
      "dot-notation": "off",
      // obj["foo"] yerine obj.foo kullan
      "@typescript-eslint/dot-notation": "error",

      // --- no-implied-eval ---
      "no-implied-eval": "off",
      // setTimeout("code string") gibi string'i kod olarak çalıştırmayı yasaklar
      "@typescript-eslint/no-implied-eval": "error",

      // --- no-shadow ---
      "no-shadow": "off",
      // Dış scope'daki değişkeni gölgeleyen tanımları uyarır
      "@typescript-eslint/no-shadow": "warn",

      // --- no-unused-vars ---
      "no-unused-vars": "off",
      // Kullanılmayan değişkenleri uyarır — _ prefix ile başlayanlar muaf
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // --- no-use-before-define ---
      "no-use-before-define": "off",
      // Tanımlanmadan önce kullanılan değişken/class'ları yakalar (fonksiyonlar muaf — hoisting)
      "@typescript-eslint/no-use-before-define": ["error", { functions: false }],

      // --- no-useless-constructor ---
      "no-useless-constructor": "off",
      // Boş veya sadece super() çağıran gereksiz constructor'ı yasaklar
      "@typescript-eslint/no-useless-constructor": "warn",

      // --- max-params ---
      "max-params": "off",
      // Fonksiyon parametre sayısı max 4 — fazlası için object al
      "@typescript-eslint/max-params": ["warn", { max: 4 }],

      // --- require-await ---
      "require-await": "off",
      // await içermeyen async fonksiyonları uyarır — async gereksizse kaldır
      "@typescript-eslint/require-await": "warn",


      // ================================================================
      // TYPESCRIPT — Sadece TS'e özgü kurallar
      // ⚠ işaretli kurallar tip bilgisi gerektirir (projectService: true)
      // ================================================================

      // any tipini uyarır — unknown veya spesifik tip kullan
      "@typescript-eslint/no-explicit-any": "warn",

      // import type { Foo } şeklinde type import'larını zorlar
      "@typescript-eslint/consistent-type-imports": "error",

      // export type { Foo } şeklinde type export'larını zorlar
      "@typescript-eslint/consistent-type-exports": "error",

      // T[] vs Array<T> tutarlılığı — T[] tercih et
      "@typescript-eslint/array-type": ["warn", { default: "array" }],

      // ⚠ Thenable olmayan bir şeyi await yasaklar
      "@typescript-eslint/await-thenable": "error",

      // @ts-ignore yerine @ts-expect-error kullan ve açıklama yaz
      "@typescript-eslint/ban-ts-comment": ["warn", {
        "ts-ignore": "allow-with-description",
        "ts-expect-error": "allow-with-description",
      }],

      // interface vs type tutarlılığı — interface tercih et
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],

      // @deprecated işaretli API kullanımını uyarır
      // ⚠
      "@typescript-eslint/no-deprecated": "warn",

      // Boş {} tipini yasaklar — unknown veya object kullan
      "@typescript-eslint/no-empty-object-type": "warn",

      // ⚠ await edilmeyen (floating) Promise'ları yakalar — sessiz bug kaynağı
      "@typescript-eslint/no-floating-promises": "error",

      // ⚠ Array üzerinde for-in döngüsünü yasaklar — for-of veya forEach kullan
      "@typescript-eslint/no-for-in-array": "error",

      // ⚠ if (promise) veya promise && foo gibi yanlış Promise kullanımlarını yakalar
      "@typescript-eslint/no-misused-promises": "error",

      // ! non-null assertion operatörünü uyarır — güvenli kontrol tercih et
      "@typescript-eslint/no-non-null-assertion": "warn",

      // require() yerine import kullanımını zorlar
      // Not: eğer proje CommonJS ise bu kuralı projeye özgü olarak kapat
      "@typescript-eslint/no-require-imports": "error",

      // ⚠ any tipli değeri argument olarak geçmeyi uyarır
      "@typescript-eslint/no-unsafe-argument": "warn",

      // ⚠ any tipli değer atamayı uyarır
      "@typescript-eslint/no-unsafe-assignment": "warn",

      // ⚠ any tipli değer return etmeyi uyarır
      "@typescript-eslint/no-unsafe-return": "warn",

      // Error olmayan bir şeyi throw yasaklar: throw "string" yerine throw new Error()
      "@typescript-eslint/only-throw-error": "error",

      // ⚠ || yerine ?? (nullish coalescing) tercih et
      // ?? sadece null/undefined'ı yakalar, || ayrıca 0 ve "" de yakalar
      "@typescript-eslint/prefer-nullish-coalescing": "warn",

      // a && a.b yerine a?.b optional chaining kullan
      "@typescript-eslint/prefer-optional-chain": "warn",

      // ⚠ Hiç değiştirilmeyen private field'lara readonly önerir
      "@typescript-eslint/prefer-readonly": "warn",

      // ⚠ Union type'ta tüm case'leri kapsamayan switch'i uyarır
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
    },
  },
];

module.exports = config;
