module.exports = {
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!<rootDir>/node_modules/'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}
