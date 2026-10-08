export const List = ({ items }) => (
  <ul>
    {items.map((item) => (
      // Expected: @eslint-react/no-missing-key
      <li>{item}</li>
    ))}
  </ul>
);
