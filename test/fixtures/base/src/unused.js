// Prefixed with _ → intentionally unused, must not be reported
export const handler = (value, _event) => value;

export const parse = (text) => {
  try {
    return JSON.parse(text);
  } catch (_error) {
    return null;
  }
};

// Expected: no-unused-vars (warn)
export const compute = (value) => {
  const unused = value * 2;
  return value;
};
