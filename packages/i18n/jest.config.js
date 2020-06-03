module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    transform: {
        "^.+\\.tsx?$": require.resolve("ts-jest")
    },
    testRegex: "/src/.*\\.(test|spec).(ts|tsx)$",
    collectCoverageFrom: [
        "src/**/*.{tsx,ts}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    coverageReporters: [
        "json",
        "lcov"
    ],
    setupFilesAfterEnv: ["jest-extended"],
    globals: {
        'ts-jest': {
            babelConfig: true
        }
    }
};
