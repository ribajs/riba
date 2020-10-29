import { BasicComponent } from "../component";
import { TypeOf } from "./type-of";

export interface TypeOfComponent<T = BasicComponent> extends TypeOf<T> {
  tagName: string;
}
