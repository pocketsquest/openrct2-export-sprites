const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size'); // npm install image-size

// Since the "path" properties in all the data are relative to the 'OpenRct2/bin' folder, we need to just remove the './openrct2-export-sprites' part, i.e. this repo
function adjustPath(filePath) {
  return path.relative('./openrct2-export-sprites',filePath)
}

// return height, width, and file size given a filepath
function getImageData(filePath) {
  if (path.extname(filePath) !== '.png') {
    throw new Error(`${filePath} is not a png image`)
  }
  filePath = adjustPath(filePath); // make relative to the directory we are currently in
  try {
    const imageStats = fs.statSync(filePath);
    const {height, width} = sizeOf(filePath);
    return {size: imageStats.size, height, width}
    
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(`${filePath} does not exist`);
    } else {
      throw err
    }
  }
}

// take an array of 
function getImageDataForArray(imageArray) {

  const newImageArray = imageArray.map(image => {
    const imageData = getImageData(image.path);
    return {...image, ...imageData}
  });

  return newImageArray;
}

// take an array of 
function getAllImageData(inputFilePath, outputFilePath) {
  const objectData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

  if (objectData[0].objectName) {
    const newData = objectData.map(obj => {
      const newImageArray = getImageDataForArray(obj.images);
      return {...obj, images: newImageArray}
    });
    if (outputFilePath === "skip") {
      fs.writeFileSync(inputFilePath, JSON.stringify(newData, null, 2));
    } else {
      fs.writeFileSync(outputFilePath, JSON.stringify(newData, null, 2));
    }
  } else if (objectData[0].path){
    const newData = getImageDataForArray(obj.images);
    if (outputFilePath === "skip") {
      fs.writeFileSync(inputFilePath, JSON.stringify(newData, null, 2));
    } else {
      fs.writeFileSync(outputFilePath, JSON.stringify(newData, null, 2));
    }
  }

}

getAllImageData('objectDataTotalSorted.json', 'objectDataTotalSortedWithImageData.json');