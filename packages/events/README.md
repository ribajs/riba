# @ribajs/events

## Build

This is a hybrid build for CommonJS (CJS Node.js modules) and ESM (ECMAScript modules).

See [here for an example configuration](https://github.com/gfmio/typescript-esm-cjs-hybrid-example), this example builds the source to CJS and ESM and and defines the different outputs in the package.json:

```json
  "main": "[CommonJS version]",
  "types": "[TypeScript definitions]",
  "browser": "[CommonJS version]",
  "module": ".[ESM version]",
```

We do the same with the only difference, that our browser output is also the ESM version for the reasion that we use Webpack to build and bundle the Riba.js projects:

```json
  "main": "[CommonJS version]",
  "types": "[TypeScript definitions]",
  "browser": "[ESM version]",
  "module": ".[ESM version]",
```

### Yarn 2 Scripts

**Build**
- `yarn run build` - Run all build script
- `yarn run build:types` - Build the type definiton files
- `yarn run build:esm` - Build the ESM module version
- `yarn run build:cjs` - Build the CommonJS module version

**Others**
- `yarn run clean` - Delete the build files
- `yarn run lint` - Lint the source files using ESLint and Prettier