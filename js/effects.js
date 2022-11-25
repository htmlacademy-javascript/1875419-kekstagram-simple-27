const DEFAULT_EFFECT = {
  name: 'none',
  min: 0,
  max: 100,
  step: 1,
};

const EFFECTS = [
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const imgPreviewElement = document.querySelector('.img-upload__preview img');
const formElement = document.querySelector('.img-upload__form');
const effectLevelElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');

let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;


const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions ({
    range:{
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if(isDefault()) {
    sliderElement.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);

  updateSlider();
};

const onSliderUpdate = () => {
  imgPreviewElement.style.filter = 'none';
  imgPreviewElement.className = '';
  effectLevelElement.value = '';
  if (isDefault()) {
    return;
  }

  const sliderValue = sliderElement.noUiSlider.get();
  imgPreviewElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  imgPreviewElement.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevelElement.value = sliderValue;
};

const resetEffect = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};


noUiSlider.create(sliderElement, {
  range: {
    'min': DEFAULT_EFFECT.min,
    'max': DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});
updateSlider();

formElement.addEventListener('change', onFormChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffect, onFormChange};
