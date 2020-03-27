Greatest common divisor (GCD) useful to calculate a ratio.

<rv-bind-content class="pt-3">
<template>
<rv-example-tabs class="pt-3" handle="bs4-icon">
<template type="single-html-file">
<div rv-assign-width="1920" rv-assign-height="1080">
  <div rv-assign-gcd="width | gcd height">
    Dimensions: {width} x {height}<br />
    Gcd: {gcd}<br />
    Aspect: <span rv-text="width | dividedBy gcd"></span>:<span rv-text="height | dividedBy gcd"></span>
  </div>
</div>
</template>
</rv-example-tabs>
</template>
</rv-bind-content>
