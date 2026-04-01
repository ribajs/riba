export const once = (container?: HTMLElement) => {
  if (!container) {
    return Promise.resolve();
  }

  const targets = Array.from(container.querySelectorAll("h1, h2, a"));
  if (targets.length === 0) {
    return Promise.resolve();
  }

  const duration = 750;
  const animations = targets.map(
    (target, index) =>
      target.animate(
        [
          { transform: "translateY(100px)", opacity: 0 },
          { transform: "translateY(0px)", opacity: 1 },
        ],
        {
          duration,
          easing: "cubic-bezier(0.165, 0.84, 0.44, 1)", // easeOutQuart
          delay: 1000 + index * 100,
          fill: "both",
        },
      ).finished,
  );

  return Promise.all(animations).then(() => undefined);
};
