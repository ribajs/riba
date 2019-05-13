module.exports = {
    "testEnvironment": "node",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    "transform": {
        "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
        // "^.+\\.tsx?$": "ts-jest"
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
    ]
};