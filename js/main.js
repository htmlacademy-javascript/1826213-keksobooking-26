import './form.js';
import './map.js';
import './api.js';

import {renderMarkers} from './map.js';
import {getData} from './api.js';

getData(renderMarkers);
