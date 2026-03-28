The scssToOctoberYml gulp plugin extracts octobercms config fields from a scss file, and returns it as a yaml configuration string.

Currently, there are no options but the input and output files can be specified using the gulp `src()` function and the `dest()` pipe:

```ts
import { src, dest, task } from "gulp";
import { scssToOctoberYml } from "./includes/scss-to-october";

task("build-yml", function buildExampleYmlFromScss() {
  return src("./assets/**/*.scss").pipe(scssToOctoberYml()).pipe(dest("./build/tmp/"));
});
```

The plugin tries to match scss variables and to transform their values into the octobercms theme settings format. Currently it is only possible to export one scss variable per line, lines containing more than one variable will be ignored.

To mark a variable for export, the following comment is required after the variable declaration:

##### Input

```scss
$my-scss-variable: #123123 !default; // octoberyml: {}
```

If no further options are supplied, the scssToOctoberYml plugin tries to guess default options.

##### Compiled output for the example above

```yml
my_scss_variable:
  default: "#123123"
  assetVar: my-scss-variable
  label: my scss variable
  type: colorpicker
```

The type is guessed by using the default value, currently it either defaults to colorpicker or text, depending on the content.

Further options can be supplied through the brackets. Custom options always overwrite the default guess of the plugin, and can be used to further customize the output.

The content of the brackets is parsed using `Function()` object which also allows to use loose json for the options string:

##### Input

```scss
$my-scss-variable: #123123 !default; // octoberyml: {key: "value"}
```

Any (octobercms configuration value) can be used, to allow a high extent of customization:

##### Input

```scss
$navigation-font: "primary" !default; // octoberyml: {tab: "Font options", type: "balloon-selector", label: "Navigation Font", options: {primary: "Primary", secondary: "Secondary", tertiary: "Tertiary"}}
```

##### Compiled output:

```yml
navigation_font:
  default: '"primary"'
  assetVar: navigation-font
  label: navigation font
  type: balloon-selector
  tab: Font options
  options:
    primary: Primary
    secondary: Secondary
    tertiary: Tertiary
```
