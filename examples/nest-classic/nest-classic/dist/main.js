"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const Express = require("express");
const platform_express_1 = require("@nestjs/platform-express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const app_module_1 = require("./app.module");
const config = require("./config");
async function bootstrap() {
    const console = new common_1.Logger('bootstrap');
    const express = Express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(express), {
        logger: ['error', 'warn', 'debug', 'log'],
    });
    app.enableCors({
        origin: '*',
    });
    app.use(cookieParser());
    app.set('trust proxy', 1);
    const session = expressSession(config.session);
    app.use(session);
    app.setViewEngine(config.theme.viewEngine);
    app.useStaticAssets(config.theme.assetsDir);
    app.setBaseViewsDir(config.theme.viewsDir);
    await app.listen(config.app.port);
    console.debug(`Start app on http://localhost:${config.app.port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map