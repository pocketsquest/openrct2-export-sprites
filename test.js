const fs = require('fs');
const path = require('path');

const filePath = 'objectDataTotalSorted'+ '.json';

const jsonString = fs.readFileSync(filePath, 'utf-8');

const properties = ["Type", "ImageCount", "Size","Source","ObjectName","String"];

// const regex = new RegExp(`"(${properties.join("|")})"`, 'g');
const regex = new RegExp(`"offsets"`,'g');

// const replacer =  (match) => `"${match[1].toLowerCase()}${match.slice(2)}`
const replacer = `"images"`

const newString = jsonString.replace(regex,replacer);

fs.writeFileSync(filePath, newString, 'utf8');
