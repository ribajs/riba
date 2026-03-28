Component to render a shopify linklist

#### Attributes

| Name              | Type    | Description                                                                                          |
| ----------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| linklist          | string  | The linklist as a json string                                                                        |
| handle            | string  | Sets the linklist by his name (see note below)                                                       |
| pills             | boolean | If the navigation should be displayed as pills                                                       |
| vertical          | boolean | If the navigation should be displayed as vertically                                                  |
| collapseOnNewPage | boolean | Set this option to true if toggleable links should be automatically collapse when a page changes     |
| showOnActiveChild | boolean | Set this option to true if toggleable links should be automatically open when a child link is active |
  
*Note: If you do not want to pass the linklist as a json string, you can also pass just the linklist handle string. This assumes, however, that the linklist is available as a global variable under `window.model.system.linklists[yourLinklistHandle]`.*

#### Template Methods

| Name             | Arguments  | Description          |
| ---------------- | ---------- | -------------------- |
| toggle           | link       | Toggles a link       |
| collapse         | link       | Collapse a link      |
| collapseAll      |            | Collapse all links   |
| show             | link       | Show a link          |
| showAll          |            | Show all links       |

#### Collapseable links

If a link should be collapseable, `#collapse` must be entered as the URL for this link in the Shopify administration:

<img class="img-fluid img-thumbnail" src="{{ settings.shopify-linklist-collapse | img_url: 'master' }}" alt="shopify-linklist: Collapseable link" />

#### Example

```html
{% raw %}<shopify-linklist linklist='{% render 'utils-json-linklist', linklist: linklists.main-menu %}'></shopify-linklist>{% endraw %}
```
