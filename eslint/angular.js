const baseConfig = require("./base");
const angularPlugin = require("@angular-eslint/eslint-plugin");
const angularTemplatePlugin = require("@angular-eslint/eslint-plugin-template");
const angularTemplateParser = require("@angular-eslint/template-parser");

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...baseConfig,

  // ================================================================
  // TYPESCRIPT FILES — Component, Service, Directive, Pipe, etc.
  // ================================================================
  {
    files: ["**/*.ts"],
    plugins: {
      "@angular-eslint": angularPlugin,
    },
    rules: {

      // ================================================================
      // NAMING — Naming conventions
      // ================================================================

      // @Component classes must end with "Component" suffix: AppComponent, UserListComponent
      "@angular-eslint/component-class-suffix": "error",

      // @Directive classes must end with "Directive" suffix: HighlightDirective
      "@angular-eslint/directive-class-suffix": "error",

      // Component selector rules: element type, app- prefix, kebab-case
      "@angular-eslint/component-selector": ["warn", {
        type: "element",
        prefix: "app",
        style: "kebab-case",
      }],

      // Directive selector rules: attribute type, app prefix, camelCase
      "@angular-eslint/directive-selector": ["warn", {
        type: "attribute",
        prefix: "app",
        style: "camelCase",
      }],

      // Pipe prefix rule — consistent pipe names across the project
      "@angular-eslint/pipe-prefix": ["warn", { prefixes: ["app"] }],


      // ================================================================
      // LIFECYCLE — Lifecycle hook rules
      // ================================================================

      // Disallow empty lifecycle methods: ngOnInit() {} — either fill it or remove it
      "@angular-eslint/no-empty-lifecycle-method": "warn",

      // Enforce implementing lifecycle interfaces: implements OnInit, implements OnDestroy
      "@angular-eslint/use-lifecycle-interface": "error",

      // Lifecycle methods must be used in the correct context (OnInit in Component, not in Pipe)
      "@angular-eslint/contextual-lifecycle": "error",

      // Lifecycle methods should not be async — use RxJS or Promises instead
      "@angular-eslint/no-async-lifecycle-method": "warn",

      // Lifecycle methods must be defined on the prototype — no arrow functions
      "@angular-eslint/require-lifecycle-on-prototype": "warn",

      // Lifecycle methods should be ordered by execution sequence: OnInit → OnChanges → OnDestroy
      "@angular-eslint/sort-lifecycle-methods": "warn",

      // Disallow calling lifecycle methods directly: this.ngOnInit() is forbidden
      "@angular-eslint/no-lifecycle-call": "error",


      // ================================================================
      // INPUT/OUTPUT — Data flow rules
      // ================================================================

      // Disallow @Input() alias: use @Input() with the property name directly instead of @Input('alias')
      "@angular-eslint/no-input-rename": "warn",

      // Disallow @Output() alias — consistency
      "@angular-eslint/no-output-rename": "warn",

      // @Output name should not start with "on": @Output() click instead of @Output() onClick
      "@angular-eslint/no-output-on-prefix": "error",

      // @Output name should not conflict with native DOM events: click, change, etc.
      "@angular-eslint/no-output-native": "warn",

      // Disallow metadata property instead of decorators
      // Use @Input() foo instead of inputs: ['foo']
      "@angular-eslint/no-inputs-metadata-property": "error",

      // Use @Output() bar instead of outputs: ['bar']
      "@angular-eslint/no-outputs-metadata-property": "error",

      // Suggest using signals — signal-based API instead of @Input, @ViewChild
      // Angular 17+ new pattern
      "@angular-eslint/prefer-signals": "warn",


      // ================================================================
      // MODERN ANGULAR — New Angular patterns
      // ================================================================

      // Prefer inject() function over constructor injection
      // Angular 14+ — more functional and tree-shakeable
      "@angular-eslint/prefer-inject": "warn",

      // Prefer standalone components — independent of NgModule
      // Angular 15+ modern pattern
      "@angular-eslint/prefer-standalone": "warn",

      // Prefer OutputEmitterRef — instead of @Output() EventEmitter
      // Angular 17+ new pattern
      "@angular-eslint/prefer-output-emitter-ref": "warn",

      // @Output and OutputRef should be readonly — prevent external assignment
      "@angular-eslint/prefer-output-readonly": "warn",

      // Use model() signal for two-way binding — instead of @Input + @Output
      // Angular 17.1+ pattern
      "@angular-eslint/prefer-signal-model": "warn",


      // ================================================================
      // GENERAL QUALITY — Best practices
      // ================================================================

      // Pipes must implement PipeTransform interface
      "@angular-eslint/use-pipe-transform-interface": "error",

      // Disallow impure pipes — they run on every change detection, causing performance issues
      "@angular-eslint/no-pipe-impure": "warn",

      // Warn about forwardRef usage — usually a sign of circular dependency
      "@angular-eslint/no-forward-ref": "warn",

      // Enforce component selector definition — components can't be used without a selector
      "@angular-eslint/use-component-selector": "warn",

      // Warn about ViewEncapsulation.None — risk of global CSS pollution
      "@angular-eslint/use-component-view-encapsulation": "warn",

      // Injectable with providedIn is tree-shakeable — no need for providers array
      "@angular-eslint/use-injectable-provided-in": "warn",

      // Disallow duplicate entries in metadata arrays
      "@angular-eslint/no-duplicates-in-metadata-arrays": "warn",

      // Use host metadata property — instead of @HostBinding and @HostListener
      "@angular-eslint/prefer-host-metadata-property": "warn",

      // Decorators must be used in the correct context (Input in Component, not in Module)
      "@angular-eslint/contextual-decorator": "error",

      // Warn about Developer Preview API usage — not stable, may change
      "@angular-eslint/no-developer-preview": "warn",

      // Inline template/style line limits — move to separate files if too large
      "@angular-eslint/component-max-inline-declarations": ["warn", {
        template: 10,
        styles: 8,
      }],

      // takeUntilDestroyed() should be called with explicit DestroyRef
      "@angular-eslint/no-implicit-take-until-destroyed": "warn",

      // Catch forgotten signal invocations: use signal() instead of signal (to access value)
      "@angular-eslint/no-uncalled-signals": "error",
    },
  },

  // ================================================================
  // HTML TEMPLATE FILES — Angular template rules
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
      // ESSENTIAL — Core template rules
      // ================================================================

      // [(banana)] mistake — [(ngModel)] correct, ([ngModel]) incorrect (banana-in-box)
      "@angular-eslint/template/banana-in-box": "error",

      // Enforce === instead of == in templates
      "@angular-eslint/template/eqeqeq": "error",

      // Warn about negating async pipe results: use (obs$ | async) === false instead of !(obs$ | async)
      "@angular-eslint/template/no-negated-async": "warn",

      // Enforce @if/@for/@switch control flow — instead of *ngIf/*ngFor
      // Angular 17+ built-in control flow
      "@angular-eslint/template/prefer-control-flow": "warn",


      // ================================================================
      // QUALITY — Template best practices
      // ================================================================

      // Disallow duplicate attributes on the same element
      "@angular-eslint/template/no-duplicate-attributes": "error",

      // Warn about $any() usage in templates — bypasses type safety
      "@angular-eslint/template/no-any": "warn",

      // Warn about function calls in templates — runs on every change detection
      // Output handlers like (click)="onClick()" are excluded
      "@angular-eslint/template/no-call-expression": "warn",

      // Disallow ! non-null assertion in templates — use safe checks instead
      "@angular-eslint/template/no-non-null-assertion": "warn",

      // Warn about inline styles — move to CSS file
      "@angular-eslint/template/no-inline-styles": "warn",

      // Disallow empty control flow blocks: @if (cond) { } — either fill it or remove it
      "@angular-eslint/template/no-empty-control-flow": "warn",

      // Limit control flow condition complexity
      "@angular-eslint/template/conditional-complexity": ["warn", 4],

      // Prefer Angular built-in pipes: date, uppercase, lowercase, etc.
      "@angular-eslint/template/prefer-built-in-pipes": "warn",

      // Use self-closing tags for elements without content: <app-icon />
      "@angular-eslint/template/prefer-self-closing-tags": "warn",

      // Use @empty with @for — handle the empty list case
      "@angular-eslint/template/prefer-at-empty": "warn",

      // Use @else instead of negated version of the same condition
      "@angular-eslint/template/prefer-at-else": "warn",

      // Use ngSrc (NgOptimizedImage) — lazy loading and performance
      "@angular-eslint/template/prefer-ngsrc": "warn",

      // Enforce consistent attribute ordering
      "@angular-eslint/template/attributes-order": "warn",


      // ================================================================
      // ACCESSIBILITY (a11y) — Accessibility rules
      // Critical for users with disabilities
      // ================================================================

      // Require alt text on img/area/input[type=image] elements
      "@angular-eslint/template/alt-text": "warn",

      // Require type attribute on <button> elements
      "@angular-eslint/template/button-has-type": "warn",

      // Elements with click events must also have keyboard events (keydown/keyup/keypress)
      "@angular-eslint/template/click-events-have-key-events": "warn",

      // Heading (h1-h6), anchor (a), and button elements must have content — don't leave empty
      "@angular-eslint/template/elements-content": "warn",

      // Elements with mouse events must also have keyboard events
      "@angular-eslint/template/mouse-events-have-key-events": "warn",

      // Interactive elements (button, a, input) must be focusable
      "@angular-eslint/template/interactive-supports-focus": "warn",

      // <label> must be associated with a form element: using for or wrapping
      "@angular-eslint/template/label-has-associated-control": "warn",

      // tabindex should not be positive — it disrupts tab order
      "@angular-eslint/template/no-positive-tabindex": "warn",

      // Warn about autofocus attribute — can disrupt user experience
      "@angular-eslint/template/no-autofocus": "warn",

      // Disallow distracting elements like <marquee> and <blink>
      "@angular-eslint/template/no-distracting-elements": "error",

      // ARIA roles must have required aria-* attributes
      "@angular-eslint/template/role-has-required-aria": "warn",

      // Enforce valid ARIA attributes
      "@angular-eslint/template/valid-aria": "warn",

      // scope attribute should only be used on <th> elements
      "@angular-eslint/template/table-scope": "warn",
    },
  },
];

module.exports = config;
