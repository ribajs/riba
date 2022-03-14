import { PodloveWebPlayerShow } from "./podlove-web-player-show.js";
import { PodloveWebPlayerChapter } from "./podlove-web-player-chapter.js";
import { PodloveWebPlayerAudio } from "./podlove-web-player-audio.js";
import { PodloveWebPlayerFile } from "./podlove-web-player-file.js";
import { PodloveWebPlayerContributor } from "./podlove-web-player-contributor.js";
import { PodloveWebPlayerTranscript } from "./podlove-web-player-transcript.js";
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
    chapters?: string | PodloveWebPlayerChapter[];
    audio: PodloveWebPlayerAudio[];
    files?: PodloveWebPlayerFile[];
    contributors?: PodloveWebPlayerContributor[];
    transcripts?: string | PodloveWebPlayerTranscript[];
}
