import { OpenGraphMusicAlbum } from "./open-graph-music-album.js";
import { OpenGraphMusicSong } from "./open-graph-music-song.js";

export interface OpenGraphMusic {
  // og:type value: music.song
  /** integer >=1 - The song's length in seconds. */
  duration?: number;
  /** music.album array - The album this song is from. */
  album?: string | string[] | OpenGraphMusicAlbum | OpenGraphMusicAlbum[];
  /** The artist of this album. This is a URL of a page with og type profile. Multiple music:musician tags can be specified. */
  musician?: string | string[];
  /** music.song - The song on this album. */
  song?: string | string[] | OpenGraphMusicSong | OpenGraphMusicSong[];
  /** The date the album was released. */
  release_date?: Date;
  /** profile - The creator of the playlist or the radio station */
  creator?: string | string[];
}
