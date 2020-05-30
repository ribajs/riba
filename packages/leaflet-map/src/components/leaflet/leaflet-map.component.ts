import { Component } from "@ribajs/core";

import template from "./leaflet-map.component.html";
import * as L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";

interface Scope {
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
  protected icons: { [key: string]: L.Icon } = {};

  protected defaultIcon: any = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [14, 40],
    popupAnchor: [-1, -41],
    shadowSize: [25, 41],
    shadowAnchor: [10, 40],
  });

  static get observedAttributes() {
    return [
      "initial-lat",
      "initial-lng",
      "initial-zoom",
      "tile-url",
      "attribution",
    ];
  }

  protected scope: Scope = {
    initialLat: 53.872654,
    initialLng: 8.710849,
    initialZoom: 13,
    tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
    this.el.querySelector(".leaflet-map").id = mapId;
    const map = new L.Map(mapId).setView([this.scope.initialLat, this.scope.initialLng], this.scope.initialZoom);


    L.tileLayer(this.scope.tileUrl, {
      attribution: this.scope.attribution,
    }).addTo(map);

    for (const marker of this.markers) {
      let leafletMarker;
      if (marker.icon !== undefined && marker.icon !== null) {
        leafletMarker = L.marker([marker.lat, marker.lng], { icon: this.icons[marker.icon] });
      } else {
        leafletMarker = L.marker([marker.lat, marker.lng]);
      }
      leafletMarker.addTo(map).bindPopup(marker.title);
      if (marker.openByDefault) {
        leafletMarker.openPopup();
      }
    }
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    for (const el of this.el.children) {
      if (el.tagName === "ICON") {
        const iconName = el.getAttribute("name");
        const iconUrl = el.getAttribute("icon-url");
        const shadowUrl = el.getAttribute("shadow-url");
        const iconSize = el.getAttribute("icon-size");
        const iconAnchor = el.getAttribute("icon-anchor");
        const popupAnchor = el.getAttribute("popup-anchor");
        const shadowSize = el.getAttribute("shadow-size");
        const shadowAnchor = el.getAttribute("shadow-anchor");
        if (iconName && iconUrl && shadowUrl && iconSize && iconAnchor && popupAnchor && shadowSize && shadowAnchor) {
          this.icons[iconName] = L.icon({
            iconUrl: iconUrl,
            shadowUrl: shadowUrl,
            iconSize: iconSize.replace(" ", "").split(","),
            iconAnchor: iconAnchor.replace(" ", "").split(","),
            popupAnchor: popupAnchor.replace(" ", "").split(","),
            shadowSize: shadowSize.replace(" ", "").split(","),
            shadowAnchor: shadowAnchor.replace(" ", "").split(",")
          });
        }
      }

      if (el.tagName === "MARKER") {
        const lat = el.getAttribute("lat");
        const lng = el.getAttribute("lng");
        const icon = el.getAttribute("icon");
        const title = el.textContent;
        if (lat != null && lng != null && title != null) {
          this.markers.push({
            lat: +lat,
            lng: +lng,
            title: title,
            icon: icon,
            openByDefault: el.hasAttribute("open-by-default") ? el.getAttribute("open-by-default") === "true" : true
          });
        } else {
          console.warn("marker without enough data found");
        }
      }
    }
    return template;
  }
}
