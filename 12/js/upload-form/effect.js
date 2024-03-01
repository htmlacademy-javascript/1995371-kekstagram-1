import { createTextStorage, roundToDecimalOrInteger, getFloat } from '../util.js';

const effect = {
  'chrome': {
    filterType: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'sepia': {
    filterType: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'marvin': {
    filterType: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  'phobos': {
    filterType: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  'heat': {
    filterType: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
  'default': {
    filterType: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  }
};

const currentEffectName = createTextStorage('default');
const currentEffectClass = createTextStorage();

const defaultSlider = {
  start: effect['default'].max,
  connect: 'lower',
  range: {
    'min': effect['default'].min,
    'max': effect['default'].max,
  },
  step: effect['default'].step,
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
  updateSlider(effect['default']);
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
  if (currentEffectClass.getText()) {
    preview.classList.remove(currentEffectClass.getText());
  }

  if (!Object.hasOwn(effect, evt.target.value)) {
    currentEffectName.setText('default');
    currentEffectClass.setText('');
    setDefaultSlider();
    effectLevelContainer.classList.add('hidden');
  } else {
    currentEffectName.setText(evt.target.value);
    currentEffectClass.setText(`effects__preview--${evt.target.value}`);
    preview.classList.add(currentEffectClass.getText());

    updateSlider(effect[evt.target.value]);

    if (effectLevelContainer.classList.contains('hidden')) {
      effectLevelContainer.classList.remove('hidden');
    }
  }
};

const runEffects = () => {
  currentEffectClass.setText('');
  effectLevelContainer.classList.add('hidden');
  effectsList.addEventListener('change', onEffectChange);
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelField.value = `${effectLevelSlider.noUiSlider.get()}`;
    updateStyle(effect[currentEffectName.getText()]);
  });
  setDefaultSlider();
};

const stopEffects = () => {
  if (currentEffectClass.getText()) {
    preview.classList.remove(currentEffectClass.getText());
  }
  defaultEffectElement.checked = true;
  currentEffectName.setText('default');
  currentEffectClass.setText('');
  effectLevelContainer.classList.add('hidden');
  setDefaultSlider();
  effectsList.removeEventListener('change', onEffectChange);
  effectLevelSlider.noUiSlider.off();
};

noUiSlider.create(effectLevelSlider, defaultSlider);

export { runEffects, stopEffects };
