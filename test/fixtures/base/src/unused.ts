// Prefixed with _ → intentionally unused, must not be reported
export const handler = (value: number, _event: unknown): number => value;

export const parse = (text: string): unknown => {
  try {
    return JSON.parse(text) as unknown;
  } catch (_error) {
    return null;
  }
};

// Expected: @typescript-eslint/no-unused-vars (warn)
export const compute = (value: number): number => {
  const unused = value * 2;
  return value;
};
