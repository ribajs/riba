import { EventDispatcher } from "@ribajs/events";

export class AppApiService {
  protected event = new EventDispatcher("main");

  constructor() {
    this.registEvents();
  }

  async request(url: string, body?: any) {
    return new Promise((resolve) => {
      this.onceResponse(url, (response) => {
        // TODO implement timeout?
        resolve(response);
      });
      window.app.request(url, body);
    });
  }

  protected onResponse(
    url: string,
    cb: (...args: any) => void,
    thisContext: any = this
  ) {
    return this.event.on("response-" + url, cb, thisContext);
  }

  protected offResponse(
    url: string,
    cb: (...args: any) => void,
    thisContext: any = this
  ) {
    return this.event.off("response-" + url, cb, thisContext);
  }

  protected onceResponse(url: string, cb: (...args: any) => void) {
    const _cb = (data: any) => {
      cb(data);
      return this.offResponse(url, _cb);
    };
    this.onResponse(url, _cb);
  }

  protected registEvents() {
    const validUrls = ["main/hello", "main/versions"];
    for (const validUrl of validUrls) {
      window.app.response(validUrl, (data) => {
        console.debug("[AppApiService] response", validUrl, data);
        this.event.trigger("response-" + validUrl, data);
      });
    }
  }
}
