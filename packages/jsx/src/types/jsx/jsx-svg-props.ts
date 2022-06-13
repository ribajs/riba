// ============================================================================
// SVG Elements
// ============================================================================
// This is extremely incomplete, only including support for <svg> and <path>.
// If you need more, please feel free to submit an issue or a pull request!

export interface JsxSvgCoreProps {
  id?: string;
  lang?: string;
  tabindex?: string;
  "xml:base"?: string;
  xmlns?: string;
}

export interface JsxSvgStyleProps {
  class?: string;
  style?: string;
}

export interface JsxSvgConditionalProcessingProps {
  systemLanguage?: string;
}

export interface JsxSvgPresentationProps {
  "alignment-baseline"?:
    | "baseline"
    | "text-bottom"
    | "text-before-edge"
    | "middle"
    | "central"
    | "text-after-edge"
    | "ideographic"
    | "alphabetic"
    | "hanging"
    | "mathematical"
    | "top"
    | "center"
    | "bottom";
  "baseline-shift"?: number | "sub" | "super";
  "clip-path"?: string;
  "clip-rule"?: "nonzero" | "evenodd" | "inherit";
  color?: string;
  "color-interpolation"?: "auto" | "sRGB" | "linearRGB";
  "color-interpolation-filters"?: "auto" | "sRGB" | "linearRGB";
  cursor?: string;
  direction?: "ltr" | "rtl";
  display?: string;
  "dominant-baseline"?:
    | "auto"
    | "text-bottom"
    | "alphabetic"
    | "ideographic"
    | "middle"
    | "central"
    | "mathematical"
    | "hanging"
    | "text-top";
  fill?: string;
  "fill-opacity"?: number;
  "fill-rule"?: "nonzero" | "evenodd";
  filter?: string;
  "flood-color"?: string;
  "flood-opacity"?: number;
  "font-family"?: string;
  "font-size"?: string;
  "font-size-adjust"?: "none" | number;
  "font-stretch"?: string;
  "font-style"?: "normal" | "italic" | "oblique";
  "font-variant"?: string;
  "font-weight"?: "normal" | "bold" | "bolder" | "lighter" | number;
  "image-rendering"?: "auto" | "optimizeSpeed" | "optimizeQuality";
  "letter-spacing"?: string;
  "lighting-color"?: string;
  "marker-end"?: string;
  "marker-mid"?: string;
  "marker-start"?: string;
  mask?: string;
  opacity?: number;
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  "pointer-events"?:
    | "bounding-box"
    | "visiblePainted"
    | "visibleFill"
    | "visibleStroke"
    | "visible"
    | "painted"
    | "fill"
    | "stroke"
    | "all"
    | "none";
  "shape-rendering"?:
    | "auto"
    | "optimizeSpeed"
    | "crispEdges"
    | "geometricPrecision";
  "stop-color"?: string;
  "stop-opacity"?: string;
  stroke?: string;
  "stroke-dasharray"?: string;
  "stroke-dashoffset"?: string;
  "stroke-linecap"?: "butt" | "round" | "square";
  "stroke-linejoin"?: "arcs" | "bevel |miter" | "miter-clip" | "round";
  "stroke-miterlimit"?: number;
  "stroke-opacity"?: string | number;
  "stroke-width"?: string | number;
  "text-anchor"?: "start" | "middle" | "end";
  "text-decoration"?: string;
  "text-rendering"?:
    | "auto"
    | "optimizeSpeed"
    | "optimizeLegibility"
    | "geometricPrecision";
  transform?: string;
  "transform-origin"?: string;
  "unicode-bidi"?:
    | "normal"
    | "embed"
    | "isolate"
    | "bidi-override"
    | "isolate-override"
    | "plaintext";
  "vector-effect"?:
    | "none"
    | "non-scaling-stroke"
    | "non-scaling-size"
    | "non-rotation"
    | "fixed-position";
  visibility?: "visible" | "hidden" | "collapse";
  "word-spacing"?: string;
  "writing-mode"?: "horizontal-tb" | "vertical-rl" | "vertical-lr";
}

/**
 * Properties permitted on the `<svg>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
 */
export interface JsxSvgElementProps
  extends JsxSvgCoreProps,
    JsxSvgStyleProps,
    JsxSvgPresentationProps {
  height?: string | number;
  preserveAspectRatio?: `${
    | "none"
    | "xMinYMin"
    | "xMaxYMin"
    | "xMinYMid"
    | "xMaxYMid"
    | "xMinYMax"
    | "xMidYMax"
    | "xMaxYMax"}${"" | " meet" | " slice"}`;
  viewBox?: string;
  width?: string | number;
  x?: string | number;
  y?: string | number;
  focusable?: boolean;
}
/**
 * Properties permitted on the `<path>` element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
 */
export interface JsxPathElementProps
  extends JsxSvgCoreProps,
    JsxSvgStyleProps,
    JsxSvgConditionalProcessingProps,
    JsxSvgPresentationProps {
  d: string;
  pathLength?: number;
}
