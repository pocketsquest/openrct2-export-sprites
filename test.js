const fs = require('fs');
const path = require('path');

const objData = JSON.parse(fs.readFileSync('objectData.json', 'utf-8'));

const datNames = [];

objData.forEach(obj => {
  datNames.push(obj.ObjectName);
});

datNames.sort();

fs.writeFileSync('datNamesList.json', JSON.stringify(datNames,null,2), 'utf8');
console.log(datNames.length)