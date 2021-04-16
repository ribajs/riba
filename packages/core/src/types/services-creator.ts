import { Services } from "./services";

/**
 * This wrapper is used if you need to pass over some dependencies for your services
 */
export type ServicesCreator = (options: unknown) => Services;
