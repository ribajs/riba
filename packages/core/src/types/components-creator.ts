import type { BasicComponent, Component } from "../component";
import type { PageComponent } from "@ribajs/ssr";

import { Components } from "./components";
/**
 * This wrapper is used if you need to pass over some dependencies for your components
 */
export type ComponentsCreator<
  T = BasicComponent | Component | PageComponent
> = (options: unknown) => Components<T>;
