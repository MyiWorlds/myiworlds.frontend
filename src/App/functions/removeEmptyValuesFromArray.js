const removeEmptyValuesFromArray = lines => {
  return lines
    ? lines.filter(
        circle => circle !== undefined || circle !== null || circle !== [],
      )
    : [];
};

export default removeEmptyValuesFromArray;
