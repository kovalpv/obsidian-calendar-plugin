import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginImport from 'eslint-plugin-import';
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
    {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        "plugins": {
            import: pluginImport,
            "simple-import-sort": simpleImportSort
        },
        "settings": {
            react: {
                version: "detect"
            }
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "@typescript-eslint/ban-ts-comment": "off",
        }
    }
];
