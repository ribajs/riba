import { Component } from '../components';
import { ComponentWrapper } from './component.wrapper';
export interface IComponents {
    [name: string]: typeof Component | ComponentWrapper;
}
