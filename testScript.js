// test command line arguments
const path = process.argv[2];
const pathNormalized = require('path').normalize(path);

if (!path) {
  console.error('Usage: node myScript.js "file/path/with spaces"');
  process.exit(1);
}

// Now, 'pathNormalized' contains the correctly formatted and normalized file path
console.log('File path:', pathNormalized);
