const baseConfig = require("./base");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...baseConfig,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {

      // ================================================================
      // HOOKS — React Hooks rules
      // ================================================================

      // Hooks must only be called at the top level of function components or custom hooks
      // Calling hooks inside if/for/nested functions is forbidden
      "react-hooks/rules-of-hooks": "error",

      // Enforce complete dependency arrays for useEffect/useCallback/useMemo
      // Missing dependencies = stale closure bugs
      "react-hooks/exhaustive-deps": "warn",


      // ================================================================
      // JSX — JSX syntax rules
      // ================================================================

      // React 17+ — import React from 'react' is no longer required (JSX transform)
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Require key prop for every element in a list — critical for React reconciliation
      "react/jsx-key": "error",

      // Disallow duplicate props in JSX: <Foo bar={1} bar={2} />
      "react/jsx-no-duplicate-props": "error",

      // Catch undefined variables used in JSX
      "react/jsx-no-undef": "error",

      // target="_blank" security risk — disallow without rel="noreferrer"
      "react/jsx-no-target-blank": "error",

      // Catch comments accidentally rendered as text nodes
      // {/* correct */} vs /* incorrect */
      "react/jsx-no-comment-textnodes": "warn",

      // Component names must be PascalCase: <MyComponent /> correct, <myComponent /> incorrect
      "react/jsx-pascal-case": "warn",

      // Enforce self-closing for components without children: <Foo /> correct, <Foo></Foo> incorrect
      "react/self-closing-comp": "warn",

      // Catch unnecessary JSX fragments: <>{child}</> should just be {child}
      "react/jsx-no-useless-fragment": "warn",

      // Disallow unnecessary JSX expressions for strings: foo="bar" correct, foo={"bar"} incorrect
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],

      // Use shorthand for boolean props: <Foo disabled /> correct, <Foo disabled={true} /> unnecessary
      "react/jsx-boolean-value": ["warn", "never"],

      // Use JSX fragment shorthand: <></> instead of <React.Fragment></React.Fragment>
      "react/jsx-fragments": ["warn", "syntax"],

      // Warn against .bind() or arrow functions in JSX props — creates new reference every render
      "react/jsx-no-bind": ["warn", {
        allowArrowFunctions: true,    // arrow functions are generally acceptable
        allowBind: false,             // .bind() is forbidden
        allowFunctions: false,
      }],

      // Disallow javascript: URLs in JSX — XSS risk
      "react/jsx-no-script-url": "error",

      // Catch falsy render leaks like {0 && <Foo />} — 0 will be visible on screen
      "react/jsx-no-leaked-render": "warn",

      // Warn against creating new objects in context providers every render — unnecessary re-renders
      "react/jsx-no-constructed-context-values": "warn",


      // ================================================================
      // COMPONENT — Component authoring rules
      // ================================================================

      // We use TypeScript, prop-types is unnecessary
      "react/prop-types": "off",

      // Suggest displayName for components — useful for debugging in DevTools
      "react/display-name": "warn",

      // dangerouslySetInnerHTML and children cannot be used together
      "react/no-danger-with-children": "error",

      // Warn about deprecated React APIs (componentWillMount, etc.)
      "react/no-deprecated": "warn",

      // Disallow direct state mutation: use setState instead of this.state.foo = bar
      "react/no-direct-mutation-state": "error",

      // Disallow string refs: use useRef or createRef instead of ref="myRef"
      "react/no-string-refs": "error",

      // Disallow findDOMNode — use ref instead
      "react/no-find-dom-node": "warn",

      // Catch unescaped HTML characters: use &gt; or {'>'} instead of >
      "react/no-unescaped-entities": "warn",

      // Catch unknown DOM properties: use className instead of class, htmlFor instead of for
      "react/no-unknown-property": "error",

      // Disallow defining components inside render() or function component body
      // A new component on every render = state loss
      "react/no-unstable-nested-components": "warn",

      // Warn against using array index as key — causes bugs when order changes
      "react/no-array-index-key": "warn",

      // Warn about dangerouslySetInnerHTML usage — XSS risk
      "react/no-danger": "warn",

      // Enforce consistent naming in hook state destructuring: const [foo, setFoo] = useState()
      "react/hook-use-state": "warn",

      // Require sandbox attribute on iframes — security
      "react/iframe-missing-sandbox": "warn",

      // Disallow passing children to void elements (br, hr, img)
      "react/void-dom-elements-no-children": "error",

      // style prop must be an object: style="color:red" wrong, style={{ color: 'red' }} correct
      "react/style-prop-object": "error",

      // Require ref parameter in components using forwardRef
      "react/forward-ref-uses-ref": "warn",

      // Enforce function component definition style — prefer arrow functions
      "react/function-component-definition": ["warn", {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      }],
    },
  },
];

module.exports = config;
