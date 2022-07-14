import './form.js';
import './map.js';
import './api.js';
import './form-filter.js';
import './utils.js';

import {initMap} from './map.js';
// import {getData} from './api.js';
import {allowSubmitForm, toggleFormFromEnabled} from './form.js';

toggleFormFromEnabled(true);
allowSubmitForm();
initMap(toggleFormFromEnabled);

// getData(renderMarkers);
// clearMarkers();
