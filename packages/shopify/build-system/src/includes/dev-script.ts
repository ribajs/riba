/* eslint-disable */

/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/includes/dev-script.js
 */

/*******************************************************************************
 * Development script
 *
 * This script is only included on the page when Browsersync is being used. It's
 * a great place to put any customizations that you only want to occur while
 * developing your theme.
 ******************************************************************************/


/**
 * Persistent preview bar minimization
 *
 * Adds a token to sessionStorage when the 'minimize' button is clicked on the
 * preview bar that appears when previewing an unpublished theme. This token is
 * checked for on subsequent page loads, and if found, the preview is hidden.
 */

(function() {
    if (!isSessionStorageSupported()) { return; }
  
    window.addEventListener('DOMContentLoaded', function() {
      var previewBarMinimizeElement = document.getElementsByClassName('shopify-preview-bar__minimize');
  
      if (previewBarMinimizeElement.length > 0) {
        previewBarMinimizeElement[0].addEventListener('click', onButtonClick);
      }
  
      if (window.sessionStorage.getItem('preview-bar-hidden')) {
        hidePreviewBar();
      }
    });
  
    function onButtonClick(event: Event) {
      var element = event.target;
  
      window.sessionStorage.setItem('preview-bar-hidden', 'true');
      hidePreviewBar();
      document.removeEventListener('click', onButtonClick);
    }
  
    function hidePreviewBar() {
      injectStyles('.shopify-preview-bar { display:none; }');
    }
  
    function injectStyles(css: string) {
      var head = document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
  
      style.setAttribute('type', 'text/css');
  
      if ((style as any).styleSheet) { // IE
        (style as any).styleSheet.cssText = css;
      } else { // Everything else
        style.appendChild(document.createTextNode(css));
      }
  
      head.appendChild(style);
    }
  
    function isSessionStorageSupported() {
      var mod = 'slate';
      try {
        sessionStorage.setItem(mod, mod);
        sessionStorage.removeItem(mod);
        return true;
      } catch (e) {
        return false;
      }
    }
})();
/* eslint-enable */
