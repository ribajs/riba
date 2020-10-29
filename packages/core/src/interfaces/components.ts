import { BasicComponent } from "../component";
import { TypeOfComponent } from "./type-of-component";

export interface Components<T = BasicComponent> {
  [name: string]: TypeOfComponent<T>;
}
