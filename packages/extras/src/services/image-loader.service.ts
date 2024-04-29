export class ImageLoaderService {
  images: HTMLImageElement[];
  loadedCount: number;

  constructor(readonly element: HTMLElement | HTMLImageElement) {
    this.images = [];
    this.loadedCount = 0;
    this.init();
  }

  init() {
    this.images =
      this.element instanceof HTMLImageElement
        ? [this.element]
        : Array.from(this.element.querySelectorAll("img"));
    this.loadedCount = 0;

    for (const img of this.images) {
      img.onload = () => {
        this.loadedCount++;
        this.progress(img);
        if (this.loadedCount === this.images.length) {
          this.done();
        }
      };

      img.onerror = () => {
        this.failed(img);
      };
    }
  }

  done() {
    this.element.dispatchEvent(new CustomEvent("load"));
    console.log("Alle Bilder erfolgreich geladen.");
  }

  progress(img: HTMLImageElement) {
    console.log(`Bild geladen: ${img.src}`);
  }

  failed(img: HTMLImageElement) {
    console.log(`Fehler beim Laden des Bildes: ${img.src}`);
  }

  reset() {
    this.init();
  }
}
