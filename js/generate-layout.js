const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const checkAvailability = (templateElement, value) => (value) ? value : templateElement.remove();

const housingTypesToUnderstand = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const roomName = (value) => {
  if(value === 1) {
    return 'комната';
  } else if (value >= 2 && value <= 4) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
};

const createProposition = (obj) => {
  const {avatar} = obj.author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = obj.offer;
  const postItem = cardTemplate.cloneNode(true);
  const offerAvatar = postItem.querySelector('.popup__avatar');
  const offerTitle = postItem.querySelector('.popup__title');
  const offerAddress = postItem.querySelector('.popup__text--address');
  const offerPrice = postItem.querySelector('.popup__text--price');
  const offerType = postItem.querySelector('.popup__type');
  const offerCapacity = postItem.querySelector('.popup__text--capacity');
  const offerTime = postItem.querySelector('.popup__text--time');
  const offerFeaturesContainer = postItem.querySelector('.popup__features');
  const offerDescription = postItem.querySelector('.popup__description');
  const offerPhotosContainer = postItem.querySelector('.popup__photos');

  offerAvatar.src = checkAvailability(offerAvatar, avatar);
  offerTitle.textContent = checkAvailability(offerTitle, title);
  offerAddress.textContent = checkAvailability(offerAddress, address);
  offerPrice.textContent = checkAvailability(offerPrice, `${price} р/ночь`);
  offerType.textContent = checkAvailability(offerType, housingTypesToUnderstand[type]);
  offerCapacity.textContent = `${rooms} ${roomName(rooms)} для ${guests} ${(guests > 1) ? 'гостей' : 'гостя'}`;
  offerTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  if (features) {
    const featuresList = offerFeaturesContainer.querySelectorAll('.popup__feature');
    featuresList.forEach((featuresListItem) => {
      const included = features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),);
      if (!included) {
        featuresListItem.remove();
      }
    });
  } else {
    offerFeaturesContainer.remove();
  }

  offerDescription.textContent = checkAvailability(offerDescription, description);
  offerPhotosContainer.innerHTML = '';

  if (photos) {
    photos.forEach((photo) => {
      offerPhotosContainer.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  } else {
    offerPhotosContainer.remove();
  }

  return postItem;
};

export {createProposition};
