import type { RequestInfo, RequestInit, Response, AbortError, AbortSignal, Body, BodyInit, BodyMixin, FetchError, Headers, HeadersInit, ReferrerPolicy, Request, RequestRedirect, ResponseInit, ResponseType, isRedirect } from 'node-fetch';
export declare const fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
export default fetch;
export { RequestInfo, RequestInit, Response, AbortError, AbortSignal, Body, BodyInit, BodyMixin, FetchError, Headers, HeadersInit, ReferrerPolicy, Request, RequestRedirect, ResponseInit, ResponseType, isRedirect, };
