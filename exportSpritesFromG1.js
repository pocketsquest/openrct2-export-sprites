const { exec } = require('child_process');
const fs = require('fs');

// Set the current working directory to the game's bin directory
process.chdir('..');

// Path to the sprite file
const file2 = "C:/Users/storl/RCT-data/RCT2/g1.dat";

// RCT1 data made from sprite combine command
const file1 = "C:/Users/storl/RCT-data/RCT1/g2.dat";

const spriteFile = file2;

// CSV file path
const csvFilePath = 'openrct2-export-sprites/rct2_data.csv';

// Append CSV headers
const headers = 'number,width,height,x_offset,y_offset,data_offset\n';
fs.writeFileSync(csvFilePath, headers);

// Get total number of sprites
exec(`openrct2 sprite details ${spriteFile}`, { encoding: 'utf-8' }, (err, stdout) => {
    if (err) {
        console.error('Error getting sprite details:', err);
        return;
    }

    const maxIndex = parseInt(stdout.match(/sprites: (\d+)/)[1]);

    // Loop through each sprite index
    for (let spriteIndex = 0; spriteIndex < maxIndex; spriteIndex++) {
        // Get details for each sprite
        exec(`openrct2 sprite details ${spriteFile} ${spriteIndex}`, { encoding: 'utf-8' }, (err, spriteDetails) => {
            if (err) {
                console.error('Error getting sprite details:', err);
                return;
            }

            // Parse and extract information
            const [, width, height, xOffset, yOffset, dataOffset] = spriteDetails.match(/width: (\d+)\nheight: (\d+)\nx offset: (\d+)\ny offset: (\d+)\ndata offset: (.+)/);

            // Append data to CSV file
            const newData = `${spriteIndex},${width},${height},${xOffset},${yOffset},${dataOffset}\n`;
            fs.appendFile(csvFilePath, newData, (err) => {
                if (err) {
                    console.error('Error appending data to CSV:', err);
                }
            });
        });
    }
});


// Also, to export the sprite images themselves
// Something like execSync(`openrct2 exportall ${spriteFile} path/to/directory`, { encoding: 'utf-8' });
