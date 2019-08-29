import { Component, Debug, IBinder } from '@ribajs/core';
import { DropdownService } from '../../services/dropdown.service';
export declare class DropdownComponent extends Component {
    static tagName: string;
    protected debug: Debug.Debugger;
    protected scope: any;
    protected dropdownService: DropdownService;
    static readonly observedAttributes: never[];
    constructor(element?: HTMLElement);
    toggle(context: IBinder<any>, event: Event): void;
    protected template(): null;
}
