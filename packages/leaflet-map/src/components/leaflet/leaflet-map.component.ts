import { Component, EventDispatcher } from "@ribajs/core";
import { isNumber, justDigits } from "@ribajs/utils/src/type";
import template from "./leaflet-map.component.html";
import * as Leaflet from "leaflet";
import { PointTuple, IconOptions } from "leaflet";

interface Scope {
  mapSelector: string;
  initialLat: number;
  initialLng: number;
  initialZoom: number;
  tileUrl: string;
  attribution: string;
}

interface Marker {
  lat: number;
  lng: number;
  title: string;
  icon?: string;
  openByDefault: boolean;
}

export class LeafletMapComponent extends Component {
  public static tagName = "leaflet-map";

  protected autobind = true;

  protected markers: Marker[] = [];
  protected icons: { [key: string]: Leaflet.Icon } = {};
  private map: Leaflet.Map;

  static get observedAttributes() {
    return ["map-selector", "initial-lat", "initial-lng", "initial-zoom", "tile-url", "attribution"];
  }

  protected scope: Scope = {
    mapSelector: ".leaflet-map",
    initialLat: 53.872654,
    initialLng: 8.710849,
    initialZoom: 13,
    tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(LeafletMapComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected async beforeBind() {
    return await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
    const mapId = "map-" + Math.floor(Math.random() * 9999);
    const mapElement = this.el.querySelector(this.scope.mapSelector);
    if (mapElement) {
      mapElement.id = mapId;
    } else {
      console.warn(`No element with selector "${this.scope.mapSelector}" found!`);
    }

    this.map = new Leaflet.Map(mapId).setView([this.scope.initialLat, this.scope.initialLng], this.scope.initialZoom);

    Leaflet.tileLayer(this.scope.tileUrl, {
      attribution: this.scope.attribution,
    }).addTo(this.map);

    for (const marker of this.markers) {
      let leafletMarker;
      if (marker.icon !== undefined && marker.icon !== null) {
        leafletMarker = Leaflet.marker([marker.lat, marker.lng], {
          icon: this.icons[marker.icon],
        });
      } else {
        leafletMarker = Leaflet.marker([marker.lat, marker.lng]);
      }
      leafletMarker.addTo(this.map).bindPopup(marker.title);
      if (marker.openByDefault) {
        leafletMarker.openPopup();
      }
    }

    this.registerEventListener();
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected registerEventListener() {
    const dispatcher = new EventDispatcher("main");
    dispatcher.on("visibility-changed", () => {
      this.map.invalidateSize();
      console.log("visiblity changed");
    });
  }

  protected convertStringToPointTuple(str: string): PointTuple | undefined {
    const stringArr = str.replace(" ", "").split(",");
    if (stringArr.length !== 2) {
      console.warn(`Can't convert "${str}" to a PointTuple`);
      return undefined;
    }
    const numberArr = stringArr.map((str: string) => {
      if (isNumber(str)) {
        return justDigits(str);
      }
      console.warn(`Can't convert "${str}" to a number`);
      return undefined;
    });

    return numberArr as PointTuple;
  }

  protected template() {
    for (const el of this.el.children) {
      if (el.tagName === "ICON") {
        const iconName = el.getAttribute("name");
        const iconUrl = el.getAttribute("icon-url");
        const shadowUrl = el.getAttribute("shadow-url");
        const iconSizeAttr = el.getAttribute("icon-size");
        const iconAnchorAttr = el.getAttribute("icon-anchor");
        const popupAnchorAttr = el.getAttribute("popup-anchor");
        const shadowSizeAttr = el.getAttribute("shadow-size");
        const shadowAnchorAttr = el.getAttribute("shadow-anchor");
        if (iconName && iconUrl && shadowUrl) {
          const iconOptions: IconOptions = {
            iconUrl,
            shadowUrl,
          };

          if (iconSizeAttr) {
            iconOptions.iconSize = this.convertStringToPointTuple(iconSizeAttr);
          }

          if (iconAnchorAttr) {
            iconOptions.iconAnchor = this.convertStringToPointTuple(iconAnchorAttr);
          }

          if (popupAnchorAttr) {
            iconOptions.popupAnchor = this.convertStringToPointTuple(popupAnchorAttr);
          }

          if (shadowSizeAttr) {
            iconOptions.shadowSize = this.convertStringToPointTuple(shadowSizeAttr);
          }

          if (shadowAnchorAttr) {
            iconOptions.shadowSize = this.convertStringToPointTuple(shadowAnchorAttr);
          }

          this.icons[iconName] = Leaflet.icon(iconOptions);
        }
      }

      if (el.tagName === "MARKER") {
        const lat = el.getAttribute("lat");
        const lng = el.getAttribute("lng");
        const icon = el.getAttribute("icon") || undefined;
        const title = el.textContent;
        if (lat != null && lng != null && title != null) {
          this.markers.push({
            lat: +lat,
            lng: +lng,
            title: title,
            icon: icon,
            openByDefault: el.hasAttribute("open-by-default") ? el.getAttribute("open-by-default") === "true" : true,
          });
        } else {
          console.warn("marker without enough data found");
        }
      }
    }
    return template;
  }
}
