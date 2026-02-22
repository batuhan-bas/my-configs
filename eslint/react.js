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
      // HOOKS — React Hooks kuralları
      // ================================================================

      // Hook'lar sadece fonksiyon component'in veya custom hook'un en üst seviyesinde çağrılmalı
      // if/for/nested function içinde hook çağırmak yasak
      "react-hooks/rules-of-hooks": "error",

      // useEffect/useCallback/useMemo dependency array'inin eksiksiz olmasını zorlar
      // Eksik dependency = stale closure bug'ı
      "react-hooks/exhaustive-deps": "warn",


      // ================================================================
      // JSX — JSX yazım kuralları
      // ================================================================

      // React 17+ — artık import React from 'react' gerekmez (JSX transform)
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Listede her eleman için key prop'u zorunlu — React reconciliation için kritik
      "react/jsx-key": "error",

      // JSX'te aynı prop'u iki kez yazma yasaklar: <Foo bar={1} bar={2} />
      "react/jsx-no-duplicate-props": "error",

      // JSX'te tanımlanmamış değişken kullanımını yakalar
      "react/jsx-no-undef": "error",

      // target="_blank" güvenlik açığı — rel="noreferrer" olmadan kullanımı yasaklar
      "react/jsx-no-target-blank": "error",

      // Yorum yanlışlıkla text node olarak render edilmesini yakalar
      // {/* doğru */} vs /* yanlış */
      "react/jsx-no-comment-textnodes": "warn",

      // Component isimleri PascalCase olmalı: <MyComponent /> doğru, <myComponent /> yanlış
      "react/jsx-pascal-case": "warn",

      // Çocuğu olmayan component'lerde self-closing zorlar: <Foo /> doğru, <Foo></Foo> yanlış
      "react/self-closing-comp": "warn",

      // Gereksiz JSX fragment'ları yakalar: <>{child}</> yerine sadece {child}
      "react/jsx-no-useless-fragment": "warn",

      // String yeterliyken gereksiz JSX expression yasaklar: foo="bar" doğru, foo={"bar"} yanlış
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],

      // Boolean prop'larda kısa yazım: <Foo disabled /> doğru, <Foo disabled={true} /> gereksiz
      "react/jsx-boolean-value": ["warn", "never"],

      // JSX fragment kısa yazımı: <></> kullan, <React.Fragment></React.Fragment> değil
      "react/jsx-fragments": ["warn", "syntax"],

      // JSX prop'larında .bind() veya arrow function kullanımını uyarır — her render'da yeni referans
      "react/jsx-no-bind": ["warn", {
        allowArrowFunctions: true,    // arrow genelde kabul edilir
        allowBind: false,             // .bind() yasak
        allowFunctions: false,
      }],

      // javascript: URL'lerini JSX'te yasaklar — XSS riski
      "react/jsx-no-script-url": "error",

      // {0 && <Foo />} gibi falsy render leak'lerini yakalar — 0 ekranda görünür
      "react/jsx-no-leaked-render": "warn",

      // Context provider'da her render'da yeni obje oluşturmayı uyarır — gereksiz re-render
      "react/jsx-no-constructed-context-values": "warn",


      // ================================================================
      // COMPONENT — Component yazım kuralları
      // ================================================================

      // TypeScript kullanıyoruz, prop-types gereksiz
      "react/prop-types": "off",

      // Component'e displayName vermeyi önerir — DevTools'ta debug için faydalı
      "react/display-name": "warn",

      // dangerouslySetInnerHTML ile children aynı anda kullanılamaz
      "react/no-danger-with-children": "error",

      // Deprecated React API kullanımını uyarır (componentWillMount vb.)
      "react/no-deprecated": "warn",

      // State'i doğrudan mutate etmeyi yasaklar: this.state.foo = bar yerine setState kullan
      "react/no-direct-mutation-state": "error",

      // String ref yasaklar: ref="myRef" yerine useRef veya createRef kullan
      "react/no-string-refs": "error",

      // findDOMNode kullanımını yasaklar — ref kullan
      "react/no-find-dom-node": "warn",

      // HTML'de escape edilmemiş karakterleri yakalar: > yerine &gt; veya {'>'} kullan
      "react/no-unescaped-entities": "warn",

      // Bilinmeyen DOM property'lerini yakalar: class yerine className, for yerine htmlFor
      "react/no-unknown-property": "error",

      // render() veya function component body dışında component tanımlamayı yasaklar
      // Her render'da yeni component = state kaybı
      "react/no-unstable-nested-components": "warn",

      // Array index'ini key olarak kullanmayı uyarır — sıralama değişince bug
      "react/no-array-index-key": "warn",

      // dangerouslySetInnerHTML kullanımını uyarır — XSS riski
      "react/no-danger": "warn",

      // Hook state destructuring'inde tutarlı isimlendirme: const [foo, setFoo] = useState()
      "react/hook-use-state": "warn",

      // iframe'de sandbox attribute zorunlu — güvenlik
      "react/iframe-missing-sandbox": "warn",

      // void element'lere (br, hr, img) children geçmeyi yasaklar
      "react/void-dom-elements-no-children": "error",

      // style prop'u obje olmalı: style="color:red" yanlış, style={{ color: 'red' }} doğru
      "react/style-prop-object": "error",

      // forwardRef kullanan component'lerde ref parametresi zorunlu
      "react/forward-ref-uses-ref": "warn",

      // Component fonksiyon tanım stilini zorlar — arrow function tercih et
      "react/function-component-definition": ["warn", {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      }],
    },
  },
];

module.exports = config;
