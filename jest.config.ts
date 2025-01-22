module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  modulePaths: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.tsx?(x)", "**/?(*.)+(spec|test).tsx?(x)"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
