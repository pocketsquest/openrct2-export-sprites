import fs from 'fs';
import path from 'path';
// import config from './config.json' assert { type: 'json' };

const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

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

const objectSources = {
  8: "Original",
  1: "1st Expansion Pack"
}

export function readFileHeaderFromObjectName(objectName) {
  const filePath = path.format({
    dir: path.join(config.filePathRCT2, 'ObjData'),
    name: objectName,
    ext: '.dat'
  });

  // get stats for the file. this throws an exception if the file does not exist
  const stats = fs.statSync(filePath);
  // Read the binary contents of the DAT file
  const data = fs.readFileSync(filePath);

  const fileHeader = readFileHeader(data);
  
  if (fileHeader.fileName.toUpperCase() !== objectName.toUpperCase()) {
    throw new Error('File data does not match file name');
  }

  const chunkHeader = readChunkHeader(data);

  if (chunkHeader.chunkLength + 21 > stats.size) {
    // Either the file is missing data, or the chunk header is incorrect.
    throw new Error('File size error');
  }

  return {...fileHeader, ...chunkHeader, size: stats.size};
}

function readFileHeader(data) {
  // Extract information from the DAT File Header (16 bytes)
  const flags = data.readUInt32LE(0); 
  const objectSource = objectSources[flags & 0xF0] || "custom";
  const typeFlag = flags & 0x0F; // Extract lower four bits
  const typeName = objectTypes[typeFlag];
  const fileName = data.toString('ascii', 4, 12).trim(); // Extract filename as ASCII string

  return {typeFlag, typeName, objectSource, fileName}
}

function readChunkHeader(data) {
  // Extract information from the Sawyer Chunk Header (5 bytes), starting after the DAT File Header
  const encoding = data.readUInt8(16);
  const chunkLength = data.readUInt32LE(17);
  return {encoding, chunkLength}
}
