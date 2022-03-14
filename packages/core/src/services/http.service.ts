import { extend, isJson } from "@ribajs/utils/src/type.js";
import { HttpMethod } from "../types/http-method.js";
import { HttpServiceOptions, HttpServiceResponse } from "../types/index.js";

export class HttpService {
  /**
   * Set header for each request
   * @param name Header name
   * @param value Header value
   */
  public static setRequestHeaderEachRequest(name: string, value: string) {
    this._requestHeadersEachRequest.push({
      name,
      value,
    });
  }

  /**
   * Load JSON-encoded data from the server using a GET HTTP request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @see https://api.jquery.com/jquery.getjson/
   */
  public static async getJSON<T = any>(
    url: string,
    data?: any,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch<T>(url, "GET", data, "json", headers, options);
  }

  /**
   * Load data from the server using a HTTP POST request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
   * @see https://api.jquery.com/jquery.post/
   */
  public static async post<T = any>(
    url: string,
    data?: any,
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch<T>(url, "POST", data, dataType, headers, options);
  }

  public static async delete<T = any>(
    url: string,
    data?: any,
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch<T>(url, "DELETE", data, dataType, headers, options);
  }

  public static async put<T = any>(
    url: string,
    data?: any,
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch<T>(url, "PUT", data, dataType, headers, options);
  }

  /**
   * Load data from the server using a HTTP GET request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
   * @see https://api.jquery.com/jquery.get/
   */
  public static async get<T = any>(
    url: string,
    data?: any,
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch<T>(url, "GET", data, dataType, headers, options);
  }

  /**
   *
   * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
   */
  public static parseDataType(dataType: string) {
    const headers: { "Content-Type"?: string; Accept?: string } = {};
    let contentType = "application/x-www-form-urlencoded";
    let accept = "*/*";
    switch (dataType) {
      case "script":
        contentType = "application/javascript";
        break;
      case "json":
        contentType = "application/json";
        accept = "application/json, text/javascript";
        break;
      case "xml":
        contentType = "application/xml";
        accept = "application/xml, text/xml";
        break;
      case "text":
        contentType = "text/plain";
        accept = "text/plain";
        break;
      case "html":
        contentType = "text/html";
        accept = "text/html";
        break;
      case "form":
        contentType = "application/x-www-form-urlencoded";
        break;
      // case "multi-form":
      //   contentType = "multipart/form-data";
      //   break;
    }
    if (contentType) {
      headers["Content-Type"] = contentType;
      // tslint:disable-next-line:no-string-literal
      headers["Accept"] = accept;
    }
    return headers;
  }

  public static async fetch<T = any>(
    url: string,
    method: HttpMethod = "GET",
    data: any = {},
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ): Promise<HttpServiceResponse<T>> {
    if (!fetch) {
      throw new Error(
        "Your browser does not support the fetch API, use xhr instead or install a polyfill."
      );
    }

    let body;
    // headers
    for (const header of this._requestHeadersEachRequest) {
      headers[header.name] = header.value;
    }

    if (dataType) {
      headers = extend({ deep: false }, headers, this.parseDataType(dataType));
    }

    if (!options.crossDomain && !headers["X-Requested-With"]) {
      headers["X-Requested-With"] = "XMLHttpRequest";
    }

    const cache = options.cache ? options.cache : "default";

    if (method === "GET" && data) {
      const queryStr = new URLSearchParams(data).toString();
      if (queryStr) {
        const separator = url.includes("?") ? "&" : "?";
        url = url + separator + new URLSearchParams(data).toString();
      }
    } else if (data) {
      if (dataType === "form") {
        body = new URLSearchParams(data);
      } else {
        body = JSON.stringify(data);
      }
    }
    const response = await fetch(url, {
      credentials: "same-origin",
      cache,
      method,
      body,
      headers,
      mode: options.mode || "cors",
    });

    let bodyResult = (await response.text()) as unknown as T;
    if (typeof bodyResult === "string" && isJson(bodyResult)) {
      bodyResult = JSON.parse(bodyResult);
    }

    if (typeof bodyResult === "string") {
      switch (bodyResult) {
        case "null":
          bodyResult = null as unknown as T;
          break;
        case "true":
          bodyResult = true as unknown as T;
          break;
        case "false":
          bodyResult = false as unknown as T;
          break;
        case "undefined":
          bodyResult = undefined as unknown as T;
          break;
      }
    }

    const result: HttpServiceResponse<T> = {
      status: response.status,
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      statusText: response.statusText,
      // trailer: response.trailer,
      type: response.type,
      url: response.url,
      arrayBuffer: response.arrayBuffer,
      blob: response.blob,
      bodyUsed: response.bodyUsed,
      clone: response.clone,
      formData: response.formData,
      text: response.text,
      body: bodyResult,
    };
    return result;
  }

  /**
   * Header name value pair to send on each request
   */
  protected static _requestHeadersEachRequest: {
    name: string;
    value: string;
  }[] = [];
}
