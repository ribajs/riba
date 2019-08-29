import { IComponents } from '../interfaces';
import { Component } from '../components';
import { ModuleElementService } from './module-element.service';
export declare class ComponentService extends ModuleElementService {
    protected type: 'binder' | 'formatter' | 'components' | 'services';
    /**
     *
     * @param components
     */
    constructor(components: IComponents);
    /**
     * Regist a component with his name
     * @param component
     * @param name
     */
    regist(component: typeof Component, fallbackName?: string, forceFallback?: boolean): IComponents;
}
