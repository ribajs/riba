import { RibaComponent } from '../components/riba-component';

export interface IModuleComponents {
  [name: string]: typeof RibaComponent;
}
