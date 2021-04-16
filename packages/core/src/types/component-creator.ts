import { AnyComponent } from "./any-component";
import type { BasicComponent, Component } from "../component";
import type { PageComponent } from "@ribajs/ssr";

/**
 * This wrapper is used if you need to pass over some dependencies for your components
 */
export type ComponentCreator<T = BasicComponent | Component | PageComponent> = (
  options: unknown
) => AnyComponent<T>;
