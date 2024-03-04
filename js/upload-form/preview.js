const DEFAULT_IMAGE_URL = 'img/upload-default-image.jpg';
const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const UpdatingProperty = {
  SRC: 'src',
  BACKGROUND: 'backgroundImage',
};

const isFileImage = (file) => {
  const newImageName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => newImageName.endsWith(type));
};

const updatePreview = (fileChooser, preview, updatingProperty, defaultUrl = DEFAULT_IMAGE_URL) => {
  const newImage = fileChooser.files[0];
  let newPreviewUrl = defaultUrl;

  if (isFileImage(newImage)) {
    newPreviewUrl = URL.createObjectURL(newImage);
  }

  switch (updatingProperty) {
    case UpdatingProperty['SRC']:
      preview.src = newPreviewUrl;
      break;

    case UpdatingProperty['BACKGROUND']:
      preview.style.backgroundImage = `url(${newPreviewUrl})`;
      break;

    default:
      break;
  }
};

export { updatePreview, UpdatingProperty };
