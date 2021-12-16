# Node SSR

With this module the Riba.js custom elements can be rendered server-side. This module can be used to integrate SSR for Riba into any Node.js web framework. For example, this module is used by the @ribajs/nest-theme package to render Riba components in the Nest.js framework on the server side.

## API

```ts
import { SsrService, RequestContext } from "@ribajs/node-ssr";

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

## CLI

```bash
$ ssr --help
Options:
      --help             Show help                                     [boolean]
      --version          Show version                                  [boolean]
  -t, --timeout          Timeout if the SSR does not respond
                                                         [Number] [Default: 5000]
  -r, --root-tag         The root tag is an html tag name you defined in your 
                         initial template. This will be exchanged with the tag
                         name of the page component in the render process.
                                            [string] [Default: "ssr-root-page"]
  -c, --component        The page component tag name which will be exchanged
                         with the tag name of the page component in the render
                         process.                           [string] [required]
  -e, --engine           The template engine you use, e.g. "pug"
                                                      [string] [Default: "pug"]
  -f, --template-file    The template file name of your entry template in which
                         you defined the rootTag
                                       [string] [Default: "page-component.pug"]
  -s, --source-file-dir  The directory in which your javascript source files are
                         stored                             [string] [required]
  -d, --template-dir     The directory in which your template view files are
                         stored                             [string] [required]
  -p, --pretty           Prettify JSON output         [string] [Default: false]
```

To try this examples see [examples/node-ssr/node-ssr-example](/examples/node-ssr/node-ssr-example).