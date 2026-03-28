The build-scss-and-yml gulp task can be used to generate theme settings for octobercms using scss variables.

To include the task in your october project, export the gulp task `build-scss-and-yml` to your gulpfile's exports:

```ts
require('@ribajs/octobercms/dist/yaml');
var gulp = require("gulp");

exports.default = gulp.series("build-scss-and-yml");`
```

\
The `build-scss-and-yml` task consists of three other gulp tasks which are executed in series: `build-yml`, `merge-yml`, `merge-with-october-yml`

### `build-yml`

The build-yml task takes every file matching `./assets/**/*.scss`, and transforms them using the scssToOctoberYml gulp plugin. The output is stored with the respective file name in the `./build/tmp/` directory.

The `./build/` directory can be added safely to any .gitignore file.

Currently the only option to change the directories is editing the riba.js source files, but that might change in future releases.

### `merge-yml`

The merge-yml task takes every file matching `./build/tmp/**/*.yml` (usually all temporary files created by the build-yml task), and merges them into a single big `./build/bundle.yml`. If there are any duplicates of yaml keys, this task is supposed to print a warnining. (not happening yet)

### `merge-with-october-yml`

The merge-with-october-yml task combines the content of the `./build/bundle.yml` file with a file named `./default_theme.yaml`. The bundle.yml content is added under the yaml key `input.form.tabs.fields`, which is the default octobercms config field key using the tabs configuration.
