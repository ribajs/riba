export interface UIElement {
  name: string;
  option:
    | "captionEl"
    | "zoomEl"
    | "counterEl"
    | "closeEl"
    | "arrowEl"
    | "fullscreenEl"
    | "preloaderEl";
  onInit?: (el: HTMLElement) => void;
  onTap: () => void;
}
