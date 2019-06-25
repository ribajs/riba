import { AbstractRibaComponent } from '../components';
import { IModuleBinders, IModuleFormatters, IAdapters, IBindable } from './';

export interface IModuleComponents {
  [name: string]: typeof AbstractRibaComponent;
}

export interface IComponents {
  [name: string]: typeof AbstractRibaComponent;
}
export type ComponentWrapper = (...deps: any[]) => AbstractRibaComponent;
