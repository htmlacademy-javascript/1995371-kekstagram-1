const DEFAULT_IMAGE_URL = 'img/upload-default-image.jpg';
const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const updatePreview = (fileChooser, preview, defaultUrl = DEFAULT_IMAGE_URL) => {
  let newPreviewUrl = defaultUrl;
  const newImage = fileChooser.files[0];
  const newImageName = newImage.name.toLowerCase();

  if (FILE_TYPES.some((type) => newImageName.endsWith(type))) {
    newPreviewUrl = URL.createObjectURL(newImage);
  }

  preview.src = newPreviewUrl;
};

export { updatePreview };
