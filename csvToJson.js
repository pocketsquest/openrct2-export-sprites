const fs = require('fs');
const csvtojson = require('csvtojson');  // npm install csvtojson

const replacer = (key, value) => (key === "imageCount" || key === "size") ? Number(value) : value;

function csvToJson(inputCsvPath, outputJsonPath) {
  // Read the CSV file
  const csvString = fs.readFileSync(inputCsvPath, 'utf8');

  // Convert CSV to JSON
  csvtojson()
    .fromString(csvString)
    .then((jsonArray) => {
      // Write the JSON array to a file
      fs.writeFileSync(outputJsonPath, JSON.stringify(jsonArray, replacer, 2));
      console.log('Conversion completed successfully.');
    })
    .catch((error) => {
      console.error('Error converting CSV to JSON:', error.message);
    });
}

csvToJson('objectData.csv','objectData.json');