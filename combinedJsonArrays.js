const fs = require('fs');

// Combining two json files of arrays without parsing.  Just removing the last "]" and first "[", and adding a comma ",".

const jsonFile1 = 'objectDataWithOffsetsCombinedCurrent.json';

const jsonFile2 = 'multidimensioncoasterObjectData.json';

const combinedJsonFile = 'objectDataWithOffsetsCombinedCurrent.json'

const jsonArray1 = fs.readFileSync(jsonFile1, 'utf-8');

const jsonArray2 = fs.readFileSync(jsonFile2, 'utf-8');

const combinedArrays = jsonArray1.slice(0, -1) + ',' + jsonArray2.slice(1);


fs.writeFileSync(combinedJsonFile, combinedArrays);