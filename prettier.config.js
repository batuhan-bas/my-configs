/** @type {import("prettier").Config} */
const config = {
  // Add semicolons at the end of statements: const x = 1;
  // If false: const x = 1
  semi: true,

  // Use double quotes: "hello"
  // If true, uses single quotes: 'hello'
  singleQuote: false,

  // Line width limit — lines exceeding this will be wrapped
  // 80: classic terminal width
  // 100: comfortable for modern screens
  // 120: for wide screens
  printWidth: 100,

  // Indentation width — 2 spaces is standard
  tabWidth: 2,

  // Tabs or spaces? false = use spaces
  useTabs: false,

  // Spaces inside curly braces in objects: { foo: bar } vs {foo: bar}
  // true: { foo: bar } — more readable
  bracketSpacing: true,

  // Add trailing comma after the last element
  // "all": everywhere (including function parameters)
  // "es5": only where valid in ES5 (arrays, objects)
  // "none": nowhere
  trailingComma: "all",

  // Always add parentheses around arrow function parameters: (x) => x
  // "always": (x) => x — consistent with TypeScript type annotations
  // "avoid": x => x — shorter but requires parentheses when adding types
  arrowParens: "always",

  // Use double quotes in JSX: <Foo bar="baz" />
  // false: double quotes (HTML convention)
  // true: single quotes
  jsxSingleQuote: false,

  // Where should the > character go in HTML/JSX/Vue templates
  // false: on the same line as the last attribute
  //   <button
  //     className="foo"
  //     onClick={bar}>
  //
  // true: on a new line
  //   <button
  //     className="foo"
  //     onClick={bar}
  //   >
  bracketSameLine: false,

  // End of line character
  // "lf": Unix/Mac (\n) — standard for Git and modern systems
  // "crlf": Windows (\r\n)
  // "auto": preserve the existing format of the file
  endOfLine: "lf",

  // Line wrapping behavior in Markdown
  // "preserve": leave as-is
  // "always": always wrap
  // "never": never wrap
  proseWrap: "preserve",

  // HTML whitespace sensitivity
  // "css": decide based on CSS display property (default)
  // "strict": all whitespace is significant
  // "ignore": ignore whitespace
  htmlWhitespaceSensitivity: "css",

  // Put each HTML attribute on its own line
  // false: Prettier decides (based on printWidth)
  // true: always one attribute per line
  singleAttributePerLine: false,
};

export default config;
