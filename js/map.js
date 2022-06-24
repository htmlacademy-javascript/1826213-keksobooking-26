import {objectsArray} from './data-generation.js';
import {createProposition} from './generate-layout.js';
import { getRandomArrayElement } from './utils.js';

const adInput = document.querySelector('#map-canvas');
let arrayPropositions = [];

for (let i = 0; i < objectsArray.length; i++) {
  arrayPropositions[i] = createProposition(objectsArray[i]);
}

adInput.append(getRandomArrayElement(arrayPropositions));
