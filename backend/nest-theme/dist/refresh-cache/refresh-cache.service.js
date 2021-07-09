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
exports.RefreshCacheService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_fetch_1 = require("node-fetch");
const cheerio = require("cheerio");
let RefreshCacheService = class RefreshCacheService {
    constructor(config) {
        this.config = config;
        this.visited = [];
        this.log = new common_1.Logger(this.constructor.name);
        this.theme = config.get('theme');
    }
    async onApplicationBootstrap() {
        setTimeout(async () => {
            await this.refresh(process.env.NEST_EXTERN_URL);
        }, 3000);
    }
    isInternalLink(link, host) {
        if (link.startsWith('tel:') ||
            link.startsWith('mailto:') ||
            link.startsWith('#')) {
            return false;
        }
        if (link.startsWith(host) || link.startsWith('/')) {
            return true;
        }
        return false;
    }
    normalize(link, host) {
        if (link.startsWith(host)) {
            return host;
        }
        if (host.endsWith('/')) {
            host = host.substring(0, host.length - 1);
        }
        if (link.startsWith('/')) {
            link = link.substring(1);
        }
        return host + '/' + link;
    }
    alreadyVisited(link) {
        return this.visited.indexOf(link) !== -1;
    }
    followLink(link, host) {
        return !this.alreadyVisited(link) && this.isInternalLink(link, host);
    }
    parseLinks(html) {
        const $ = cheerio.load(html);
        const $anchors = $('a[href]');
        const links = [];
        for (const anchor of $anchors) {
            const $anchor = $(anchor);
            const link = $anchor.attr('href');
            links.push(link);
        }
        return links;
    }
    async deepRefresh(links, host) {
        for (const link of links) {
            if (!this.followLink(link, host)) {
                continue;
            }
            const url = this.normalize(link, host);
            this.visited.push(link);
            this.log.log('refresh ' + url);
            const response = await node_fetch_1.default(url);
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('text/html')) {
                continue;
            }
            let links = this.parseLinks(await response.text());
            links = links.filter((link) => !this.alreadyVisited(link));
            await this.deepRefresh(links, host);
        }
        return;
    }
    async refresh(host = process.env.NEST_EXTERN_URL, force) {
        var _a;
        if (!force && !this.theme.cache.refresh.active) {
            return;
        }
        this.visited = [];
        const startPath = ((_a = this.theme.cache.refresh) === null || _a === void 0 ? void 0 : _a.startPath) || '/';
        await this.deepRefresh([startPath], host);
        this.log.log('refresh done');
        this.log.log('refreshed: ' + JSON.stringify(this.visited, null, 2));
    }
};
RefreshCacheService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RefreshCacheService);
exports.RefreshCacheService = RefreshCacheService;
//# sourceMappingURL=refresh-cache.service.js.map