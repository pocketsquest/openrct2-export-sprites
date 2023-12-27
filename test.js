const fs = require('fs');
const { execSync } = require('child_process');
const process = require('process');

// Read CSV file
const datNames = fs.readFileSync('datNames.csv', 'utf-8').split('\r\n');

const section = ['TEN'];

// Set the current working directory to the game's bin directory
process.chdir('..');

const jsonArray = [];

// Iterate over file names
section.forEach(datName => {
    // Execute command in the command prompt
    const command = `openrct2 sprite exportalldat ${datName} .\\openrct2-export-sprites\\sprites\\${datName}`;
    const jsonOutput = execSync(command, { encoding: 'utf-8' });

    // Remove trailing comma and append JSON output to the array
    try {

      const cleanedJsonOutput = jsonOutput.trim().replace(/,\s*$/, '');
      jsonArray.push(...JSON.parse(`[${cleanedJsonOutput}]`));
      
    } catch (error) {
        console.error(`Error parsing JSON for file: ${datName}`);
    }
});