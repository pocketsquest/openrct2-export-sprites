const fs = require('fs');

const imagesFile1 = 'objectDataWithOffsetsCombinedCurrent.json';

const imagesFile2 = 'multidimensioncoasterObjectData.json';

const combinedOffsetsFile = 'objectDataWithOffsetsCombinedCurrent.json'

const images1 = fs.readFileSync(imagesFile1, 'utf-8');

const images2 = fs.readFileSync(imagesFile2, 'utf-8');

const combinedOffsets = images1.slice(0, -1) + ',' + images2.slice(1);


fs.writeFileSync(combinedOffsetsFile, combinedOffsets);