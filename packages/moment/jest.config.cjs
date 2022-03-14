/* eslint-disable no-undef */
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  resetModules: true,
  transform: {
    "^.+\\.tsx?$": require.resolve("ts-jest"),
  },
  testRegex: "/src/.*\\.(test|spec).(ts|tsx)$",
  transformIgnorePatterns: ["node_modules/(?!(@ribajs)/)", "\\.pnp\\.[^\\/]+$"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["json", "lcov"],
  setupFilesAfterEnv: [require.resolve("jest-extended/all")],
  globals: {
    "ts-jest": {
      babelConfig: "./babel.config.cjs",
      tsconfig: "./tsconfig.spec.json",
      isolatedModules: true,
    },
  },
  preset: "ts-jest",
  testMatch: null,
  /**
   * Fixes error:
   * jest-haste-map: Haste module naming collision: eslint
   * The following files share their name; please adjust your hasteImpl:
   *
   * @see https://github.com/facebook/jest/issues/8114#issuecomment-475068766
   */
  modulePathIgnorePatterns: [],
  // https://www.npmjs.com/package/jest-ts-webcompat-resolver
  resolver: require.resolve("jest-ts-webcompat-resolver"),
};
