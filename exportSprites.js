const fs = require('fs');
const { execSync } = require('child_process');

const skipErrors = true;
let count = 0;
let logNumber = 20; // console.log the datName for every '20' files.

// Read CSV file
const objectData = JSON.parse(fs.readFileSync('objectData.csv', 'utf-8'));

const datErrorFiles =  [
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
  'WTRORNG',    'ZLDB',     'ZLOG', 'ARRX'
]

// // Read current offsets data
// const jsonData = fs.readFileSync('offsetsOrignal.json', 'utf-8');
const jsonArray = [];

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
  const datName = obj.ObjectName;
  // Make sure to exclude multidimensioncoaster, or if skipping errors, any of the ones listed in the errors array
  if ((skipErrors && !datErrorFiles.includes(datName)) || datName !== 'ARRX'){
    try {
        // Execute command in the command prompt
        const command = `openrct2 sprite exportalldat ${datName} .\\openrct2-export-sprites\\sprites\\${datName}`;
        const jsonOutput = execSync(command, { encoding: 'utf-8' });

        // Remove trailing comma and append JSON output to the array
        const cleanedJsonOutput = jsonOutput.trim().replace(/,\s*$/, '');
        jsonArray.push(...JSON.parse(`[${cleanedJsonOutput}]`));
    } catch (error) {
      // Recover the good output the console logged before it logged warning and error messages
        const stringifiedOffsets = extractOffsets(error.stdout);
        if (stringifiedOffsets) {
          try {
            const recoveredOffsets = JSON.parse(extractOffsets(error.stdout));
            if (recoveredOffsets.length) {
              jsonArray.push(...recoveredOffsets);
              
              console.error(`Error executing command for file: ${datName}: ${obj.String}, Type: ${obj.Type}; Recovered ${recoveredOffsets?.length} offsets of ${obj.ImageCount} \n Error: ${error.message}`);
            }
          } catch {
            console.error(`Error executing command for file: ${datName}: ${obj.String}, Type: ${obj.Type}; Could not parse extracted offsets, output character length: ${stringifiedOffsets.length} \n Error: ${error.message}`);
          }
        } else {
          console.error(`Error executing command for file: ${datName}: ${obj.String}, Type: ${obj.Type}; Recovered 0 offsets of ${obj.ImageCount} \n Error: ${error.message}`);
        }
        
    }
  } else {
    console.log(`Skip ${datName}`)
  }
  count++;
  if (!(count % logNumber)) {
    console.log(datName);
  }
});

// Save the array as a JSON file
const outputFile = '.\\openrct2-export-sprites\\spriteOffsets.json';
fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));

console.log('Script completed successfully.');
