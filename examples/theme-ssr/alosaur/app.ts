import { App } from "https://deno.land/x/alosaur@v0.35.1/mod.ts";
import { getSettings } from "../../../backend/alosaur-theme/mod.ts";

const SERVER_PORT = Deno.env.get("SERVER_PORT") || "8080";
const __dirname = new URL(".", import.meta.url).pathname;

const bootstrap = async () => {
  const { themeAppSettings, viewRenderConfig } = await getSettings({
    themeDir: __dirname + "../theme",
    active: "theme",
    templateVars: {},
  });

  // create application
  const app = new App({
    ...themeAppSettings,
  });

  app.useViewRender(viewRenderConfig);

  console.info("Deno version: ", Deno.version);

  app.listen({
    port: Number(SERVER_PORT),
  });
};

bootstrap();
