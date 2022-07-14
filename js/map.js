// import { getData } from './api.js';
import {createProposition} from './generate-layout.js';

const formAddress = document.querySelector('#address');

// const OBJECTS_AMOUNT = 10;
const INITIAL_ZOOM = 12;
const INITIAL_COORDINATES = {
  lat: 35.67013,
  lng: 139.74918,
};

const map = L.map('map-canvas');
const mainMarkerGroup = L.layerGroup().addTo(map);
const markersGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  INITIAL_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderMainPinMarker = () => mainPinMarker.addTo(mainMarkerGroup);

const checkMainPin = () => {
  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    formAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });
};

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderMarker = (element) => {
  const pinMarker = L.marker(
    {
      lat: element.location.lat,
      lng: element.location.lng,
    },
    {
      icon: pinIcon,
    },
  );
  pinMarker.addTo(markersGroup).bindPopup(createProposition(element));
};

const renderMarkers = (array) => {
  array.forEach((element) => {
    renderMarker(element);
  });
};

const resetMap = () => {
  formAddress.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`;
  mainPinMarker.setLatLng(INITIAL_COORDINATES);
  map.setView(INITIAL_COORDINATES, INITIAL_ZOOM);
};

const initMap = (cb) => {
  formAddress.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`;
  map.on('load', () => {
    renderMainPinMarker();
    checkMainPin();
    cb();
  })
    .setView(INITIAL_COORDINATES, INITIAL_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const clearMarkers = () => {
  markersGroup.clearLayers();
};


export {renderMarkers, resetMap, initMap, clearMarkers};
