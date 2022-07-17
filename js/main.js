import './form.js';
import './map.js';
import './api.js';
import './form-filter.js';
import './utils.js';
import './uploading-images.js';

import {initMap} from './map.js';
import {allowSubmitForm, toggleFormFromEnabled} from './form.js';
import {mapFilterUpdateHandler, startFilter} from './form-filter.js';

toggleFormFromEnabled(true);
startFilter();
mapFilterUpdateHandler();
allowSubmitForm();
initMap(toggleFormFromEnabled);
