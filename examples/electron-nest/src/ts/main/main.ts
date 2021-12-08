/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from "@nestjs/core";

import {
  NestExpressApplication,
  ExpressAdapter,
} from "@nestjs/platform-express";
import * as Express from "express";
import { AppModule } from "./app.module";
import { app as electron } from "electron";
import { webpackServer } from "./webpack-server";
import getPort from "../dependencies/get-port";
import { Config, Env } from "../typings";

async function bootstrap(env: Env, config: Config) {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  await electron.whenReady();

  config.port = await getPort({ port: config.port });
  let express: Express.Express;
  let devServer: any;
  let prodServer: any;

  if (env.development) {
    devServer = await webpackServer(config.port);
    express = devServer.app;
  } else {
    express = Express();
  }

  const nest = await NestFactory.create<NestExpressApplication>(
    AppModule.forRoot(env, config),
    new ExpressAdapter(express)
  );

  nest.enableCors();

  if (devServer) {
    devServer.listen(config.port, "localhost");
    nest.init();
  } else {
    prodServer = express.listen(config.port, "localhost");
    nest.init();
  }

  // Server side HMR
  // We just restart the app here but you can also do more
  // Example: https://dorp.io/posts/webpack-express-hmr/
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      restart();
    });
  }

  const quit = () => {
    console.log("Quit..");
    if (prodServer) {
      prodServer.close();
    }
    if (devServer) {
      devServer.close();
    }
    electron.exit();
  };

  const restart = () => {
    console.debug("Restart..");
    electron.relaunch();
    quit();
  };

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  electron.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      quit();
    }
  });

  console.log(`Electron listening on http://localhost:${config.port}\n`);
}

declare global {
  const CONFIG: Config;
  const ENV: Env;
}

bootstrap(ENV, CONFIG);
