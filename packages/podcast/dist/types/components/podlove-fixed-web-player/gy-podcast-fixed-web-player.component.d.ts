import { Component, ScopeBase } from "@ribajs/core";
import { PodloveWebPlayerTab } from "@ribajs/podcast";
export interface Scope extends ScopeBase {
    episodeConfigUrl: string;
    configUrl: string;
    activeTab: PodloveWebPlayerTab;
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
