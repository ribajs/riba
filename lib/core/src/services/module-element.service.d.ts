import { Debug } from '../vendors';
export declare type Element = any;
export interface IElements {
    [key: string]: Element;
}
export declare abstract class ModuleElementService {
    protected elements: IElements;
    protected abstract type: 'binder' | 'formatter' | 'components' | 'services';
    protected debug: Debug.Debugger;
    /**
     *
     * @param elements;
     */
    constructor(elements: IElements);
    /**
     * Regist a element
     * @param element
     * @param name  Overwrites the name to access the element over
     */
    abstract regist(element: Element, name?: string): IElements;
    /**
     * Regist a set / array of elements
     * @param elements
     */
    regists(elements: IElements): IElements;
}
