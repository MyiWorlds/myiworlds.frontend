const mergeDuplicateCircles = lines => {
  lines = [...new Set(lines.map(o => JSON.stringify(o)))].map(s =>
    JSON.parse(s),
  );

  return lines;
};

export default mergeDuplicateCircles;
