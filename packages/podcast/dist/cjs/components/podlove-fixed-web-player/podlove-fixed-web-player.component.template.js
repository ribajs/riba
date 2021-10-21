"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
<button class="close" rv-on-click="close">×</button>
<podlove-web-player rv-class="position | prepend 'fixed-'" rv-id="playerId" rv-co-episode-url="episodeUrl" rv-co-config-url="configUrl" rv-co-episode="episode" rv-co-config="config" id="main-podcast-player">
    <root style="max-width:100%;min-width:100%;">
        <div class="flex flex-col p-3">
            <div class="flex-grow mobile:flex tablet:flex">
                <div class="w-32 mobile:hidden tablet:block tablet:mr-3">
                    <poster class="rounded-sm shadow overflow-hidden"></poster>
                </div>
                <div class="w-full">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <episode-title class="text-xl leading-tight desktop:text-2xl"></episode-title>
                            <play-state on="active">
                                <current-chapter class="block text-sm ml-3 mobile:hidden"></current-chapter>
                            </play-state>
                        </div>
                        <subscribe-button class="flex"></subscribe-button>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="block" style="min-width:50px;">
                            <timer-current class="text-sm"></timer-current>
                        </div>
                        <div class="flex">
                            <play-state on="active">
                                <chapter-previous class="mx-2 block"></chapter-previous>
                            </play-state>
                            <play-state on="active">
                                <step-backward class="mx-2 block"></step-backward>
                            </play-state>
                            <play-button class="mx-2 block" :label="$t('PLAYER.PLAY_EPISODE')"></play-button>
                            <play-state on="active">
                                <step-forward class="mx-2 block"></step-forward>
                            </play-state>
                            <play-state on="active">
                                <chapter-next class="mx-2 block"></chapter-next>
                            </play-state>
                        </div>
                        <div class="block" style="min-width:50px;">
                            <timer-duration class="text-sm"></timer-duration>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <progress-bar></progress-bar>
                    </div>
                </div>
            </div>
        </div>
        <error></error>
    </root>
</podlove-web-player>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1maXhlZC13ZWItcGxheWVyLmNvbXBvbmVudC50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvZGxvdmUtZml4ZWQtd2ViLXBsYXllci9wb2Rsb3ZlLWZpeGVkLXdlYi1wbGF5ZXIuY29tcG9uZW50LnRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQWtETyxDQUFBIn0=