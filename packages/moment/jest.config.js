import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  resetModules: true,
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.spec.json",
        isolatedModules: true,
      },
    ],
  },
  testRegex: "/src/.*\\.(test|spec).(ts|tsx)$",
  transformIgnorePatterns: ["node_modules/(?!(@ribajs)/)", "\\.pnp\\.[^\\/]+$"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["json", "lcov"],
  setupFilesAfterEnv: [require.resolve("jest-extended/all")],
  preset: "ts-jest",
  testMatch: null,
  modulePathIgnorePatterns: [],
  resolver: require.resolve("jest-ts-webcompat-resolver"),
};
