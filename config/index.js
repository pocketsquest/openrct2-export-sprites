import fs from 'fs';
import os from 'os';
import path from 'path';

function  main() {
  const configFile = 'config.json';
  let config = {};
  
  // read config.json
  try {
    config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
  } catch (error) {
    console.error(`Error reading ${configFile}: ${error.message}`);
  }


}

/**
 * 
 * @param {*} dirPath 
 */
function getOpenRCT2Docs(dirPath) {
  if (dirPath) {
    const configIni = findEntry(dirPath, 'config.ini');
    const objectDir = findEntry(dirPath, 'object');

  }
}

function findEntry(dirPath, subPaths, {isFile, isDirectory, callback}) {
  if (subPaths.length === 0) {
    throw new Error('Entry not found');
  }

  const currentPath = path.resolve(dirPath, subPaths[0]);

  
  try {
    const stats = fs.statSync(currentPath);

    if (isFile && !stats.isFile()) {
      throw new Error(`Path ${currentPath} is not a file`);
    }

    if (isDirectory && !stats.isDirectory()) {
      throw new Error(`Path ${currentPath} is not a directory`);
    }

    if (callback && !callback(currentPath)) {
      throw new Error(`Path ${currentPath} does not satisfy the callback condition`);
    }

    // If all conditions are met, return the absolute path
    return currentPath;
  } catch (error) {
    // Catch any errors and recursively call findEntry with the remaining subPaths
    return findEntry(dirPath, subPaths.slice(1), options);
  }
}

function validate(dirPath, ...entries) {
  const resolvedPaths = [];

  for (const entry of entries) {
    const subPaths = (Array.isArray(entry) ? entry : [entry]);
    const pathExists = findEntry(dirPath, ...subPaths);
    if (pathExists) {
      resolvedPaths.push(pathExists)
    } else {
      // if the path does not exist, terminate early and return false
      return false;
    }
  }
  // if loop completes, then each entry was validated
  return resolvedPaths;
}

