const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const avatarDefaultSrc = 'img/muffin-grey.svg';
const housingImagesInput = document.querySelector('.ad-form__input');
const housingImagesPreview = document.querySelector('.ad-form__photo');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const setImagesToDefault = () => {
  avatarPreview.src = avatarDefaultSrc;
  housingImagesPreview.innerHTML = '';
};

housingImagesInput.addEventListener('change', () => {
  const file = housingImagesInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    housingImagesPreview.innerHTML = '';
    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(file);
    imgElement.setAttribute('height', '70px');
    imgElement.setAttribute('width', '70px');
    housingImagesPreview.append(imgElement);
  }
});

export {setImagesToDefault};
