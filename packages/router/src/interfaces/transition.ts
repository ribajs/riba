export interface ITransition {
  // $oldContainer: JQuery<Element>;
  // $newContainer: JQuery<Element>;
  // newContainerLoading: Promise<JQuery<Element>>;
  // extend(obj: object): object;
  init($oldContainer: JQuery<Element>, newContainer: Promise<JQuery<Element>>): Promise<void>;
  done(): void;
  start(): any;
}
