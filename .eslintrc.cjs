module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint", "testing-library"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "react/display-name": "off"
  }
};
