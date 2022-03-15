/**
 * Represents the ready state of the audio/video element
 * @see https://www.w3schools.com/TAgs/av_prop_readystate.asp
 */
export enum MediaReadyState {
  /** no information whether or not the audio/video is ready */
  HAVE_NOTHING,
  /** metadata for the audio/video is ready */
  HAVE_METADATA,
  /** data for the current playback position is available, but not enough data to play next frame/millisecond */
  HAVE_CURRENT_DATA,
  /** data for the current and at least the next frame is available */
  HAVE_FUTURE_DATA,
  /** enough data available to start playing */
  HAVE_ENOUGH_DATA
}
