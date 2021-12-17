module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testRegex: '.+.test.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.tsx', 'src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', 'screenshot.test.tsx$', 'src/styleguide', 'styles.ts$', 'index.ts$', '.d.ts$', '.build.test.tsx$'],
  testPathIgnorePatterns: ['screenshot\\.test\\.[jt]s?(x)$', 'build\\.test\\.[jt]s?(x)$'],
  reporters: ['default', 'jest-junit'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
