If you only want a specific linklist you can use `utils-json-linklist.liquid`:

```html
{% raw %}<script>
var mainMenu = {% render 'utils-json-linklist', linklist: linklists.main-menu %};
</script>{% endraw %}
```
