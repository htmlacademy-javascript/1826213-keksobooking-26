const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInputElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview').querySelector('img');
const housingImagesInputElement = document.querySelector('.ad-form__input');
const housingImagesPreviewElement = document.querySelector('.ad-form__photo');
const avatarDefaultSrc = 'img/muffin-grey.svg';

avatarInputElement.addEventListener('change', () => {
  const file = avatarInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

const setImagesToDefault = () => {
  avatarPreviewElement.src = avatarDefaultSrc;
  housingImagesPreviewElement.innerHTML = '';
};

housingImagesInputElement.addEventListener('change', () => {
  const file = housingImagesInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    housingImagesPreviewElement.innerHTML = '';
    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(file);
    imgElement.setAttribute('height', '70px');
    imgElement.setAttribute('width', '70px');
    imgElement.style = 'object-fit: cover;';
    housingImagesPreviewElement.append(imgElement);
  }
});

export {setImagesToDefault};
