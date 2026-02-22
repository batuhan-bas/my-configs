const baseConfig = require("./base");
const vuePlugin = require("eslint-plugin-vue");
const vueParser = require("vue-eslint-parser");
const tsparser = require("@typescript-eslint/parser");

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...baseConfig,
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsparser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {

      // ================================================================
      // ESSENTIAL — Hata önleme (Priority A)
      // Bu kurallar olmadan Vue uygulaması düzgün çalışmaz
      // ================================================================

      // Component ismi en az iki kelime olmalı: MyButton doğru, Button riskli (HTML tag çakışması)
      "vue/multi-word-component-names": "warn",

      // v-for veya scope içinde tanımlanan ama kullanılmayan değişkenleri yakalar
      "vue/no-unused-vars": "warn",

      // Kayıtlı ama template'te kullanılmayan component'leri yakalar
      "vue/no-unused-components": "warn",

      // Computed property içinde async kullanımını yasaklar — computed senkron olmalı
      "vue/no-async-in-computed-properties": "error",

      // data() içinde computed property'ye erişimi yasaklar — henüz hazır değil
      "vue/no-computed-properties-in-data": "error",

      // Aynı field adını birden fazla yerde tanımlamayı yasaklar (data, computed, methods)
      "vue/no-dupe-keys": "error",

      // v-if / v-else-if zincirinde aynı koşulun tekrarını yasaklar
      "vue/no-dupe-v-else-if": "error",

      // Aynı attribute'u iki kez yazmayı yasaklar
      "vue/no-duplicate-attributes": "error",

      // <script setup> içinde export kullanımını yasaklar
      "vue/no-export-in-script-setup": "error",

      // Props'ları doğrudan mutate etmeyi yasaklar — tek yönlü veri akışı
      "vue/no-mutating-props": "error",

      // ref() değerini doğrudan operatör ile kullanmayı yakalar — .value unutulmuş
      "vue/no-ref-as-operand": "error",

      // HTML tag isimleriyle çakışan component isimlerini yasaklar
      "vue/no-reserved-component-names": "error",

      // Ayrılmış anahtar kelimeleri prop/data/computed key olarak kullanmayı yasaklar
      "vue/no-reserved-keys": "error",

      // Computed property içinde yan etkiyi yasaklar — computed saf (pure) olmalı
      "vue/no-side-effects-in-computed-properties": "error",

      // <template> üzerinde key attribute yasaklar
      "vue/no-template-key": "error",

      // <textarea> içinde mustache {{ }} kullanımını yasaklar — v-model kullan
      "vue/no-textarea-mustache": "error",

      // Computed property'yi method gibi çağırmayı yasaklar: computed() yerine computed
      "vue/no-use-computed-property-like-method": "error",

      // Aynı element'te v-if ve v-for birlikte kullanımını yasaklar — v-for her zaman önce çalışır
      "vue/no-use-v-if-with-v-for": "error",

      // <component> tag'inde v-bind:is (veya :is) zorunlu
      "vue/require-component-is": "error",

      // render() fonksiyonunda return zorunlu
      "vue/require-render-return": "error",

      // v-for direktifinde :key zorunlu — Vue reconciliation için kritik
      "vue/require-v-for-key": "error",

      // Prop default değerlerinin geçerli olmasını zorlar (type ile uyumlu)
      "vue/require-valid-default-prop": "error",

      // Computed property'de return zorunlu
      "vue/return-in-computed-property": "error",

      // Emit validator'da return zorunlu
      "vue/return-in-emits-validator": "error",

      // v-on.exact modifierı ile kesin tuş eşleştirmesi önerir
      "vue/use-v-on-exact": "warn",

      // v-bind/v-if/v-for/v-model/v-on/v-slot direktiflerinin doğru syntax'ını zorlar
      "vue/valid-v-bind": "error",
      "vue/valid-v-if": "error",
      "vue/valid-v-else": "error",
      "vue/valid-v-else-if": "error",
      "vue/valid-v-for": "error",
      "vue/valid-v-html": "error",
      "vue/valid-v-model": "error",
      "vue/valid-v-on": "error",
      "vue/valid-v-once": "error",
      "vue/valid-v-show": "error",
      "vue/valid-v-slot": "error",
      "vue/valid-v-text": "error",
      "vue/valid-v-pre": "error",
      "vue/valid-v-cloak": "error",

      // defineEmits/defineProps/defineOptions macro'larının doğru kullanımını zorlar
      "vue/valid-define-emits": "error",
      "vue/valid-define-props": "error",
      "vue/valid-define-options": "error",

      // Template kök yapısının geçerli olmasını zorlar
      "vue/valid-template-root": "error",

      // nextTick() doğru kullanımını zorlar
      "vue/valid-next-tick": "error",


      // ================================================================
      // VUE 3 ESSENTIAL — Vue 3'e özgü zorunlu kurallar
      // Vue 2'den 3'e geçişte deprecated API kullanımını yakalar
      // ================================================================

      // data artık fonksiyon olmalı, obje değil: data() { return {} }
      "vue/no-deprecated-data-object-declaration": "error",

      // $delete ve $set artık Vue 3'te yok — Proxy reactivity bunu halleder
      "vue/no-deprecated-delete-set": "error",

      // destroyed/beforeDestroy yerine unmounted/beforeUnmount kullan
      "vue/no-deprecated-destroyed-lifecycle": "error",

      // $listeners Vue 3'te kaldırıldı — attrs'a dahil edildi
      "vue/no-deprecated-dollar-listeners-api": "error",

      // $scopedSlots yerine $slots kullan
      "vue/no-deprecated-dollar-scopedslots-api": "error",

      // $on/$off/$once (events API) Vue 3'te kaldırıldı — mitt veya emitter kullan
      "vue/no-deprecated-events-api": "error",

      // Filters ({{ msg | capitalize }}) Vue 3'te kaldırıldı — computed veya method kullan
      "vue/no-deprecated-filter": "error",

      // <template functional> Vue 3'te kaldırıldı
      "vue/no-deprecated-functional-template": "error",

      // HTML element'lerde is attribute kullanımı değişti
      "vue/no-deprecated-html-element-is": "error",

      // .sync modifier yerine v-model:propName kullan
      "vue/no-deprecated-v-bind-sync": "error",

      // .native modifier Vue 3'te kaldırıldı — emits ile yönet
      "vue/no-deprecated-v-on-native-modifier": "error",

      // @vue/* yerine vue'dan import et: import { ref } from 'vue'
      "vue/prefer-import-from-vue": "error",

      // $slots artık fonksiyon olarak kullanılmalı: $slots.default()
      "vue/require-slots-as-functions": "error",

      // <transition> içinde v-show veya v-if zorunlu — yoksa animasyon çalışmaz
      "vue/require-toggle-inside-transition": "error",

      // await sonrasında lifecycle hook veya watch kaydetmeyi yasaklar — kaybolabilir
      "vue/no-lifecycle-after-await": "error",
      "vue/no-watch-after-await": "error",


      // ================================================================
      // STRONGLY RECOMMENDED — Okunabilirlik (Priority B)
      // ================================================================

      // Custom component prop'larında kebab-case zorunlu: <MyComp my-prop="x" />
      "vue/attribute-hyphenation": "warn",

      // Component tanım ismi PascalCase veya kebab-case olmalı
      "vue/component-definition-name-casing": ["warn", "PascalCase"],

      // Template'te scope'u gölgeleyen değişken isimlerini uyarır
      "vue/no-template-shadow": "warn",

      // Her component kendi dosyasında olmalı — birden fazla component aynı .vue'da yasak
      "vue/one-component-per-file": "warn",

      // Prop isimleri camelCase olmalı
      "vue/prop-name-casing": ["warn", "camelCase"],

      // Prop type tanımı zorunlu: props: { foo: String } doğru, props: ['foo'] yetersiz
      "vue/require-prop-types": "warn",

      // Emits seçeneğinde tüm emit edilen event'ler listelensin
      "vue/require-explicit-emits": "warn",

      // v-bind kısa yazımı: :foo doğru, v-bind:foo gereksiz uzun
      "vue/v-bind-style": ["warn", "shorthand"],

      // v-on kısa yazımı: @click doğru, v-on:click gereksiz uzun
      "vue/v-on-style": ["warn", "shorthand"],

      // v-slot kısa yazımı: #default doğru, v-slot:default gereksiz uzun
      "vue/v-slot-style": ["warn", "shorthand"],

      // Custom event isimleri kebab-case olmalı: @my-event doğru
      "vue/v-on-event-hyphenation": ["warn", "always"],


      // ================================================================
      // RECOMMENDED — İyi pratikler (Priority C)
      // ================================================================

      // Component attribute'larının sırasını zorlar (tutarlılık)
      "vue/attributes-order": "warn",

      // SFC blok sırası: <script> → <template> → <style>
      "vue/block-order": ["warn", { order: ["script", "template", "style"] }],

      // Tek child'ı olan gereksiz <template> tag'ini yakalar
      "vue/no-lone-template": "warn",

      // required: true olan prop'a default vererek çelişkiyi önler
      "vue/no-required-prop-with-default": "warn",

      // v-html kullanımını uyarır — XSS riski, innerHTML olarak render eder
      "vue/no-v-html": "warn",

      // Component option'larının sırasını zorlar (name, props, data, computed, methods vb.)
      "vue/order-in-components": "warn",

      // Template içinde this kullanımını yasaklar: {{ this.foo }} yerine {{ foo }}
      "vue/this-in-template": ["warn", "never"],


      // ================================================================
      // COMPOSITION API — Modern Vue 3 patterns
      // ================================================================

      // Sadece script-setup ve composition API'ye izin ver — options API yasak
      "vue/component-api-style": ["error", ["script-setup", "composition"]],

      // defineEmits type-based syntax: defineEmits<{ click: [e: MouseEvent] }>()
      "vue/define-emits-declaration": ["warn", "type-based"],

      // defineProps type-based syntax: defineProps<{ msg: string }>()
      "vue/define-props-declaration": ["warn", "type-based"],

      // Compiler macro'ların sırası: defineProps → defineEmits → defineSlots
      "vue/define-macros-order": ["warn", {
        order: ["defineProps", "defineEmits", "defineSlots"],
      }],

      // ref/reactive değerin reactivity kaybını yakalar (destructure ile)
      "vue/no-ref-object-reactivity-loss": "warn",

      // Props destructure sırasında reactivity kaybını yakalar
      "vue/no-setup-props-reactivity-loss": "warn",


      // ================================================================
      // TEMPLATE KALİTE — Ekstra template kuralları
      // ================================================================

      // Boş <template>, <script>, <style> bloklarını yasaklar
      "vue/no-empty-component-block": "warn",

      // Gereksiz mustache: {{ "hello" }} yerine düz "hello" yaz
      "vue/no-useless-mustaches": "warn",

      // Gereksiz v-bind: :foo="'bar'" yerine foo="bar" yaz
      "vue/no-useless-v-bind": "warn",

      // Component options'ta potansiyel typo yakalar: methos yerine methods
      "vue/no-potential-component-option-typo": "warn",

      // Template'te tanımsız component kullanımını yakalar
      "vue/no-undef-components": ["warn", {
        ignorePatterns: ["router-link", "router-view"],
      }],

      // Template'te tanımsız directive kullanımını yakalar
      "vue/no-undef-directives": "warn",

      // Kullanılmayan emit tanımlarını yakalar
      "vue/no-unused-emit-declarations": "warn",

      // Kullanılmayan ref'leri yakalar
      "vue/no-unused-refs": "warn",

      // <button> elemanında type attribute zorunlu: "button", "submit", veya "reset"
      "vue/html-button-has-type": "warn",

      // Self-closing: <MyComp /> doğru, <MyComp></MyComp> gereksiz
      "vue/html-self-closing": ["warn", {
        html: { void: "always", normal: "never", component: "always" },
      }],
    },
  },
];

module.exports = config;
