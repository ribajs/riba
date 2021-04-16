import { Formatter } from "./formatter";

/**
 * This wrapper is used if you need to pass over some dependencies for your formatter
 */
export type FormatterCreator = (options: unknown) => Formatter;
