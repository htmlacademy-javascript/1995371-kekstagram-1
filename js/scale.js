const SCALE_STEP = 25;

const ScaleValue = {
  MIN: SCALE_STEP,
  MAX: 100,
};

const scaleSection = document.querySelector('.img-upload__scale');
const decreaseButton = scaleSection.querySelector('.scale__control--smaller');
const increaseButton = scaleSection.querySelector('.scale__control--bigger');
const scaleField = scaleSection.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview');

const scaleImage = () => {
  preview.style.transform = `scale(${parseInt(scaleField.value, 10) / 100})`;
};

const onScaleButtonClick = (evt) => {
  const currentValue = parseInt(scaleField.value, 10);
  let newValue = currentValue;

  if (evt.target === decreaseButton) {
    newValue = (currentValue - SCALE_STEP < ScaleValue.MIN) ? ScaleValue.MIN : currentValue - SCALE_STEP;
  }

  if (evt.target === increaseButton) {
    newValue = (currentValue + SCALE_STEP > ScaleValue.MAX) ? ScaleValue.MAX : currentValue + SCALE_STEP;
  }
  scaleField.value = `${newValue}%`;
  scaleImage();
};


const setScaleSection = () => {
  decreaseButton.addEventListener('click', onScaleButtonClick);
  increaseButton.addEventListener('click', onScaleButtonClick);
  scaleImage();
};

const resetScale = () => {
  scaleField.value = scaleField.defaultValue;
  scaleImage();
};

const clearScaleSection = () => {
  decreaseButton.removeEventListener('click', onScaleButtonClick);
  increaseButton.removeEventListener('click', onScaleButtonClick);
  resetScale();
};

export {setScaleSection, resetScale, clearScaleSection};
