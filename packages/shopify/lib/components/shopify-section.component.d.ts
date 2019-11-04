import { Component } from '@ribajs/core';
export declare abstract class ShopifySectionComponent extends Component {
    static tagName: string;
    protected abstract scope: any;
    constructor(element?: HTMLElement);
    protected initEventListeners(): void;
    protected abstract template(): string | null;
    /**
     * A section has been added or re-rendered.
     * Re-execute any JavaScript needed for the section to work and display properly (as if the page had just been loaded).
     */
    protected onSectionLoad(event: Event): void;
    protected onSectionUnload(event: Event): void;
    protected onSectionSelect(event: Event): void;
    protected onSectionDeselect(event: Event): void;
    protected onSectionReorder(event: Event): void;
    protected onBlockSelect(event: Event): void;
    protected onBlockDeselect(event: Event): void;
}
