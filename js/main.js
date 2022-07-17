import './form.js';
import './map.js';
import './api.js';
import './form-filter.js';
import './utils.js';
import './uploading-images.js';

import {initMap} from './map.js';
import {allowSubmitForm, resetFormButtonHandler, toggleFormFromEnabled} from './form.js';
import {mapFilterUpdateHandler, startFilter} from './form-filter.js';

toggleFormFromEnabled(true);

initMap(() => {
  allowSubmitForm();
  toggleFormFromEnabled(false);
  resetFormButtonHandler();
  startFilter();
  mapFilterUpdateHandler();
}
);
