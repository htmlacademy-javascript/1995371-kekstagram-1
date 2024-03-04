import { createTextStorage, roundToDecimalOrInteger, getFloat } from '../util.js';

const DEFAULT_EFFECT_PREVIEW_CLASSNAME = 'effects__preview--none';

const Effect = {
  CHROME: {
    filterType: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  SEPIA: {
    filterType: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  MARVIN: {
    filterType: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  PHOBOS: {
    filterType: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  HEAT: {
    filterType: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
  DEFAULT: {
    filterType: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  }
};

const currentEffectName = createTextStorage('DEFAULT');
const currentEffectClassName = createTextStorage();

const defaultSlider = {
  start: Effect['DEFAULT'].max,
  connect: 'lower',
  range: {
    'min': Effect['DEFAULT'].min,
    'max': Effect['DEFAULT'].max,
  },
  step: Effect['DEFAULT'].step,
  format: {
    to: roundToDecimalOrInteger,
    from: getFloat,
  },
};

const uploadFormElement = document.querySelector('#upload-select-image');
const effectLevelContainerElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = effectLevelContainerElement.querySelector('.effect-level__slider');
const effectLevelFieldElement = effectLevelContainerElement.querySelector('.effect-level__value');
const previewElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const defaultEffectElementElement = effectsListElement.querySelector('.effects__radio[value=none]');

const updateSlider = (newOptionsObject) => {
  if (newOptionsObject) {
    const {max, min, step} = newOptionsObject;

    effectLevelSliderElement.noUiSlider.updateOptions({
      start: max,
      range: {
        'min': min,
        'max': max,
      },
      step: step,
    }, true);
  }
};

const setDefaultSlider = () => {
  updateSlider(Effect['DEFAULT']);
};

const updateStyle = (newEffect) => {
  if (newEffect) {
    if (newEffect.filterType === 'none') {
      previewElement.style.filter = '';
      return;
    }
    previewElement.style.filter = `${newEffect.filterType}(${effectLevelSliderElement.noUiSlider.get()}${newEffect.unit})`;
  }
};

const onEffectChange = (evt) => {
  if (currentEffectClassName.getText()) {
    previewElement.classList.remove(currentEffectClassName.getText());
  }

  if (!Object.hasOwn(Effect, evt.target.value.toUpperCase())) {
    currentEffectName.setText('DEFAULT');
    currentEffectClassName.setText(DEFAULT_EFFECT_PREVIEW_CLASSNAME);
    previewElement.classList.add(currentEffectClassName.getText());
    setDefaultSlider();
    effectLevelContainerElement.classList.add('hidden');
  } else {
    currentEffectName.setText(evt.target.value.toUpperCase());
    currentEffectClassName.setText(`effects__preview--${evt.target.value}`);
    previewElement.classList.add(currentEffectClassName.getText());
    updateSlider(Effect[evt.target.value.toUpperCase()]);

    if (effectLevelContainerElement.classList.contains('hidden')) {
      effectLevelContainerElement.classList.remove('hidden');
    }
  }
};

const runEffects = () => {
  currentEffectName.setText('DEFAULT');
  currentEffectClassName.setText(DEFAULT_EFFECT_PREVIEW_CLASSNAME);
  previewElement.classList.add(currentEffectClassName.getText());
  effectLevelContainerElement.classList.add('hidden');
  effectsListElement.addEventListener('change', onEffectChange);

  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelFieldElement.value = `${effectLevelSliderElement.noUiSlider.get()}`;
    updateStyle(Effect[currentEffectName.getText()]);
  });

  setDefaultSlider();
};

const stopEffects = () => {
  if (currentEffectClassName.getText()) {
    previewElement.classList.remove(currentEffectClassName.getText());
  }

  defaultEffectElementElement.checked = true;
  currentEffectName.setText('DEFAULT');
  currentEffectClassName.setText('');
  effectLevelContainerElement.classList.add('hidden');
  setDefaultSlider();
  effectsListElement.removeEventListener('change', onEffectChange);
  effectLevelSliderElement.noUiSlider.off();
};

noUiSlider.create(effectLevelSliderElement, defaultSlider);

export { runEffects, stopEffects };
