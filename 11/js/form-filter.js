import { getData } from './api.js';
import { clearMarkers, renderMarkers} from './map.js';
import { debounce } from './utils.js';

const mapFilters = document.querySelector('.map__filters');
const mapTypeFilter = mapFilters.querySelector('#housing-type');
const mapPriceFilter = mapFilters.querySelector('#housing-price');
const mapRoomsFilter = mapFilters.querySelector('#housing-rooms');
const mapGuestsFilter = mapFilters.querySelector('#housing-guests');
const mapFeaturesFilter = mapFilters.querySelector('#housing-features');

const DEBOUNCE_DELAY = 500;
const MAX_OBJECTS_VALUE = 10;
const SELECT_DEFAULT_VALUE = 'any';
const mapPriceFilterValues = {
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

const getFilteredAds = (array) => {
  const filterType = (ad) => mapTypeFilter.value === ad.offer.type || mapTypeFilter.value === SELECT_DEFAULT_VALUE;
  const filterPrice = (ad) => (ad.offer.price >= mapPriceFilterValues[mapPriceFilter.value].from && ad.offer.price <= mapPriceFilterValues[mapPriceFilter.value].to);
  const filterRooms = (ad) => ad.offer.rooms.toString() === mapRoomsFilter.value || mapRoomsFilter.value === SELECT_DEFAULT_VALUE;
  const filterGuests = (ad) => ad.offer.guests.toString() === mapGuestsFilter.value || mapGuestsFilter.value === SELECT_DEFAULT_VALUE;

  const filterFeatures = (ad) => {
    const filtersFeatures = [];
    const checkedFilters = mapFeaturesFilter.querySelectorAll('input:checked');
    checkedFilters.forEach((el) => filtersFeatures.push(el.value));
    if (ad.offer.features){
      return filtersFeatures.every((feature) => ad.offer.features.includes(feature));
    }
    return false;
  };

  const filteredAds = [];

  for (let i = 0; i < array.length; i++) {
    if(filterType(array[i]) && filterPrice(array[i]) && filterRooms(array[i]) && filterGuests(array[i]) && filterFeatures(array[i])) {
      filteredAds.push(array[i]);
    }

    if(filteredAds.length >= MAX_OBJECTS_VALUE) {
      break;
    }
  }
  return filteredAds;
};

const mapFilterUpdateHandler = () => {
  mapFilters.addEventListener('change', debounce(() => {
    getData((ads) => {
      clearMarkers();
      renderMarkers(getFilteredAds(ads));
    });
  }, DEBOUNCE_DELAY)
  );
};

const startFilter = () => {
  getData((ads) => {
    renderMarkers(getFilteredAds(ads));
  });
};

const resetMapFilters = () => {
  mapFilters.reset();
  getData((ads) => {
    clearMarkers();
    renderMarkers(getFilteredAds(ads));
  });
};

startFilter();
mapFilterUpdateHandler();

export {resetMapFilters, startFilter, mapFilterUpdateHandler};
