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
          const {ObjectName, ImageCount, offsets} = obj;
          try {
            const directoryPath = path.dirname(offsets[0].path);
            const dirStats = getDirectoryStats(directoryPath);
            const {numFiles, numPngs, emptyPngFiles, numEmptyPngs, numNonEmptyPngs} = dirStats;
            if (numFiles !== numPngs) {
              fileTypeErrors.push({ObjectName, ImageCount, numFiles, numPngs});
            }
            if (numEmptyPngs) {
              emptyPngErrors.push({ObjectName,ImageCount,numPngs, numEmptyPngs, emptyPngFiles});
              if (!datErrorFiles.includes(ObjectName)) {
                console.log(ObjectName);
              }
            } else if ((ImageCount !== numNonEmptyPngs) || (ImageCount !== offsets.length) || (offsets.length !== numNonEmptyPngs)) {
              imageCountErrors.push({ObjectName,ImageCount,numNonEmptyPngs, imageList: {length: offsets.length}})
            }

          } catch {
            const newError = {ObjectName, message: 'Error reading directory stats', ImageCount};
            if (offsets.length) {
              newError.imageList = {length: offsets.length, entry: offsets[0]}
            } else {
              newError.imageList = {value: offsets};
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
  console.log('calculated offsets: ', errorObjectDataWithOffsets.length);
  console.log('total number images: ', errorSpriteOffsets.length)
  
  let count = 0;
  errorObjectDataWithOffsets.forEach(obj => {
    count += obj.offsets.length;
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
    const {ObjectName, ImageCount, Size} = obj;
    const directoryPath = './sprites/'+ObjectName;
    const images = fs.readdirSync(directoryPath);
    let dirSize = 0;
    images.forEach(image => {
      const imageStats = fs.statSync(path.join(directoryPath,image));
      dirSize+= imageStats.size;
    })
    newErrorData.push({
      ObjectName,
      Given: {
        ImageCount,
        Size
      },
      Actual: {
        ImageCount: images.length-1,
        Size: dirSize
      }
    })
  })

  newErrorData.sort((a, b) => {
    const diffA = a.Given.ImageCount - a.Actual.ImageCount;
    const diffB = b.Given.ImageCount - b.Actual.ImageCount;
    return diffA - diffB;
  });

  console.log(newErrorData);
}

// getErrorImageDifferenceList();

const errorImageDifferenceList = [
  {
    ObjectName: '4X4',
    Given: { ImageCount: 427, Size: 225061 },
    Actual: { ImageCount: 395, Size: 487197 },
    Difference: { ImageCount: 32, SizeRatio: 0.46195070987711334 },
    complete: true
  },
  {
    ObjectName: 'BLACKCAB',
    Given: { ImageCount: 243, Size: 95764 },
    Actual: { ImageCount: 211, Size: 245320 },
    Difference: { ImageCount: 32, SizeRatio: 0.3903636067177564 },
    complete: true
  },
  {
    ObjectName: 'CRNVBFLY',
    Given: { ImageCount: 243, Size: 110595 },
    Actual: { ImageCount: 211, Size: 256539 },
    Difference: { ImageCount: 32, SizeRatio: 0.4311040426601803 },
    complete: true
  },
  {
    ObjectName: 'CRNVFROG',
    Given: { ImageCount: 243, Size: 91842 },
    Actual: { ImageCount: 211, Size: 253045 },
    Difference: { ImageCount: 32, SizeRatio: 0.3629473018633049 },
    complete: true
  },
  {
    ObjectName: 'CRNVLZRD',
    Given: { ImageCount: 243, Size: 94345 },
    Actual: { ImageCount: 211, Size: 257751 },
    Difference: { ImageCount: 32, SizeRatio: 0.36603155758852535 },
    complete: true
  },
  {
    ObjectName: 'CSTBOAT',
    Given: { ImageCount: 1763, Size: 573215 },
    Actual: { ImageCount: 1731, Size: 1909678 },
    Difference: { ImageCount: 32, SizeRatio: 0.3001631688693068 },
    complete: true
  },
  {
    ObjectName: 'CTCAR',
    Given: { ImageCount: 243, Size: 79715 },
    Actual: { ImageCount: 211, Size: 239773 },
    Difference: { ImageCount: 32, SizeRatio: 0.3324602853532299 },
    complete: true
  },
  {
    ObjectName: 'FLYGBOAT',
    Given: { ImageCount: 1763, Size: 579799 },
    Actual: { ImageCount: 1731, Size: 1969538 },
    Difference: { ImageCount: 32, SizeRatio: 0.2943832513005588 },
    complete: true
  },
  {
    ObjectName: 'GTC',
    Given: { ImageCount: 243, Size: 88103 },
    Actual: { ImageCount: 211, Size: 243284 },
    Difference: { ImageCount: 32, SizeRatio: 0.36214054356225645 },
    complete: true
  },
  {
    ObjectName: 'HELICAR',
    Given: { ImageCount: 867, Size: 314821 },
    Actual: { ImageCount: 835, Size: 937216 },
    Difference: { ImageCount: 32, SizeRatio: 0.3359108252526632 },
    complete: true
  },
  {
    ObjectName: 'HMCAR',
    Given: { ImageCount: 243, Size: 71567 },
    Actual: { ImageCount: 211, Size: 231210 },
    Difference: { ImageCount: 32, SizeRatio: 0.30953245966869947 },
    complete: true
  },
  {
    ObjectName: 'HUSKIE',
    Given: { ImageCount: 867, Size: 374679 },
    Actual: { ImageCount: 835, Size: 1007762 },
    Difference: { ImageCount: 32, SizeRatio: 0.371793141634632 },
    complete: true
  },
  {
    ObjectName: 'LONDONBS',
    Given: { ImageCount: 803, Size: 314034 },
    Actual: { ImageCount: 771, Size: 878264 },
    Difference: { ImageCount: 32, SizeRatio: 0.3575621908674385 },
    complete: true
  },
  {
    ObjectName: 'MANTARAY',
    Given: { ImageCount: 1763, Size: 739688 },
    Actual: { ImageCount: 1731, Size: 1999816 },
    Difference: { ImageCount: 32, SizeRatio: 0.3698780287786476 },
    complete: true
  },
  {
    ObjectName: 'PEGASUSX',
    Given: { ImageCount: 867, Size: 302953 },
    Actual: { ImageCount: 835, Size: 980648 },
    Difference: { ImageCount: 32, SizeRatio: 0.3089314412510911 },
    complete: true
  },
  {
    ObjectName: 'RCR',
    Given: { ImageCount: 243, Size: 65273 },
    Actual: { ImageCount: 211, Size: 229757 },
    Difference: { ImageCount: 32, SizeRatio: 0.28409580556849195 },
    complete: true
  },
  {
    ObjectName: 'SANFTRAM',
    Given: { ImageCount: 803, Size: 245392 },
    Actual: { ImageCount: 771, Size: 831684 },
    Difference: { ImageCount: 32, SizeRatio: 0.29505437161229503 },
    complete: true
  },
  {
    ObjectName: 'SCHOOLBS',
    Given: { ImageCount: 803, Size: 250427 },
    Actual: { ImageCount: 771, Size: 841152 },
    Difference: { ImageCount: 32, SizeRatio: 0.297719080499125 },
    complete: true
  },
  {
    ObjectName: 'SMC1',
    Given: { ImageCount: 623, Size: 204792 },
    Actual: { ImageCount: 591, Size: 654915 },
    Difference: { ImageCount: 32, SizeRatio: 0.3127001213897987 },
    complete: true
  },
  {
    ObjectName: 'SPBOAT',
    Given: { ImageCount: 1691, Size: 455772 },
    Actual: { ImageCount: 1659, Size: 1768803 },
    Difference: { ImageCount: 32, SizeRatio: 0.25767256161370145 },
    complete: true
  },
  {
    ObjectName: 'SPCAR',
    Given: { ImageCount: 243, Size: 81565 },
    Actual: { ImageCount: 211, Size: 236601 },
    Difference: { ImageCount: 32, SizeRatio: 0.3447364973098169 },
    complete: true
  },
  {
    ObjectName: 'TRAM1',
    Given: { ImageCount: 803, Size: 302072 },
    Actual: { ImageCount: 771, Size: 852021 },
    Difference: { ImageCount: 32, SizeRatio: 0.35453586237897894 },
    complete: true
  },
  {
    ObjectName: 'TRILOBTE',
    Given: { ImageCount: 1763, Size: 679443 },
    Actual: { ImageCount: 1731, Size: 2061238 },
    Difference: { ImageCount: 32, SizeRatio: 0.3296286018402533 },
    complete: true
  },
  {
    ObjectName: 'VCR',
    Given: { ImageCount: 243, Size: 93144 },
    Actual: { ImageCount: 211, Size: 246900 },
    Difference: { ImageCount: 32, SizeRatio: 0.3772539489671932 },
    complete: true
  },
  {
    ObjectName: 'WMMINE',
    Given: { ImageCount: 1139, Size: 402495 },
    Actual: { ImageCount: 1107, Size: 1224310 },
    Difference: { ImageCount: 32, SizeRatio: 0.32875252182862186 },
    complete: true
  },
  {
    ObjectName: 'WMOUSE',
    Given: { ImageCount: 1139, Size: 340314 },
    Actual: { ImageCount: 1107, Size: 1211618 },
    Difference: { ImageCount: 32, SizeRatio: 0.2808756555283926 },
    complete: true
  },
  {
    ObjectName: 'ZLDB',
    Given: { ImageCount: 1491, Size: 496392 },
    Actual: { ImageCount: 1459, Size: 1638879 },
    Difference: { ImageCount: 32, SizeRatio: 0.30288508181506996 },
    complete: true
  },
  {
    ObjectName: 'HOVERCAR',
    Given: { ImageCount: 267, Size: 104197 },
    Actual: { ImageCount: 1, Size: 7192 },
    Difference: { ImageCount: 266, SizeRatio: 14.487903225806452 },
    complete: false
  },
  {
    ObjectName: 'TRUCK1',
    Given: { ImageCount: 267, Size: 84842 },
    Actual: { ImageCount: 1, Size: 5777 },
    Difference: { ImageCount: 266, SizeRatio: 14.686169292020079 },
    complete: false
  },
  {
    ObjectName: 'MONO2',
    Given: { ImageCount: 423, Size: 176902 },
    Actual: { ImageCount: 1, Size: 5349 },
    Difference: { ImageCount: 422, SizeRatio: 33.071976070293516 },
    complete: false
  },
  {
    ObjectName: 'SMC2',
    Given: { ImageCount: 587, Size: 225541 },
    Actual: { ImageCount: 1, Size: 6588 },
    Difference: { ImageCount: 586, SizeRatio: 34.23512446873102 },
    complete: false
  },
  {
    ObjectName: 'SURFBRDC',
    Given: { ImageCount: 3351, Size: 1043098 },
    Actual: { ImageCount: 2523, Size: 3008376 },
    Difference: { ImageCount: 828, SizeRatio: 0.34673125965637275 },
    complete: true
  },
  {
    ObjectName: 'WHICGRUB',
    Given: { ImageCount: 1491, Size: 483137 },
    Actual: { ImageCount: 1, Size: 7741 },
    Difference: { ImageCount: 1490, SizeRatio: 62.4127373724325 },
    complete: false
  },
  {
    ObjectName: 'ZLOG',
    Given: { ImageCount: 1491, Size: 490341 },
    Actual: { ImageCount: 1, Size: 7192 },
    Difference: { ImageCount: 1490, SizeRatio: 68.17867074527253 },
    complete: false
  },
  {
    ObjectName: 'JSTAR1',
    Given: { ImageCount: 1779, Size: 737203 },
    Actual: { ImageCount: 1, Size: 6854 },
    Difference: { ImageCount: 1778, SizeRatio: 107.55806828129559 },
    complete: false
  },
  {
    ObjectName: 'RCKC',
    Given: { ImageCount: 1779, Size: 723887 },
    Actual: { ImageCount: 1, Size: 5797 },
    Difference: { ImageCount: 1778, SizeRatio: 124.87269277212351 },
    complete: false
  },
  {
    ObjectName: 'MFT',
    Given: { ImageCount: 2883, Size: 1073727 },
    Actual: { ImageCount: 1, Size: 6753 },
    Difference: { ImageCount: 2882, SizeRatio: 159 },
    complete: false
  },
  {
    ObjectName: 'PTCT2',
    Given: { ImageCount: 2883, Size: 1028109 },
    Actual: { ImageCount: 1, Size: 6578 },
    Difference: { ImageCount: 2882, SizeRatio: 156.29507449072668 },
    complete: false
  },
  {
    ObjectName: 'PTCT2R',
    Given: { ImageCount: 2883, Size: 1028702 },
    Actual: { ImageCount: 1, Size: 5852 },
    Difference: { ImageCount: 2882, SizeRatio: 175.7863978127136 },
    complete: false
  },
  {
    ObjectName: 'VEKVAMP',
    Given: { ImageCount: 3083, Size: 997647 },
    Actual: { ImageCount: 1, Size: 6803 },
    Difference: { ImageCount: 3082, SizeRatio: 146.64809642804644 },
    complete: false
  },
  {
    ObjectName: 'GOLTR',
    Given: { ImageCount: 3591, Size: 1278199 },
    Actual: { ImageCount: 1, Size: 7126 },
    Difference: { ImageCount: 3590, SizeRatio: 179.37117597530172 },
    complete: false
  },
  {
    ObjectName: 'ARRSW2',
    Given: { ImageCount: 4623, Size: 2197439 },
    Actual: { ImageCount: 1, Size: 6483 },
    Difference: { ImageCount: 4622, SizeRatio: 338.9540336264075 },
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