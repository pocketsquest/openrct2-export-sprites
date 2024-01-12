import fs from 'fs';
import path from 'path';
import {exec, execSync} from 'child_process';
import {
  configRead,
} from './config'



export default function main() {
  const config = configRead();
  // If the destination path is defined relative to the repo location, make it an absolute path before changing the directory for commands
  const dstDir = path.resolve(config.basePaths.EXPORTS);
  // Path to game data files
  const rct2g1 = path.join(config.basePaths.RCT2, 'data/g1.dat');
  const rct1csg1 =  path.join(config.basePaths.RCT1, 'data/csg1.dat');
  const rct1csg1i =  path.join(config.basePaths.RCT1, 'data/csg1i.dat');

  // New g1.dat file to create
  const rct1g1 = path.join(dstDir, 'data/rct1g1.dat');
  console.log(rct1g1);

  // Ensure directories for output data exist.
  fs.mkdirSync(path.join(dstDir,'data'),{recursive:true});
  fs.mkdirSync(path.join(dstDir,'rct1'),{recursive:true});
  fs.mkdirSync(path.join(dstDir,'rct2'),{recursive:true});

  // Set the current working directory to OpenRCT2 to execute commands
  process.chdir(config.filePathOpenRCT2);


  // Combine RCT1 data
  const combineResponse = spriteCombine(rct1csg1, rct1csg1i, rct1g1);
  console.log('Combined RCT1 data', combineResponse);

  // I think the details for rct1 are in a different format
  // console.log('Saving details for RCT1');
  // spriteDetails(rct1g1, path.join(dstDir, 'data/rct1details.csv'));
  console.log('Saving details for RCT2');
  spriteDetails(rct2g1, path.join(dstDir, 'data/rct2details.csv'));
  // spriteExportAll(rct1g1, path.join(dstDir, 'rct1'));
  // spriteExportAll(rct2g1, path.join(dstDir, 'rct2'));
}

// Also, to export the sprite images themselves
// Something like execSync(`openrct2 exportall ${spriteFile} path/to/directory`, { encoding: 'utf-8' });
function spriteExportAll(spriteFile, outputDirectory) {
  try {
    // openrct2 export "C:\Program Files (x86)\GOG Galaxy\Games\RollerCoaster Tycoon 2 Triple Thrill Pack\data\g1.dat" 0 "C:\Users\storl\repos\openrct2-export-sprites\exports\data\test.png"
    // openrct2 exportall "C:\Program Files (x86)\GOG Galaxy\Games\RollerCoaster Tycoon 2 Triple Thrill Pack\data\g1.dat" "C:\Users\storl\repos\openrct2-export-sprites\exports\rct2"
    const command = `openrct2 exportall \"${spriteFile}\" \"${outputDirectory}\"`
    const response = execSync(command, { encoding: 'utf-8' });
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

export function spriteDetails(spriteFile, outputFile) {
  try {
    // Create output csv file.
    const headers = 'index,width,height,x_offset,y_offset,data_offset\n';
    if  (path.extname(outputFile) !== '.csv') {
      throw new Error('Output must be .csv');
    }
    fs.mkdirSync(path.dirname(outputFile), {recursive: true});
    fs.writeFileSync(outputFile, headers);

    const maxIndex = spriteTotal(spriteFile);
    // Loop through each sprite index
    for (let spriteIndex = 0; spriteIndex < maxIndex; spriteIndex++) {
      try {
        const details = spriteDetailsByIndex(spriteFile, spriteIndex);
        const {width, height, xOffset, yOffset, dataOffset} = details;
        // Append data to CSV file
        const newData = `${spriteIndex},${width},${height},${xOffset},${yOffset},${dataOffset}\n`;
      
        fs.appendFileSync(outputFile, newData);
        process.stdout.write(`sprite image ${spriteIndex} of ${maxIndex}\r`);
        
      } catch (err) {
        throw err;
      }
    }
    
    console.log('Saved details of %d sprite images to %s',maxIndex,path.basename(outputFile));
    return maxIndex;
  } catch (err) {
    throw err
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
    throw new Error('Error getting sprite total:', err.message);
  }
}

function spriteDetailsByIndex(spriteFile, spriteIndex) {
  const command = `openrct2 sprite details \"${spriteFile}\" ${spriteIndex}`;
  try {
    const response = execSync(command, { encoding: 'utf-8' })

    // Extract information
    const matchResult = response.match(/width: (\d+)[\r\n]+height: (\d+)[\r\n]+x offset: (-?\d+)[\r\n]+y offset: (-?\d+)[\r\n]+data offset: (.+)/);

    if (matchResult) {
      const [, width, height, xOffset, yOffset, dataOffset] = matchResult;
      return { width, height, xOffset, yOffset, dataOffset };
    } else {
      throw new Error(`Error reading console output for ${spriteIndex}: \n` + response);
    }
  } catch (err) {
    throw err
  }

}


