import path from 'path';
import fs from 'fs';
import {exec, execSync} from 'child_process';

// printWorkingDirectory();

// openrct2 export "C:\Program Files (x86)\GOG Galaxy\Games\RollerCoaster Tycoon 2 Triple Thrill Pack\data\g1.dat" 0 "C:\Users\storl\repos\openrct2-export-sprites\exports\data\test.png"

const outputDirectory = path.resolve('./exports/data/');
const rct2g1 = "C:/Program Files (x86)/GOG Galaxy/Games/RollerCoaster Tycoon 2 Triple Thrill Pack/data/g1.dat";
const OpenRCT2dir = "C:/Program Files (x86)/OpenRCT2";
const objectName = "GENSTORE"

const base = 'rct2';
console.log(typeof base);
console.log(typeof base === 'String');


// testExec(1);

// "C:\Program Files (x86)\OpenRCT2\data\object\rct1\footpath_railings\rct1ll.footpath_railings.space.parkobj"

function testExec(command = 0) {
  console.log(process.cwd());
  const commandArray = [
    `openrct2 sprite export \"${rct2g1}\" 0 \"${path.join(outputDirectory,'test.png')}\"`, 
    `openrct2 sprite exportalldat ${objectName} \"${outputDirectory}\"`, 
  ];
  console.log(commandArray[command]);
  exec(commandArray[command], { cwd: OpenRCT2dir, encoding: 'utf-8' }, (err, stdout, stderr) => {
    console.log('stdout',stdout);
    console.log('stderr',stderr);
  });

  console.log(process.cwd());
}

function printWorkingDirectory() {
  console.log(process.cwd());
}

