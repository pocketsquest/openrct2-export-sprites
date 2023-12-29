const fs = require('fs');

const objectDataFile = 'objectDataWithOffsetsCombinedCurrent.json';
const sortedDataFile = 'objectDataSorted.json'

// Compare function to sort by a number of properties.  Example `objectData.sort(sortBy('Type','Source','ObjectName'));`
function sortBy(...props) {
  return (a, b) => {
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      const valueA = a[prop];
      const valueB = b[prop];

      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      }
      // If values are equal, continue to the next property
    }

    return 0; // a and b are equal for all specified properties
  };
}

function sortData(...props) {
  const objectData = JSON.parse(fs.readFileSync(objectDataFile, 'utf-8'));
  objectData.sort(sortBy(...props));
  fs.writeFileSync(sortedDataFile, JSON.stringify(objectData, null, 2));
}