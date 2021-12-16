"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const Express = require("express");
const platform_express_1 = require("@nestjs/platform-express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const app_module_1 = require("./app.module");
const config = require("./config/config");
async function bootstrap() {
    const console = new common_1.Logger('bootstrap');
    const express = Express();
    const expressAdapter = new platform_express_1.ExpressAdapter(express);
    const app = await core_1.NestFactory.create(app_module_1.AppModule.register(expressAdapter), expressAdapter, {
        logger: ['error', 'warn', 'debug', 'log'],
    });
    app.enableCors({
        origin: '*',
    });
    app.use(cookieParser());
    app.set('trust proxy', 1);
    const session = expressSession(config.session);
    app.use(session);
    await app.listen(config.app.port);
    console.debug(`Start app on localhost:${config.app.port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map