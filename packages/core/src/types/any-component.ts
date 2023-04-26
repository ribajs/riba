import type { BasicComponent, Component } from "../component/index.js";
import type { ClassOfComponent } from "./class-of-component.js";
import type { PageComponent } from "@ribajs/ssr";

export type AnyComponent<T = BasicComponent | Component | PageComponent> =
  ClassOfComponent<T>;
