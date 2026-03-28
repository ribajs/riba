#### Options

Options can be passed via data attributes, e.g `data-placement="right"`

| Name                | Default    |  Description                                                                                                    |
| --------------------| ---------- | --------------------------------------------------------------------------------------------------------------- |
| placement           | `'top'`    | How to position the tooltip - `auto | top | bottom | left | right`. When auto is specified, it will dynamically reorient the tooltip.|

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs handle="bs4-tooltip-binder" class="pt-3">
      <template type="single-html-file">
        <button type="button" class="btn btn-secondary" rv-bs4-tooltip="'Tooltip on top'" data-placement="top">
          Tooltip on top
        </button>
        <button type="button" class="btn btn-secondary" rv-bs4-tooltip="'Tooltip on right'" data-placement="right">
          Tooltip on right
        </button>
        <button type="button" class="btn btn-secondary" rv-bs4-tooltip="'Tooltip on bottom'" data-placement="bottom">
          Tooltip on bottom
        </button>
        <button type="button" class="btn btn-secondary" rv-bs4-tooltip="'Tooltip on left'" data-placement="left">
          Tooltip on left
        </button>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
