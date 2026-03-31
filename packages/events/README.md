# @ribajs/events

## Build

This package uses a source-first ESM setup in the monorepo.

```json
  "main": "src/index.ts",
  "types": "src/index.ts",
  "browser": "src/index.ts",
  "module": "src/index.ts",
  "source": "src/index.ts"
```

### Yarn 2 Scripts

**Build**
- `yarn run build` - Run all build script
- `yarn run build:types` - Build the type definiton files
- `yarn run build:esm` - Build the ESM module version

**Others**
- `yarn run clean` - Delete the build files
- `yarn run lint` - Lint the source files using ESLint and Prettier