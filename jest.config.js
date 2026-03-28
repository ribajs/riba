import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  resetModules: true,
  testRegex: "/src/.*\\.(test|spec).(ts|tsx)$",
  testPathIgnorePatterns: ["/node_modules/", "/packages/*/dist/"],
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
  coverageReporters: ["json", "lcov"],
  setupFilesAfterEnv: [require.resolve("jest-extended/all")],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.spec.json",
      },
    ],
  },
  preset: "ts-jest",
  testMatch: null,
  modulePathIgnorePatterns: ["<rootDir>/.yarn", "<rootDir>/infra", "<rootDir>/refs"],
  resolver: require.resolve("jest-ts-webcompat-resolver"),
};
