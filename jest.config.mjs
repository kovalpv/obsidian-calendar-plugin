import {createRequire} from "module";

const require = createRequire(import.meta.url);
const {defaults} = require("jest-config");


export default {
    preset: 'jest-environment-obsidian',
    testEnvironmentOptions: {
        conformance: 'lax',
        version: '1.1.16'
    },
    verbose: true,
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^obsidian$': '<rootDir>/setupTests.ts',
        "^(\\.{1,2}/.*)\\.js$": "$1",
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1"
    },
    transform: {
        "^.+\\.(ts|tsx)?$": [
            "ts-jest",
            {
                useESM: true
            }
        ]
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', "mjs"]
};
