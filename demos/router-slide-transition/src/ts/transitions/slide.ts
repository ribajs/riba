export const slide = (
  container: HTMLElement | undefined,
  direction: "next" | "prev",
  phase: "leave" | "enter",
) => {
  if (!container) {
    return Promise.resolve();
  }

  const duration = 450;
  const leaveTo = direction === "next" ? "-100%" : "100%";
  const enterFrom = direction === "next" ? "100%" : "-100%";

  const keyframes =
    phase === "leave"
      ? [
          { transform: "translateX(0%)", opacity: 1 },
          { transform: `translateX(${leaveTo})`, opacity: 0.5 },
        ]
      : [
          { transform: `translateX(${enterFrom})`, opacity: 0.5 },
          { transform: "translateX(0%)", opacity: 1 },
        ];

  const animation = container.animate(keyframes, {
    duration,
    easing: "ease-in-out",
    fill: "forwards",
  });

  const childAnimations: Promise<unknown>[] = [];
  if (phase === "enter") {
    const childTargets = Array.from(
      container.querySelectorAll(".slide-page > *"),
    ) as HTMLElement[];
    const childOffset = direction === "next" ? "10vw" : "-10vw";
    for (const [index, element] of childTargets.entries()) {
      childAnimations.push(
        element.animate(
          [
            { transform: `translateX(${childOffset})`, opacity: 0 },
            { transform: "translateX(0)", opacity: 1 },
          ],
          {
            duration: duration * 0.6,
            easing: "ease-out",
            delay: 100 + index * 80,
            fill: "both",
          },
        ).finished,
      );
    }
  }

  return Promise.all([animation.finished, ...childAnimations]).then(
    () => undefined,
  );
};
