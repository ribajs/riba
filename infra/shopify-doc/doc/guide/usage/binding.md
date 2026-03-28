Simply call `riba.bind` on a template element with some data that you would like to bind.


```typescript
import { Riba, coreModule } from '@ribajs/core';

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());

const view = riba.bind(document.getElementById("rv-app"), model);
```

*Every call to `riba.bind` returns a fully data-bound view that you should hold on to for later. You'll need it in order to unbind it's listeners using `view.unbind()`.*
