const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;
const PERCENTAGE = 100;
const RADIX = 10;

const previewImageElement = document.querySelector('.img-upload__preview img');
const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');

const scaleImage = (value = DEFAULT_SCALE) => {
  previewImageElement.style.transform = `scale(${value / PERCENTAGE})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, RADIX);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, RADIX);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage();
};

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetScale};
