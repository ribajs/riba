import type { RequestInfo, RequestInit, Response, Body, BodyInit, FetchError, Headers, HeadersInit, Request, RequestRedirect, ResponseInit, ResponseType } from 'node-fetch';
export declare const fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
export default fetch;
export { RequestInfo, RequestInit, Response, Body, BodyInit, FetchError, Headers, HeadersInit, Request, RequestRedirect, ResponseInit, ResponseType, };
