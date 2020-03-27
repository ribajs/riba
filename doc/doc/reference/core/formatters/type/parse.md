Parses a json string to object

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="json-formatter">
<template type="single-html-file">
<div rv-assign-json-string="{'SNES': 1, 'N64': 2, 'GameBoy': 3, 'SEGA': 4} | json">
  <div rv-assign-object="jsonString | parse">
    The key "SNES" has the value of "{object | get 'SNES'}" and the json string is {jsonString}.
  </div>
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
