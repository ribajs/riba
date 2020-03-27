Scrolls to an element by event and selector

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs handle="scroll-to-on-event" class="pt-3">
      <template type="single-html-file">
        <button class="btn btn-success" rv-scroll-to-on-click="'#bs4-tabs'" data-offset="80">
          Scroll to bs4-tabs
        </button>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
