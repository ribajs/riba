Loads and displays an svg icon.

#### Attributes

| Name      | Description                              |
| --------- |:-----------------------------------------|
| size      | Sets the width and height of the icon    |
| width     | Sets the width of the icon               |
| height    | Sets the height of the icon              |
| src       | The source url of the icon image         |
| color     | Color of the icon                        |
| direction | Direction of the icon (default is `top`) |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="bs4-icon">
      <template type="single-html-file">
        <bs4-icon color="danger" rv-src="'{{ 'icon_close.svg' | asset_url }}'" size="32"></bs4-icon>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
