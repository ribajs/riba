import { App } from "alosaur/mod.ts";

import { appSettings, serverSettings, viewRenderConfig } from "./settings.ts";

// create application
const app = new App(appSettings);

app.useViewRender(viewRenderConfig);

console.info("Deno version: ", Deno.version);

app.listen(serverSettings);
