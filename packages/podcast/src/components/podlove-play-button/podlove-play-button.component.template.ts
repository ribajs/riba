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
