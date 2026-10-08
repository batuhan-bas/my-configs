export const App = ({ items }: { items: string[] }) => (
  <ul>
    {items.map((item) => (
      // Expected: @eslint-react/no-missing-key
      <li>{item}</li>
    ))}
  </ul>
);
