import type {
  RequestInfo,
  RequestInit,
  Response,
  Body,
  BodyInit,
  FetchError,
  Headers,
  HeadersInit,
  Request,
  RequestRedirect,
  ResponseInit,
  ResponseType,
} from 'node-fetch';

// Import ESM Module into CommonJS
// See https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
export const fetch = async (
  url: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  const { default: _fetch } = await import('node-fetch');
  return _fetch(url, init);
};

export default fetch;

export {
  RequestInfo,
  RequestInit,
  Response,
  Body,
  BodyInit,
  FetchError,
  Headers,
  HeadersInit,
  Request,
  RequestRedirect,
  ResponseInit,
  ResponseType,
};
