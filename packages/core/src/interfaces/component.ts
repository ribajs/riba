import { RibaComponent } from '../components/riba-component';
import { IModuleBinders, IModuleFormatters, IAdapters, IBindable } from './';

export interface IModuleComponents {
  [name: string]: typeof RibaComponent;
}

export interface IComponents {
  [name: string]: typeof RibaComponent;
}
export type ComponentWrapper = (...deps: any[]) => RibaComponent;
