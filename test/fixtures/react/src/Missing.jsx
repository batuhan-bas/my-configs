// Expected: no-undef — undefined JSX components are reported by ESLint core
export const Page = () => <MissingComponent />;
