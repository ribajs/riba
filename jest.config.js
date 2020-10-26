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
}