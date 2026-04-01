export const slideUp = (
  target: HTMLElement | undefined,
  duration: number,
  from: number,
  to: number,
) => {
  if (!target) {
    return Promise.resolve();
  }

  const animation = target.animate(
    [
      { transform: `translateY(${from}%)` },
      { transform: `translateY(${to}%)` },
    ],
    {
      duration,
      easing: "cubic-bezier(0.37, 0, 0.63, 1)", // easeInOutSine
      fill: "both",
    },
  );

  return animation.finished.then(() => undefined);
};
