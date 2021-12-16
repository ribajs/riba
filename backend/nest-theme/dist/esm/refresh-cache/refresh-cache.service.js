var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RefreshCacheService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetch } from '../dependencies/fetch';
import * as cheerio from 'cheerio';
let RefreshCacheService = RefreshCacheService_1 = class RefreshCacheService {
    constructor(config) {
        this.config = config;
        this.visited = [];
        this.log = new Logger(this.constructor.name);
        const theme = config.get('theme');
        if (!theme) {
            throw new Error('Theme config not defined!');
        }
        this.theme = theme;
    }
    async onApplicationBootstrap() {
        setTimeout(async () => {
            await this.refresh(process.env.NEST_REMOTE_URL);
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
            if (link) {
                links.push(link);
            }
        }
        return links;
    }
    async deepRefresh(links, host) {
        for (const link of links) {
            if (!this.followLink(link, host)) {
                continue;
            }
            const url = this.normalize(link, host);
            if (this.alreadyVisited(url)) {
                continue;
            }
            this.visited.push(url);
            this.log.log('refresh ' + url);
            const response = await fetch(url);
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
    async refresh(host = process.env.NEST_REMOTE_URL, force) {
        if (!host) {
            this.log.warn('Host not set!');
            return;
        }
        if (!force && !this.theme.cache.refresh?.active) {
            return;
        }
        if (RefreshCacheService_1.isRunning) {
            this.log.log('refresh is already running');
            return;
        }
        RefreshCacheService_1.isRunning = true;
        this.visited = [];
        const startPath = this.theme.cache.refresh?.startPath || '/';
        try {
            await this.deepRefresh([startPath], host);
        }
        finally {
            RefreshCacheService_1.isRunning = false;
        }
        this.log.log('refresh done');
        this.log.log('refreshed: ' + JSON.stringify(this.visited, null, 2));
    }
};
RefreshCacheService.isRunning = false;
RefreshCacheService = RefreshCacheService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], RefreshCacheService);
export { RefreshCacheService };
//# sourceMappingURL=refresh-cache.service.js.map