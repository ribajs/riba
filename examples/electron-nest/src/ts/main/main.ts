/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from "@nestjs/core";

import {
  NestExpressApplication,
  ExpressAdapter,
} from "@nestjs/platform-express";
import * as Express from "express";
import { AppModule } from "./app.module";
import { app as electron } from "electron";
import { MainWindow } from "./window/main-window";
import { webpackServer } from "./webpack-server";

declare global {
  const CONFIG: any;
  const ENV: {
    production: boolean;
    development: boolean;
  };
}

async function bootstrap() {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  await electron.whenReady();

  let express: Express.Express;
  let devServer: any;
  let prodServer: any;

  if (ENV.development) {
    devServer = await webpackServer();
    express = devServer.app;
  } else {
    express = Express();
  }

  const nest = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(),
    new ExpressAdapter(express)
  );

  nest.enableCors();

  if (devServer) {
    devServer.listen(3000, "localhost");
    nest.init();
  } else {
    prodServer = express.listen(3000, "localhost");
    nest.init();
    // await nest.listen(3000, "localhost");
  }

  MainWindow.getInstance();

  // Server side HMR
  // We just restart the app here but you can also do more
  // Example: https://dorp.io/posts/webpack-express-hmr/
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      console.debug("Restart..");
      if (prodServer) {
        prodServer.close();
      }
      if (devServer) {
        devServer.close();
      }
      electron.relaunch();
      electron.exit();
    });
  }

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  electron.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      electron.quit();
      nest.close();
    }
  });

  console.log("App listening on http://localhost:3000\n");
}
bootstrap();
