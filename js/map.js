import {setEnabledCondition, formAddress} from './form.js';
import {createProposition} from './generate-layout.js';
import {objectsArray} from './data-generation.js';

const map = L.map('map-canvas')
  .on('load', setEnabledCondition)
  .setView({
    lat: 35.84453,
    lng: 140.17456,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.84453,
    lng: 140.17456,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarker = (element) => {
  const pinMarker = L.marker(
    {
      lat: element.location.lat,
      lng: element.location.lng,
    },
    {
      icon: pinIcon,
    },
  );
  pinMarker.addTo(markerGroup).bindPopup(createProposition(element));
};

mainPinMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat;
  const lng = evt.target.getLatLng().lng;
  formAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

objectsArray.forEach((element) => {
  createMarker(element);
});

