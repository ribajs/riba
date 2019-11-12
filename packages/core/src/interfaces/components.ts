import { Component } from '../component';
import { ComponentWrapper } from './component.wrapper';
import { Type } from '../interfaces/type';

export interface Components {
  [name: string]: Type<Component> | ComponentWrapper;
}
