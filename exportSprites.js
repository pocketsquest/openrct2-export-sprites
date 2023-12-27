const fs = require('fs');
const { execSync } = require('child_process');

// Read CSV file
const datNames = fs.readFileSync('datNames.csv', 'utf-8').split('\r\n');

// Read current offsets data
const jsonData = fs.readFileSync('offsets.json', 'utf-8');
const jsonArray = JSON.parse(jsonData);

// Set the current working directory to the game's bin directory
process.chdir('..');

// Iterate over file names
datNames.forEach(datName => {
  try {
      // Execute command in the command prompt
      const command = `openrct2 sprite exportalldat ${datName} .\\openrct2-export-sprites\\sprites\\${datName}`;
      const jsonOutput = execSync(command, { encoding: 'utf-8' });

      // Remove trailing comma and append JSON output to the array
      const cleanedJsonOutput = jsonOutput.trim().replace(/,\s*$/, '');
      jsonArray.push(...JSON.parse(`[${cleanedJsonOutput}]`));
  } catch (error) {
      console.error(`Error executing command for file: ${datName}\nMessage: ${error?.message}`);
  }
});

// Save the array as a JSON file
const outputFile = '.\\openrct2-export-sprites\\spriteOffsets.json';
fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));

console.log('Script completed successfully.');
