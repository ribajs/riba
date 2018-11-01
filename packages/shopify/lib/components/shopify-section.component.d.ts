import { RibaComponent, JQuery } from '@ribajs/core';
export declare abstract class ShopifySectionComponent extends RibaComponent {
    static tagName: string;
    protected debug: any;
    protected $el: JQuery<HTMLElement>;
    protected abstract scope: any;
    constructor(element?: HTMLElement);
    protected abstract template(): string | null;
    /**
     * A section has been added or re-rendered.
     * Re-execute any JavaScript needed for the section to work and display properly (as if the page had just been loaded).
     */
    protected onSectionLoad(event: JQuery.Event, data: any): void;
    protected onSectionUnload(event: JQuery.Event, data: any): void;
    protected onSectionSelect(event: JQuery.Event, data: any): void;
    protected onSectionDeselect(event: JQuery.Event, data: any): void;
    protected onSectionReorder(event: JQuery.Event, data: any): void;
    protected onBlockSelect(event: JQuery.Event, data: any): void;
    protected onBlockDeselect(event: JQuery.Event, data: any): void;
}
