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

const uploadForm = document.querySelector('#upload-select-image');
const effectLevelContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = effectLevelContainer.querySelector('.effect-level__slider');
const effectLevelField = effectLevelContainer.querySelector('.effect-level__value');
const preview = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');
const defaultEffectElement = effectsList.querySelector('.effects__radio[value=none]');

const updateSlider = (newOptionsObject) => {
  if (newOptionsObject) {
    const {max, min, step} = newOptionsObject;

    effectLevelSlider.noUiSlider.updateOptions({
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
      preview.style.filter = '';
      return;
    }
    preview.style.filter = `${newEffect.filterType}(${effectLevelSlider.noUiSlider.get()}${newEffect.unit})`;
  }
};

const onEffectChange = (evt) => {
  if (currentEffectClassName.getText()) {
    preview.classList.remove(currentEffectClassName.getText());
  }

  if (!Object.hasOwn(Effect, evt.target.value.toUpperCase())) {
    currentEffectName.setText('DEFAULT');
    currentEffectClassName.setText(DEFAULT_EFFECT_PREVIEW_CLASSNAME);
    preview.classList.add(currentEffectClassName.getText());
    setDefaultSlider();
    effectLevelContainer.classList.add('hidden');
  } else {
    currentEffectName.setText(evt.target.value.toUpperCase());
    currentEffectClassName.setText(`effects__preview--${evt.target.value}`);
    preview.classList.add(currentEffectClassName.getText());
    updateSlider(Effect[evt.target.value.toUpperCase()]);

    if (effectLevelContainer.classList.contains('hidden')) {
      effectLevelContainer.classList.remove('hidden');
    }
  }
};

const runEffects = () => {
  currentEffectName.setText('DEFAULT');
  currentEffectClassName.setText(DEFAULT_EFFECT_PREVIEW_CLASSNAME);
  preview.classList.add(currentEffectClassName.getText());
  effectLevelContainer.classList.add('hidden');
  effectsList.addEventListener('change', onEffectChange);

  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelField.value = `${effectLevelSlider.noUiSlider.get()}`;
    updateStyle(Effect[currentEffectName.getText()]);
  });

  setDefaultSlider();
};

const stopEffects = () => {
  if (currentEffectClassName.getText()) {
    preview.classList.remove(currentEffectClassName.getText());
  }

  defaultEffectElement.checked = true;
  currentEffectName.setText('DEFAULT');
  currentEffectClassName.setText('');
  effectLevelContainer.classList.add('hidden');
  setDefaultSlider();
  effectsList.removeEventListener('change', onEffectChange);
  effectLevelSlider.noUiSlider.off();
};

noUiSlider.create(effectLevelSlider, defaultSlider);

export { runEffects, stopEffects };
