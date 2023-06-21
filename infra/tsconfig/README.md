# tsconfig

> Shared [TypeScript config](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for Riba.js projects

## Install

```bash
npm install --save-dev @ribajs/tsconfig
```

## Usage

`tsconfig.json`

```json
{
  "extends": "@ribajs/tsconfig/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "target": "es2018",
    "lib": [
      "es2018"
    ]
  }
}
```

## License

MIT © [Art+Code Studio](https://artandcode.studio/)
