export type ShareUrlType = "page" | "image" | "video";

export interface ShareItem {
  /**
   * An id for this share button entry. The share element associated with this entry will be classed with
   * 'pswp__share--' + id
   */
  id: string;

  /**
   * The user-visible text to display for this entry.
   */
  label: string;

  /**
   * The full sharing endpoint URL for this social media site (e.g. Facebook's is facebook.com/sharer/sharer.php), with URL parameters.
   * PhotoSwipUI_Default treats the URL specially. In the url string, any of the following text is treated specially:
   * '{{url}}', '{{image_url}}, '{{raw_image_url}}, '{{text}}'. PhotoSwipeUI_Default will replace each of them with the following value:
   *
   * {{url}} becomes the (URIEncoded) url to the current "Page" (as returned by getPageURLForShare).
   * {{image_url}} becomes the (URIEncoded) url of the selected image (as returned by getURLToShare).
   * {{raw_image_url}} becomes the raw url of the selected image (as returned by getURLToShare).
   * {{text}} becomes the (URIEncoded) share text of the selected image (as returned by getTextForShare).
   */
  url: string;

  /**
   * Url string with placeholders to generate the url string above
   */
  urlTemplate: string;

  mediaUrlTemplate?: string;

  /**
   * Whether this link is a direct download button or not.
   */
  type?: "download" | "popup" | "href" | "clipboard";

  availableFor: ShareUrlType[];

  available?: boolean;
}
