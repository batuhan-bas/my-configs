// Outside tsconfig.json — linted via disableTypeChecked(["scripts/**"])
const run = async (): Promise<void> => {
  await Promise.resolve();
};

// Type-aware rule (no-floating-promises) must not run here
run();
