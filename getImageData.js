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
    throw new Error(`Only expecting png files`, filePath)
  }
  filePath = adjustPath(filePath); // make relative to the directory we are currently in
  try {
    const imageStats = fs.statSync(filePath);
    const dimensions = sizeOf(filePath);
    return {size: imageStats.size, ...dimensions}
    
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(`File does not exist`, filePath);
    } else {
      throw err
    }
  }
}

// take an array of 
function getAllImageData(imageArray) {

}