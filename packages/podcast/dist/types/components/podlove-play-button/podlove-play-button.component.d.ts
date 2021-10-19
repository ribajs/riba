import { Component, TemplateFunction } from "@ribajs/core";
import type { PodlovePlayButtonComponentScope, PodloveWebPlayerStore } from "../../types";
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component";
export declare class PodlovePlayButtonComponent extends Component {
    static tagName: string;
    protected player?: PodloveWebPlayerComponent;
    static get observedAttributes(): string[];
    protected requiredAttributes(): string[];
    store?: PodloveWebPlayerStore;
    scope: PodlovePlayButtonComponentScope;
    constructor();
    protected connectedCallback(): void;
    protected initConfigs(): void;
    protected setWebPlayer(): PodloveWebPlayerComponent | undefined;
    protected addEventListeners(): void;
    protected _onClick(): void;
    protected getEpisodePlaylistIndex(): number;
    protected selectEpisode(index: number): {
        type: import("../../types").PodloveWebPlayerStoreActionType;
        payload: any;
    } | undefined;
    protected onClick: () => void;
    protected afterBind(): Promise<void>;
    protected afterAllBind(): Promise<void>;
    protected template(): ReturnType<TemplateFunction>;
}
