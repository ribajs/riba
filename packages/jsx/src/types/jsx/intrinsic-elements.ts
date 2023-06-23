import type {
  JsxHtmlGlobalProps,
  JsxAElementProps,
  JsxAreaElementProps,
  JsxAudioElementProps,
  JsxBaseElementProps,
  JsxBlockquoteElementProps,
  JsxBrElementProps,
  JsxButtonElementProps,
  JsxCanvasElementProps,
  JsxColElementProps,
  JsxColgroupElementProps,
  JsxDataElementProps,
  JsxDelElementProps,
  JsxDetailsElementProps,
  JsxDialogElementProps,
  JsxDivElementProps,
  JsxEmbedElementProps,
  JsxFieldsetElementProps,
  JsxFormElementProps,
  JsxHtmlElementProps,
  JsxIframeElementProps,
  JsxImgElementProps,
  JsxInputElementProps,
  JsxInsElementProps,
  JsxLabelElementProps,
  JsxLiElementProps,
  JsxLinkElementProps,
  JsxMapElementProps,
  JsxMetaElementProps,
  JsxMeterElementProps,
  JsxObjectElementProps,
  JsxOlElementProps,
  JsxOptgroupElementProps,
  JsxOptionElementProps,
  JsxOutputElementProps,
  JsxParamElementProps,
  JsxPortalElementProps,
  JsxProgressElementProps,
  JsxQElementProps,
  JsxScriptElementProps,
  JsxSelectElementProps,
  JsxSlotElementProps,
  JsxSourceElementProps,
  JsxStyleElementProps,
  JsxTdElementProps,
  JsxTextareaElementProps,
  JsxThElementProps,
  JsxTimeElementProps,
  JsxTrackElementProps,
  JsxVideoElementProps,
  JsxSvgElementProps,
  JsxUseElementProps,
  JsxPathElementProps,
} from "./index.js";

export interface BasicIntrinsicElements {
  // HTML Elements
  a: JsxAElementProps;
  abbr: JsxHtmlGlobalProps;
  address: JsxHtmlGlobalProps;
  area: JsxAreaElementProps;
  article: JsxHtmlGlobalProps;
  aside: JsxHtmlGlobalProps;
  audio: JsxAudioElementProps;
  b: JsxHtmlGlobalProps;
  base: JsxBaseElementProps;
  bdi: JsxHtmlGlobalProps;
  bdo: JsxHtmlGlobalProps;
  blockquote: JsxBlockquoteElementProps;
  body: JsxHtmlGlobalProps;
  br: JsxBrElementProps;
  button: JsxButtonElementProps;
  canvas: JsxCanvasElementProps;
  caption: JsxHtmlGlobalProps;
  cite: JsxHtmlGlobalProps;
  code: JsxHtmlGlobalProps;
  col: JsxColElementProps;
  colgroup: JsxColgroupElementProps;
  data: JsxDataElementProps;
  datalist: JsxHtmlGlobalProps;
  dd: JsxHtmlGlobalProps;
  del: JsxDelElementProps;
  details: JsxDetailsElementProps;
  dfn: JsxHtmlGlobalProps;
  dialog: JsxDialogElementProps;
  div: JsxDivElementProps;
  dl: JsxHtmlGlobalProps;
  dt: JsxHtmlGlobalProps;
  em: JsxHtmlGlobalProps;
  embed: JsxEmbedElementProps;
  fieldset: JsxFieldsetElementProps;
  figcaption: JsxHtmlGlobalProps;
  figure: JsxHtmlGlobalProps;
  footer: JsxHtmlGlobalProps;
  form: JsxFormElementProps;
  h1: JsxFormElementProps;
  h2: JsxFormElementProps;
  h3: JsxFormElementProps;
  h4: JsxFormElementProps;
  h5: JsxFormElementProps;
  h6: JsxFormElementProps;
  head: JsxHtmlGlobalProps;
  header: JsxHtmlGlobalProps;
  hgroup: JsxHtmlGlobalProps;
  hr: JsxHtmlGlobalProps;
  html: JsxHtmlElementProps;
  i: JsxHtmlGlobalProps;
  iframe: JsxIframeElementProps;
  img: JsxImgElementProps;
  input: JsxInputElementProps;
  ins: JsxInsElementProps;
  kbd: JsxHtmlGlobalProps;
  label: JsxLabelElementProps;
  legend: JsxHtmlGlobalProps;
  li: JsxLiElementProps;
  link: JsxLinkElementProps;
  main: JsxHtmlGlobalProps;
  map: JsxMapElementProps;
  mark: JsxHtmlGlobalProps;
  meta: JsxMetaElementProps;
  meter: JsxMeterElementProps;
  nav: JsxHtmlGlobalProps;
  noscript: JsxHtmlGlobalProps;
  object: JsxObjectElementProps;
  ol: JsxOlElementProps;
  optgroup: JsxOptgroupElementProps;
  option: JsxOptionElementProps;
  output: JsxOutputElementProps;
  p: JsxHtmlGlobalProps;
  param: JsxParamElementProps;
  picture: JsxHtmlGlobalProps;
  portal: JsxPortalElementProps;
  pre: JsxHtmlGlobalProps;
  progress: JsxProgressElementProps;
  q: JsxQElementProps;
  rp: JsxHtmlGlobalProps;
  rt: JsxHtmlGlobalProps;
  ruby: JsxHtmlGlobalProps;
  s: JsxHtmlGlobalProps;
  samp: JsxHtmlGlobalProps;
  script: JsxScriptElementProps;
  section: JsxHtmlGlobalProps;
  select: JsxSelectElementProps;
  slot: JsxSlotElementProps;
  small: JsxHtmlGlobalProps;
  source: JsxSourceElementProps;
  span: JsxHtmlGlobalProps;
  strong: JsxHtmlGlobalProps;
  style: JsxStyleElementProps;
  sub: JsxHtmlGlobalProps;
  summary: JsxHtmlGlobalProps;
  sup: JsxHtmlGlobalProps;
  table: JsxHtmlGlobalProps;
  tbody: JsxHtmlGlobalProps;
  td: JsxTdElementProps;
  template: JsxHtmlGlobalProps;
  textarea: JsxTextareaElementProps;
  tfoot: JsxHtmlGlobalProps;
  th: JsxThElementProps;
  thead: JsxHtmlGlobalProps;
  time: JsxTimeElementProps;
  title: JsxHtmlGlobalProps;
  tr: JsxHtmlGlobalProps;
  track: JsxTrackElementProps;
  u: JsxHtmlGlobalProps;
  ul: JsxHtmlGlobalProps;
  var: JsxHtmlGlobalProps;
  video: JsxVideoElementProps;
  wbr: JsxHtmlGlobalProps;

  // SVG Elements
  svg: JsxSvgElementProps;
  use: JsxUseElementProps;
  path: JsxPathElementProps;
}
