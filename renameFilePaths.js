const fs = require('fs');

const filePath = 'offsets.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Modify the path property for each object
        jsonData.forEach(obj => {
            if (obj.path) {
                obj.path = obj.path.replace('..', './openrct2-export-sprites');
            }
        });

        // Convert the updated data back to JSON format
        const updatedJsonData = JSON.stringify(jsonData, null, 2);

        // Write the updated JSON data back to the file
        fs.writeFile(filePath, updatedJsonData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
            } else {
                console.log('File updated successfully!');
            }
        });
    } catch (jsonErr) {
        console.error('Error parsing JSON:', jsonErr);
    }
});
