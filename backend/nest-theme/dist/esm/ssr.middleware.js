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
import { pathToRegexp } from 'path-to-regexp';
import { parse as queryparse } from 'qs';
let SsrMiddleware = class SsrMiddleware {
    constructor(config, ssr, cacheManager) {
        this.config = config;
        this.ssr = ssr;
        this.cacheManager = cacheManager;
        this.log = new Logger(this.constructor.name);
        this.theme = this.config.get('theme');
    }
    async use(req, res, next) {
        let routeSettings;
        if (req.route) {
            routeSettings = this.getRouteSettingsByRoute(req.route.path);
        }
        else {
            console.warn('FIXME: req.route is not set!');
            const _route = this.getRouteSettingsByUrl(req._parsedUrl);
            routeSettings = _route.settings;
            req.params = _route.params;
            req.query = _route.query;
        }
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
    getRouteSettingsByUrl(url) {
        let keys;
        let match;
        const settings = this.theme.routes.find((route) => {
            for (const path of route.path) {
                const _keys = [];
                const _regexp = pathToRegexp(path, _keys);
                const _match = url.pathname.match(_regexp);
                if (!!_match) {
                    match = _match;
                    keys = _keys;
                    return true;
                }
            }
        });
        if (!settings) {
            return {
                settings: undefined,
                query: {},
                params: {},
                path: undefined,
                keys: [],
            };
        }
        const query = queryparse(url.search, { ignoreQueryPrefix: true });
        const path = match[0];
        const params = {};
        for (let i = 1; i < match.length; i++) {
            const val = decodeURIComponent(match[i]);
            const key = keys[i - 1].name;
            params[key] = val;
        }
        return { settings, query, params, path, keys };
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