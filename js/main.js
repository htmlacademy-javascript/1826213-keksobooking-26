import './form.js';
import './map.js';
import './api.js';
import './form-filter.js';
import './utils.js';
import './uploading-images.js';

import {initMap} from './map.js';
import {allowSubmitForm, toggleFormFromEnabled} from './form.js';

toggleFormFromEnabled(true);
allowSubmitForm();
initMap(toggleFormFromEnabled);
