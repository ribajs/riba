Formatter to get back a random value of an array

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="random-array-formatter">
<template type="single-html-file">
<div class="row" rv-assign-random-class="'['col-2', 'col-3', 'col-4', 'col-5', 'col-6']' | random">
  <div rv-class="randomClass">This div has a random column class: {randomClass}</div>
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>

or random number

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="random-number-formatter">
<template type="single-html-file">
<ul class="list-group" rv-assign-snes-games="'['Mortal Kombat II', 'Teenage Mutant Ninja Turtles IV: Turtles in Time', 'Kirby’s Dream Course', 'Star Fox', 'F-Zero']'" rv-assign-active-index="snesGames | size | minus 1 | random">
  <li rv-each-snes="snesGames" rv-class-active="activeIndex | eq %snes%" class="list-group-item">{snes}</li>
</ul>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
