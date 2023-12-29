const fs = require('fs');

const offsetsFile1 = 'objectDataWithOffsetsCombinedCurrent.json';

const offsetsFile2 = 'multidimensioncoasterObjectData.json';

const combinedOffsetsFile = 'objectDataWithOffsetsCombinedCurrent.json'

const offsets1 = fs.readFileSync(offsetsFile1, 'utf-8');

const offsets2 = fs.readFileSync(offsetsFile2, 'utf-8');

const combinedOffsets = offsets1.slice(0, -1) + ',' + offsets2.slice(1);


fs.writeFileSync(combinedOffsetsFile, combinedOffsets);