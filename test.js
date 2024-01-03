import fs from 'fs';
const { execSync } = require('child_process');

const filePathRCT1 = "C:\\Users\\storl\\RCT-data\\RCT1\\g2.dat";
const filePathRCT2 = "C:\\Users\\storl\\RCT-data\\RCT2\\g1.dat";
const testfile = "C:\Program Files (x86)\GOG Galaxy\Games\RollerCoaster Tycoon Deluxe"


// Set the current working directory to the game's bin directory
process.chdir('..');


//  fprintf(stdout, "usage: sprite details <spritefile> [idx]\n");
const command = `openrct2 sprite details ${filePathRCT1}`;
const command2 = `openrct2 sprite details ${filePathRCT1} 06000`;
const output = execSync(command, { encoding: 'utf-8' });
const output2 = execSync(command2, { encoding: 'utf-8' });

console.log(output);
console.log(output2);

