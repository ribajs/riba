import { vi } from "vitest";
import { HttpService } from "@ribajs/core";

type FetchBody = string;

const asResponse = (body: string) =>
  ({
    body,
  }) as unknown;

export const installHttpGetMock = (bodiesByUrl: Record<string, FetchBody>) => {
  return vi
    .spyOn(HttpService, "get")
    .mockImplementation(async (url: string) => {
      const body = bodiesByUrl[url];
      if (body === undefined) {
        throw new Error(`Missing mocked response for url: ${url}`);
      }
      return asResponse(body);
    });
};
