import type { FullThemeConfig } from "../types/index.ts";
import { Inject } from "https://deno.land/x/alosaur@v0.35.1/mod.ts";
import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";

export class RefreshCacheService {
  private visited: string[] = [];
  private log = console;
  public static isRunning = false;
  constructor(@Inject("theme") readonly theme: FullThemeConfig) {
    if (!theme) {
      throw new Error("Theme config not defined!");
    }
    this.theme = theme;
  }

  onApplicationBootstrap() {
    setTimeout(async () => {
      await this.refresh(Deno.env.get("ALOSAUR_REMOTE_URL"));
    }, 3000);
  }

  private isInternalLink(link: string, host: string) {
    if (
      link.startsWith("tel:") ||
      link.startsWith("mailto:") ||
      link.startsWith("#")
    ) {
      return false;
    }

    if (link.startsWith(host) || link.startsWith("/")) {
      return true;
    }

    return false;
  }

  private normalize(link: string, host: string) {
    if (link.startsWith(host)) {
      return host;
    }
    if (host.endsWith("/")) {
      host = host.substring(0, host.length - 1);
    }

    if (link.startsWith("/")) {
      link = link.substring(1);
    }

    return host + "/" + link;
  }

  private alreadyVisited(link: string) {
    return this.visited.indexOf(link) !== -1;
  }

  private followLink(link: string, host: string) {
    return !this.alreadyVisited(link) && this.isInternalLink(link, host);
  }

  private parseLinks(html: string) {
    const $ = cheerio.load(html);
    const $anchors = $("a[href]");

    const links: string[] = [];

    for (const anchor of $anchors.toArray()) {
      const $anchor = $(anchor);
      const link = $anchor.attr("href");
      if (link) {
        links.push(link);
      }
    }

    return links;
  }

  private async deepRefresh(links: string[], host: string) {
    for (const link of links) {
      if (!this.followLink(link, host)) {
        continue;
      }
      const url = this.normalize(link, host);
      if (this.alreadyVisited(url)) {
        continue;
      }
      this.visited.push(url);
      this.log.log("refresh " + url);
      const response = await fetch(url);
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("text/html")) {
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
    host = Deno.env.get("ALOSAUR_REMOTE_URL"),
    force?: boolean,
  ) {
    if (!host) {
      throw new Error("The host is required");
    }
    if (!force && !this.theme.cache.refresh?.active) {
      return;
    }
    if (RefreshCacheService.isRunning) {
      this.log.log("refresh is already running");
      return;
    }
    RefreshCacheService.isRunning = true;
    this.visited = [];
    const startPath = this.theme.cache.refresh?.startPath || "/";
    try {
      await this.deepRefresh([startPath], host);
    } finally {
      RefreshCacheService.isRunning = false;
    }

    this.log.log("refresh done");
    this.log.log("refreshed: " + JSON.stringify(this.visited, null, 2));
  }
}
