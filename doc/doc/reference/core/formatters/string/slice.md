The `slice` formatter returns a substring, starting at the specified index.
An optional second parameter can be passed to specify the length of the substring.
If no second parameter is given, a substring until the end will be returned.

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="replace-first-formatter">
<template type="single-html-file">
<div rv-text="'Mega Man and Super Mario' | slice 13"></div>
<div rv-text="'Mega Man and Super Mario' | slice 0 8"></div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
