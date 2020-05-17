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
  protected icons: any[] = [];

  protected defaultIcon: any = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [14, 40],
    popupAnchor: [-1, -41],
    shadowSize: [25, 41],
    shadowAnchor: [10, 40]
  });

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
    var mapId = 'map-'+Math.floor(Math.random() * 9999);
    this.el.querySelector('.leaflet-map').id = mapId;
    var map = new L.Map(mapId).setView([this.scope.initialLat, this.scope.initialLng], this.scope.initialZoom);;
    


    L.tileLayer(this.scope.tileUrl, {
      attribution: this.scope.attribution
    }).addTo(map);

    for(let marker of this.markers) {
      var icon = this.defaultIcon;  
      if(marker.icon !== undefined) {
        icon = this.icons[marker.icon]
      }
      let leatfletMarker = L.marker([marker.lat, marker.lng], {icon: icon})
      .addTo(map)
      .bindPopup(marker.title);
      if(marker.openByDefault) {
        leatfletMarker.openPopup();
      }
    }

  }


  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    for(let el of this.el.children) {
      if(el.tagName === "ICON") {
        var iconName = el.getAttribute("name"); 
        var iconUrl = el.getAttribute("iconUrl");
        var shadowUrl = el.getAttribute("shadowUrl");
        var iconSize = el.getAttribute("iconSize"); 
        var iconAnchor = el.getAttribute("iconAnchor");
        var popupAnchor = el.getAttribute("popupAnchor");
        var shadowSize = el.getAttribute("shadowSize");
        var shadowAnchor = el.getAttribute("shadowAnchor");
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
      if(el.tagName === "MARKER") {
        var lat = el.getAttribute("lat"); 
        var lng = el.getAttribute("lng");
        var icon = el.getAttribute("icon");
        var title = el.textContent;
        if(lat !== undefined && lng !== undefined && title !== undefined) {
          this.markers.push({
            lat: lat,
            lng: +lng,
            title: title,
            icon: icon,
            openByDefault: el.hasAttribute("openByDefault") ? el.getAttribute("openByDefault") === "true" : true
          });
        } else {
          console.warn("marker without enough data found");
        }
      }
    }
    return template;
  }
}
