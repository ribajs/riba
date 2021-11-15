import { Component } from "@ribajs/core";
import type { PodloveWebPlayerEpisode, PodloveWebPlayerConfig, PodloveWebPlayerStore } from "@podlove/types";
import type { PodloveWebPlayerComponent } from "../podlove-web-player/podlove-web-player.component";
export interface Scope {
    episode?: PodloveWebPlayerEpisode;
    config?: PodloveWebPlayerConfig;
    episodeUrl: string;
    configUrl: string;
    playerId: string;
    position: "top" | "bottom";
    show: PodloveFixedWebPlayerComponent["show"];
    hide: PodloveFixedWebPlayerComponent["hide"];
}
export declare class PodloveFixedWebPlayerComponent extends Component {
    static tagName: string;
    _debug: boolean;
    protected autobind: boolean;
    protected player?: PodloveWebPlayerComponent;
    protected store?: PodloveWebPlayerStore;
    scope: Scope;
    static get observedAttributes(): string[];
    protected connectedCallback(): void;
    protected initWebPlayer(): Promise<PodloveWebPlayerComponent | undefined>;
    show(): void;
    hide(): void;
    protected afterBind(): Promise<void>;
    protected template(): "\n<button class=\"close\" rv-on-click=\"hide\">×</button>\n<podlove-web-player rv-id=\"playerId\" rv-co-episode-url=\"episodeUrl\" rv-co-config-url=\"configUrl\" rv-co-episode=\"episode\" rv-co-config=\"config\" id=\"main-podcast-player\">\n    <root style=\"max-width:100%;min-width:100%;\">\n        <div class=\"flex flex-col p-3\">\n            <div class=\"flex-grow mobile:flex tablet:flex\">\n                <div class=\"w-32 mobile:hidden tablet:block tablet:mr-3\">\n                    <poster class=\"rounded-sm shadow overflow-hidden\"></poster>\n                </div>\n                <div class=\"w-full\">\n                    <div class=\"flex items-center justify-between\">\n                        <div class=\"flex items-center\">\n                            <episode-title class=\"text-xl leading-tight desktop:text-2xl\"></episode-title>\n                            <play-state on=\"active\">\n                                <current-chapter class=\"block text-sm ml-3 mobile:hidden\"></current-chapter>\n                            </play-state>\n                        </div>\n                        <subscribe-button class=\"flex mr-8\"></subscribe-button>\n                    </div>\n                    <div class=\"flex items-center justify-between\">\n                        <div class=\"block\" style=\"min-width:50px;\">\n                            <timer-current class=\"text-sm\"></timer-current>\n                        </div>\n                        <div class=\"flex\">\n                            <play-state on=\"active\">\n                                <chapter-previous class=\"mx-2 block\"></chapter-previous>\n                            </play-state>\n                            <play-state on=\"active\">\n                                <step-backward class=\"mx-2 block\"></step-backward>\n                            </play-state>\n                            <play-button class=\"mx-2 block\" :label=\"$t('PLAYER.PLAY_EPISODE')\"></play-button>\n                            <play-state on=\"active\">\n                                <step-forward class=\"mx-2 block\"></step-forward>\n                            </play-state>\n                            <play-state on=\"active\">\n                                <chapter-next class=\"mx-2 block\"></chapter-next>\n                            </play-state>\n                        </div>\n                        <div class=\"block\" style=\"min-width:50px;\">\n                            <timer-duration class=\"text-sm\"></timer-duration>\n                        </div>\n                    </div>\n                    <div class=\"flex w-full\">\n                        <progress-bar></progress-bar>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <error></error>\n    </root>\n</podlove-web-player>\n" | null;
}
