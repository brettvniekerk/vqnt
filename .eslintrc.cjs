module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint/eslint-plugin", "unused-imports"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    root: true,
    env: {
        node: true,
        jest: false
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-inferrable-types": "off",
        "unused-imports/no-unused-imports": "error"
    }
};
