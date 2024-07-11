# Integrate Prettier and Eslint

## Install Prettier

You can follow this [doc](https://prettier.io/docs/en/install) to install Prettier or follow this step here:

- install Prettier locally

```shell
yarn add --dev --exact prettier
```

- install eslint

```shell
yarn add --dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-simple-import-sort eslint-plugin-typesafe
```

- install prettier plugin sort import

```shell
yarn add --dev @ianvs/prettier-plugin-sort-imports
```

- create a `prettier.config.js` file and copy/paste the following code

```js
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
};
```

- create a `eslint.config.js` file and copy/paste this code:

```js
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [eslintPluginPrettierRecommended];
```

- modify your `settings.json` in `.vscode` directory

```json
{
  // define the default formatter
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // tell prettier your config file you are using
  "prettier.configPath": "prettier.config.js"
}
```

- modify your `package.json` file

```json
{
    ...,
    "type": "module",
    ...,
    "scripts: {
        ...,
        "lint": "eslint src/**/*.ts --quiet --fix",
        "prettier:format": "prettier . --write --cache"
    },
    ...
}
```
