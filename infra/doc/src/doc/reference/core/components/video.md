Wrap your html5 video tag with this component to have easy implementable custom controls.

<rv-bind-content class="pt-3">
  <template>
    <rv-example-tabs handle="video-component" class="pt-3">
      <template type="single-html-file">
        <rv-video class="embed-responsive embed-responsive-21by9">
          <video playsinline webkit-playsinline autoplay muted loop class="embed-responsive-item">
            <source src="https://jumplink.eu/storage/app/media/spring_blender_open_movie_1080p.mp4" type="video/mp4">
            <span >
              Your browser does not support the video tag.
            </span>
          </video>
          <div rv-hide="controls" class="video-custom-controls">
            <bs5-icon rv-hide="muted" rv-on-click="toggleMute" size="50" class="video-volume-high" src="/iconset/icon_volume-high_alt.svg">
            </bs5-icon>
            <bs5-icon rv-show="muted" rv-on-click="toggleMute" size="50" class="video-volume-mute" src="/iconset/icon_vol-mute_alt.svg">
            </bs5-icon>
          </div>
          <bs5-icon rv-class-default-controls-visible="controls" rv-on-click="toggleControls" direction="right" size="50" class="video-default-controls-show" src="/iconset/icon_adjust.svg">
          </bs5-icon>
        </rv-video>
      </template>
    </rv-example-tabs>
  </template>
</rv-bind-content>
