import { Formatters } from "./formatters";

/**
 * This wrapper is used if you need to pass over some dependencies for your formatter
 */
export type FormattersCreator = (options: unknown) => Formatters;
