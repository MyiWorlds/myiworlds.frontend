import lunr from 'lunr';

function arrayMove(arr, fromIndex, toIndex) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

const sortArrayLunr = (lines, searchFieldString) => {
  if (!lines || !lines.length) return [];

  const lunrSetup = lunr(function() {
    this.ref('uid');
    this.field('title');
    this.field('description');
    this.field('tags');

    lines.forEach(lines => {
      this.add(lines);
    });
  });

  let lunrSortList = lunrSetup.search(searchFieldString);

  if (lunrSortList.length) {
    lunrSortList = lunrSortList.map(lunrResult => lunrResult.ref);

    lunrSortList.forEach((item, index) => {
      function matchingIndex(circle) {
        return circle.uid === item;
      }

      const moveFromIndex = lines.findIndex(matchingIndex);
      arrayMove(lines, moveFromIndex, index);
    });
  }

  return lines;
};

export default sortArrayLunr;
