const fs = require('fs');
const { execSync } = require('child_process');

const skipErrors = false;

// console.log regularly for images saved, assuming the given image count is correct
let prevCount = 0;
let newCount = 0;
const logNumber = 400; // How often per number of images to log progress to console and to save progress (Presuming that the given imageCount is correct)

// Read data file
const objectData = JSON.parse(fs.readFileSync('errorObjectData.json', 'utf-8'));

// Where to save generated data, with respect to the directory one level up
const outputFile = '.\\openrct2-export-sprites\\spriteOffsets.json';
const objectDataWithOffsetsFile = '.\\openrct2-export-sprites\\objectDataWithOffsets.json';

// // Read current images data
// const jsonData = fs.readFileSync('imagesOrignal.json', 'utf-8');
const jsonArray = [];
const objectDataWithOffsets = [];

const datErrorFiles =  [
  '4X4',
  'ARRSW2',     'ARRX',     'BLACKCAB', 'CRNVBFLY',
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
]

// How to console.log object data
function objToString(obj) {
  return `${obj.objectName}: ${obj.string} (${obj.type})`
}

// Helper function to parse JSON from stdout
function extractOffsets(stdout) {
  const regex = /\{[^{}]*\},/g; 
  let matches = [];
  let match;

  while ((match = regex.exec(stdout)) !== null) {
    matches.push(match[0]);
  }

  return matches.length > 0 ? '['+matches.join('').replace(/,\s*$/, '')+']' : null;
}

// Set the current working directory to the game's bin directory
process.chdir('..');

// Iterate over file names
objectData.forEach(obj => {
  const datName = obj.objectName;
  // Make sure to exclude multidimensioncoaster, or if skipping errors, any of the ones listed in the errors array
  if ((skipErrors && !datErrorFiles.includes(datName)) || (!skipErrors && datName !== 'ARRX')){
    try {
        // Execute command in the command prompt
        const command = `openrct2 sprite exportalldat ${datName} .\\openrct2-export-sprites\\sprites\\${datName}`;
        const jsonOutput = execSync(command, { encoding: 'utf-8' });

        // Remove trailing comma and append JSON output to the array
        const cleanedJsonOutput = jsonOutput.trim().replace(/,\s*$/, '');
        const images = JSON.parse(`[${cleanedJsonOutput}]`);
        jsonArray.push(...images);
        objectDataWithOffsets.push({...obj, images});
    } catch (error) {
      // Recover the good output the console logged before it logged warning and error messages
        const stringifiedOffsets = extractOffsets(error.stdout);
        if (stringifiedOffsets) {
          try {
            const recoveredOffsets = JSON.parse(extractOffsets(error.stdout));
            if (recoveredOffsets.length) {
              jsonArray.push(...recoveredOffsets);
              objectDataWithOffsets.push({...obj, images: recoveredOffsets});
              
              console.error(`Error executing command for file: ${objToString(obj)}; Recovered ${recoveredOffsets?.length ?? "0"} images of ${obj.imageCount} \n Error: ${error.message}`);
            }
          } catch {
            console.error(`Error executing command for file: ${objToString(obj)}; Could not parse extracted images, output character length: ${stringifiedOffsets.length} \n Error: ${error.message}`);
          }
        } else {
          console.error(`Error executing command for file: ${objToString(obj)}; Recovered 0 images of ${obj.imageCount} \n Error: ${error.message}`);
        }
        
    }
    newCount += Number(obj.imageCount);
    if (Math.floor(prevCount / logNumber) < Math.floor(newCount / logNumber)) {
      console.log(objToString(obj));
      // Save current progress
      // Save the images array as a JSON file
      fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));
      // Save the object data array as a JSON file
      fs.writeFileSync(objectDataWithOffsetsFile, JSON.stringify(objectDataWithOffsets, null, 2));
    } 
    prevCount = newCount;
  } else {
    console.log(`Skip ${datName}`)
  }
});

// Save the images array as a JSON file
fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));
// Save the object data array as a JSON file
fs.writeFileSync(objectDataWithOffsetsFile, JSON.stringify(objectDataWithOffsets, null, 2));

console.log('Script completed successfully.');
