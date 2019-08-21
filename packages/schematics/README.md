# Riba schematics

Source code templates for Riba architecture element generation based on Angular schematics

## Development

### Debugging

In order to debug your schematics, you need to run with node in debugging mode:

```bash
node --inspect-brk $(which schematics) .:component --name=my-new-web-component --no-dry-run --spec --templateEngine="html" --language="ts" --sourceRoot="src"
```

Another advantage of running in debug mode is that the `schematics` command line tool puts a break point directly before running your own schematic.
