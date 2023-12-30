const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size'); // npm install image-size


// Compare function to sort by a number of properties.  Example `objectData.sort(sortBy('type','source','objectName'));`
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

// Example `sortData('objectData.json','sortedData.json','type','source','objectName');`
function sortData(objectDataFile,sortedDataFile,...props) {
  const objectData = JSON.parse(fs.readFileSync(objectDataFile, 'utf-8'));
  objectData.sort(sortBy(...props));
  fs.writeFileSync(sortedDataFile, JSON.stringify(objectData, null, 2));
}

// sortData('objectDataWithOffsetsCombinedCurrent.json','objectDataTotalSorted.json','objectName')


// example: renameFilePaths('objectData.json','..','./openrct2-export-sprites')
function renameFilePaths(inputDataFile,pattern, replacement) {
  fs.readFile(inputDataFile, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }

      try {
          // Parse the JSON data
          const jsonData = JSON.parse(data);

          // Modify the path property for each object
          jsonData.forEach(obj => {
              if (obj.path) {
                  obj.path = obj.path.replace(pattern, replacement);
              }
          });

          // Convert the updated data back to JSON format
          const updatedJsonData = JSON.stringify(jsonData, null, 2);

          // Write the updated JSON data back to the file
          fs.writeFile(inputDataFile, updatedJsonData, 'utf8', (writeErr) => {
              if (writeErr) {
                  console.error('Error writing file:', writeErr);
              } else {
                  console.log('File updated successfully!');
              }
          });
      } catch (jsonErr) {
          console.error('Error parsing JSON:', jsonErr);
      }
  });
}

// Change property to Number type
function toNumber(inputDataFile,prop) {
  fs.readFile(inputDataFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Modify the property for each object
        jsonData.forEach(obj => {
          const newValue = Number( obj[prop] );
            if (typeof newValue === 'number') {
                obj[prop] = newValue;
            }
        });

        // Convert the updated data back to JSON format
        const updatedJsonData = JSON.stringify(jsonData, null, 2);

        // Write the updated JSON data back to the file
        fs.writeFile(inputDataFile, updatedJsonData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
            } else {
                console.log('File updated successfully!');
            }
        });
    } catch (jsonErr) {
        console.error('Error parsing JSON:', jsonErr);
    }
});
}

// Get file size and use image-size module to add width and height information to each image
function saveImageStats(inputDataFile,outputDataFile) {
  fs.readFile(inputDataFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file ${inputDataFile}:`, err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        if (jsonData[0].path) {
          // Go through each image file
          jsonData.forEach(image => {
            // Get Dimensions
            try {
              const {width, height} = sizeOf(image.path);
              image = {...image, width, height};
            } catch {
              image = {...image, width: 0, height: 0 };
            }
            // Get file size
            try {
              const stats = fs.statSync(image.path);
              image.size = stats.size
            } catch {
              image.size = 0;
            }
          });
        } else if (jsonData[0].offsets) {
          // Go through each image file
          jsonData.forEach(obj => {
            obj.offsets.forEach( image => {
              // Get Dimensions
              try {
                const {width, height} = sizeOf(image.path);
                image = {...image, width, height};
              } catch {
                image = {...image, width: 0, height: 0 };
              }
              // Get file size
              try {
                const stats = fs.statSync(image.path);
                image.size = stats.size
              } catch {
                image.size = 0;
              }
            })     
          });
        } else {
          return new Error(`Input data from ${inputDataFile} is in incorrect format.`)
        }

        

        // Convert the updated data back to JSON format
        const updatedJsonData = JSON.stringify(jsonData, null, 2);

        // Write the updated JSON data back to the file
        fs.writeFile(outputDataFile, updatedJsonData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Error writing file ${outputDataFile}: `, writeErr);
            } else {
                console.log(`File ${outputDataFile} written successfully!`);
            }
        });
    } catch (jsonErr) {
        console.error(`Error parsing JSON for ${inputDataFile}:`, jsonErr);
    }
});
}


// getImageStats('objectDataTotalSorted.json', 'objectDataWithImageStats.json');
// getImageStats('spriteOffsetsCombinedCurrent.json', 'spriteOffsetsWithImageStats.json');
// getImageStats('errorObjectDataWithOffsets.json','errorObjectDataWithImageStats.json');
// getImageStats('errorSpriteOffsets.json','errorSpriteOffsetsWithImageStats.json');