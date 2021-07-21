export interface Transition {
  init(
    $oldContainer: HTMLElement,
    newContainer: Promise<HTMLElement>
  ): Promise<void>;
  done(): Promise<void>;
  start(): void;
}
