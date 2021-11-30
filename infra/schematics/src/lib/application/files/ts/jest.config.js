/* eslint-disable no-undef */
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  transform: {
    "^.+\\.tsx?$": require.resolve("ts-jest"),
  },
  testRegex: "/src/.*\\.(test|spec).(ts|tsx)$",
  transformIgnorePatterns: [
    "node_modules/(?!(@ribajs)/)",
    "\\.pnp\\.[^\\\/]+$"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/vendor/",
  ],
  coverageReporters: ["json", "lcov"],
  setupFilesAfterEnv: [require.resolve("jest-extended/all")],
  globals: {
    "ts-jest": {
      babelConfig: true,
      packageJson: "./package.json",
      tsConfig: "./tsconfig.spec.json",
    },
  },
};
