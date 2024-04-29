// import type ImagesLoaded from "imagesloaded";

export interface ImageEventDetail {
  image?: ImagesLoaded.LoadingImage & {
    img: HTMLImageElement;
    isLoaded: boolean;
    proxyImage: HTMLImageElement;
  };
  load?: ImagesLoaded.ImagesLoaded & {
    isComplete: boolean;
    progressedCount: number;
    hasAnyBroken: boolean;
    elements: HTMLImageElement[];
    images: ImagesLoaded.LoadingImage[];
  };
}
