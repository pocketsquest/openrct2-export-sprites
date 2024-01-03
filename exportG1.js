import fs from 'fs';
import path from 'path';
import {exec, execSync} from 'child_process';
// import config from './config.json' assert { type: 'json' };



export default function main() {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

  // Set the current working directory to the game's bin directory
  process.chdir(path.join(config.filePathOpenRCT2, 'bin'));

  // Path to game data files
  const rct2g1 = path.join(config.filePathRCT2, 'data/g1.dat');
  const rct1csg1 =  path.join(config.filePathRCT1, 'data/csg1.dat');
  const rct1csg1i =  path.join(config.filePathRCT1, 'data/csg1i.dat');

  // New g1.dat file to create
  const rct1g1 = path.join(config.filePathDestinationDirectory, 'data/rct1g1.dat');

  // Combine RCT1 data
  const combineResponse = spriteCombine(rct1csg1, rct1csg1i, rct1g1);

  spriteDetails(rct1g1, path.join(config.filePathDestinationDirectory, 'data/rct1details.csv'));
  spriteDetails(rct2g1, path.join(config.filePathDestinationDirectory, 'data/rct2details.csv'));
  spriteExportAll(rct1g1, path.join(config.filePathDestinationDirectory, 'rct1'));
  spriteExportAll(rct2g1, path.join(config.filePathDestinationDirectory, 'rct2'));
}

// Also, to export the sprite images themselves
// Something like execSync(`openrct2 exportall ${spriteFile} path/to/directory`, { encoding: 'utf-8' });
function spriteExportAll(spriteFile, outputDirectory) {
  try {
    const response = execSync(`openrct2 exportall ${spriteFile} ${outputDirectory}`, { encoding: 'utf-8' });
    return response;
  } catch (err) {
    throw err
  }
}

// `openrct2 sprite combine <index file> <image file> <output>`
// Combines a set of index (CSG1i.dat) and image (CSG.DAT) files from RollerCoaster Tycoon 1 into a file compatible with g1.dat. This file can then be used by any tool that can modify these, such as OpenRCT2’s own sprite exporter.
function spriteCombine(indexFile, dataFile, outputPath) {
  const command = `openrct2 sprite combine \"${indexFile}\" \"${dataFile}\" \"${outputPath}\"`;
  try {
    const response = execSync(command, { encoding: 'utf-8' });
    return response;
  } catch (err) {
    throw new Error('Error combining index and data files', err);
  }
}

function spriteTotal(spriteFile) {
  const command = `openrct2 sprite details \"${spriteFile}\"`;
  try {
    const response = execSync(command, { encoding: 'utf-8' });
    console.log(response);
    const maxIndex = parseInt(response.match(/sprites: (\d+)/)[1]);
    return maxIndex;
  } catch (err) {
    throw new Error('Error getting sprite total', err);
  }
}

export function spriteDetails(spriteFile, outputFile) {
  if  (path.extname(outputFile) !== '.csv') {
    throw new Error('Output must be .csv');
  }
  // Append CSV headers
  const headers = 'index,width,height,x_offset,y_offset,data_offset\n';
  fs.writeFileSync(outputFile, headers);

  const maxIndex = spriteTotal(spriteFile);
  // Loop through each sprite index
  for (let spriteIndex = 0; spriteIndex < 1; spriteIndex++) {
    spriteDetailsByIndex(spriteFile, spriteIndex, (err, details) => {
      if (err) {
        throw err;
      }
      const {width, height, xOffset, yOffset, dataOffset} = details;

      
      // Append data to CSV file
      const newData = `${spriteIndex},${width},${height},${xOffset},${yOffset},${dataOffset}\n`;
      fs.appendFile(outputFile, newData, (err) => {
          if (err) {
              console.error('Error appending data to CSV:', err);
          }
        });
    })
  }
  return maxIndex;
}

function spriteDetailsByIndex(spriteFile, spriteIndex, callback) {
  const command = `openrct2 sprite details \"${spriteFile}\" ${spriteIndex}`;

  exec(command, { encoding: 'utf-8' }, (err, response) => {
    if (err) {
      callback(err, null);
      return;
    }

    // Extract information
    const matchResult = response.match(/width: (\d+)[\r\n]+height: (\d+)[\r\n]+x offset: (-?\d+)[\r\n]+y offset: (-?\d+)[\r\n]+data offset: (.+)/);

    if (matchResult) {
      const [, width, height, xOffset, yOffset, dataOffset] = matchResult;
      callback(null, { width, height, xOffset, yOffset, dataOffset });
    } else {
      callback(new Error(`Error reading console output: \n` + response), null);
    }
    

  });
}


