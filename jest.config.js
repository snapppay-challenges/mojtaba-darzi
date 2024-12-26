module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
        "^.+\\.tsx?$": "babel-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|scss)$": "identity-obj-proxy",
        "@/hooks/(.*)": "<rootDir>/src/hooks/$1",
        "@/utils/(.*)": "<rootDir>/src/utils/$1",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(axios)/)"
    ],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
