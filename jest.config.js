// https://jestjs.io/docs/configuration

module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/jest/setupTests.ts',
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
    '^.+\\.module.s?css$': '<rootDir>/jest/transforms/scssTransform.js',
  },
  testPathIgnorePatterns: ['node_modules', 'dist'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testEnvironment: 'jsdom',
};
