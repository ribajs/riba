export interface Transition {
  init(
    $oldContainer: HTMLElement,
    newContainer: Promise<HTMLElement>,
  ): Promise<void>;
  done(): Promise<void>;
  start(): void;
  /**
   * Optional hook. Pjax calls this with every element it appended to the outlet
   * for the new page so transitions can preserve multi-child outlets instead of
   * tracking a single primary container.
   */
  setNewContainers?(containers: HTMLElement[]): void;
}
