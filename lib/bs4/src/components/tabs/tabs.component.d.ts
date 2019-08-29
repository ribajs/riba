/// <reference types="jquery" />
import { Component, Debug } from '@ribajs/core';
export declare class TabsComponent extends Component {
    static tagName: string;
    protected debug: Debug.Debugger;
    protected scope: any;
    private $el;
    private $tabs;
    private $tabPanes;
    private $scrollable;
    private tabsSameHeight;
    static readonly observedAttributes: never[];
    constructor(element?: HTMLElement);
    /**
     * Make all tabs panes as height as the heighest tab pane
     */
    setHeight(): void;
    deactivateAll(): void;
    activate($tab: JQuery<HTMLElement>): void;
    protected afterBind(): Promise<any>;
    protected template(): null;
}
