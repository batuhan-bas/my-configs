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
      // ESSENTIAL — Error prevention (Priority A)
      // Without these rules, the Vue application won't work correctly
      // ================================================================

      // Component names must be at least two words: MyButton correct, Button risky (HTML tag conflict)
      "vue/multi-word-component-names": "warn",

      // Catch unused variables defined in v-for or scope
      "vue/no-unused-vars": "warn",

      // Catch registered but unused components in the template
      "vue/no-unused-components": "warn",

      // Disallow async usage inside computed properties — computed must be synchronous
      "vue/no-async-in-computed-properties": "error",

      // Disallow accessing computed properties inside data() — not ready yet
      "vue/no-computed-properties-in-data": "error",

      // Disallow defining the same field name in multiple places (data, computed, methods)
      "vue/no-dupe-keys": "error",

      // Disallow duplicate conditions in v-if / v-else-if chains
      "vue/no-dupe-v-else-if": "error",

      // Disallow duplicate attributes on the same element
      "vue/no-duplicate-attributes": "error",

      // Disallow export usage inside <script setup>
      "vue/no-export-in-script-setup": "error",

      // Disallow directly mutating props — one-way data flow
      "vue/no-mutating-props": "error",

      // Catch using ref() values directly with operators — .value may be forgotten
      "vue/no-ref-as-operand": "error",

      // Disallow component names that conflict with HTML tag names
      "vue/no-reserved-component-names": "error",

      // Disallow using reserved keywords as prop/data/computed keys
      "vue/no-reserved-keys": "error",

      // Disallow side effects in computed properties — computed must be pure
      "vue/no-side-effects-in-computed-properties": "error",

      // Disallow key attribute on <template>
      "vue/no-template-key": "error",

      // Disallow mustache {{ }} inside <textarea> — use v-model instead
      "vue/no-textarea-mustache": "error",

      // Disallow calling computed properties like methods: use computed, not computed()
      "vue/no-use-computed-property-like-method": "error",

      // Disallow v-if and v-for on the same element — v-for always runs first
      "vue/no-use-v-if-with-v-for": "error",

      // Require v-bind:is (or :is) on <component> tags
      "vue/require-component-is": "error",

      // Require return in render() function
      "vue/require-render-return": "error",

      // Require :key on v-for directives — critical for Vue reconciliation
      "vue/require-v-for-key": "error",

      // Enforce valid default values for props (compatible with type)
      "vue/require-valid-default-prop": "error",

      // Require return in computed properties
      "vue/return-in-computed-property": "error",

      // Require return in emit validators
      "vue/return-in-emits-validator": "error",

      // Suggest v-on.exact modifier for precise key matching
      "vue/use-v-on-exact": "warn",

      // Enforce correct syntax for v-bind/v-if/v-for/v-model/v-on/v-slot directives
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

      // Enforce correct usage of defineEmits/defineProps/defineOptions macros
      "vue/valid-define-emits": "error",
      "vue/valid-define-props": "error",
      "vue/valid-define-options": "error",

      // Enforce valid template root structure
      "vue/valid-template-root": "error",

      // Enforce correct usage of nextTick()
      "vue/valid-next-tick": "error",


      // ================================================================
      // VUE 3 ESSENTIAL — Vue 3-specific required rules
      // Catches deprecated API usage during Vue 2 to 3 migration
      // ================================================================

      // data must now be a function, not an object: data() { return {} }
      "vue/no-deprecated-data-object-declaration": "error",

      // $delete and $set are removed in Vue 3 — Proxy reactivity handles this
      "vue/no-deprecated-delete-set": "error",

      // Use unmounted/beforeUnmount instead of destroyed/beforeDestroy
      "vue/no-deprecated-destroyed-lifecycle": "error",

      // $listeners is removed in Vue 3 — merged into attrs
      "vue/no-deprecated-dollar-listeners-api": "error",

      // Use $slots instead of $scopedSlots
      "vue/no-deprecated-dollar-scopedslots-api": "error",

      // $on/$off/$once (events API) removed in Vue 3 — use mitt or an emitter library
      "vue/no-deprecated-events-api": "error",

      // Filters ({{ msg | capitalize }}) removed in Vue 3 — use computed or methods
      "vue/no-deprecated-filter": "error",

      // <template functional> removed in Vue 3
      "vue/no-deprecated-functional-template": "error",

      // is attribute usage on HTML elements has changed
      "vue/no-deprecated-html-element-is": "error",

      // Use v-model:propName instead of .sync modifier
      "vue/no-deprecated-v-bind-sync": "error",

      // .native modifier removed in Vue 3 — manage with emits
      "vue/no-deprecated-v-on-native-modifier": "error",

      // Import from vue instead of @vue/*: import { ref } from 'vue'
      "vue/prefer-import-from-vue": "error",

      // $slots must now be used as functions: $slots.default()
      "vue/require-slots-as-functions": "error",

      // Require v-show or v-if inside <transition> — otherwise animation won't work
      "vue/require-toggle-inside-transition": "error",

      // Disallow registering lifecycle hooks or watchers after await — they may be lost
      "vue/no-lifecycle-after-await": "error",
      "vue/no-watch-after-await": "error",


      // ================================================================
      // STRONGLY RECOMMENDED — Readability (Priority B)
      // ================================================================

      // Enforce kebab-case for custom component props: <MyComp my-prop="x" />
      "vue/attribute-hyphenation": "warn",

      // Component definition name must be PascalCase or kebab-case
      "vue/component-definition-name-casing": ["warn", "PascalCase"],

      // Warn about variable names in templates that shadow outer scope
      "vue/no-template-shadow": "warn",

      // Each component should be in its own file — no multiple components in the same .vue file
      "vue/one-component-per-file": "warn",

      // Prop names should be camelCase
      "vue/prop-name-casing": ["warn", "camelCase"],

      // Require prop type definitions: props: { foo: String } correct, props: ['foo'] insufficient
      "vue/require-prop-types": "warn",

      // All emitted events should be listed in the emits option
      "vue/require-explicit-emits": "warn",

      // Use v-bind shorthand: :foo correct, v-bind:foo unnecessarily verbose
      "vue/v-bind-style": ["warn", "shorthand"],

      // Use v-on shorthand: @click correct, v-on:click unnecessarily verbose
      "vue/v-on-style": ["warn", "shorthand"],

      // Use v-slot shorthand: #default correct, v-slot:default unnecessarily verbose
      "vue/v-slot-style": ["warn", "shorthand"],

      // Custom event names should be kebab-case: @my-event correct
      "vue/v-on-event-hyphenation": ["warn", "always"],


      // ================================================================
      // RECOMMENDED — Best practices (Priority C)
      // ================================================================

      // Enforce attribute ordering on components (consistency)
      "vue/attributes-order": "warn",

      // SFC block order: <script> → <template> → <style>
      "vue/block-order": ["warn", { order: ["script", "template", "style"] }],

      // Catch unnecessary <template> tags with a single child
      "vue/no-lone-template": "warn",

      // Prevent conflicting required: true with a default value on props
      "vue/no-required-prop-with-default": "warn",

      // Warn about v-html usage — XSS risk, renders as innerHTML
      "vue/no-v-html": "warn",

      // Enforce component options ordering (name, props, data, computed, methods, etc.)
      "vue/order-in-components": "warn",

      // Disallow this in templates: use {{ foo }} instead of {{ this.foo }}
      "vue/this-in-template": ["warn", "never"],


      // ================================================================
      // COMPOSITION API — Modern Vue 3 patterns
      // ================================================================

      // Only allow script-setup and composition API — options API is forbidden
      "vue/component-api-style": ["error", ["script-setup", "composition"]],

      // Use type-based syntax for defineEmits: defineEmits<{ click: [e: MouseEvent] }>()
      "vue/define-emits-declaration": ["warn", "type-based"],

      // Use type-based syntax for defineProps: defineProps<{ msg: string }>()
      "vue/define-props-declaration": ["warn", "type-based"],

      // Enforce compiler macro ordering: defineProps → defineEmits → defineSlots
      "vue/define-macros-order": ["warn", {
        order: ["defineProps", "defineEmits", "defineSlots"],
      }],

      // Catch reactivity loss when destructuring ref/reactive values
      "vue/no-ref-object-reactivity-loss": "warn",

      // Catch reactivity loss when destructuring props
      "vue/no-setup-props-reactivity-loss": "warn",


      // ================================================================
      // TEMPLATE QUALITY — Extra template rules
      // ================================================================

      // Disallow empty <template>, <script>, <style> blocks
      "vue/no-empty-component-block": "warn",

      // Catch unnecessary mustache: {{ "hello" }} should just be "hello"
      "vue/no-useless-mustaches": "warn",

      // Catch unnecessary v-bind: :foo="'bar'" should just be foo="bar"
      "vue/no-useless-v-bind": "warn",

      // Catch potential typos in component options: methos instead of methods
      "vue/no-potential-component-option-typo": "warn",

      // Catch undefined components used in templates
      "vue/no-undef-components": ["warn", {
        ignorePatterns: ["router-link", "router-view"],
      }],

      // Catch undefined directives used in templates
      "vue/no-undef-directives": "warn",

      // Catch unused emit declarations
      "vue/no-unused-emit-declarations": "warn",

      // Catch unused refs
      "vue/no-unused-refs": "warn",

      // Require type attribute on <button> elements: "button", "submit", or "reset"
      "vue/html-button-has-type": "warn",

      // Self-closing: <MyComp /> correct, <MyComp></MyComp> unnecessary
      "vue/html-self-closing": ["warn", {
        html: { void: "always", normal: "never", component: "always" },
      }],
    },
  },
];

module.exports = config;
