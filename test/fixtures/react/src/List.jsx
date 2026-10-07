export const List = ({ items }) => (
  <ul>
    {items.map((item) => (
      // Expected: react/jsx-key
      <li>{item}</li>
    ))}
  </ul>
);
