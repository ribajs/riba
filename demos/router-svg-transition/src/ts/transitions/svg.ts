export const morphSvg = (
  container: HTMLElement | undefined,
  duration: number,
) => {
  if (!container) {
    return Promise.resolve();
  }

  const path = container.querySelector(".shape path");
  if (!path) {
    return Promise.resolve();
  }

  const from = path.getAttribute("d");
  const to = path.getAttribute("data-path-id");

  if (!from || !to) {
    return Promise.resolve();
  }

  const shape = container.querySelector(".shape") as HTMLElement | null;
  const halfDuration = duration * 0.5;

  // Two-phase scaleY: easeInQuad then easeOutQuad (matches Barba original)
  const shapeAnimation = (async () => {
    if (!shape) return;
    await shape.animate(
      [{ transform: "scaleY(1)" }, { transform: "scaleY(1.8)" }],
      {
        duration: halfDuration,
        easing: "cubic-bezier(0.55, 0.085, 0.68, 0.53)", // easeInQuad
        fill: "forwards",
      },
    ).finished;
    await shape.animate(
      [{ transform: "scaleY(1.8)" }, { transform: "scaleY(1)" }],
      {
        duration: halfDuration,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // easeOutQuad
        fill: "forwards",
      },
    ).finished;
  })();

  const numberPattern = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
  const fromValues = Array.from(from.matchAll(numberPattern)).map((match) =>
    Number(match[0]),
  );
  const toValues = Array.from(to.matchAll(numberPattern)).map((match) =>
    Number(match[0]),
  );

  const pathAnimation = new Promise<void>((resolve) => {
    if (fromValues.length === 0 || fromValues.length !== toValues.length) {
      path.setAttribute("d", to);
      resolve();
      return;
    }

    const startedAt = performance.now();
    const easeOutQuad = (value: number) => 1 - (1 - value) * (1 - value);

    const frame = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = easeOutQuad(progress);
      let index = 0;
      const interpolated = from.replace(numberPattern, () => {
        const current = fromValues[index] ?? 0;
        const target = toValues[index] ?? current;
        index += 1;
        const value = current + (target - current) * eased;
        return Number.isInteger(value) ? String(value) : value.toFixed(3);
      });
      path.setAttribute("d", interpolated);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        path.setAttribute("d", to);
        resolve();
      }
    };

    requestAnimationFrame(frame);
  });

  return Promise.all([shapeAnimation, pathAnimation]).then(() => undefined);
};
