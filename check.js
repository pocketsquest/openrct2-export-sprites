const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const datErrorFiles =  [
  '4X4', 'ARRSW2',      'BLACKCAB', 'CRNVBFLY',
  'CRNVFROG',   'CRNVLZRD', 'CSTBOAT',  'CTCAR',
  'FLYGBOAT',   'GOLTR',    'GTC',      'HELICAR',
  'HMCAR',      'HOVERCAR', 'HUSKIE',   'JSTAR1',
  'LONDONBS',   'MANTARAY', 'MFT',      'MONO2',
  'PEGASUSX',   'PTCT2',    'PTCT2R',
  'RCKC',       'RCR',      'SANFTRAM', 'SCHOOLBS',
  'SMC1',       'SMC2',     'SPBOAT',   'SPCAR',
  'SURFBRDC',   'TRAM1',    'TRILOBTE', 'TRUCK1',
  'VCR',        'VEKVAMP',  'WHICGRUB', 'WMMINE',
  'WMOUSE',        'ZLDB',     'ZLOG'
];

function getFileCount(directoryPath) {
  // Get the list of all files and folders in the given directory
  const items = fs.readdirSync(directoryPath);

  // Filter out only the files
  const files = items.filter(item => fs.statSync(path.join(directoryPath, item)).isFile());

  // Return the count of files
  return files.length;
}

function checkMissingObjects() {
  const inputFilePath = 'objectData.json';
  const checkFilePath = 'objectDataTotalSorted.json';
  const inputObjectData  = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));
  const checkObjectData  = JSON.parse(fs.readFileSync(checkFilePath, 'utf-8'));

  const missingFiles = [];
  const incompleteFiles = [];

  inputObjectData.forEach(obj => {
    
  });
}


function getDirectoryStats(directoryPath) {
  // All the 'path' properties are in reference to the OpenRCT2/bin folder
  directoryPath = path.relative('./openrct2-export-sprites',directoryPath);
  // Get the list of all files in the given directory
  const files = fs.readdirSync(directoryPath); // add {withFileTypes: true} ?

  // Filter out only the PNG files
  const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

  // Filter out only the empty PNG files
  const emptyPngFiles = pngFiles.filter(file => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    
    // Check if the file is empty (0 bytes) and has no dimensions (assuming it's a valid PNG check)
    return stats.size === 0;
  });

  return {
    numFiles: files.length,
    numPngs: pngFiles.length,
    emptyPngFiles,
    numEmptyPngs: emptyPngFiles.length,
    numNonEmptyPngs: pngFiles.length - emptyPngFiles.length
  }
}
    

function compareImageCount(inputFilePath,outputFilePath) {
  if (inputFilePath === outputFilePath) {
    console.error(`Input and output files must be different. Input: ${inputFilePath} output: ${outputFilePath}`);
    return
  }
  const readErrors = [];
  const fileTypeErrors = [];
  const emptyPngErrors = [];
  const imageCountErrors = [];

  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file ${inputFilePath}:`, err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        jsonData.forEach(obj => {
          const {objectName, imageCount, images} = obj;
          try {
            const directoryPath = path.dirname(images[0].path);
            const dirStats = getDirectoryStats(directoryPath);
            const {numFiles, numPngs, emptyPngFiles, numEmptyPngs, numNonEmptyPngs} = dirStats;
            if (numFiles !== numPngs) {
              fileTypeErrors.push({objectName, imageCount, numFiles, numPngs});
            }
            if (numEmptyPngs) {
              emptyPngErrors.push({objectName,imageCount,numPngs, numEmptyPngs, emptyPngFiles});
              if (!datErrorFiles.includes(objectName)) {
                console.log(objectName);
              }
            } else if ((imageCount !== numNonEmptyPngs) || (imageCount !== images.length) || (images.length !== numNonEmptyPngs)) {
              imageCountErrors.push({objectName,imageCount,numNonEmptyPngs, imageList: {length: images.length}})
            }

          } catch {
            const newError = {objectName, message: 'Error reading directory stats', imageCount};
            if (images.length) {
              newError.imageList = {length: images.length, entry: images[0]}
            } else {
              newError.imageList = {value: images};
            }
            readErrors.push(newError);
          }
        });

        console.log('read errors: ', readErrors.length);
        console.log('file type errors: ', fileTypeErrors.length);
        console.log('empty png errors: ', emptyPngErrors.length);
        console.log('image count errors: ', imageCountErrors.length);
        // Stringify errors found.
        const totalErrors = JSON.stringify({readErrors,fileTypeErrors,emptyPngErrors,imageCountErrors}, null, 2);

        if (outputFilePath) {
        // Write the new JSON data to the output file
        fs.writeFile(outputFilePath, totalErrors, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Error writing file ${outputFilePath}: `, writeErr);
            } else {
                console.log(`File ${outputFilePath} written successfully!`);
            }
        });
        }
    } catch (jsonErr) {
      console.error(`Error parsing JSON for ${inputFilePath}:`, jsonErr);
  }
});
}


// compareImageCount('objectDataTotalSorted.json', 'compareImageErrors.json');
// compareImageCount('objectDataTotalSorted.json');
// console.log(datErrorFiles.length)

function compareErrorData() {
  const errorObjectData = JSON.parse(fs.readFileSync('errorObjectData.json', 'utf-8'));
  const errorObjectDataWithOffsets = JSON.parse(fs.readFileSync('errorObjectDataWithOffsets.json', 'utf-8'));
  const errorSpriteOffsets = JSON.parse(fs.readFileSync('errorSpriteOffsets.json', 'utf-8'));
  console.log('Error array: ',datErrorFiles.length)
  console.log('Error Object Data: ', errorObjectData.length);
  console.log('calculated images: ', errorObjectDataWithOffsets.length);
  console.log('total number images: ', errorSpriteOffsets.length)
  
  let count = 0;
  errorObjectDataWithOffsets.forEach(obj => {
    count += obj.images.length;
  })
  console.log('calculated total images: ', count);
}

// compareErrorData();

function compareTotals(...filenames) {
  
  filenames.forEach(filename => {
    const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
    console.log(filename, data.length);
  })
}

function countSpriteFolders() {
  const directoryPath = "./sprites";
  
  // Get the list of all files and folders in the given directory
  const items = fs.readdirSync(directoryPath);

  // Filter out only the folders
  const folders = items.filter(item => fs.statSync(path.join(directoryPath, item)).isDirectory());

  console.log(folders.length);

  const datNamesList = JSON.parse(fs.readFileSync('datNamesList.json', 'utf-8'));
  folders.forEach(folder => {
    if (!datNamesList.includes(folder)) {
      console.log(folder)
    }
  })
}

// compareTotals('objectData.json','objectDataTotalSorted.json','objectDataWithOffsetsCombinedCurrent.json');
// countSpriteFolders();

function getErrorImageDifferenceList() {
  const errorObjectData  = JSON.parse(fs.readFileSync('errorObjectData.json', 'utf-8'));

  const newErrorData = [];

  errorObjectData.forEach( obj => {
    const {objectName, imageCount, size} = obj;
    const directoryPath = './sprites/'+objectName;
    const images = fs.readdirSync(directoryPath);
    let dirSize = 0;
    images.forEach(image => {
      const imageStats = fs.statSync(path.join(directoryPath,image));
      dirSize+= imageStats.size;
    })
    newErrorData.push({
      objectName,
      given: {
        imageCount,
        size
      },
      actual: {
        imageCount: images.length-1,
        size: dirSize
      }
    })
  })

  newErrorData.sort((a, b) => {
    const diffA = a.given.imageCount - a.actual.imageCount;
    const diffB = b.given.imageCount - b.actual.imageCount;
    return diffA - diffB;
  });

  console.log(newErrorData);
}

// getErrorImageDifferenceList();

const errorImageDifferenceList = [
  {
    objectName: '4X4',
    given: { imageCount: 427, size: 225061 },
    actual: { imageCount: 395, size: 487197 },
    difference: { imageCount: 32, sizeRatio: 0.46195070987711334 },
    complete: true
  },
  {
    objectName: 'BLACKCAB',
    given: { imageCount: 243, size: 95764 },
    actual: { imageCount: 211, size: 245320 },
    difference: { imageCount: 32, sizeRatio: 0.3903636067177564 },
    complete: true
  },
  {
    objectName: 'CRNVBFLY',
    given: { imageCount: 243, size: 110595 },
    actual: { imageCount: 211, size: 256539 },
    difference: { imageCount: 32, sizeRatio: 0.4311040426601803 },
    complete: true
  },
  {
    objectName: 'CRNVFROG',
    given: { imageCount: 243, size: 91842 },
    actual: { imageCount: 211, size: 253045 },
    difference: { imageCount: 32, sizeRatio: 0.3629473018633049 },
    complete: true
  },
  {
    objectName: 'CRNVLZRD',
    given: { imageCount: 243, size: 94345 },
    actual: { imageCount: 211, size: 257751 },
    difference: { imageCount: 32, sizeRatio: 0.36603155758852535 },
    complete: true
  },
  {
    objectName: 'CSTBOAT',
    given: { imageCount: 1763, size: 573215 },
    actual: { imageCount: 1731, size: 1909678 },
    difference: { imageCount: 32, sizeRatio: 0.3001631688693068 },
    complete: true
  },
  {
    objectName: 'CTCAR',
    given: { imageCount: 243, size: 79715 },
    actual: { imageCount: 211, size: 239773 },
    difference: { imageCount: 32, sizeRatio: 0.3324602853532299 },
    complete: true
  },
  {
    objectName: 'FLYGBOAT',
    given: { imageCount: 1763, size: 579799 },
    actual: { imageCount: 1731, size: 1969538 },
    difference: { imageCount: 32, sizeRatio: 0.2943832513005588 },
    complete: true
  },
  {
    objectName: 'GTC',
    given: { imageCount: 243, size: 88103 },
    actual: { imageCount: 211, size: 243284 },
    difference: { imageCount: 32, sizeRatio: 0.36214054356225645 },
    complete: true
  },
  {
    objectName: 'HELICAR',
    given: { imageCount: 867, size: 314821 },
    actual: { imageCount: 835, size: 937216 },
    difference: { imageCount: 32, sizeRatio: 0.3359108252526632 },
    complete: true
  },
  {
    objectName: 'HMCAR',
    given: { imageCount: 243, size: 71567 },
    actual: { imageCount: 211, size: 231210 },
    difference: { imageCount: 32, sizeRatio: 0.30953245966869947 },
    complete: true
  },
  {
    objectName: 'HUSKIE',
    given: { imageCount: 867, size: 374679 },
    actual: { imageCount: 835, size: 1007762 },
    difference: { imageCount: 32, sizeRatio: 0.371793141634632 },
    complete: true
  },
  {
    objectName: 'LONDONBS',
    given: { imageCount: 803, size: 314034 },
    actual: { imageCount: 771, size: 878264 },
    difference: { imageCount: 32, sizeRatio: 0.3575621908674385 },
    complete: true
  },
  {
    objectName: 'MANTARAY',
    given: { imageCount: 1763, size: 739688 },
    actual: { imageCount: 1731, size: 1999816 },
    difference: { imageCount: 32, sizeRatio: 0.3698780287786476 },
    complete: true
  },
  {
    objectName: 'PEGASUSX',
    given: { imageCount: 867, size: 302953 },
    actual: { imageCount: 835, size: 980648 },
    difference: { imageCount: 32, sizeRatio: 0.3089314412510911 },
    complete: true
  },
  {
    objectName: 'RCR',
    given: { imageCount: 243, size: 65273 },
    actual: { imageCount: 211, size: 229757 },
    difference: { imageCount: 32, sizeRatio: 0.28409580556849195 },
    complete: true
  },
  {
    objectName: 'SANFTRAM',
    given: { imageCount: 803, size: 245392 },
    actual: { imageCount: 771, size: 831684 },
    difference: { imageCount: 32, sizeRatio: 0.29505437161229503 },
    complete: true
  },
  {
    objectName: 'SCHOOLBS',
    given: { imageCount: 803, size: 250427 },
    actual: { imageCount: 771, size: 841152 },
    difference: { imageCount: 32, sizeRatio: 0.297719080499125 },
    complete: true
  },
  {
    objectName: 'SMC1',
    given: { imageCount: 623, size: 204792 },
    actual: { imageCount: 591, size: 654915 },
    difference: { imageCount: 32, sizeRatio: 0.3127001213897987 },
    complete: true
  },
  {
    objectName: 'SPBOAT',
    given: { imageCount: 1691, size: 455772 },
    actual: { imageCount: 1659, size: 1768803 },
    difference: { imageCount: 32, sizeRatio: 0.25767256161370145 },
    complete: true
  },
  {
    objectName: 'SPCAR',
    given: { imageCount: 243, size: 81565 },
    actual: { imageCount: 211, size: 236601 },
    difference: { imageCount: 32, sizeRatio: 0.3447364973098169 },
    complete: true
  },
  {
    objectName: 'TRAM1',
    given: { imageCount: 803, size: 302072 },
    actual: { imageCount: 771, size: 852021 },
    difference: { imageCount: 32, sizeRatio: 0.35453586237897894 },
    complete: true
  },
  {
    objectName: 'TRILOBTE',
    given: { imageCount: 1763, size: 679443 },
    actual: { imageCount: 1731, size: 2061238 },
    difference: { imageCount: 32, sizeRatio: 0.3296286018402533 },
    complete: true
  },
  {
    objectName: 'VCR',
    given: { imageCount: 243, size: 93144 },
    actual: { imageCount: 211, size: 246900 },
    difference: { imageCount: 32, sizeRatio: 0.3772539489671932 },
    complete: true
  },
  {
    objectName: 'WMMINE',
    given: { imageCount: 1139, size: 402495 },
    actual: { imageCount: 1107, size: 1224310 },
    difference: { imageCount: 32, sizeRatio: 0.32875252182862186 },
    complete: true
  },
  {
    objectName: 'WMOUSE',
    given: { imageCount: 1139, size: 340314 },
    actual: { imageCount: 1107, size: 1211618 },
    difference: { imageCount: 32, sizeRatio: 0.2808756555283926 },
    complete: true
  },
  {
    objectName: 'ZLDB',
    given: { imageCount: 1491, size: 496392 },
    actual: { imageCount: 1459, size: 1638879 },
    difference: { imageCount: 32, sizeRatio: 0.30288508181506996 },
    complete: true
  },
  {
    objectName: 'HOVERCAR',
    given: { imageCount: 267, size: 104197 },
    actual: { imageCount: 1, size: 7192 },
    difference: { imageCount: 266, sizeRatio: 14.487903225806452 },
    complete: false
  },
  {
    objectName: 'TRUCK1',
    given: { imageCount: 267, size: 84842 },
    actual: { imageCount: 1, size: 5777 },
    difference: { imageCount: 266, sizeRatio: 14.686169292020079 },
    complete: false
  },
  {
    objectName: 'MONO2',
    given: { imageCount: 423, size: 176902 },
    actual: { imageCount: 1, size: 5349 },
    difference: { imageCount: 422, sizeRatio: 33.071976070293516 },
    complete: false
  },
  {
    objectName: 'SMC2',
    given: { imageCount: 587, size: 225541 },
    actual: { imageCount: 1, size: 6588 },
    difference: { imageCount: 586, sizeRatio: 34.23512446873102 },
    complete: false
  },
  {
    objectName: 'SURFBRDC',
    given: { imageCount: 3351, size: 1043098 },
    actual: { imageCount: 2523, size: 3008376 },
    difference: { imageCount: 828, sizeRatio: 0.34673125965637275 },
    complete: true
  },
  {
    objectName: 'WHICGRUB',
    given: { imageCount: 1491, size: 483137 },
    actual: { imageCount: 1, size: 7741 },
    difference: { imageCount: 1490, sizeRatio: 62.4127373724325 },
    complete: false
  },
  {
    objectName: 'ZLOG',
    given: { imageCount: 1491, size: 490341 },
    actual: { imageCount: 1, size: 7192 },
    difference: { imageCount: 1490, sizeRatio: 68.17867074527253 },
    complete: false
  },
  {
    objectName: 'JSTAR1',
    given: { imageCount: 1779, size: 737203 },
    actual: { imageCount: 1, size: 6854 },
    difference: { imageCount: 1778, sizeRatio: 107.55806828129559 },
    complete: false
  },
  {
    objectName: 'RCKC',
    given: { imageCount: 1779, size: 723887 },
    actual: { imageCount: 1, size: 5797 },
    difference: { imageCount: 1778, sizeRatio: 124.87269277212351 },
    complete: false
  },
  {
    objectName: 'MFT',
    given: { imageCount: 2883, size: 1073727 },
    actual: { imageCount: 1, size: 6753 },
    difference: { imageCount: 2882, sizeRatio: 159 },
    complete: false
  },
  {
    objectName: 'PTCT2',
    given: { imageCount: 2883, size: 1028109 },
    actual: { imageCount: 1, size: 6578 },
    difference: { imageCount: 2882, sizeRatio: 156.29507449072668 },
    complete: false
  },
  {
    objectName: 'PTCT2R',
    given: { imageCount: 2883, size: 1028702 },
    actual: { imageCount: 1, size: 5852 },
    difference: { imageCount: 2882, sizeRatio: 175.7863978127136 },
    complete: false
  },
  {
    objectName: 'VEKVAMP',
    given: { imageCount: 3083, size: 997647 },
    actual: { imageCount: 1, size: 6803 },
    difference: { imageCount: 3082, sizeRatio: 146.64809642804644 },
    complete: false
  },
  {
    objectName: 'GOLTR',
    given: { imageCount: 3591, size: 1278199 },
    actual: { imageCount: 1, size: 7126 },
    difference: { imageCount: 3590, sizeRatio: 179.37117597530172 },
    complete: false
  },
  {
    objectName: 'ARRSW2',
    given: { imageCount: 4623, size: 2197439 },
    actual: { imageCount: 1, size: 6483 },
    difference: { imageCount: 4622, sizeRatio: 338.9540336264075 },
    complete: false
  }
]

// Checked with datchecker.exe  All the images after the 0x0 image are blank as well.
const completeErrors = [
  '4X4',      'BLACKCAB', 'CRNVBFLY',
  'CRNVFROG', 'CRNVLZRD', 'CSTBOAT',
  'CTCAR',    'FLYGBOAT', 'GTC',
  'HELICAR',  'HMCAR',    'HUSKIE',
  'LONDONBS', 'MANTARAY', 'PEGASUSX',
  'RCR',      'SANFTRAM', 'SCHOOLBS',
  'SMC1',     'SPBOAT',   'SPCAR',
  'TRAM1',    'TRILOBTE', 'VCR',
  'WMMINE',   'WMOUSE',   'ZLDB',
  'SURFBRDC'
];

function checkDirectory({objectName, imageCount, images}) {
  const numImagesListed = images.length;
  // Get containing directory for the image files, relative to this repo.
  const directoryPath = path.dirname(path.relative('./openrct2-export-sprites',images[0].path));
  if (path.normalize(directoryPath) !== path.normalize("./sprites/"+ objectName)) {
    throw new Error(`Error for ${objectName}: Directory paths do not match`,{
      cause: {
        code: 'directory path error',
        objectName,
        testImage: images[0],
        pathFromImageData: path.normalize(directoryPath),
        pathFromObjectName: path.normalize("./sprites/"+ objectName)
      }
    })
  }


  const directoryContents = fs.readdirSync(directoryPath);
  const difference = directoryContents.length - numImagesListed;
  if (difference === 0) {
    // check directory contents against listed paths
    const imagePaths = images.map(image => path.basename(image.path))
    return true
  } else if (difference === 1) {
    return false
  } else {
    throw new Error('File Count Error', {cause: {objectName, directoryContentsCount: directoryContents.length, numImagesListed,difference}})
  }
  
}