const fs = require('fs');
const path = require('path');

// const filePath = 'objectDataTotalSorted'+ '.json';

// const jsonString = fs.readFileSync(filePath, 'utf-8');

// const properties = ["Type", "ImageCount", "Size","Source","ObjectName","String"];

// // const regex = new RegExp(`"(${properties.join("|")})"`, 'g');
// const regex = new RegExp(`"offsets"`,'g');

// // const replacer =  (match) => `"${match[1].toLowerCase()}${match.slice(2)}`
// const replacer = `"images"`

// const newString = jsonString.replace(regex,replacer);

// fs.writeFileSync(filePath, newString, 'utf8');

const testObject = {
  "objectName": "ARRSW2",
  "imageCount": 4623,
  "numPngs": 2,
  "numEmptyPngs": 1,
  "emptyPngFiles": [
    "0001.png"
  ]
}

function testStats({objectName, imageCount, numPngs, emptyPngFiles}) {
  const directoryPath = path.join('./sprites',objectName)
  const padding = (imageCount-1).toString().length;

  const paddedFileName = (num) => num.toString().padStart(padding,'0') + '.png';
  const getStats = (num) => {
    try {
      return fs.statSync(path.join(directoryPath, paddedFileName(num)));
    } catch (err) {
      return err.errno
    }
  }

  const emptyFileName = paddedFileName(numPngs -1);

  if (emptyFileName !== emptyPngFiles[0]) {
    console.error(`Unexpected file name. Expected ${emptyFileName}, given ${emptyPngFiles}[0]`)
    return
  }

  const getStatsFor = [0,numPngs-1, imageCount-1,imageCount];

  return getStatsFor.map(getStats)  
}

// console.log(testStats(testObject))

const directoryContents = fs.readdirSync("./sprites/BN1");
console.log(directoryContents)