# Monaco Editor Module

## Install

```bash
yarn add @ribajs/monaco-editor
```

## Regist

To regist the module include `import monacoEditorModule from '@ribajs/monaco-editor';` in your `main.ts` file and regist the module with `riba.module.register(monacoEditorModule.init());`:

```ts
import { Riba, coreModule } from '@ribajs/core';
import { monacoEditorModule } from "@ribajs/monaco-editor";
import { ready } from '@ribajs/utils/src/dom';
const riba = new Riba();
const model = {};
riba.module.register(coreModule.init());
riba.module.register(monacoEditorModule.init());
ready(() => {
  riba.bind(document.body, model);
});
```
