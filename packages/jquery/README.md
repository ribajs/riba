# JQuery Module

## Install

```bash
npm install --save @ribajs/jquery
```

## Regist

To regist the module include `import jqueryModule from '@ribajs/jquery';` in your `main.ts` file and regist the module with `riba.module.regist(jqueryModule);`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { JQuery, jqueryModule } from '@ribajs/jquery';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
riba.module.regist(jqueryModule);
JQuery(() => {
  riba.bind(document.body, model);
});
```
