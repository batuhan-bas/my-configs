export const fetchUser = async (id: number): Promise<string> => {
  await Promise.resolve();
  return `user-${id}`;
};

export const loadUser = (): void => {
  // Expected: @typescript-eslint/no-floating-promises
  fetchUser(1);
};
