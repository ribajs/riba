import { ErrorRoute } from "./error-route.ts";

export interface ErrorRoutes {
  [statusCode: number]: ErrorRoute;
}
