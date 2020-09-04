# Pdf Module

## Install

```bash
npm install --save @ribajs/pdf
```

## Regist

To regist the module include `import pdfModule from '@ribajs/pdf';` in your `main.ts` file and regist the module with `riba.module.regist(pdfModule);`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { pdfModule } from '@ribajs/pdf';
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.regist(coreModule);
riba.module.regist(pdfModule);
ready(() => {
  riba.bind(document.body, model);
});
```
