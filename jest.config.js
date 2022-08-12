const esModules = ['quasar', 'quasar/lang', 'lodash-es'].join('|');

module.exports = {
  globals: {
    __DEV__: true,
  },
  // Jest assumes we are testing in node environment, specify jsdom environment instead
  testEnvironment: 'node',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  // noStackTrace: true,
  // bail: true,
  // cache: false,
  // verbose: true,
  // watch: true,
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.js',
  ],
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: [
    'node_modules',
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coverageDirectory: './reports',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
  ],
  // Needed in JS codebases too because of feature flags
  coveragePathIgnorePatterns: ['/node_modules/', '.d.ts$'],
  coverageThreshold: {
    global: {
      //  branches: 50,
      //  functions: 50,
      //  lines: 50,
      //  statements: 50
    },
  },
  coverageReporters: ['lcov', 'cobertura', 'text-summary'],
  transformIgnorePatterns: [`node_modules/(?!(${esModules}))`],
};
