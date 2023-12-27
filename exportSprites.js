const fs = require('fs');
const { execSync } = require('child_process');

// Read CSV file
const datNames = fs.readFileSync('datNames.csv', 'utf-8').split('\n');

// Initialize array to store JSON outputs
const jsonArray = [];

// Iterate over file names
datNames.forEach(datName => {
    // Execute command in the command prompt
    const command = `openrct2 sprite exportalldat ${datName} sprites\\${datName}`;
    const jsonOutput = execSync(command, { encoding: 'utf-8' });

    // Parse JSON output and append to array
    try {
        const jsonData = JSON.parse(jsonOutput);
        jsonArray.push(jsonData);
    } catch (error) {
        console.error(`Error parsing JSON for file: ${datName}`);
    }
});

// Save the array as a JSON file
const outputFile = 'output.json';
fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));

console.log('Script completed successfully.');
