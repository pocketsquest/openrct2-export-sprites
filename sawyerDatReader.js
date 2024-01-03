// 'C:/Users/storl/RCT-data/RCT2';

const fs = require('fs');
const path = require('path');

const objectTypes = [
  "Ride/Shop",
  "Small Scenery",
  "Large Scenery",
  "Walls",
  "Path Banners",
  "Paths",
  "Path Additions",
  "Scenery Group",
  "Park Entrance",
  "Water",
  "Scenario Text"
];

const rct2Directory = 'path/to/rct2'

const objectName = "GENSTORE";

const datFilePath = path.format({
  dir: path.join(rct2Directory,'data'),
  name: objectName,
  ext: '.DAT'
})

// Read the binary contents of the DAT file
const data = fs.readFileSync(datFilePath);

// Extract information from the DAT File Header
const flags = data.readUInt32LE(0); 
const type = flags & 0x0F; // Extract lower four bits
const filename = data.toString('ascii', 4, 12).trim(); // Extract filename as ASCII string


console.log('Type:', objectTypes[type]);
console.log('Filename:', filename);
console.log('Header:', chunkHeader);