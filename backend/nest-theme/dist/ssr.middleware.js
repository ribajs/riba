"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsrMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ssr_service_1 = require("./ssr.service");
let SsrMiddleware = class SsrMiddleware {
    constructor(config, ssr) {
        this.config = config;
        this.ssr = ssr;
        this.log = new common_1.Logger(this.constructor.name);
        this.theme = this.config.get('theme');
    }
    async use(req, res, next) {
        this.log.debug('SsrMiddleware req.route', req.route.path);
        const routeSettings = this.getRouteSettingsByRoute(req.route.path);
        if (!routeSettings) {
            return next();
        }
        const sharedContext = await this.ssr.getSharedContext(req);
        const forceEngine = req.query['force-engine'] || undefined;
        if (forceEngine) {
            this.log.debug(`Force render engine: ${forceEngine}`);
        }
        try {
            const page = await this.ssr.renderComponent({
                componentTagName: routeSettings.component,
                sharedContext,
                engine: forceEngine,
            });
            this.log.debug(`Rendered page component: ${routeSettings.component}`);
            return res.send(page.html);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    }
    getRouteSettingsByRoute(routePath) {
        return this.theme.routes.find((route) => {
            return route.path.includes(routePath);
        });
    }
};
SsrMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService, ssr_service_1.SsrService])
], SsrMiddleware);
exports.SsrMiddleware = SsrMiddleware;
//# sourceMappingURL=ssr.middleware.js.map