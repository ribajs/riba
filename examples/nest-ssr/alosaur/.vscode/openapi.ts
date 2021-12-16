import { AlosaurOpenApiBuilder } from "alosaur/openapi/mod.ts";

import { appSettings } from "./settings.ts";

AlosaurOpenApiBuilder.create(appSettings)
  .addTitle("SevdeskAutoReceipts")
  .addVersion("1.0.0")
  .addDescription("Example Alosaur OpenApi generate")
  .addServer({
    url: "http://localhost:8000",
    description: "Local server",
  })
  .saveToFile("./api.json");
