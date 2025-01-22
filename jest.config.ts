import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript support
  testEnvironment: 'node', // Node.js environment for backend testing
  moduleFileExtensions: ['ts', 'js', 'json'], // Supported file extensions
  rootDir: '.', // Root directory for Jest
  setupFilesAfterEnv: ['./jest.setup.ts'], // Path to setup file
  collectCoverage: true, // Enable coverage reporting
  coverageDirectory: './coverage', // Directory to store coverage reports
  coverageReporters: ['text', 'lcov'], // Formats for coverage reports
  moduleNameMapper: {
    // Support for path aliases in tsconfig
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { isolatedModules: true }], // Move ts-jest config here
  },
};

export default config;
