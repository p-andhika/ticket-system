import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint
  .config([
    globalIgnores(["dist", "**/*.d.ts"]),
    {
      files: ["**/*.{ts}"],
      extends: [js.configs.recommended, tseslint.configs.recommended],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.node,
      },
    },
  ])
  .concat(eslintPluginPrettier);
