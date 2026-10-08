import baseConfig from "./base.js";
import prettierConfig from "./prettier.js";
import reactPlugin from "@eslint-react/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...baseConfig,
  {
    name: "batuhan-bas/react",
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@eslint-react": reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      "react-x": {
        version: "detect",
      },
    },
    rules: {

      // ================================================================
      // HOOKS — React Hooks rules (official eslint-plugin-react-hooks)
      // ================================================================

      // Hooks must only be called at the top level of function components or custom hooks
      // Calling hooks inside if/for/nested functions is forbidden
      "react-hooks/rules-of-hooks": "error",

      // Enforce complete dependency arrays for useEffect/useCallback/useMemo
      // Missing dependencies = stale closure bugs
      "react-hooks/exhaustive-deps": "warn",


      // ================================================================
      // JSX — JSX rules
      // Duplicate props and undefined components are reported by TypeScript
      // ================================================================

      // Require key prop for every element in a list — critical for React reconciliation
      "@eslint-react/no-missing-key": "error",

      // Disallow duplicate keys among siblings: two items with key="a"
      "@eslint-react/no-duplicate-key": "error",

      // target="_blank" security risk — disallow without rel="noreferrer noopener"
      "@eslint-react/dom-no-unsafe-target-blank": "error",

      // Catch comments accidentally rendered as text nodes
      // {/* correct */} vs /* incorrect */
      "@eslint-react/jsx-no-comment-textnodes": "warn",

      // Catch unnecessary JSX fragments: <>{child}</> should just be {child}
      "@eslint-react/jsx-no-useless-fragment": "warn",

      // Disallow javascript: URLs in JSX — XSS risk
      "@eslint-react/dom-no-script-url": "error",

      // Catch falsy render leaks like {0 && <Foo />} — 0 will be visible on screen
      "@eslint-react/no-leaked-conditional-rendering": "warn",

      // Warn against creating new objects in context providers every render — unnecessary re-renders
      "@eslint-react/no-unstable-context-value": "warn",


      // ================================================================
      // COMPONENT — Component authoring rules
      // We use TypeScript, so prop-types rules are not needed
      // ================================================================

      // Suggest displayName for components — useful for debugging in DevTools
      "@eslint-react/no-missing-component-display-name": "warn",

      // dangerouslySetInnerHTML and children cannot be used together
      "@eslint-react/dom-no-dangerously-set-innerhtml-with-children": "error",

      // Disallow direct state mutation: use setState instead of this.state.foo = bar
      "@eslint-react/no-direct-mutation-state": "error",

      // Disallow findDOMNode — use ref instead
      "@eslint-react/dom-no-find-dom-node": "warn",

      // Catch unknown DOM properties: use className instead of class, htmlFor instead of for
      "@eslint-react/dom-no-unknown-property": "error",

      // Disallow defining components inside render() or function component body
      // A new component on every render = state loss
      "@eslint-react/no-nested-component-definitions": "warn",

      // Warn against using array index as key — causes bugs when order changes
      "@eslint-react/no-array-index-key": "warn",

      // Warn about dangerouslySetInnerHTML usage — XSS risk
      "@eslint-react/dom-no-dangerously-set-innerhtml": "warn",

      // Enforce consistent naming in hook state destructuring: const [foo, setFoo] = useState()
      "@eslint-react/use-state": "warn",

      // Require sandbox attribute on iframes — security
      "@eslint-react/dom-no-missing-iframe-sandbox": "warn",

      // Disallow passing children to void elements (br, hr, img)
      "@eslint-react/dom-no-void-elements-with-children": "error",

      // style prop must be an object: style="color:red" wrong, style={{ color: 'red' }} correct
      "@eslint-react/dom-no-string-style-prop": "error",

      // Require type attribute on <button>: "button", "submit", or "reset"
      "@eslint-react/dom-no-missing-button-type": "warn",


      // ================================================================
      // DEPRECATED APIs — Removed or deprecated in React 18/19
      // ================================================================

      // ReactDOM.render / hydrate → createRoot / hydrateRoot
      "@eslint-react/dom-no-render": "warn",
      "@eslint-react/dom-no-hydrate": "warn",
      "@eslint-react/dom-no-render-return-value": "error",

      // Legacy lifecycle methods (componentWillMount, etc.)
      "@eslint-react/no-component-will-mount": "warn",
      "@eslint-react/no-component-will-receive-props": "warn",
      "@eslint-react/no-component-will-update": "warn",
      "@eslint-react/no-unsafe-component-will-mount": "warn",
      "@eslint-react/no-unsafe-component-will-receive-props": "warn",
      "@eslint-react/no-unsafe-component-will-update": "warn",
    },
  },

  // Must stay last: turns off rules that conflict with Prettier
  ...prettierConfig,
];

export default config;
