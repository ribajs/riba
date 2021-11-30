import type { BasicComponent, Component } from "../component";
import type { ClassOfComponent } from "./class-of-component";
import type { PageComponent } from "@ribajs/ssr";

export interface Components<T = BasicComponent | Component | PageComponent> {
  [name: string]: ClassOfComponent<T>;
}
