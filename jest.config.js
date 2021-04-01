/* eslint-disable no-undef */
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'tsx',
  ],
  resetModules: true,
  transform: {
    "^.+\\.tsx?$": require.resolve("ts-jest"),
  },
  testRegex: '/src/.*\\.(test|spec).(ts|tsx)$',
  transformIgnorePatterns: [
    'node_modules/(?!(@ribajs)/)',
    '\\.pnp\\.[^\\/]+$',
  ],
  testPathIgnorePatterns: [
    '/infra/schematics/dist/lib/',
    '/infra/schematics/src/lib/',
    '/node_modules/',
    '/packages/*/dist/',
    '/backend/*',
  ],
  coverageReporters: [
    'json',
    'lcov',
  ],
  setupFilesAfterEnv: [require.resolve("jest-extended")],
  globals: {
    'ts-jest': {
      babelConfig: './babel.config.js',
      tsconfig: './tsconfig.spec.json',
      isolatedModules: true
    },
  },
  preset: 'ts-jest',
  testMatch: null,
  /**
   * Fixes error:
   * jest-haste-map: Haste module naming collision: eslint
   * The following files share their name; please adjust your hasteImpl:
   * 
   * @see https://github.com/facebook/jest/issues/8114#issuecomment-475068766
   */
  modulePathIgnorePatterns: ['<rootDir>/infra', '<rootDir>/demos/vue', '<rootDir>/examples/electron', '<rootDir>/examples/electron-nest']
}