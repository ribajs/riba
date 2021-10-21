import { Component, TemplateFunction } from "@ribajs/core";
import type { PodlovePlayButtonComponentScope, PodloveWebPlayerStore } from "../../types";
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component";
export declare class PodlovePlayButtonComponent extends Component {
    static tagName: string;
    protected player?: PodloveWebPlayerComponent;
    _debug: boolean;
    static get observedAttributes(): string[];
    protected requiredAttributes(): string[];
    store?: PodloveWebPlayerStore;
    scope: PodlovePlayButtonComponentScope;
    constructor();
    protected connectedCallback(): void;
    protected loadConfigs(): Promise<void>;
    protected initConfigs(): Promise<void>;
    protected initWebPlayer(): Promise<PodloveWebPlayerComponent | undefined>;
    protected addEventListeners(): void;
    protected _onClick(): void;
    protected getEpisodePlaylistIndex(): number;
    protected selectEpisode(index: number): {
        type: import("../../types").PodloveWebPlayerStoreActionType;
        payload: any;
    } | undefined;
    protected onClick: () => void;
    protected afterBind(): Promise<void>;
    protected template(): ReturnType<TemplateFunction>;
}
