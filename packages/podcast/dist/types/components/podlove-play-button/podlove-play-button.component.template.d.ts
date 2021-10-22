declare const _default: "\n<div class=\"poster\" rv-if=\"episode.poster | or episode.show.poster\">\n  <img rv-src=\"episode.poster | or episode.show.poster\" />\n</div>\n<div class=\"info\">\n  <div class=\"header\">\n    <h1 class=\"name\" rv-style=\"styles.infoName\" rv-text=\"episode.show.title\"></h1>\n    <h1 class=\"title\" rv-style=\"styles.infoTitle\" rv-text=\"episode.title\"></h1>\n    <p class=\"subtitle\" rv-style=\"styles.infoSubtitle\" rv-text=\"episode.subtitle\"></p>\n  </div>\n  <div class=\"controls\">\n    <button class=\"play\" rv-on-click=\"play\" rv-style=\"styles.play\" rv-class-has-label=\"playLabel\">\n      <span rv-template=\"icons.play\"></span>\n      <span rv-text=\"playLabel\"></span>\n    </button>\n  </div>\n</div>\n";
export default _default;