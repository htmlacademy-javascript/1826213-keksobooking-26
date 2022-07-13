import './form.js';
import './map.js';
import './api.js';

import {renderMarkers, initMap} from './map.js';
import {getData} from './api.js';
import {allowSubmitForm, toggleFormFromEnabled} from './form.js';

toggleFormFromEnabled(true);
allowSubmitForm();
initMap(toggleFormFromEnabled);

getData(renderMarkers);
