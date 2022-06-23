import {objectsArray} from './data-generation.js';
import {createProposition} from './generate-layout.js';

const propositionInput = document.querySelector('#map-canvas');

propositionInput.append(createProposition(objectsArray[3]));
