import { readFileHeaderFromObjectName } from "./datReader.js";
import { spriteDetails } from './exportG1.js'

process.chdir('..');

const rct2g1 = "C:/Program Files (x86)/GOG Galaxy/Games/RollerCoaster Tycoon 2 Triple Thrill Pack/Data/g1.dat";
const outputFile = "C:/Users/storl/RCT-data/sprites/archive-data/rct2g1.csv"

const totalSprites = spriteDetails(rct2g1, outputFile);

console.log(totalSprites)

// const test1 = readFileHeaderFromObjectName('BN1');
// const test2 = readFileHeaderFromObjectName('GENSTORE');
// const test3 = readFileHeaderFromObjectName('1920PATH')

// console.log(test1, test1.size-test1.chunkLength);
// console.log(test2, test2.size-test2.chunkLength);
// console.log(test3, test3.size-test3.chunkLength);