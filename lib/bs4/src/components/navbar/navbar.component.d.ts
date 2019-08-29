import { Component, Debug, IBinder } from '@ribajs/core';
import { CollapseService } from '../../services/collapse.service';
export declare class NavbarComponent extends Component {
    static tagName: string;
    protected debug: Debug.Debugger;
    protected scope: any;
    protected collapseService: CollapseService;
    static readonly observedAttributes: never[];
    constructor(element?: HTMLElement);
    toggle(context: IBinder<any>, event: Event): void;
    protected template(): null;
}
