export interface Transition {
  // $oldContainer: HTMLElement;
  // $newContainer: HTMLElement;
  // newContainerLoading: Promise<HTMLElement>;
  // extend(obj: object): object;
  init($oldContainer: HTMLElement, newContainer: Promise<HTMLElement>): Promise<void>;
  done(): void;
  start(): any;
}
