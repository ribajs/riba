import { Component } from "@ribajs/core";
import type { PodloveWebPlayerEpisode, PodloveWebPlayerConfig } from "../../types";
export interface Scope {
    episode?: PodloveWebPlayerEpisode;
    config?: PodloveWebPlayerConfig;
    episodeUrl: string;
    configUrl: string;
}
export declare class GyPodcastFixedWebPlayerComponent extends Component {
    static tagName: string;
    _debug: boolean;
    protected autobind: boolean;
    scope: Scope;
    static get observedAttributes(): string[];
    protected beforeBind(): Promise<void>;
    protected connectedCallback(): void;
    protected template(): string | null;
}
