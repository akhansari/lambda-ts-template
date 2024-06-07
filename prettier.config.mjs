/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: false,
  endOfLine: "lf",
  printWidth: 100,
  overrides: [
    {
      files: ["*.json", "*.config.mjs", "*.config.ts", "*.yml", "*.yaml"],
      options: {
        tabWidth: 2,
      },
    },
  ],
}

export default config
