import type { BasicComponent, Component } from "../component/index.js";
import type { ClassOfComponent } from "./class-of-component.js";
import type { PageComponent } from "@ribajs/ssr";

export interface Components<T = BasicComponent | Component | PageComponent> {
  [name: string]: ClassOfComponent<T>;
}
