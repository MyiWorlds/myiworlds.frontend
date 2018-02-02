import settings from '../App/settings';

const toggleKeyValueBoolean = (currentWidth, returnableSizes) => {
  const masterContentSizes = settings.contentSizes;
  let size;

  if (currentWidth <= masterContentSizes.xs) {
    size = returnableSizes.xs;
  } else if (
    currentWidth > masterContentSizes.xs &&
    currentWidth <= masterContentSizes.md
  ) {
    size = returnableSizes.sm;
  } else if (
    currentWidth > masterContentSizes.sm &&
    currentWidth <= masterContentSizes.lg
  ) {
    size = returnableSizes.md;
  } else if (
    currentWidth > masterContentSizes.md &&
    currentWidth <= masterContentSizes.xl
  ) {
    size = returnableSizes.lg;
  } else {
    size = returnableSizes.xl;
  }
  return size;
};

export default toggleKeyValueBoolean;
