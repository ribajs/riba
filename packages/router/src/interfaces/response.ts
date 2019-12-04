export interface Response {
  container: HTMLElement;
  title: string;
  prefetchLinks: NodeListOf<HTMLLinkElement> | Array<HTMLLinkElement>;
}
