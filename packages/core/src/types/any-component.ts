import type { BasicComponent, Component } from "../component";
import type { ClassOfComponent } from "./class-of-component";
import type { PageComponent } from "@ribajs/ssr";

export type AnyComponent<T = BasicComponent | Component | PageComponent> =
  ClassOfComponent<T>;
