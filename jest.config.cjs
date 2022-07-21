/* eslint-disable no-undef */
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "ts", "tsx", "cjs", "cts"],
  resetModules: true,
  testRegex: "/src/.*\\.(test|spec).(ts|tsx)$",
  testPathIgnorePatterns: ["/node_modules/", "/packages/*/dist/"],
  coverageReporters: ["json", "lcov"],
  setupFilesAfterEnv: [require.resolve("jest-extended/all")],
  globals: {
    "ts-jest": {
      babelConfig: require("./babel.config.cjs"),
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
  modulePathIgnorePatterns: ["<rootDir>/.yarn", "<rootDir>/infra"],
  // https://www.npmjs.com/package/jest-ts-webcompat-resolver
  resolver: require.resolve("jest-ts-webcompat-resolver"),
};
