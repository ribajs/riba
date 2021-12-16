import { Module, DynamicModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MainWindow } from "./main-window/main-window";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { Config, Env } from "../typings";
import { MainWindowController } from "./main-window/main-window.controller";

@Module({
  imports: [],
  controllers: [AppController, MainWindowController],
  providers: [AppService],
})
export class AppModule {
  static forRoot(env: Env, config: Config): DynamicModule {
    const imports = [];

    // We only use the ServeStaticModule on production because we use webpack on development for HMR in the renderer
    if (env.production) {
      imports.push(
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, "..", "renderer"),
        })
      );
    }
    return {
      module: AppModule,
      imports,
      providers: [
        {
          provide: "CONFIG",
          useValue: config,
        },
        {
          provide: "ENV",
          useValue: env,
        },
        MainWindow,
      ],
      exports: [],
    };
  }
}
