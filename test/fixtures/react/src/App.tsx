export const App = ({ items }: { items: string[] }) => (
  <ul>
    {items.map((item) => (
      // Expected: react/jsx-key
      <li>{item}</li>
    ))}
  </ul>
);
