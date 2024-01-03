import fs from 'fs';
import path from 'path';
import config from './config.json';

const testObjectName = 'BN1';
const objectName = testObjectName;

const filePath = path.format({
  dir: path.join(config.filePathRCT2, 'ObjData'),
  name: objectName,
  ext: 'dat'
})

const data = fs.readFileSync(filePath);