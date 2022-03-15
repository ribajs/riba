import { AnyConstructor } from "./any-constructor.js";
import { AnySingleton } from "./any-singleton.js";

/**
 * Type of any class
 * @see https://stackoverflow.com/questions/39976329/typescript-type-to-represent-any-class
 */
export type AnyService<T = unknown,> = AnyConstructor | AnySingleton<T>;
