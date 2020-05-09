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
  openByDefault: boolean;
}

export class LeafletMapComponent extends Component {
  public static tagName = "leaflet-map";

  protected autobind = true;

  protected listeners = {
  };

  protected markers: Marker[] = [];

  static get observedAttributes() {
    return [
      "initial-lat",
      "initial-lng",
      "initial-zoom",
      "tile-url",
      "attribution"
    ];
  }

  protected scope: Scope = {
    initialLat: 53.872654,
    initialLng: 8.710849,
    initialZoom: 13,
    tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
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
    var map = new L.Map("map").setView([this.scope.initialLat, this.scope.initialLng], this.scope.initialZoom);;
    
    L.tileLayer(this.scope.tileUrl, {
      attribution: this.scope.attribution
    }).addTo(map);

    for(let marker of this.markers) {
      let leatfletMarker = L.marker([marker.lat, marker.lng])
      .addTo(map)
      .bindPopup('Popup')
      .openPopup();
    }

  }


  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    for(let el of this.el.children) {
      if(el.tagName === "MARKER") {
        this.markers.push({
          lat: el.getAttribute("lat"),
          lng: el.getAttribute("lng"),
          title: el.getAttribute("title"),
          openByDefault: el.getAttribute("openByDefault")
        });
      }
    }
    return template;
  }
}
