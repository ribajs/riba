  /**
   * Copy from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/bootstrap/index.d.ts
   */
  export interface CarouselOption {
    /**
     * The amount of time to delay between automatically cycling an item. If false, carousel will not automatically cycle.
     *
     * @default 5000
     */
    interval?: false | number;
    defaultInterval?: false | number;

    /**
     * Whether the carousel should react to keyboard events.
     *
     * @default true
     */
    keyboard?: boolean;

    /**
     * Use to easily control the position of the carousel. It accepts the keywords prev or next, which alters the slide position
     * relative to its current position. Alternatively, use `data-slide-to` to pass a raw slide index to the carousel.
     *
     * @default false
     */
    slide?: "next" | "prev" | false;

    /**
     * If set to "hover", pauses the cycling of the carousel on `mouseenter` and resumes the cycling of the carousel on `mouseleave`.
     * If set to false, hovering over the carousel won't pause it.
     *
     * On touch-enabled devices, when set to "hover", cycling will pause on `touchend` (once the user finished interacting with the carousel)
     * for two intervals, before automatically resuming. Note that this is in addition to the above mouse behavior.
     *
     * @default "hover"
     */
    pause?: "hover" | false;

    /**
     * Whether the carousel should cycle continuously or have hard stops.
     *
     * @default true
     */
    wrap?: boolean;

    /**
     * Whether the carousel should support left/right swipe interactions on touchscreen devices.
     *
     * @default true
     */
    touch?: boolean;

    /**
     * Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load.
     *
     * @default false
     */
    ride?: boolean;
  }
