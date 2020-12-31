import { concat } from "@ribajs/utils/src/type";
import { HttpMethod } from "../interfaces/http-method";
import { HttpServiceOptions } from "../interfaces/http-service-options";

export class HttpService {
  /**
   * Set header for each request
   * @param name Header name
   * @param value Hander value
   */
  public static setRequestHeaderEachRequest(name: string, value: string) {
    this._requestHeadersEachRequest.push({
      name,
      value,
    });
    // console.debug(
    //   "[HttpService] setRequestHeaderEachRequest",
    //   name,
    //   value,
    //   this._requestHeadersEachRequest
    // );
  }

  /**
   * Load JSON-encoded data from the server using a GET HTTP request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @see https://api.jquery.com/jquery.getjson/
   */
  public static async getJSON<T = any>(url: string, data?: any) {
    return this.fetch<T>(url, "GET", data, "json");
  }

  /**
   * Load data from the server using a HTTP POST request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
   * @see https://api.jquery.com/jquery.post/
   */
  public static async post(
    url: string,
    data?: any,
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch(url, "POST", data, dataType, headers, options);
  }

  public static async delete(
    url: string,
    data?: any,
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch(url, "DELETE", data, dataType, headers, options);
  }

  public static async put(
    url: string,
    data?: any,
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch(url, "PUT", data, dataType, headers, options);
  }

  /**
   * Load data from the server using a HTTP GET request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
   * @see https://api.jquery.com/jquery.get/
   */
  public static async get(
    url: string,
    data?: any,
    dataType?: string,
    headers: any = {},
    options: HttpServiceOptions = {}
  ) {
    return this.fetch(url, "GET", data, dataType, headers, options);
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
      /*case "multi-form":
        contentType = "multipart/form-data";
        break;*/
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
  ): Promise<T | void> {
    if (!fetch) {
      return console.error(
        "Your browser does not support the fetch API, use xhr instead or install a polyfill."
      );
    }
    let body;
    // headers
    for (const header of this._requestHeadersEachRequest) {
      headers[header.name] = header.value;
    }

    if (dataType) {
      headers = concat(false, headers, this.parseDataType(dataType));
    }

    if (!options.crossDomain && !headers["X-Requested-With"]) {
      headers["X-Requested-With"] = "XMLHttpRequest";
    }

    const cache = options.cache ? options.cache : "default";

    if (method === "GET" && data) {
      const queryStr = new URLSearchParams(data).toString();
      if (queryStr) {
        const seperator = url.includes("?") ? "&" : "?";
        url = url + seperator + new URLSearchParams(data).toString();
      }
    } else if (data) {
      if (dataType === "form") {
        body = new URLSearchParams(data);
      } else {
        body = JSON.stringify(data);
      }
    }
    // console.debug("[HttpService] url", url);
    // console.debug("[HttpService] method", method);
    // console.debug("[HttpService] body", body);
    // console.debug(
    //   "[HttpService] headers",
    //   headers,
    //   this._requestHeadersEachRequest
    // );
    return fetch(url, {
      credentials: "same-origin",
      cache,
      method,
      body,
      headers,
    })
      .then((response) => {
        if (response.status >= 400) {
          throw response;
        }
        if (
          typeof dataType === "string" &&
          (dataType === "json" || dataType.includes("json")) &&
          typeof response.json === "function"
        ) {
          try {
            return response.json();
          } catch (error) {
            return response.text();
          }
        }
        return response.text();
      })
      .catch((error) => {
        // console.error(error);
        throw error;
      });
  }

  /**
   * Header name value pair to send on each request
   */
  protected static _requestHeadersEachRequest: {
    name: string;
    value: string;
  }[] = [];
}
