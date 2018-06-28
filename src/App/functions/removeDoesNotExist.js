const removeDoesNotExist = circles => {
  return circles.filter(circle => circle.type !== 'DOES_NOT_EXIST');
};

export default removeDoesNotExist;
