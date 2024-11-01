import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { defaults } = require("jest-config");

export default {
  verbose: true,
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true
      }
    ]
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions,'ts', 'tsx', "mjs"]
};
