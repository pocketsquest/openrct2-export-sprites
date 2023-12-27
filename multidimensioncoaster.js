const fs = require('fs');
const { execSync } = require('child_process');

// Set the current working directory to the parent directory
process.chdir('..');

// Specify the problematic file name
const problematicFile = 'ARRX';

try {
    // Execute command in the command prompt with maxBuffer option
    const command = `openrct2 sprite exportalldat ${problematicFile} .\\openrct2-export-sprites\\sprites\\${problematicFile}`;
    const jsonOutput = execSync(command, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 }); // 10 MB, adjust as needed

    // Remove trailing comma and append JSON output to a separate file
    const cleanedJsonOutput = jsonOutput.trim().replace(/,\s*$/, '');
    fs.writeFileSync('problematic_file_output.json', `[${cleanedJsonOutput}]`);

    console.log('Script completed successfully for the problematic file.');
} catch (error) {
    console.error(`Error executing command for file: ${problematicFile}`);
    // Optionally, you can log the error message if needed
    // console.error(error.message);
}
