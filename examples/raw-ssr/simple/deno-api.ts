import {
  SsrService,
  RequestContext,
} from "../../../backend/deno-node-ssr/mod.ts";

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
  path: "/",
  url: "http://localhost/",
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
