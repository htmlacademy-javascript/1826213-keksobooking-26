import {objectsArray} from './data-generation.js';
import {createProposition} from './generate-layout.js';
import { getRandomArrayElement } from './utils.js';

const adInput = document.querySelector('#map-canvas');

adInput.append(createProposition(getRandomArrayElement(objectsArray)));
