// easing methods, see https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/

export const linear = (t: number) => {
  return t;
};
export const easeInQuad = (t: number) => {
  return t * t;
};
export const easeOutQuad = (t: number) => {
  return t * (2 - t);
};
export const easeInOutQuad = (t: number) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
export const easeInCubic = (t: number) => {
  return t * t * t;
};
export const easeOutCubic = (t: number) => {
  return --t * t * t + 1;
};
export const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
export const easeInQuart = (t: number) => {
  return t * t * t * t;
};
export const easeOutQuart = (t: number) => {
  return 1 - --t * t * t * t;
};
export const easeInOutQuart = (t: number) => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
export const easeInQuint = (t: number) => {
  return t * t * t * t * t;
};
export const easeOutQuint = (t: number) => {
  return 1 + --t * t * t * t * t;
};
export const easeInOutQuint = (t: number) => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};
