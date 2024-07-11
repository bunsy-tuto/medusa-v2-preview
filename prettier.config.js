/** @type {import("prettier").Config} */
export default {
  arrowParens: "always",
  endOfLine: "auto",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILT_IN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[./]",
    "",
    "<TYPES>",
    "<TYPES>^[.]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  // importOrder: [
  //   // Side effect imports.
  //   "^\\u0000",
  //   "",
  //   "<BUILT_IN_MODULES>",
  //   "",
  //   "<THIRD_PARTY_MODULES>",
  //   "",
  //   // Packages.
  //   // Things that start with a letter (or digit or underscore), or
  //   // `@` followed by a letter.
  //   "^@?\\w",
  //   "",
  //   "^[./]",
  //   "",
  //   "<TYPES>",
  //   "",
  //   // // Root imports
  //   // "^(src)(/.*|$)",
  //   // "^(tests)(/.*|$)",
  //   // // Parent imports. Put `..` last.
  //   // "^\\.\\.(?!/?$)",
  //   // "^\\.\\./?$",
  //   // // Other relative imports. Put same-folder imports and `.` last.
  //   // "^\\./(?=.*/)(?!/?$)",
  //   // "^\\.(?!/?$)",
  //   // "^\\./?$",
  // ],
  // importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};
