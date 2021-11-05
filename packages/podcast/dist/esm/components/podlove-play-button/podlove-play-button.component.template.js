export default `
<div rv-if="error"><pre><code rv-text="error"></code></pre></div>
<div rv-unless="error">
  <div class="poster" rv-if="episode.poster | or episode.show.poster">
    <img rv-src="episode.poster | or episode.show.poster" />
  </div>
  <div class="info">
    <div class="header">
      <h1 class="name" rv-style="styles.infoName" rv-text="episode.show.title"></h1>
      <h1 class="title" rv-style="styles.infoTitle" rv-text="episode.title"></h1>
      <p class="subtitle" rv-style="styles.infoSubtitle" rv-text="episode.subtitle"></p>
    </div>
    <div class="controls">
      <button class="play" rv-on-click="play" rv-style="styles.play" rv-class-has-label="playLabel">
        <span rv-template="icons.play"></span>
        <span rv-text="playLabel"></span>
      </button>
    </div>
  </div>
</div>
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS1wbGF5LWJ1dHRvbi5jb21wb25lbnQudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wb2Rsb3ZlLXBsYXktYnV0dG9uL3BvZGxvdmUtcGxheS1idXR0b24uY29tcG9uZW50LnRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0JkLENBQUMifQ==