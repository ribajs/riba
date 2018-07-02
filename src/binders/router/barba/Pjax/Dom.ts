import $ from 'jquery';

/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
class Dom {
  /**
   * The name of the data attribute on the container
   *
   * @memberOf Barba.Pjax.Dom
   * @type {string}
   * @default
   */
  public dataNamespace = 'namespace';

  /**
   * Id of the main wrapper
   *
   * @memberOf Barba.Pjax.Dom
   * @type {string}
   * @default
   */
  public wrapperId = 'barba-wrapper';

  /**
   * Class name used to identify the containers
   *
   * @memberOf Barba.Pjax.Dom
   * @type {string}
   * @default
   */
  public containerClass = 'barba-container';

  /**
   * Full HTML String of the current page.
   * By default is the innerHTML of the initial loaded page.
   *
   * Each time a new page is loaded, the value is the response of the xhr call.
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   */
  public currentHTML?: string;

  /**
   * Parse the responseText obtained from the xhr call
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {string} responseText
   * @return {JQuery<HTMLElement>}
   */
  public parseResponse(responseText: string): JQuery<HTMLElement> {
    this.currentHTML = responseText;
    const $wrapper = $( $.parseHTML(responseText) );
    const $title = $wrapper.filter('title');
    if ($title.length) {
      document.title = $title.text();
    }
    return this.getContainer(($wrapper as any));
  }

  /**
   * Get the main barba wrapper by the ID `wrapperId`
   *
   * @memberOf Barba.Pjax.Dom
   * @return {JQuery<HTMLElement>} element
   */
  public getWrapper(): JQuery<HTMLElement> {
    const $wrapper = $('#' + this.wrapperId);

    if (!$wrapper) {
      throw new Error('Barba.js: wrapper not found!');
    }

    return $wrapper;
  }

  /**
   * Get the container on the current DOM,
   * or from an HTMLElement passed via argument
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {HTMLElement}
   */
  public getContainer($element?: JQuery<HTMLElement>): JQuery<HTMLElement> {
    if (!$element) {
      $element = $(document.body);
    }
    if (!$element) {
      throw new Error('Barba.js: DOM not ready!');
    }
    const $container = this.parseContainer($element);
    if (!$container) {
      throw new Error('Barba.js: no container found');
    }
    return $container;
  }

  /**
   * Get the namespace of the container
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {JQuery<HTMLElement>} element
   * @return {string}
   */
  public getNamespace($element: JQuery<HTMLElement>): string {
    if ($element && $element.data()) {
      return $element.data('namespace');
    } else {
      throw new Error('missing data-namespace attribute');
    }
  }

  /**
   * Put the container on the page
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {JQuery<HTMLElement>} element
   */
  public putContainer($element: JQuery<HTMLElement>) {
    $element.css('visibility', 'hidden');
    const $wrapper = this.getWrapper();
    $wrapper.append($element);
  }

  /**
   * Get container selector
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {JQuery<HTMLElement>} element
   * @return {JQuery<HTMLElement>} element
   */
  public parseContainer($element: JQuery<HTMLElement>): JQuery<HTMLElement> {
    return $element.find('.' + this.containerClass);
  }
}

export { Dom };
