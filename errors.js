const fs = require('fs');
const path = require('path');

const consoleOutput = `libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: ARRSW2
Message: Command failed: openrct2 sprite exportalldat ARRSW2 .\openrct2-export-sprites\sprites\ARRSW2
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

Error executing command for file: ARRX
Message: spawnSync C:\WINDOWS\system32\cmd.exe ENOBUFS
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: CSTBOAT
Message: Command failed: openrct2 sprite exportalldat CSTBOAT .\openrct2-export-sprites\sprites\CSTBOAT
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: CTCAR
Message: Command failed: openrct2 sprite exportalldat CTCAR .\openrct2-export-sprites\sprites\CTCAR
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: GOLTR
Message: Command failed: openrct2 sprite exportalldat GOLTR .\openrct2-export-sprites\sprites\GOLTR
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: GTC
Message: Command failed: openrct2 sprite exportalldat GTC .\openrct2-export-sprites\sprites\GTC
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: HELICAR
Message: Command failed: openrct2 sprite exportalldat HELICAR .\openrct2-export-sprites\sprites\HELICAR
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: HMCAR
Message: Command failed: openrct2 sprite exportalldat HMCAR .\openrct2-export-sprites\sprites\HMCAR
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: JSTAR1
Message: Command failed: openrct2 sprite exportalldat JSTAR1 .\openrct2-export-sprites\sprites\JSTAR1
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: MFT
Message: Command failed: openrct2 sprite exportalldat MFT .\openrct2-export-sprites\sprites\MFT
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: MONO2
Message: Command failed: openrct2 sprite exportalldat MONO2 .\openrct2-export-sprites\sprites\MONO2
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: PTCT2
Message: Command failed: openrct2 sprite exportalldat PTCT2 .\openrct2-export-sprites\sprites\PTCT2
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: PTCT2R
Message: Command failed: openrct2 sprite exportalldat PTCT2R .\openrct2-export-sprites\sprites\PTCT2R
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: RCKC
Message: Command failed: openrct2 sprite exportalldat RCKC .\openrct2-export-sprites\sprites\RCKC
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: RCR
Message: Command failed: openrct2 sprite exportalldat RCR .\openrct2-export-sprites\sprites\RCR
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: SMC1
Message: Command failed: openrct2 sprite exportalldat SMC1 .\openrct2-export-sprites\sprites\SMC1
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: SMC2
Message: Command failed: openrct2 sprite exportalldat SMC2 .\openrct2-export-sprites\sprites\SMC2
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: SPBOAT
Message: Command failed: openrct2 sprite exportalldat SPBOAT .\openrct2-export-sprites\sprites\SPBOAT
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: SPCAR
Message: Command failed: openrct2 sprite exportalldat SPCAR .\openrct2-export-sprites\sprites\SPCAR
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: TRAM1
Message: Command failed: openrct2 sprite exportalldat TRAM1 .\openrct2-export-sprites\sprites\TRAM1
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: TRUCK1
Message: Command failed: openrct2 sprite exportalldat TRUCK1 .\openrct2-export-sprites\sprites\TRUCK1
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: VCR
Message: Command failed: openrct2 sprite exportalldat VCR .\openrct2-export-sprites\sprites\VCR
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: VEKVAMP
Message: Command failed: openrct2 sprite exportalldat VEKVAMP .\openrct2-export-sprites\sprites\VEKVAMP
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: WMMINE
Message: Command failed: openrct2 sprite exportalldat WMMINE .\openrct2-export-sprites\sprites\WMMINE
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: WMOUSE
Message: Command failed: openrct2 sprite exportalldat WMOUSE .\openrct2-export-sprites\sprites\WMOUSE
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: ZLDB
Message: Command failed: openrct2 sprite exportalldat ZLDB .\openrct2-export-sprites\sprites\ZLDB
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: ZLOG
Message: Command failed: openrct2 sprite exportalldat ZLOG .\openrct2-export-sprites\sprites\ZLOG
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: WTRCYAN
Message: Command failed: openrct2 sprite exportalldat WTRCYAN .\openrct2-export-sprites\sprites\WTRCYAN
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: WTRGREEN
Message: Command failed: openrct2 sprite exportalldat WTRGREEN .\openrct2-export-sprites\sprites\WTRGREEN
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: WTRGRN
Message: Command failed: openrct2 sprite exportalldat WTRGRN .\openrct2-export-sprites\sprites\WTRGRN
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: WTRORNG
Message: Command failed: openrct2 sprite exportalldat WTRORNG .\openrct2-export-sprites\sprites\WTRORNG
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

Could not find the object.
Error executing command for file: objectName
Message: Command failed: openrct2 sprite exportalldat objectName .\openrct2-export-sprites\sprites\objectName
Could not find the object.

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: FLYGBOAT
Message: Command failed: openrct2 sprite exportalldat FLYGBOAT .\openrct2-export-sprites\sprites\FLYGBOAT
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: HOVERCAR
Message: Command failed: openrct2 sprite exportalldat HOVERCAR .\openrct2-export-sprites\sprites\HOVERCAR
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: PEGASUSX
Message: Command failed: openrct2 sprite exportalldat PEGASUSX .\openrct2-export-sprites\sprites\PEGASUSX
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: SCHOOLBS
Message: Command failed: openrct2 sprite exportalldat SCHOOLBS .\openrct2-export-sprites\sprites\SCHOOLBS
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: TRILOBTE
Message: Command failed: openrct2 sprite exportalldat TRILOBTE .\openrct2-export-sprites\sprites\TRILOBTE
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: BLACKCAB
Message: Command failed: openrct2 sprite exportalldat BLACKCAB .\openrct2-export-sprites\sprites\BLACKCAB
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: CRNVBFLY
Message: Command failed: openrct2 sprite exportalldat CRNVBFLY .\openrct2-export-sprites\sprites\CRNVBFLY
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: CRNVFROG
Message: Command failed: openrct2 sprite exportalldat CRNVFROG .\openrct2-export-sprites\sprites\CRNVFROG
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: CRNVLZRD
Message: Command failed: openrct2 sprite exportalldat CRNVLZRD .\openrct2-export-sprites\sprites\CRNVLZRD
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: HUSKIE
Message: Command failed: openrct2 sprite exportalldat HUSKIE .\openrct2-export-sprites\sprites\HUSKIE
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: LONDONBS
Message: Command failed: openrct2 sprite exportalldat LONDONBS .\openrct2-export-sprites\sprites\LONDONBS
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: MANTARAY
Message: Command failed: openrct2 sprite exportalldat MANTARAY .\openrct2-export-sprites\sprites\MANTARAY
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: SANFTRAM
Message: Command failed: openrct2 sprite exportalldat SANFTRAM .\openrct2-export-sprites\sprites\SANFTRAM
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: SURFBRDC
Message: Command failed: openrct2 sprite exportalldat SURFBRDC .\openrct2-export-sprites\sprites\SURFBRDC
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export

libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export
Error executing command for file: WHICGRUB
Message: Command failed: openrct2 sprite exportalldat WHICGRUB .\openrct2-export-sprites\sprites\WHICGRUB
libpng error: Invalid IHDR data
Unable to write png: PNG ERRORCould not export`;

function findErrors() {
  // Initialize an array to store error messages
  const errorMessages = [];

  // Use a regular expression to match the error messages
  const regex = /Error executing command for file: (.+?)(\r|\n|$)/g;
  let match;

  while ((match = regex.exec(consoleOutput)) !== null) {
      // match[1] contains the captured substring after "Error executing command for file:"
      errorMessages.push(match[1]);
  }

  // Log the error messages array
  console.log('Error Messages:', errorMessages.sort());
}

const datErrorFiles =  [
  '4X4', 'ARRSW2',     'ARRX',     'BLACKCAB', 'CRNVBFLY',
  'CRNVFROG',   'CRNVLZRD', 'CSTBOAT',  'CTCAR',
  'FLYGBOAT',   'GOLTR',    'GTC',      'HELICAR',
  'HMCAR',      'HOVERCAR', 'HUSKIE',   'JSTAR1',
  'LONDONBS',   'MANTARAY', 'MFT',      'MONO2',
  'PEGASUSX',   'PTCT2',    'PTCT2R',
  'RCKC',       'RCR',      'SANFTRAM', 'SCHOOLBS',
  'SMC1',       'SMC2',     'SPBOAT',   'SPCAR',
  'SURFBRDC',   'TRAM1',    'TRILOBTE', 'TRUCK1',
  'VCR',        'VEKVAMP',  'WHICGRUB', 'WMMINE',
  'WMOUSE',     'WTRCYAN',  'WTRGREEN', 'WTRGRN',
  'WTRORNG',    'ZLDB',     'ZLOG'
];



function compareByObjectName(a,b)  {
  const nameA = a.objectName.toUpperCase(); // Convert to uppercase for case-insensitive sorting
  const nameB = b.objectName.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0; // names must be equal
}


function saveErrorData() {
  // Read data file
  const objectData = JSON.parse(fs.readFileSync('objectData.json', 'utf-8'));
  const errorData = [];
  objectData.forEach(obj => {
    if (datErrorFiles.includes(obj.objectName)) {
      errorData.push(obj);
    }
  })

  errorData.sort(compareByObjectName);

  // Save as json file
  fs.writeFileSync('errorObjectData.json', JSON.stringify(errorData, null, 2));
}

function saveMultidimensioncoasterData() {
  // Read data file
  const objectData = JSON.parse(fs.readFileSync('objectData.json', 'utf-8'));
  const arrxOffsetsData = JSON.parse(fs.readFileSync('multidimensioncoaster.json', 'utf-8'));
  objectData.forEach(obj => {
    if (obj.objectName === 'ARRX') {

      fs.writeFileSync('multidimensioncoasterObjectData.json', JSON.stringify([{...obj, images: arrxOffsetsData}], null, 2));
    }
  })
}

// saveMultidimensioncoasterData();
// Check the error files and compare the saved images with the given image count
function countImages() {
  const errorFiles =  {"4X4":{},"ARRSW2":{},"BLACKCAB":{},"CRNVBFLY":{},"CRNVFROG":{},"CRNVLZRD":{},"CSTBOAT":{},"CTCAR":{},"FLYGBOAT":{},"GOLTR":{},"GTC":{},"HELICAR":{},"HMCAR":{},"HOVERCAR":{},"HUSKIE":{},"JSTAR1":{},"LONDONBS":{},"MANTARAY":{},"MFT":{},"MONO2":{},"PEGASUSX":{},"PTCT2":{},"PTCT2R":{},"RCKC":{},"RCR":{},"SANFTRAM":{},"SCHOOLBS":{},"SMC1":{},"SMC2":{},"SPBOAT":{},"SPCAR":{},"SURFBRDC":{},"TRAM1":{},"TRILOBTE":{},"TRUCK1":{},"VCR":{},"VEKVAMP":{},"WHICGRUB":{},"WMMINE":{},"WMOUSE":{},"WTRCYAN":{},"WTRGREEN":{},"WTRGRN":{},"WTRORNG":{},"ZLDB":{},"ZLOG":{}}

  const dataFileName = 'errorObjectDataWithOffsets.json'
  const objectData = JSON.parse(fs.readFileSync(dataFileName, 'utf-8'));

  objectData.forEach(obj => {
    const {objectName, imageCount, images} = obj;
    
    errorFiles[objectName] = {objectName, imageCount, savedImageCount: images.length, difference: imageCount-images.length};
    
  })

  console.log(errorFiles);

}

// countImages();


// Given an image object (presumably one with errors), remove the last empty png if it exists.
function removeEmptyPng(obj) {
  const {objectName, imageCount, images} = obj;
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

  const emptyPngFilePath = path.join(directoryPath,  images.length.toString().padStart(imageCount.toString().length,'0') + '.png');

  try {
    const imageStats = fs.statSync(emptyPngFilePath);
    if (imageStats.size !== 0) {
      throw new Error('This file is not empty',{cause: {emptyPngFilePath, images}})
    } else {
      // Remove File
      fs.rmSync(emptyPngFilePath);
      // Check that at least the numbers line up.
      const directoryContents = fs.readdirSync(directoryPath);
      return (directoryContents.length === numImagesListed)
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      // This file does not exist
      // Check that at least the numbers line up.
      const directoryContents = fs.readdirSync(directoryPath);
      return (directoryContents.length === numImagesListed)
    } else {
      throw err
    }
  }
}


function removeEmptyPngsForArray() {
  const dataFileName = 'errorObjectDataWithImages.json'
  const objectData = JSON.parse(fs.readFileSync(dataFileName, 'utf-8'));
  objectData.forEach(obj => {
    try {
      if (removeEmptyPng(obj)) {
        return
      } else {
        throw new Error('file count error',{cause: {code: 'file count error', objectName: obj.objectName}})
      }
    } catch (err) {
      console.error("Error:", err)
    }
  })
  console.log('success')
}

removeEmptyPngsForArray()