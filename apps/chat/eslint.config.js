import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import turboConfig from "eslint-config-turbo/flat";
import svelte from "eslint-plugin-svelte";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...turboConfig,
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: [".svelte-kit/"],
  },
];
