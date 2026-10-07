// Minimal decorator stub so the fixture type-checks without installing @angular/core
const Component = (_meta: { selector: string; templateUrl: string }) => (_target: unknown) => undefined;

@Component({
  // Expected: @angular-eslint/component-selector (missing "app" prefix)
  selector: "user-card",
  templateUrl: "./user-card.component.html",
})
export class UserCardComponent {
  public readonly name = "Ada";
}
