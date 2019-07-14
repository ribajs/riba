import { AbstractRibaComponent } from '../components';

export interface IModuleComponents {
  [name: string]: typeof AbstractRibaComponent;
}

export interface IComponents {
  [name: string]: typeof AbstractRibaComponent;
}
export type ComponentWrapper = (...deps: any[]) => AbstractRibaComponent;
