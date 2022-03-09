import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import type { PodlovePlayButtonComponentScope, PodloveWebPlayerStore } from "../../types/index.js";
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component.js";
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
    play(): Promise<void>;
    protected getEpisodePlaylistIndex(): number;
    protected selectEpisode(index: number): Promise<{
        type: import("../../types/podlove-web-player-store-action-type").PodloveWebPlayerStoreActionType;
        payload: any;
    } | undefined>;
    protected afterBind(): Promise<void>;
    protected template(): ReturnType<TemplateFunction>;
}
