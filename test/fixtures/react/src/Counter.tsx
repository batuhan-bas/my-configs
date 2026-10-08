import { useState } from "react";

export const Counter = ({ enabled }: { enabled: boolean }) => {
  if (enabled) {
    // Expected: react-hooks/rules-of-hooks (conditional hook call)
    const [count] = useState(0);
    return <span>{count}</span>;
  }
  return null;
};
