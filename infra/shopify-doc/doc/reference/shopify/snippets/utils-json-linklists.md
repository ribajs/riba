Copy the snippets
* `utils-json-link.liquid`,
* `utils-json-links.liquid`,
* `utils-json-linklist.liquid`
* and `utils-json-linklists.liquid`

from [@ribajs/shopify/src/snippets/](https://github.com/ribajs/riba/tree/master/packages/shopify/src/snippets) to your themes snippets directory to transform shopify linklists to a json string.

```html
{% raw %}<script>
var linklists = {% include 'utils-json-linklists' %}
// If the component should access the linklist by his handle
// the linklist must be globally available as follows
window.model = {
  system: {
    linklists: linklists
  }
};
</script>{% endraw %}
```
