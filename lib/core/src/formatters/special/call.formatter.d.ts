import { IFormatter } from '../../interfaces';
export declare type IFormatterFuntionParam = (this: any, ...args: any[]) => any;
/**
 * Calls a function with arguments
 * @param fn The function you wish to call
 * @param args the parameters you wish to call the function with
 */
export declare const call: IFormatter;
