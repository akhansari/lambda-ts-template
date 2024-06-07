/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: false,
  endOfLine: "lf",
  overrides: [
    {
      files: ["*.json", "*.config.mjs", "*.config.ts", "*.yml"],
      options: {
        tabWidth: 2,
      },
    },
  ],
}

export default config
