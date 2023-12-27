const fs = require('fs');

const offsetsFile1 = 'spriteOffsets.json';

const offsetsFile2 = 'problematic_file_output.json';

const offsets1 = fs.readFileSync(offsetsFile1, 'utf-8');

const offsets2 = fs.readFileSync(offsetsFile2, 'utf-8');

const combinedOffsets = offsets1.slice(0, -1) + ',' + offsets2.slice(1);


fs.writeFileSync('combinedOffsets.json', combinedOffsets);