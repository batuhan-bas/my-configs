const baseConfig = require("./base");
const angularPlugin = require("@angular-eslint/eslint-plugin");
const angularTemplatePlugin = require("@angular-eslint/eslint-plugin-template");
const angularTemplateParser = require("@angular-eslint/template-parser");

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...baseConfig,

  // ================================================================
  // TYPESCRIPT DOSYALARI — Component, Service, Directive, Pipe vb.
  // ================================================================
  {
    files: ["**/*.ts"],
    plugins: {
      "@angular-eslint": angularPlugin,
    },
    rules: {

      // ================================================================
      // NAMING — İsimlendirme kuralları
      // ================================================================

      // @Component class'ları "Component" suffix'i ile bitmeli: AppComponent, UserListComponent
      "@angular-eslint/component-class-suffix": "error",

      // @Directive class'ları "Directive" suffix'i ile bitmeli: HighlightDirective
      "@angular-eslint/directive-class-suffix": "error",

      // Component selector kuralları: element tipinde, app- prefix'i ile, kebab-case
      "@angular-eslint/component-selector": ["warn", {
        type: "element",
        prefix: "app",
        style: "kebab-case",
      }],

      // Directive selector kuralları: attribute tipinde, app prefix'i ile, camelCase
      "@angular-eslint/directive-selector": ["warn", {
        type: "attribute",
        prefix: "app",
        style: "camelCase",
      }],

      // Pipe prefix kuralı — proje genelinde tutarlı pipe isimleri
      "@angular-eslint/pipe-prefix": ["warn", { prefixes: ["app"] }],


      // ================================================================
      // LIFECYCLE — Yaşam döngüsü kuralları
      // ================================================================

      // Boş lifecycle method yasaklar: ngOnInit() {} — ya doldur ya kaldır
      "@angular-eslint/no-empty-lifecycle-method": "warn",

      // Lifecycle interface'i implement etmeyi zorlar: implements OnInit, implements OnDestroy
      "@angular-eslint/use-lifecycle-interface": "error",

      // Lifecycle method'ları doğru context'te kullanılmalı (Component'te OnInit, Pipe'ta değil)
      "@angular-eslint/contextual-lifecycle": "error",

      // Lifecycle method'ları async olmamalı — RxJS veya Promise kullan
      "@angular-eslint/no-async-lifecycle-method": "warn",

      // Lifecycle method'ları prototype üzerinde tanımlanmalı — arrow function olmasın
      "@angular-eslint/require-lifecycle-on-prototype": "warn",

      // Lifecycle method'ları çalışma sırasına göre sıralanmalı: OnInit → OnChanges → OnDestroy
      "@angular-eslint/sort-lifecycle-methods": "warn",

      // Lifecycle method'ları doğrudan çağrılmamalı: this.ngOnInit() yasak
      "@angular-eslint/no-lifecycle-call": "error",


      // ================================================================
      // INPUT/OUTPUT — Veri akışı kuralları
      // ================================================================

      // @Input() alias kullanımını yasaklar: @Input('alias') yerine @Input() doğrudan isim kullan
      "@angular-eslint/no-input-rename": "warn",

      // @Output() alias kullanımını yasaklar — tutarlılık
      "@angular-eslint/no-output-rename": "warn",

      // @Output ismi "on" ile başlamamalı: @Output() onClick yerine @Output() click
      "@angular-eslint/no-output-on-prefix": "error",

      // @Output ismi native DOM event'i ile aynı olmamalı: click, change vb.
      "@angular-eslint/no-output-native": "warn",

      // Decorator yerine metadata property kullanımını yasaklar
      // inputs: ['foo'] yerine @Input() foo kullan
      "@angular-eslint/no-inputs-metadata-property": "error",

      // outputs: ['bar'] yerine @Output() bar kullan
      "@angular-eslint/no-outputs-metadata-property": "error",

      // Signal kullanmayı önerir — @Input, @ViewChild yerine signal-based API
      // Angular 17+ yeni pattern
      "@angular-eslint/prefer-signals": "warn",


      // ================================================================
      // MODERN ANGULAR — Yeni Angular patterns
      // ================================================================

      // Constructor injection yerine inject() fonksiyonunu tercih et
      // Angular 14+ — daha fonksiyonel ve tree-shakeable
      "@angular-eslint/prefer-inject": "warn",

      // Standalone component'ları tercih et — NgModule'den bağımsız
      // Angular 15+ modern pattern
      "@angular-eslint/prefer-standalone": "warn",

      // OutputEmitterRef tercih et — @Output() EventEmitter yerine
      // Angular 17+ yeni pattern
      "@angular-eslint/prefer-output-emitter-ref": "warn",

      // @Output ve OutputRef readonly olmalı — dışarıdan atama yapılmasın
      "@angular-eslint/prefer-output-readonly": "warn",

      // İki yönlü binding için model() signal kullan — @Input + @Output yerine
      // Angular 17.1+ pattern
      "@angular-eslint/prefer-signal-model": "warn",


      // ================================================================
      // GENEL KALİTE — İyi pratikler
      // ================================================================

      // Pipe'lar PipeTransform interface'ini implement etmeli
      "@angular-eslint/use-pipe-transform-interface": "error",

      // Impure pipe yasaklar — her change detection'da çalışır, performans sorunu
      "@angular-eslint/no-pipe-impure": "warn",

      // forwardRef kullanımını uyarır — genelde circular dependency işareti
      "@angular-eslint/no-forward-ref": "warn",

      // Component selector tanımlamayı zorlar — selector olmadan component kullanılamaz
      "@angular-eslint/use-component-selector": "warn",

      // ViewEncapsulation.None kullanımını uyarır — global CSS kirliliği riski
      "@angular-eslint/use-component-view-encapsulation": "warn",

      // providedIn ile Injectable tree-shakeable olur — providers array'de gereksiz
      "@angular-eslint/use-injectable-provided-in": "warn",

      // Metadata array'lerinde duplicate entry yasaklar
      "@angular-eslint/no-duplicates-in-metadata-arrays": "warn",

      // host metadata property kullan — @HostBinding ve @HostListener yerine
      "@angular-eslint/prefer-host-metadata-property": "warn",

      // Decorator'lar doğru context'te kullanılmalı (Component'te Input, Module'de değil)
      "@angular-eslint/contextual-decorator": "error",

      // Developer Preview API kullanımını uyarır — stabil değil, değişebilir
      "@angular-eslint/no-developer-preview": "warn",

      // Inline template/style satır sınırı — büyükse ayrı dosyaya taşı
      "@angular-eslint/component-max-inline-declarations": ["warn", {
        template: 10,
        styles: 8,
      }],

      // takeUntilDestroyed() explicit DestroyRef ile çağrılmalı
      "@angular-eslint/no-implicit-take-until-destroyed": "warn",

      // Signal'ları çağırmayı unutmayı yakalar: signal yerine signal() (değerine erişim)
      "@angular-eslint/no-uncalled-signals": "error",
    },
  },

  // ================================================================
  // HTML TEMPLATE DOSYALARI — Angular template kuralları
  // ================================================================
  {
    files: ["**/*.component.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
    },
    rules: {

      // ================================================================
      // ESSENTIAL — Temel template kuralları
      // ================================================================

      // [(banana)] hatası — [(ngModel)] doğru, ([ngModel]) yanlış (banana-in-box)
      "@angular-eslint/template/banana-in-box": "error",

      // Template'te == yerine === zorlar
      "@angular-eslint/template/eqeqeq": "error",

      // async pipe sonucunu negate etmeyi uyarır: !(obs$ | async) yerine (obs$ | async) === false
      "@angular-eslint/template/no-negated-async": "warn",

      // @if/@for/@switch control flow kullanımını zorlar — *ngIf/*ngFor yerine
      // Angular 17+ built-in control flow
      "@angular-eslint/template/prefer-control-flow": "warn",


      // ================================================================
      // KALİTE — Template best practices
      // ================================================================

      // Aynı attribute'u iki kez yazmayı yasaklar
      "@angular-eslint/template/no-duplicate-attributes": "error",

      // Template'te $any() kullanımını uyarır — type safety'yi bypass eder
      "@angular-eslint/template/no-any": "warn",

      // Template'te fonksiyon çağrısını uyarır — her change detection'da çalışır
      // Output handler'lar (click)="onClick()" hariç
      "@angular-eslint/template/no-call-expression": "warn",

      // ! non-null assertion'ı template'te yasaklar — güvenli kontrol kullan
      "@angular-eslint/template/no-non-null-assertion": "warn",

      // Inline style kullanımını uyarır — CSS dosyasına taşı
      "@angular-eslint/template/no-inline-styles": "warn",

      // Boş control flow bloklarını yasaklar: @if (cond) { } — ya doldur ya kaldır
      "@angular-eslint/template/no-empty-control-flow": "warn",

      // Control flow koşul karmaşıklığını sınırlar
      "@angular-eslint/template/conditional-complexity": ["warn", 4],

      // Angular built-in pipe'larını tercih et: date, uppercase, lowercase vb.
      "@angular-eslint/template/prefer-built-in-pipes": "warn",

      // İçeriksiz element'lerde self-closing tag kullan: <app-icon />
      "@angular-eslint/template/prefer-self-closing-tags": "warn",

      // @for ile @empty kullan — boş liste durumunu kapsa
      "@angular-eslint/template/prefer-at-empty": "warn",

      // Aynı koşulun negated hali yerine @else kullan
      "@angular-eslint/template/prefer-at-else": "warn",

      // ngSrc kullan (NgOptimizedImage) — lazy loading ve performans
      "@angular-eslint/template/prefer-ngsrc": "warn",

      // Attribute sıralama tutarlılığı
      "@angular-eslint/template/attributes-order": "warn",


      // ================================================================
      // ACCESSIBILITY (a11y) — Erişilebilirlik kuralları
      // Engelli kullanıcılar için kritik
      // ================================================================

      // img/area/input[type=image] elementlerinde alt text zorunlu
      "@angular-eslint/template/alt-text": "warn",

      // <button> elementinde type attribute zorunlu
      "@angular-eslint/template/button-has-type": "warn",

      // Click event'i olan elementte keyboard event de olmalı (keydown/keyup/keypress)
      "@angular-eslint/template/click-events-have-key-events": "warn",

      // Heading (h1-h6), anchor (a), button elementlerinde içerik olmalı — boş bırakma
      "@angular-eslint/template/elements-content": "warn",

      // Mouse event'i olan elementte keyboard event de olmalı
      "@angular-eslint/template/mouse-events-have-key-events": "warn",

      // İnteraktif elementler (button, a, input) focusable olmalı
      "@angular-eslint/template/interactive-supports-focus": "warn",

      // <label> ile form element'i ilişkilendirilmeli: for veya wrapping
      "@angular-eslint/template/label-has-associated-control": "warn",

      // tabindex pozitif olmamalı — tab sırasını bozar
      "@angular-eslint/template/no-positive-tabindex": "warn",

      // autofocus attribute kullanımını uyarır — kullanıcı deneyimini bozabilir
      "@angular-eslint/template/no-autofocus": "warn",

      // <marquee>, <blink> gibi dikkat dağıtıcı elementleri yasaklar
      "@angular-eslint/template/no-distracting-elements": "error",

      // ARIA role'ler gerekli aria-* attribute'lara sahip olmalı
      "@angular-eslint/template/role-has-required-aria": "warn",

      // ARIA attribute'larının geçerli olmasını zorlar
      "@angular-eslint/template/valid-aria": "warn",

      // scope attribute sadece <th> elementinde kullanılmalı
      "@angular-eslint/template/table-scope": "warn",
    },
  },
];

module.exports = config;
