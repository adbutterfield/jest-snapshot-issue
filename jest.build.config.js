module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testRegex: '.+.build.test.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  testPathIgnorePatterns: ['screenshot\\.build\\.test\\.[jt]s?(x)$'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
