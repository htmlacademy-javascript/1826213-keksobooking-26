import './form.js';
import './map.js';
import './api.js';

import {renderMarkers, initMap} from './map.js';
import {getData} from './api.js';
import {} from './form-popups.js';
import {allowSubmitForm} from './form.js';


allowSubmitForm();
initMap();

getData(renderMarkers);
