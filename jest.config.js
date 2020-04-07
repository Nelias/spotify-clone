module.exports = {
  // Documentation and internet knowledge on TypeScript + Redux + Jest is so low that I had to set all this myself
  preset: 'ts-jest/presets/js-with-ts',

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  verbose: true,

  globals: {
    NODE_ENV: 'test',
  },

  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },

  moduleDirectories: ['node_modules', 'src/components', 'src/redux'],
}
