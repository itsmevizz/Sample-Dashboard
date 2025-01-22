module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  modulePaths: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
};