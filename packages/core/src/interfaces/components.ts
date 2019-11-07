import { Component } from '../component';
import { ComponentWrapper } from './component.wrapper';

export interface Components {
  [name: string]: typeof Component | ComponentWrapper;
}
