import { PodloveWebPlayerShow } from "./podlove-web-player-show";
import { PodloveWebPlayerChapter } from "./podlove-web-player-chapter";
import { PodloveWebPlayerAudio } from "./podlove-web-player-audio";
import { PodloveWebPlayerFile } from "./podlove-web-player-file";
import { PodloveWebPlayerContributor } from "./podlove-web-player-contributor";
import { PodloveWebPlayerTranscript } from "./podlove-web-player-transcript";
export interface PodloveWebPlayerEpisode {
    version: 5;
    show: PodloveWebPlayerShow;
    title: string;
    subtitle: string;
    summary: string;
    publicationDate: string;
    duration: string;
    poster: string;
    link: string;
    chapters: string | PodloveWebPlayerChapter[];
    audio: PodloveWebPlayerAudio[];
    files: PodloveWebPlayerFile[];
    contributors: PodloveWebPlayerContributor[];
    transcripts: string | PodloveWebPlayerTranscript[];
}
