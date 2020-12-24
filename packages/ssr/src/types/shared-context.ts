import type { EventDispatcher } from "@ribajs/events";
import type { Request } from "express";

interface ExpressRoute extends Partial<Request["route"]> {
  path: string;
}

export interface SharedContext {
  events: EventDispatcher;
  ctx: {
    // See https://expressjs.com/de/api.html#req
    app: Request["app"];
    baseUrl: Request["baseUrl"];
    body: Request["body"];
    cookies: Request["cookies"];
    fresh: Request["fresh"];
    hostname: Request["hostname"];
    ip: Request["ip"];
    ips: Request["ips"];
    method: Request["method"];
    originalUrl: Request["originalUrl"];
    params: Request["params"];
    path: Request["path"];
    protocol: Request["protocol"];
    query: Request["query"];
    route: ExpressRoute;
    secure: Request["secure"];
    signedCookies: Request["signedCookies"];
    stale: Request["stale"];
    subdomains: Request["subdomains"];
    xhr: Request["xhr"];
  };
}
