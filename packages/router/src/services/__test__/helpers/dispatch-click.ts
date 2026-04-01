export type DispatchClickOptions = {
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  button?: number;
};

export const dispatchClick = (
  element: Element,
  options: DispatchClickOptions = {},
) => {
  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    metaKey: options.metaKey ?? false,
    ctrlKey: options.ctrlKey ?? false,
    shiftKey: options.shiftKey ?? false,
    altKey: options.altKey ?? false,
    button: options.button ?? 0,
  });
  element.dispatchEvent(event);
  return event;
};
