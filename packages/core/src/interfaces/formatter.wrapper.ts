import { IFormatter } from './formatter';
/**
 * This wrapper i used to store the binder name in the name property
 */
export interface IFormatterWrapper {
  name: string;
  formatter: IFormatter;
}
