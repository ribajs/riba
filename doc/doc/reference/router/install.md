```bash
npm install --save @ribajs/router
```

### Regist

To regist the module include `import routerModule from '@ribajs/router';` in your `main.ts` file and regist the module with `riba.module.regist(routerModule);`:

```ts
import { Riba, Utils } from '@ribajs/core';
import routerModule from '@ribajs/router';
const riba = new Riba();
const model = {};
riba.module.regist(routerModule);
Utils.domIsReady(() => {
  riba.bind(document.body, model);
});
```

### Templates

So that the module works all templates (which can be called via the router module) must match the following schema:

```html
<!-- here your normal doctype, head and body structure -->
<div id="main" rv-view="">
  <div data-namespace="index">
    ...
  </div>
</div>
```

The value of `data-namespace` can (and should) be different on each template. By default, all data attributes are automatically assigned to the template's riba model.
