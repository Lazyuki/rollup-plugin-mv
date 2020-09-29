# rollup-plugin-mv

🍣 A Rollup plugin to move around generated files and directories

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Rollup

## Install

Using npm:

```bash
npm install rollup-plugin-mv --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import mv from "rollup-plugin-mv";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [
    mv(
      [
        { src: "dist/file", dist: "dist/assets/file" },
        {
          src: "dist/folder",
          dist: "dist/assets/dir",
          overwrite: true,
        },
      ],
      {
        overwrite: false,
      }
    ),
  ],
};
```

The first argument accepts an object or an array of objects with the following shape:

```ts
{
  /**
   * Source file or directory
   */
  src: string;
  /**
   * Destination file or directory
   */
  dist: string;
  /**
   * Overwrite existing file or directory.
   */
  overwrite?: boolean;
}
```

## Options

### `overwrite`

Type: `boolean`<br />
Default: `false`

Overwrite existing file or directory.

### `once`

Type: `boolean`<br />
Default: `false`

Executes the move command only once even if there are multiple outputs.
