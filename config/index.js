import { debuglog } from 'util';
import assert from 'assert';
import fs from 'fs';
import os from 'os';
import p from 'path'; // 'path' is useful to have as a parameter option

const debug = debuglog('config');

/** 
 * @typedef DirectoryData 
 * @type {Object}
 * @prop {Object[]} entriesToValidate
 * @prop {string} entriesToValidate[].key
 * @prop {string[]} entriesToValidate[].subPaths
 * @prop {(path: string) => boolean} [entriesToValidate[].callback]
 * @prop {string[]} searchLocations
*/

const directoryData = {
  /** @type {DirectoryData} */
  OPENRCT2_DOCS: {
    entriesToValidate: [
      {key: 'configIni', subPaths: ['config.ini']},
      {key: 'objectDir', subPaths: ['object']}
    ],
    get searchLocations() {
      // Make list of possible locations for OpenRCT2 user directory
      const homePaths = [
        os.homedir(),
        os.userInfo().homedir,
        process.env.HOMEPATH,
        process.env.USERPROFILE,
      ]

      return combinePaths(homePaths, ['/Documents/OpenRCT2', '/OpenRCT2'])
    }
  },
  /** @type {DirectoryData} */
  OPENRCT2_INSTALL: {
    // What to check to validate?  See if .exe exists?  Try doing a sample command prompt?
    entriesToValidate: [
      {key: 'openRct2exe', subPaths: ['OpenRCT2.exe']}
    ],
    get searchLocations() {
      const programPaths = [
        process.env.ProgramFiles,
        process.env['ProgramFiles(x86)'],
        process.env.ProgramFilesW6432
      ].map(p.resolve);
      return combinePaths(programPaths, ['/OpenRCT2'])
    }
  },
  /** @type {DirectoryData} */
  RCT2_INSTALL: {
    entriesToValidate: [
      {key: 'objData', subPaths: ['objData'], callback(path) {
        // is objData a directory containing any .DAT files?
        try {
          const contents = fs.readdirSync(path,{withFileTypes: true});
          return contents.some( (ent) => (ent.isFile() && p.extname(ent.name).toUpperCase() === '.DAT'));
        } catch (e) {
          // See if it's one of fs.statSync's or fs.readdir errors
        }
      }},
      {key: 'rct2g1', subPaths: ['Data/g1.DAT','Assets/g1.DAT']}
    ]
  },
  /** @type {DirectoryData} */
  RCT1_INSTALL: { 
    entriesToValidate: [
      {key: 'csg1', subPaths: ['data/csg1.dat', 'data/csg1.1']},
      {key: 'csg1i', subPaths: ['data/csg1i.dat']}
    ],
    get searchLocations() {
      const programPaths = [
        process.env.ProgramFiles,
        process.env['ProgramFiles(x86)'],
        process.env.ProgramFilesW6432
      ].map(p.resolve);
      const gamePaths = [
        "GOG Galaxy/Games",
        "Steam/steamapps/common",
        "GOG Games",
        "GalaxyClient/Games",
        "Hasbro Interactive",
      ];
      return combinePaths(gamePaths, ['/RollerCoaster Tycoon Deluxe', '/RollerCoaster Tycoon'])
    }
  }
}

function  main() {
  const configFile = 'config.json';
  let config = {};
  
  // read config.json
  try {
    configJson = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    config.OPENRCT2_DOCS = configJson.OPENRCT2_DOCS;
    config.OPENRCT2_INSTALL = configJson.OPENRCT2_INSTALL;
    config.RCT2_INSTALL = configJson.RCT2_INSTALL;
    config.RCT1_INSTALL = configJson.RCT1_INSTALL;
    config.IS_RCT_CLASSIC = configJson.IS_RCT_CLASSIC;
    config.EXPORTS = configJson
  } catch (error) {
    console.error(`Error reading ${configFile}: ${error.message}`);
  }



}

/**
 * 
 * @param {string} [givenDirPath]
 */
function getOpenRCT2Docs(givenDirPath) {

  if (givenDirPath) {
    try {
     return {
      directory: givenDirPath,
      ...validate(givenDirPath, entriesToValidate.docsEntries)}
      ;
    } catch (err) {
      // If the given path is invalid, note it to the console and continue
      console.error(`Given path \"${givenDirPath}\" does not contain required data.`);
      debug(`Given path \"${givenDirPath}\" does not contain required data.`, err.message)
    }
  }

  
  
  for (const dirPath of docsPaths) {
    try {
      return {
        directory: dirPath,
        ...validate(dirPath,entriesToValidate.docsEntries)
      };
    } catch (err) {
      debug(`Directory \"${dirPath}\" does not contain required data.`, err.message)
    }
  }
  // Checked all likely locations and could not find User Directory
  // Used Array.prototype.concat to add givenDirPath to the checkedArray if it was defined
  throw new Error(`Could not find OpenRCT2 User Directory`, {checkedArray: docsPaths.concat(givenDirPath || []) })
}

/**
 * Validates given OpenRCT2 install directory, othewise searches to find it.
 * @param {string} [givenDirPath] 
 * @returns {Object<string, string> | undefined}
 */
function getOpenRCT2Install(givenDirPath) {

  if (givenDirPath) {
    try {
     return {
      directory: givenDirPath,
      ...validate(givenDirPath, entriesToValidate.openRCT2InstallEntries)
      }
    } catch (err) {
      // If the given path is invalid, note it to the console and continue
      console.error(`Given path \"${givenDirPath}\" does not contain required data.`);
      debug(`Given path \"${givenDirPath}\" does not contain required data.`, err.message)
    }
  }

  

  for (const dirPath of installPaths) {
    try {
      return {
        directory: dirPath,
        ...validate(dirPath,entriesToValidate.openRCT2InstallEntries)
      };
    } catch (err) {
      debug(`Directory \"${dirPath}\" does not contain required data.`, err.message)
    }
  }

  // Checked all likely locations and could not find OpenRCT2 install directory
  // Used Array.prototype.concat to add givenDirPath to the checkedArray if it was defined
  throw new Error(`Could not find OpenRCT2 Install Directory`, {checkedArray: docsPaths.concat(givenDirPath || []) })
}

function getRCT2Install(givenDirPath,givenIsUsingClassic) {

}

/**
 * Use {@link findEntry} to evaluate whether each item in entries has a valid path under the given directory path
 * @param {string} dirPath - path to directory in which to search
 * @param {object[]} entries - files or directories that `dirPath` must contain
 * @param {string} entries[].key - name of the entry for identification in the returned object 
 * @param {string[]} entries[].subPaths - possible relative paths to check
 * @param {(path: string) => boolean} [entries[].callback] - an optional extra test a path must pass to be valid ( default: fs.existsSync)
 * @returns {Object<string, string> | undefined}
 */
function validate(dirPath, entries) {
  // if the directory path does not exist at all, terminate early
  try {
    fs.readdirSync(dirPath)
  } catch (err) {
    switch (err.code) {
      case 'ERR_INVALID_ARG_TYPE':
      case 'ENOENT':
      case 'ENOTDIR':
        debug(`Path \"${dirPath}\" does not exist as a directory`);
        break;
      default:
        // Above are expected errors codes.  Logs error if it wasn't expected, in case it's not the directory that was the problem.
        debug(`Failed to read directory \"${dirPath}\"`, err.message)
    }
    throw new Error(`Path \"${dirPath}\" does not exist as a directory`, {cause: err})
  }

  try {
    /** @type {Object<string,string>} */
    const result = {};
    // For each entry needed in the directory, find a valid path and assign that value to `key` in the result object.
    for (const {key, subPaths, callback = fs.existsSync} of entries) {
      // using `assert` throws error if no valid paths found
      result[key] = assert( 
        subPaths.map( subPath => p.resolve(dirPath,subPath) ).find(callback),
        Error(`No valid paths found in \"${dirPath}\" for ${key}`)
        );
    }
    return result;
  } catch (err) {
    debug(err.message)
    throw err
  }
}

/**
 * Returns a new array with path.join of every combination from one of each of the given arrays.  It also eliminates duplicates or values that would throw an error for path functions.
 * @param {...string} arrays - array of paths to join
 * @returns 
 */
function combinePaths(...arrays) {
  // Get rid of duplicates or values that throw an error for path functions
  arrays = arrays.map(arr => {
    return (arr.reduce( (newArr, currentPath) => {
      try {
        currentPath = p.normalize(currentPath);
        if (!newArr.includes(currentPath)) {
          newArr.push(currentPath);
        }
      } finally {
        return newArr
      }
    } , [] ))
  });

  return arrays.reduce( (accumulator, currentArray) => {
    const result = []
    for (const elem1 of accumulator) {
        for (const elem2 of currentArray) {
            const combinedPath = p.join(elem1, elem2);
            result.push(combinedPath);
        }
    }
    return result;
  },[''])
}