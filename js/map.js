import {setEnabledCondition, formAddress} from './form.js';
import {createProposition} from './generate-layout.js';

const OBJECTS_AMOUNT = 10;
const INITIAL_COORDINATES = {
  lat: 35.62828,
  lng: 139.74472,
};

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const addMainPinMarker = () => mainPinMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const checkMainPin = () => {
  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    formAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });
};


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
  pinMarker.addTo(markerGroup).bindPopup(createProposition(element));
};

const renderMarkers = (array) => {
  array.slice(0, OBJECTS_AMOUNT - 1).forEach((element) => {
    renderMarker(element);
  });
};

const resetMap = () => {
  formAddress.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`;
  mainPinMarker.setLatLng({
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  });
  map.setView({
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  }, 10);
};

const initMap = () => {
  map.on('load', () => {
    setEnabledCondition();
    addMainPinMarker();
    checkMainPin();
  })
    .setView({
      lat: INITIAL_COORDINATES.lat,
      lng: INITIAL_COORDINATES.lng,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

export {renderMarkers, resetMap, initMap};
