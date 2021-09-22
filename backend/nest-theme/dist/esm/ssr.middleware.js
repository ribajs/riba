var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject, CACHE_MANAGER, Logger, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SsrService } from './ssr.service';
import { handleError } from './error-handler';
let SsrMiddleware = class SsrMiddleware {
    constructor(config, ssr, cacheManager) {
        this.config = config;
        this.ssr = ssr;
        this.cacheManager = cacheManager;
        this.log = new Logger(this.constructor.name);
        this.theme = this.config.get('theme');
    }
    async use(req, res, next) {
        var _a;
        console.debug('req', req);
        const path = ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) ||
            req.baseUrl ||
            req._parsedUrl.pathname;
        const routeSettings = this.getRouteSettingsByRoute(path);
        if (!routeSettings) {
            return next();
        }
        try {
            const cacheOptions = routeSettings.cache ||
                this.theme.cache || { ttl: 200 };
            const cacheKey = req.url;
            const render = async () => {
                const sharedContext = await this.ssr.getSharedContext(req, this.theme.templateVars);
                this.log.debug(`START: Render page component: ${routeSettings.component} for ${req.url}`);
                const page = await this.ssr.renderComponent({
                    componentTagName: routeSettings.component,
                    sharedContext,
                });
                this.log.debug(`END: Render page component: ${routeSettings.component} for ${req.url}`);
                return page.html;
            };
            this.cacheManager.get(cacheKey, async (error, result) => {
                if (error) {
                    this.log.error(error);
                    return next(handleError(error));
                }
                if (result) {
                    this.log.debug(`Cache used`);
                    return res.send(result);
                }
                try {
                    result = await render();
                }
                catch (error) {
                    return next(handleError(error));
                }
                this.cacheManager.set(cacheKey, result, cacheOptions);
                res.send(result);
                if (global.gc) {
                    this.log.debug(`run garbage collector`);
                    global.gc();
                }
                return;
            });
        }
        catch (error) {
            this.log.error(error);
            return next(handleError(error));
        }
    }
    getRouteSettingsByRoute(routePath) {
        return this.theme.routes.find((route) => {
            return route.path.includes(routePath);
        });
    }
};
SsrMiddleware = __decorate([
    Injectable(),
    __param(2, Inject(CACHE_MANAGER)),
    __metadata("design:paramtypes", [ConfigService,
        SsrService, Object])
], SsrMiddleware);
export { SsrMiddleware };
//# sourceMappingURL=ssr.middleware.js.map