/** @type {import("prettier").Config} */
const config = {
  // Satır sonuna noktalı virgül koy: const x = 1;
  // false yaparsan: const x = 1
  semi: true,

  // Çift tırnak kullan: "hello"
  // true yaparsan tek tırnak: 'hello'
  singleQuote: false,

  // Satır genişliği limiti — bu sınırı aşan satırlar kırılır
  // 80: klasik terminal genişliği
  // 100: modern ekranlar için rahat
  // 120: geniş ekranlarda
  printWidth: 100,

  // Girinti genişliği — 2 space standart
  tabWidth: 2,

  // Tab mı space mi? false = space kullan
  useTabs: false,

  // Objelerde süslü parantez içinde boşluk: { foo: bar } vs {foo: bar}
  // true: { foo: bar } — daha okunabilir
  bracketSpacing: true,

  // Son elemandan sonra virgül koy
  // "all": her yerde (function parametreleri dahil)
  // "es5": sadece ES5'te geçerli yerlerde (array, object)
  // "none": hiçbir yerde
  trailingComma: "all",

  // Arrow function tek parametre olsa bile parantez: (x) => x
  // "always": (x) => x — TypeScript type annotation için tutarlı
  // "avoid": x => x — daha kısa ama type eklenince parantez gerekir
  arrowParens: "always",

  // JSX'te çift tırnak kullan: <Foo bar="baz" />
  // false: çift tırnak (HTML convention)
  // true: tek tırnak
  jsxSingleQuote: false,

  // HTML/JSX/Vue template'te > karakteri nereye gelsin
  // false: son attribute ile aynı satırda
  //   <button
  //     className="foo"
  //     onClick={bar}>
  //
  // true: yeni satırda
  //   <button
  //     className="foo"
  //     onClick={bar}
  //   >
  bracketSameLine: false,

  // Satır sonu karakteri
  // "lf": Unix/Mac (\n) — Git ve modern sistemler için standart
  // "crlf": Windows (\r\n)
  // "auto": mevcut dosyanın formatını koru
  endOfLine: "lf",

  // Markdown'da satır kırma davranışı
  // "preserve": olduğu gibi bırak
  // "always": her zaman kır
  // "never": hiç kırma
  proseWrap: "preserve",

  // HTML whitespace hassasiyeti
  // "css": CSS display property'ye göre karar ver (varsayılan)
  // "strict": tüm whitespace'ler anlamlı
  // "ignore": whitespace'leri yoksay
  htmlWhitespaceSensitivity: "css",

  // Her HTML attribute'u kendi satırına koy
  // false: Prettier kendi kararını verir (printWidth'e göre)
  // true: her zaman tek satırda bir attribute
  singleAttributePerLine: false,
};

module.exports = config;
