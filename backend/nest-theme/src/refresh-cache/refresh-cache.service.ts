import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import type { FullThemeConfig } from '../types/theme-config';
import * as cheerio from 'cheerio';

@Injectable()
export class RefreshCacheService implements OnApplicationBootstrap {
  protected theme: FullThemeConfig;
  protected visited: string[] = [];
  protected log = new Logger(this.constructor.name);
  constructor(protected readonly config: ConfigService) {
    this.theme = config.get<FullThemeConfig>('theme');
  }

  async onApplicationBootstrap(): Promise<void> {
    setTimeout(async () => {
      await this.refresh(process.env.NEST_EXTERN_URL);
    }, 3000);
  }

  protected isInternalLink(link: string, host: string) {
    if (
      link.startsWith('tel:') ||
      link.startsWith('mailto:') ||
      link.startsWith('#')
    ) {
      return false;
    }

    if (link.startsWith(host) || link.startsWith('/')) {
      return true;
    }

    return false;
  }

  protected normalize(link: string, host: string) {
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

  protected alreadyVisited(link: string) {
    return this.visited.indexOf(link) !== -1;
  }

  protected followLink(link: string, host: string) {
    return !this.alreadyVisited(link) && this.isInternalLink(link, host);
  }

  protected parseLinks(html: string) {
    const $ = cheerio.load(html);
    const $anchors = $('a[href]');

    const links: string[] = [];

    for (const anchor of $anchors) {
      const $anchor = $(anchor);
      const link = $anchor.attr('href');
      links.push(link);
    }

    return links;
  }

  protected async deepRefresh(links: string[], host: string) {
    for (const link of links) {
      if (!this.followLink(link, host)) {
        continue;
      }
      const url = this.normalize(link, host);
      this.visited.push(link);
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

  // TODO set host to global config modules
  public async refresh(
    host: string = process.env.NEST_EXTERN_URL,
    force?: boolean,
  ) {
    if (!force && !this.theme.cache.refresh.active) {
      return;
    }
    this.visited = [];
    const startPath = this.theme.cache.refresh?.startPath || '/';
    await this.deepRefresh([startPath], host);
    this.log.log('refresh done');
    this.log.log('refreshed: ' + JSON.stringify(this.visited, null, 2));
  }
}
