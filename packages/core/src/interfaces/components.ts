import { Component } from "../component";
import { Type } from "../interfaces/type";

export interface TypeOfComponent<T = Component> extends Type<T> {
  tagName: string;
}

export interface Components {
  [name: string]: TypeOfComponent;
}
