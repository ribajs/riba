/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { app } from "electron";
import { MainWindow } from "./window/main-window";
import { hmrServer } from "./hmr";

declare global {
  const CONFIG: any;
  const ENV: {
    production: boolean;
    development: boolean;
  };
}

console.debug("CONFIG", CONFIG);
console.debug("ENV", ENV);

async function bootstrap() {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  await app.whenReady();

  const server = await NestFactory.create(AppModule.forRoot());
  server.enableCors();

  let devServer;

  if (ENV.development) {
    devServer = await hmrServer();
  }

  await server.listen(3000);

  MainWindow.getInstance();

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      // app.quit();
      // server.close();
      // devServer?.close();
    });
  }

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit();
      server.close();
      devServer?.close();
    }
  });

  console.log("App listening on http://localhost:3000\n");
}
bootstrap();
