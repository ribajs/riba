import { BasicComponent, Component } from "../component";
import { TypeOfComponent } from "./type-of-component";

export interface Components<T = BasicComponent | Component> {
  [name: string]: TypeOfComponent<T>;
}
