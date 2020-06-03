module.exports = {
    "testEnvironment": "jsdom",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    "transform": {
        "^.+\\.tsx?$": require.resolve("ts-jest")
    },
    "testRegex": "/src/.*\\.(test|spec).(ts|tsx|js)$",
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,tsx,ts}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    "coverageReporters": [
        "json",
        "lcov"
    ],
    "setupFilesAfterEnv": ["jest-extended"]
};
