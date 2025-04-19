import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // React specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/no-unused-prop-types": "warn",

      // General best practices
      "no-console": ["warn", { allow: ["error", "warn"] }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prefer-const": "warn",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      quotes: ["error", "double"],
      semi: ["error", "always"],

      // Import/Export rules
      "import/no-unresolved": "off",
      "import/prefer-default-export": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      // Error prevention
      "no-debugger": "warn",
      "no-alert": "warn",
      "no-duplicate-imports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
