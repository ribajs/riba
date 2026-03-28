Generates a jumpable table of contents of all found headings.

#### Attributes

| Name                   | Required | Default | Description                                                                                                    |
| ---------------------- |:--------:|:----------:| ----------------------------------------------------------------------------------------------------------- |
| headers-start          | No       | `1`        | Headers start depth e.g. `1` for `h1`                                                                       |
| headers-depth          | No       | `2`        | Headers end depth e.g. `5` for `h5`                                                                         |
| header-parent-selector | Yes      |            | Selector to search for headers                                                                              |
| find-header-id-depth   | No       | `1`        | Depth in how many parents elements should be searched for an id for each found header element               |
| scroll-offset          | No       | `0`        | Scroll offset after click on an element                                                                     |
| scroll-element         | No       | `window`   | Container element which should be scrolled (default is `window`)                                            |

#### Template properties

| Name                             |  Description                                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| anchors                          | Array of found headers / anchors with the properties `element`, `href`, `title`, `childs`                       |
| headersStart                     | Passed attribute value, see `headers-start` attribute                                                           |
| headersDepth                     | Passed attribute value, see `headers-depth` attribute                                                           |
| headersParentSelector            | Passed attribute value, see `headers-parent-selector` attribute                                                 |
| findHeaderIdDepth                | Passed attribute value, see `find-header-id-depth` attribute                                                    |
| scrollOffset                     | Passed attribute value, see `scroll-offset` attribute                                                           |
| scrollEement                     | Passed attribute value, see `scroll-element` attribute                                                          |

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs class="pt-3" handle="bs4-contents">
      <template type="single-html-file">
        <bs4-contents headers-start="1" headers-depth="6" header-parent-selector="#header-example-wrapper" scroll-offset="80" scroll-element="[handle='bs4-contents'] .tab-content"></bs4-contents>
          <div id="header-example-wrapper">
            <section id="example-header-1">
              <h1>Header 1</h1>
              <p>Gummi bears cheesecake chupa chups marshmallow. Pie marshmallow chocolate bar topping macaroon muffin lemon drops tiramisu. Powder cake lollipop cotton candy cookie pastry carrot cake jujubes. Cake tart topping cake gummi bears cookie liquorice marshmallow. Jelly powder carrot cake pie bear claw. Cupcake candy sugar plum jelly gummies donut lollipop chocolate bar gingerbread. Icing donut halvah sweet roll lollipop jelly beans caramels jelly beans cake. Tiramisu toffee gummi bears. Candy canes bear claw bonbon cupcake. Muffin chupa chups icing bear claw. Soufflé tootsie roll biscuit wafer apple pie marzipan. Powder ice cream toffee dessert sweet oat cake cheesecake candy canes sesame snaps. Marzipan pastry fruitcake halvah ice cream jelly beans biscuit lemon drops chocolate cake.</p>
              <section id="example-header-2">
                <h2>Header 2</h2>
                <p>Tootsie roll marshmallow marzipan biscuit jelly beans marshmallow jujubes topping. Cheesecake gummies lollipop chocolate cake bear claw cupcake. Topping toffee brownie chupa chups sesame snaps lollipop candy. Ice cream biscuit icing dessert toffee. Liquorice caramels soufflé. Powder tiramisu halvah sugar plum. Danish tiramisu chupa chups. Sweet donut gummi bears apple pie macaroon chupa chups cheesecake pie cupcake. Donut marzipan liquorice carrot cake pudding bonbon. Muffin lemon drops tart oat cake. Chocolate cake halvah dessert dessert. Dragée chupa chups halvah biscuit muffin chocolate bar danish. Jujubes sesame snaps chocolate cake jelly beans cookie candy lollipop.</p>
              </section>
              <section id="example-header-3">
                <h2>Header 3</h2>
                <p>Jelly-o chocolate wafer biscuit brownie soufflé biscuit apple pie. Fruitcake macaroon lemon drops sweet roll jujubes liquorice. Jelly toffee bear claw croissant tiramisu. Brownie sweet roll cheesecake chupa chups. Oat cake caramels gummi bears caramels. Biscuit sugar plum marshmallow jelly candy canes. Liquorice chocolate bar biscuit jelly-o danish powder tart. Lollipop cotton candy lemon drops dragée tart toffee muffin. Chupa chups bear claw chocolate candy dragée cookie jelly dessert. Tiramisu donut danish gummi bears brownie icing brownie. Cheesecake gummies brownie cheesecake lemon drops biscuit jelly beans icing cake. Gummi bears icing liquorice gummi bears tootsie roll sweet roll soufflé cake jelly beans.</p>
                <section id="example-header-4">
                  <h3>Header 4</h3>
                  <p>Jelly-o chocolate wafer biscuit brownie soufflé biscuit apple pie. Fruitcake macaroon lemon drops sweet roll jujubes liquorice. Jelly toffee bear claw croissant tiramisu. Brownie sweet roll cheesecake chupa chups. Oat cake caramels gummi bears caramels. Biscuit sugar plum marshmallow jelly candy canes. Liquorice chocolate bar biscuit jelly-o danish powder tart. Lollipop cotton candy lemon drops dragée tart toffee muffin. Chupa chups bear claw chocolate candy dragée cookie jelly dessert. Tiramisu donut danish gummi bears brownie icing brownie. Cheesecake gummies brownie cheesecake lemon drops biscuit jelly beans icing cake. Gummi bears icing liquorice gummi bears tootsie roll sweet roll soufflé cake jelly beans.</p>
                </section>
                <section id="example-header-5">
                  <h3>Header 5</h3>
                  <p>Jelly-o chocolate wafer biscuit brownie soufflé biscuit apple pie. Fruitcake macaroon lemon drops sweet roll jujubes liquorice. Jelly toffee bear claw croissant tiramisu. Brownie sweet roll cheesecake chupa chups. Oat cake caramels gummi bears caramels. Biscuit sugar plum marshmallow jelly candy canes. Liquorice chocolate bar biscuit jelly-o danish powder tart. Lollipop cotton candy lemon drops dragée tart toffee muffin. Chupa chups bear claw chocolate candy dragée cookie jelly dessert. Tiramisu donut danish gummi bears brownie icing brownie. Cheesecake gummies brownie cheesecake lemon drops biscuit jelly beans icing cake. Gummi bears icing liquorice gummi bears tootsie roll sweet roll soufflé cake jelly beans.</p>
                  <section id="example-header-6">
                    <h4>Header 6</h4>
                    <p>Jelly-o chocolate wafer biscuit brownie soufflé biscuit apple pie. Fruitcake macaroon lemon drops sweet roll jujubes liquorice. Jelly toffee bear claw croissant tiramisu. Brownie sweet roll cheesecake chupa chups. Oat cake caramels gummi bears caramels. Biscuit sugar plum marshmallow jelly candy canes. Liquorice chocolate bar biscuit jelly-o danish powder tart. Lollipop cotton candy lemon drops dragée tart toffee muffin. Chupa chups bear claw chocolate candy dragée cookie jelly dessert. Tiramisu donut danish gummi bears brownie icing brownie. Cheesecake gummies brownie cheesecake lemon drops biscuit jelly beans icing cake. Gummi bears icing liquorice gummi bears tootsie roll sweet roll soufflé cake jelly beans.</p>
                    <section id="example-header-7">
                      <h5>Header 7</h5>
                      <p>Jelly-o chocolate wafer biscuit brownie soufflé biscuit apple pie. Fruitcake macaroon lemon drops sweet roll jujubes liquorice. Jelly toffee bear claw croissant tiramisu. Brownie sweet roll cheesecake chupa chups. Oat cake caramels gummi bears caramels. Biscuit sugar plum marshmallow jelly candy canes. Liquorice chocolate bar biscuit jelly-o danish powder tart. Lollipop cotton candy lemon drops dragée tart toffee muffin. Chupa chups bear claw chocolate candy dragée cookie jelly dessert. Tiramisu donut danish gummi bears brownie icing brownie. Cheesecake gummies brownie cheesecake lemon drops biscuit jelly beans icing cake. Gummi bears icing liquorice gummi bears tootsie roll sweet roll soufflé cake jelly beans.</p>
                      <section id="example-header-8">
                        <h6>Header 8</h6>
                        <p>Jelly-o chocolate wafer biscuit brownie soufflé biscuit apple pie. Fruitcake macaroon lemon drops sweet roll jujubes liquorice. Jelly toffee bear claw croissant tiramisu. Brownie sweet roll cheesecake chupa chups. Oat cake caramels gummi bears caramels. Biscuit sugar plum marshmallow jelly candy canes. Liquorice chocolate bar biscuit jelly-o danish powder tart. Lollipop cotton candy lemon drops dragée tart toffee muffin. Chupa chups bear claw chocolate candy dragée cookie jelly dessert. Tiramisu donut danish gummi bears brownie icing brownie. Cheesecake gummies brownie cheesecake lemon drops biscuit jelly beans icing cake. Gummi bears icing liquorice gummi bears tootsie roll sweet roll soufflé cake jelly beans.</p>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section id="example-header-9">
              <h1>Header 9</h1>
              <p>Jelly-o chocolate wafer biscuit brownie soufflé biscuit apple pie. Fruitcake macaroon lemon drops sweet roll jujubes liquorice. Jelly toffee bear claw croissant tiramisu. Brownie sweet roll cheesecake chupa chups. Oat cake caramels gummi bears caramels. Biscuit sugar plum marshmallow jelly candy canes. Liquorice chocolate bar biscuit jelly-o danish powder tart. Lollipop cotton candy lemon drops dragée tart toffee muffin. Chupa chups bear claw chocolate candy dragée cookie jelly dessert. Tiramisu donut danish gummi bears brownie icing brownie. Cheesecake gummies brownie cheesecake lemon drops biscuit jelly beans icing cake. Gummi bears icing liquorice gummi bears tootsie roll sweet roll soufflé cake jelly beans.</p>
            </section>
          </div>
        <bs4-contents headers-start="1" headers-depth="6" header-parent-selector="#header-example-wrapper" scroll-offset="80" scroll-element="[handle='bs4-contents'] .tab-content"></bs4-contents>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
