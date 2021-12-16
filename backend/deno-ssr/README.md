# Deno SSR

This is currently just a wrapper for [@ribajs/node-ssr](/backend/node-ssr) with
the same API until we have found a replacement for the Node.js vm module. That's why Node.js and a package.json with the module "@ribajs/node-ssr" is required to use this Deno module.

## API

```ts
import { SsrService, RequestContext } from "https://raw.githubusercontent.com/ribajs/riba/master/backend/deno-ssr/mod.ts";

const ssr = new SsrService({
  sourceFileDir: "./assets/ssr",
  templateDir: ".",
  defaultRootTag: "ssr-root-page",
  defaultTemplateEngine: "pug",
  defaultTemplateFile: "page-component.pug",
});

// Use this to pass any variables to the template
const viewModel = {};

// Use this to pass the request context to the server side components, this way you can access for example the url parameters
const request: RequestContext = {
  hostname: "localhost",
  method: "GET",
  params: {},
  protocol: "http",
  query: {},
  status: 200,
};

const start = async () => {
  const sharedContext = await ssr.getSharedContext(request, viewModel);

  const result = await ssr.renderComponent({
    componentTagName: "hello-ssr-page",
    sharedContext,
  });

  console.log("result", result);
};

start();
```

To try this example see [examples/node-ssr/simple](/examples/node-ssr/simple), here is besides Node.js also the Deno example included.