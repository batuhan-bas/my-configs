// Minimal decorator stub so the fixture type-checks without installing @angular/core
const Component = (_meta: { selector: string; template: string }) => (_target: unknown) => undefined;

@Component({
  selector: "app-badge",
  // Expected: @angular-eslint/template/eqeqeq (inline template)
  template: `@if (count == 0) { <span>empty</span> }`,
})
export class BadgeComponent {
  public readonly count = 0;
}
