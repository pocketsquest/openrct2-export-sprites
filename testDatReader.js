import fs from 'fs';
import path from 'path';
import { readFileHeaderFromObjectName } from "./datReader.js";
import exportG1 from './exportG1.js'

main({execute: false});

// exportG1();

function main({execute}) {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
  // If the destination path is defined relative to the repo location, make it an absolute path before changing the directory for commands
  const dstDir = path.resolve(config.filePathDestinationDirectory);
  // Path to game data files
  const rct2g1 = path.join(config.filePathRCT2, 'data/g1.dat');
  console.log(`openrct2 exportall \"${rct2g1}\" \"${path.join(dstDir,'rct2')}\"`)
  // Details csv
  const rct2details = path.join(dstDir,'data/rct2g1.csv');

  if (execute) {
    try {
      process.chdir(config.filePathOpenRCT2);
      const totalSprites = exportG1.spriteDetails(rct2g1, rct2details);
      console.log("done");
    } catch (err) {
      console.error(err.message)
    }
  }
}


// const test1 = readFileHeaderFromObjectName('BN1');
// const test2 = readFileHeaderFromObjectName('GENSTORE');
// const test3 = readFileHeaderFromObjectName('1920PATH')

// console.log(test1, test1.size-test1.chunkLength);
// console.log(test2, test2.size-test2.chunkLength);
// console.log(test3, test3.size-test3.chunkLength);