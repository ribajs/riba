import { AlosaurOpenApiBuilder, getSettings } from "./deps.ts";

const __dirname = new URL(".", import.meta.url).pathname;

const { themeAppSettings } = await getSettings({
  themeDir: __dirname + "..",
  active: "theme",
  templateVars: {},
});

AlosaurOpenApiBuilder.create(themeAppSettings)
  .addTitle("SevdeskAutoReceipts")
  .addVersion("1.0.0")
  .addDescription("Example Alosaur OpenApi generate")
  .addServer({
    url: "http://localhost:8000",
    description: "Local server",
  })
  .saveToFile("./api.json");
