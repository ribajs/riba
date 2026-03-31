Returns true if an object, array or string contains an object, property or substring.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="contains-formatter">
      <template type="single-html-file">
        <div rv-class-text-success="'I like my SNES' | contains 'SNES'">String contains SNES</div>
        <div rv-class-text-success="'I like my SNES' | contains 'PlayStation'">String contains PlayStation</div>
        <div rv-class-text-success="{'SNES': 1, 'N64': 2, 'GameBoy': 3, 'SEGA': 4} | contains 'SNES'">Object contains SNES</div>
        <div rv-class-text-success="{'SNES': 1, 'N64': 2, 'GameBoy': 3, 'SEGA': 4} | contains 'SNES' 1">Object contains 1 on key SNES</div>
        <div rv-class-text-success="{'SNES': 1, 'N64': 2, 'GameBoy': 3, 'SEGA': 4} | contains 'SNES' 2">Object contains 2 on key SNES</div>
        <div rv-class-text-success="{'SNES': 1, 'N64': 2, 'GameBoy': 3, 'SEGA': 4} | contains 'PlayStation'">Object contains PlayStation</div>
        <div rv-class-text-success="['SNES', 'N64', 'GameBoy', 'SEGA'] | contains 'SNES'">Contains SNES</div>
        <div rv-class-text-success="['SNES', 'N64', 'GameBoy', 'SEGA'] | contains 2 'GameBoy'">Contains GameBoy on index 2</div>
        <div rv-class-text-success="['SNES', 'N64', 'GameBoy', 'SEGA'] | contains 2 'PlayStation'">Contains PlayStation on index 2</div>
        <div rv-class-text-success="['SNES', 'N64', 'GameBoy', 'SEGA'] | contains 'PlayStation'">Contains PlayStation</div>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
