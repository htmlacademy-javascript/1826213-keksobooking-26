import {getData} from './api.js';
import {clearMarkers, renderMarkers} from './map.js';
import {debounce} from './utils.js';

const DEBOUNCE_DELAY = 500;
const MAX_OBJECTS_VALUE = 10;
const SELECT_DEFAULT_VALUE = 'any';

const PRICE_FILTER_VALUES = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
    to: 100000,
  },
  any: {
    from: 0,
    to: 100000,
  },
};

const mapFiltersElement = document.querySelector('.map__filters');
const mapTypeFilterElement = mapFiltersElement.querySelector('#housing-type');
const mapPriceFilterElement = mapFiltersElement.querySelector('#housing-price');
const mapRoomsFilterElement = mapFiltersElement.querySelector('#housing-rooms');
const mapGuestsFilterElement = mapFiltersElement.querySelector('#housing-guests');
const mapFeaturesFilterElement = mapFiltersElement.querySelector('#housing-features');

const getFilteredAds = (array) => {
  const filterType = (ad) => mapTypeFilterElement.value === ad.offer.type || mapTypeFilterElement.value === SELECT_DEFAULT_VALUE;
  const filterPrice = (ad) => (ad.offer.price >= PRICE_FILTER_VALUES[mapPriceFilterElement.value].from && ad.offer.price <= PRICE_FILTER_VALUES[mapPriceFilterElement.value].to);
  const filterRooms = (ad) => ad.offer.rooms.toString() === mapRoomsFilterElement.value || mapRoomsFilterElement.value === SELECT_DEFAULT_VALUE;
  const filterGuests = (ad) => ad.offer.guests.toString() === mapGuestsFilterElement.value || mapGuestsFilterElement.value === SELECT_DEFAULT_VALUE;

  const filterFeatures = (ad) => {
    const filtersFeatures = [];
    const checkedFilters = mapFeaturesFilterElement.querySelectorAll('input:checked');
    checkedFilters.forEach((el) => filtersFeatures.push(el.value));

    if (ad.offer.features){
      return filtersFeatures.every((feature) => ad.offer.features.includes(feature));
    }

    return false;
  };

  const filteredAds = [];

  const checkFilters = (elem) =>
    filterType(elem) &&
    filterPrice(elem) &&
    filterRooms(elem) &&
    filterGuests(elem) &&
    filterFeatures(elem);

  for (let i = 0; i < array.length; i++) {
    if(checkFilters(array[i])) {
      filteredAds.push(array[i]);
    }

    if(filteredAds.length >= MAX_OBJECTS_VALUE) {
      break;
    }
  }
  return filteredAds;
};

const mapFilterUpdateHandler = () => {
  mapFiltersElement.addEventListener('change', debounce(async () => {
    const data = await getData();
    clearMarkers();
    renderMarkers(getFilteredAds(data));
  }, DEBOUNCE_DELAY)
  );
};

const startMapFilter = async () => {
  const data = await getData();
  renderMarkers(getFilteredAds(data));
};

const resetMapFilters = async () => {
  const data = await getData();
  mapFiltersElement.reset();
  clearMarkers();
  renderMarkers(getFilteredAds(data));
};

export {resetMapFilters, startMapFilter, mapFilterUpdateHandler};
