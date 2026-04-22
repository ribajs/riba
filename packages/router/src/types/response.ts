export interface Response {
  /**
   * Primary container (first child of the wrapper matching `containerSelector`).
   *
   * @deprecated Use {@link Response.containers} instead. This field only reflects the
   * first sibling of a multi-child outlet and will be removed in a future major
   * release. It remains for backward compatibility so existing transitions and
   * integrations keep working during migration.
   */
  container: HTMLElement;
  /**
   * All direct children of the wrapper (router-view) in the new page. Populated so
   * pages that render multiple sibling sections inside `router-view` are swapped in
   * completely. For single-child pages this is `[container]`.
   */
  containers: HTMLElement[];
  title: string;
  prefetchLinks: NodeListOf<HTMLLinkElement> | Array<HTMLLinkElement>;
}
