/**
 * Used to inject HTML directly into the document.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Raw(_props: { html: string }) {
  // This is handled specially by the renderElement function. Instead of being
  // called, the tag is compared to this function and the `html` prop will be
  // returned directly.
  return null;
}
