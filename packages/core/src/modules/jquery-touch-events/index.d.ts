/// <reference types="jquery" />

type IJQueryTouchEvents = (jQuery: JQueryStatic) => JQueryStatic;

declare module 'jquery-touch-events' {
  const jqueryTouchEvents: IJQueryTouchEvents;
  export default jqueryTouchEvents;
}
