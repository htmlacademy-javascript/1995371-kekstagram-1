const SCALE_STEP = 25;

const ScaleValue = {
  MIN: SCALE_STEP,
  MAX: 100,
};

const scaleSectionElement = document.querySelector('.img-upload__scale');
const decreaseButtonElement = scaleSectionElement.querySelector('.scale__control--smaller');
const increaseButtonElement = scaleSectionElement.querySelector('.scale__control--bigger');
const scaleFieldElement = scaleSectionElement.querySelector('.scale__control--value');
const previewElement = document.querySelector('.img-upload__preview img');

const scaleImage = () => {
  previewElement.style.transform = `scale(${parseInt(scaleFieldElement.value, 10) / 100})`;
};

const onScaleButtonClick = (evt) => {
  const currentValue = parseInt(scaleFieldElement.value, 10);
  let newValue = currentValue;

  if (evt.target === decreaseButtonElement) {
    newValue = (currentValue - SCALE_STEP < ScaleValue.MIN) ? ScaleValue.MIN : currentValue - SCALE_STEP;
  }

  if (evt.target === increaseButtonElement) {
    newValue = (currentValue + SCALE_STEP > ScaleValue.MAX) ? ScaleValue.MAX : currentValue + SCALE_STEP;
  }

  scaleFieldElement.value = `${newValue}%`;
  scaleImage();
};

const runScaleSection = () => {
  decreaseButtonElement.addEventListener('click', onScaleButtonClick);
  increaseButtonElement.addEventListener('click', onScaleButtonClick);
  scaleImage();
};

const resetScale = () => {
  scaleFieldElement.value = scaleFieldElement.defaultValue;
  scaleImage();
};

const stopScaleSection = () => {
  decreaseButtonElement.removeEventListener('click', onScaleButtonClick);
  increaseButtonElement.removeEventListener('click', onScaleButtonClick);
  resetScale();
};

export { runScaleSection, resetScale, stopScaleSection };
