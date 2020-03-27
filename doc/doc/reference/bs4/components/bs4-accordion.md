Component to collapse multiple cards like an accordion as it exists on [the original bootstrap](https://getbootstrap.com/docs/4.4/components/collapse/#accordion-example) example.
Each accordion item is added by an `<template>` element with a `title` attribut`and his content as the accordion item body.

#### Attributes

| Name                             | Required | Default             |  Description                                                           |
| -------------------------------- |:--------:|:-------------------:| ---------------------------------------------------------------------- |
| `collapse-icon-src`              | No       |                     | Source of an collapse icon if you want to display an icon              |
| `collapse-icon-src`              | No       | `16`                | Size of the collapse icon in px                                        |

#### Template methods

| Name                             | Arguments   |  Description                                                           |
| -------------------------------- |:-----------:| ---------------------------------------------------------------------- |
| hide                             | item, index | Hides / closes / collapses the accordion item                          |
| show                             | item, index | Shows / opens / expands the accordion item                             |
| toggle                           | item, index | Toggles (closes or opens) the accordion item                           |

#### Template properties

| Name                             |  Description                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------- |
| items                            | An array of all accordion items                                               |
| collapseSelector                 | See `collapse-selector` attribute                                             |

#### Child Template Attributes

| Name                  | Required | Description                                                                   |
| ----------------------|:--------:| ----------------------------------------------------------------------------- |
| title                 | Yes      | Title of the accordion item                                                   |
| show                  | No       | Set this to `true` if the accordion item should be visable on start           |
| icon-direction        | No       | Starting icon direction for the collapse icon                                 |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs handle="bs4-navbar" class="pt-3">
      <template type="single-html-file">
        <bs4-accordion collapse-icon-src="{{ 'arrow_carrot_thin.svg' | asset_url }}">
          <template title="Collapsible Group Item #1">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </template>
          <template title="Collapsible Group Item #2">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </template>
          <template title="Collapsible Group Item #3">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </template>
        </bs4-accordion>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
