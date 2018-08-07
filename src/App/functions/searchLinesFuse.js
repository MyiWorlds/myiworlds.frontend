import lunr from 'lunr';

const searchLinesFuse = (lines, searchFieldString) => {
  if (!lines) return [];

  const lunrSort = lunr(function() {
    this.ref('uid');
    this.field('tags');
    // this.field('title');
    // this.field('description');

    lines.forEach(function(lines) {
      this.add(lines);
    }, this);
  });

  const orderedSearch = lunrSort.search(searchFieldString);
  const orderedLines = [];

  orderedSearch.forEach(result => {
    const circle = lines.find(circle => circle.uid === result.ref);

    orderedLines.push(circle);
  });

  return orderedLines;
};

export default searchLinesFuse;
