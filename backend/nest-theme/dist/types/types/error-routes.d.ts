import { ErrorRoute } from './error-route';
export interface ErrorRoutes {
    [statusCode: number]: ErrorRoute;
}
