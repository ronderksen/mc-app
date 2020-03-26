const {defaults} = require('jest-config');

module.exports = {
  roots: [
    '<rootDir>/cards',
    '<rootDir>/pages',
    '<rootDir>/lib'
  ],
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFilesAfterEnv: [
    './jest-setup.ts'
  ],
  preset: "ts-jest",
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: 'react'
      }
    }
  }
};
