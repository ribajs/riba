import { Component } from "../component";
import { TypeOf } from "./type-of";

export interface TypeOfComponent<T = Component> extends TypeOf<T> {
  tagName: string;
}

export interface Components {
  [name: string]: TypeOfComponent;
}
