import { Module, DynamicModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static forRoot(/*entities = [], options?*/): DynamicModule {
    const imports = [];

    // We only use the ServeStaticModule on production because we use webpack on development for HMR in the renderer
    if (ENV.production) {
      imports.push(
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, "..", "renderer"),
        })
      );
    }
    return {
      module: AppModule,
      imports,
      providers: [],
      exports: [],
    };
  }
}
