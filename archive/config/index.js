import fs from 'fs';
import p from 'path';
import ini from 'ini';

import {
  BASEID,
  BASEID_LIST,
  PATHID,
  PATHID_LIST,
  idToString
} from './configTypes.js';
import { configPath, configRead } from './readJson.js';

/** @typedef {import('./configTypes.js').ConfigData} ConfigData */

const env = createNewPlatformEnvironment();

export default env;

/**
 * Using the structure of the files and folders within the base directories, provides a more clear way to refer to filepaths
 */
class PlatformEnvironment {
  /**
   * Absolute filepaths to base directories
   * @type { {[x in BASEID]?: string} }
  */
  #basePaths = {};
  /**
   * Relative filepaths to directories and files
   * @type { {[x in PATHID]?: string} }
  */
  #filePaths = {
    [PATHID.RCT1COMBINE]: 'details/gx.dat',
    [PATHID.DETAILS_RCT1]: 'details/rct1.csv',
    [PATHID.DETAILS_RCT2]: 'details/rct2.csv',
    [PATHID.DETAILS_OBJDATA]: 'details/rct2objData.json',
    [PATHID.SPRITES_RCT1]: 'sprites/rct1',
    [PATHID.SPRITES_RCT2]: 'sprites/rct2',
    [PATHID.SPRITES_OBJDATA]: 'sprites/rct2objData',
  };

  /**
   * Constructor function for PlatformEnvironment
   * @constructor
   * @param {Object} configData  - Given absolute and relative paths for directories
   * @param {{[x in BASEID]?: string }} [configData.basePaths] - Object with base paths identified by baseid.
   * @param {{[x in PATHID]?: string }} [configData.filePaths] - Object with file paths identified by pathid.
   */
  constructor({basePaths,filePaths}) {
    // Loop for basePaths if it is given
    if (basePaths) {
      BASEID_LIST.forEach((baseid) => {
        if (basePaths[baseid]) {
          this.#basePaths[baseid] = basePaths[baseid];
        }
      })
    }

    // Loop for filePaths if it is given
    // Will overwrite any defaults from the initialzations of the private properties.
    if (filePaths) {
      PATHID_LIST.forEach((pathid) => {
        if (filePaths[pathid]) {
          this.#filePaths[pathid] = filePaths[pathid];
        }
      })
    }
  }

  /**
   * 
   * @param {BASEID} baseid 
   * @param {string} path 
   */
  setBasePath(baseid, path) {
    if ( !BASEID_LIST.includes(baseid)) {
      throw new Error('Invalid base input')
    }
    path = p.resolve(path);
    this.#basePaths[baseid] = path;
    console.log('%s set to %s',idToString.filePaths[baseid],path);
  }

  /**
   * 
   * @param {PATHID} pathid 
   * @param {string} path 
   */
  setFilePath(pathid, path) {
    if ( !PATHID_LIST.includes(pathid)) {
      throw new Error('Invalid path input');
    }
    path = p.resolve(path);
    this.#filePaths[pathid] = path;
    console.log('%s set to %s',idToString.filePaths[pathid],path);
  }

  /**
   * Returns the current paths as a JSON string.
   * @param {number | string} [space=2] - Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   * @returns {string}
   */
  toJson(space = 2) {
    /** @type {{basePaths: {[x in BASEID]?: string }, filePaths: {[x in PATHID]?: string}}} */
    const configData = { basePaths: {}, filePaths: {} };
    // Loop for basePaths
    BASEID_LIST.forEach((baseid) => {
      configData.basePaths[baseid] = this.#basePaths[baseid];
    })
  
    // Loop for filePaths
    PATHID_LIST.forEach((pathid) => {
      configData.filePaths[pathid] = this.#filePaths[pathid];
    })

    return JSON.stringify(configData, null, space);
  }

  /**
   * Get string value representing the environment. Uses {@link toJson} so it's easy to read if printed to the console
   * @returns {string}
   */
  valueOf() {
    return this.toJson();
  }

  /**
   * Save the currently used game directory paths to config.json
   */
  configSave() {
    const configJson = this.toJson();
    try {
      fs.writeFileSync(configPath,configJson, {encoding:'utf-8'});
      console.log('Saved config file.\n', configJson )
    } catch (err) {
      throw new Error('Error writing config.json file.')
    }
  }

  /**
   * Returns the full absolute filepath for the given pathid. Uses the given base directory, otherwise the default from {@link getDirectoryPath}
   * @param {PATHID} pathid 
   * @param {BASEID} [baseid]
   * @returns {string}
   */
  getFilePath(pathid,baseid) {
    if (baseid) {
      return p.join(this.#basePaths[baseid] , this.#filePaths[pathid]);
    }
    return p.join(this.getDirectoryPath(pathid) , this.#filePaths[pathid]);
  }

  /**
   * Returns the path for the default base directory containing pathid
   * @param {PATHID} pathid 
   * @returns {string}
   */
  getDirectoryPath(pathid) {
    switch (pathid) {
      case PATHID.G1:
      case PATHID.OBJDATA:
        return this.#basePaths[BASEID.RCT2];
      case PATHID.CSG1:
      case PATHID.CSG1I:
        return this.#basePaths[BASEID.RCT1];
      case PATHID.OBJECT:
        return this.#basePaths[BASEID.OPENRCT2DOCS];
      case PATHID.RCT1COMBINE:
      case PATHID.DETAILS_RCT1:
      case PATHID.DETAILS_RCT2:
      case PATHID.DETAILS_OBJDATA:
      case PATHID.SPRITES_RCT1:
      case PATHID.SPRITES_RCT2:
      case PATHID.SPRITES_OBJDATA:
        return this.#basePaths[BASEID.EXPORTS];
      default:
        throw new Error('Invalid Path');
    }
  }

  /** 
   * @todo
   * returns path string if exists, undefined otherwise
   * @param {BASEID} base 
   * @param {PATHID} pathid 
   * @param {string} [path] 
  */
  findFile(base, pathid, path) {
    return;
  }

  /** 
   * @todo
   * Make sure that 'details', 'sprites', and the sprite subdirectories exist
  */
  makeExportSubDirectories() {
    const exportsPath = this.#basePaths[BASEID.EXPORTS]
    if (!exportsPath) {
      throw new Error('Exports directory not specified.');
    } else if (!fs.existsSync(exportsPath)) {
      throw new Error('Exports directory does not exist.')
    }
    fs.mkdirSync(p.join(exportsPath,p.dirname(this.#filePaths[PATHID.RCT1COMBINE])), {recursive: true}); // recursive: true prevents an error if the directory already exists
    fs.mkdirSync(p.join(exportsPath,p.dirname(this.#filePaths[PATHID.DETAILS_RCT1])), {recursive: true});
    fs.mkdirSync(p.join(exportsPath,p.dirname(this.#filePaths[PATHID.DETAILS_RCT1])), {recursive: true});
    fs.mkdirSync(p.join(exportsPath,this.#filePaths[PATHID.SPRITES_RCT1]), {recursive: true});
    fs.mkdirSync(p.join(exportsPath,this.#filePaths[PATHID.SPRITES_RCT2]), {recursive: true});
    fs.mkdirSync(p.join(exportsPath,this.#filePaths[PATHID.SPRITES_OBJDATA]), {recursive: true});
  }



  /** @todo */
  validate() {
    // base directories are absolute paths
    // RCT2 data exists
    // RCT1 data exists and data is usable
    // OpenRCT2/object exists in OpenRCT2 docs
    // OpenRCT2/data/g2.dat exists in in OpenRCT2 install
    // All the subdirectories exist in the exports location.
    return true;
  }

  /** @todo Check if just the files needed for exporting the RCT1 sprite file exist */
  validateRCT1() {
    return true;
  }

  /** @todo Check if just the files needed for exporting the RCT2 sprite file exist */
  validateRCT2g1() {
    return true;
  }

  /** @todo Check if just the files needed for exporting the RCT2 objects sprites exist */
  validateRCT2objData() {
    return true;
  }
}

/** 
 * Make a directory in the given path, and return the new path
 * @param {string} path - Absolute file path
 * @param {string} [exportsDirName='exports'] - name of the exports directory
 * @returns {string}
 */
function makeExportsBaseDirectory(path,exportsDirName='exports') {
  const dirStats = fs.statSync(path);
  if (!dirStats.isDirectory()) {
    throw new Error('Given path is not a directory.')
  }
  const exportsPath = p.join(path, exportsDirName);
  try {
    fs.mkdirSync(exportsPath, {recursive: false});
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log('The folder %s already exists in the directory %s', path, exportsDirName)
    } else {
      throw err
    }
  } finally {
    return exportsPath;
  }
}

/**
 * Create the PlatformEnviroment instance to be used by the rest of the modules
 * @returns {PlatformEnvironment}
 */
function createNewPlatformEnvironment() {
  const { basePaths, filePaths } = configRead();
  // Figure out basePaths
  if (!basePaths[BASEID.OPENRCT2]) {
    basePaths[BASEID.OPENRCT2] = findOpenRCT2Path();
  }
  basePaths[BASEID.OPENRCT2DOCS] ||= findOpenRCT2DocsPath();
  /** Read OpenRCT2 config.ini after getting the docs path. 
  currently, {@link readIni} returns {} empty object if the openrct2docs path is not given or is invalid */
  basePaths[BASEID.RCT1] ||= readIni(basePaths[BASEID.OPENRCT2DOCS])[BASEID.RCT1] || findRCT1Path();
  basePaths[BASEID.RCT2] ||= readIni(basePaths[BASEID.OPENRCT2DOCS])[BASEID.RCT2] || findRCT2Path();
  // Figure out filePaths
  /**  Leave filePaths undefined here for the defaults defined the PlatformEnvironment constructor {@link #filePaths}*/
  const env = new PlatformEnvironment( {basePaths, filePaths} );
  // Do any instance methods
  return env
}

/**
 * Reads OpenRCT2's config.ini and finds what it has for the RCT 1 and 2 install locations.
 * @param {string} openRCT2DocsPath - Path to OpenRCT2's user directory, where config.ini is located.
 * @param {number} rctVersion - Either 1 or 2
 * @returns { string | undefined } 
 * @throws {Error} if config.ini does not exist in the location, or if it can't be read
 */
function readIni(openRCT2DocsPath,rctVersion) {
  try {
    const openRCT2ConfigData = fs.readFileSync( p.join(openRCT2DocsPath, 'config.ini' ), 'utf-8');
    // Parse the INI data
    const config = ini.parse(openRCT2ConfigData);

    // Extract RCT 1 and 2's install locations.
    switch (rctVersion){
      case 1: return config.general.rct1_path
      case 2: return config.general.game_path
      default: return;
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`config.ini does not exist in ${idToString.basePaths[BASEID.OPENRCT2DOCS]}`)
    } else {
      throw err;
    }
  }
}


/** @todo Maybe rewrite to single functions with switch cases, i.e. findBasePath(base) and isBasePath(base, path) */

function findRCT1Path() {
  // Look through the usual locations for the RCT1 install directory
  // If we can read OpenRCT2's config.ini, we can get exactly what you've given to OpenRCT2
  
  return "C:/Program Files (x86)/GOG Galaxy/Games/RollerCoaster Tycoon Deluxe";
}

function findRCT2Path() {
  // Look through the usual locations for the RCT2 install directory
  // If we can read OpenRCT2's config.ini, we can get exactly what you've given to OpenRCT2

  return "C:/Program Files (x86)/GOG Galaxy/Games/RollerCoaster Tycoon 2 Triple Thrill Pack"
}

function findOpenRCT2Path() {
  // Look through the usual locations for the OpenRCT2 install directory, the one with openrct2.exe and data/g2.dat

  return "C:/Program Files (x86)/OpenRCT2";
}

function findOpenRCT2DocsPath() {
  // Look through the usual locations for the OpenRCT2 user directory, the one with your custom objects, saved games, plugins, etc.
  // It should be located in your Documents folder
  const username = process.env.USERNAME;
  const path1 = p.win32.join('C:\\Users',username,'Documents\\OpenRCT2');
  if (fs.existsSync(p.join(path1,'object'))) { // if is valid directory
    return path1;
  }
  const path2 = p.win32.join('C:\\Users',username,'OneDrive\\Documents\\OpenRCT2');
  if (fs.existsSync(p.join(path2,'object'))) { // if is valid directory
    return path2;
  }
  throw new Error('Cannot find OpenRCT2 User Directory')
}




/**
 * 
 * @param {string} path - absolute directory to search for 
 * @returns { {csg1: string, csg1i: string} | false } existing subpaths to data, or false if doesn't exist
 */
function RCT1DataExists(path) {
  // look for csg1 in Data/csg1.dat or Data/csg1.1

  // look for csg1i in Data/csg1i.dat or RCTdeluxe_install/Data/CSG1I.DATf

  // LL CSG1i filesize is 1118672, LL CSG1 filesize is 41402869
}

/**
 * 
 * @param {string} path - absolute directory to search for 
 * @returns { {g1: string, objData: string} | false } existing subpaths to data, or false if doesn't exist
 */
function RCT2DataExists(path) {
  // Look for g1 under Data/g1.dat or Assets/g1.dat
  // Look for existance of ObjData directory
}

    // /**
    //  * Interface for retrieving paths and other environment related things.
    //  */
    // struct IPlatformEnvironment
    // {
    //     virtual ~IPlatformEnvironment() = default;

    //     virtual u8string GetDirectoryPath(BASEID base) const abstract;
    //     virtual u8string GetDirectoryPath(BASEID base, DIRID did) const abstract;
    //     virtual u8string GetFilePath(PATHID pathid) const abstract;
    //     virtual u8string FindFile(BASEID base, DIRID did, u8string_view fileName) const abstract;
    //     virtual void SetBasePath(BASEID base, u8string_view path) abstract;
    //     virtual bool IsUsingClassic() const abstract;
    // };

    // // Paths
    // u8string RCT1Path;
    // u8string RCT2Path;

// bool ConfigOpen(u8string_view path);
// bool ConfigSave(u8string_view path);
// u8string ConfigGetDefaultPath();
// void ConfigSetDefaults();
// bool ConfigSaveDefault();
// bool ConfigFindOrBrowseInstallDirectory();

// bool RCT1DataPresentAtLocation(u8string_view path);
// std::string FindCsg1datAtLocation(u8string_view path);
// bool Csg1datPresentAtLocation(u8string_view path);
// std::string FindCsg1idatAtLocation(u8string_view path);
// bool Csg1idatPresentAtLocation(u8string_view path);
// bool CsgIsUsable(const Gx& csg);
// bool CsgAtLocationIsUsable(u8string_view path);


    // /**
    //  * Attempts to find the RCT1 installation directory.
    //  * @returns Path to RCT1, if found. Empty string otherwise.
    //  */
    // static u8string FindRCT1Path()
    // {
    //     LOG_VERBOSE("config_find_rct1_path(...)");

    //     static constexpr u8string_view searchLocations[] = {
    //         R"(C:\Program Files\Steam\steamapps\common\Rollercoaster Tycoon Deluxe)",
    //         R"(C:\Program Files (x86)\Steam\steamapps\common\Rollercoaster Tycoon Deluxe)",
    //         R"(C:\GOG Games\RollerCoaster Tycoon Deluxe)",
    //         R"(C:\Program Files\GalaxyClient\Games\RollerCoaster Tycoon Deluxe)",
    //         R"(C:\Program Files (x86)\GalaxyClient\Games\RollerCoaster Tycoon Deluxe)",
    //         R"(C:\Program Files\Hasbro Interactive\RollerCoaster Tycoon)",
    //         R"(C:\Program Files (x86)\Hasbro Interactive\RollerCoaster Tycoon)",
    //     };

    //     for (const auto& location : searchLocations)
    //     {
    //         if (RCT1DataPresentAtLocation(location))
    //         {
    //             return u8string(location);
    //         }
    //     }

    //     auto steamPath = Platform::GetSteamPath();
    //     if (!steamPath.empty())
    //     {
    //         std::string location = Path::Combine(steamPath, Platform::GetRCT1SteamDir());
    //         if (RCT1DataPresentAtLocation(location))
    //         {
    //             return location;
    //         }
    //     }

    //     auto exePath = Path::GetDirectory(Platform::GetCurrentExecutablePath());
    //     if (RCT1DataPresentAtLocation(exePath))
    //     {
    //         return exePath;
    //     }
    //     return {};
    // }

    // /**
    //  * Attempts to find the RCT2 installation directory.
    //  * This should be created from some other resource when OpenRCT2 grows.
    //  * @returns Path to RCT2, if found. Empty string otherwise.
    //  */
    // static u8string FindRCT2Path()
    // {
    //     LOG_VERBOSE("config_find_rct2_path(...)");

    //     static constexpr u8string_view searchLocations[] = {
    //         R"(C:\Program Files\Steam\steamapps\common\Rollercoaster Tycoon 2)",
    //         R"(C:\Program Files (x86)\Steam\steamapps\common\Rollercoaster Tycoon 2)",
    //         R"(C:\GOG Games\RollerCoaster Tycoon 2 Triple Thrill Pack)",
    //         R"(C:\Program Files\GalaxyClient\Games\RollerCoaster Tycoon 2 Triple Thrill Pack)",
    //         R"(C:\Program Files (x86)\GalaxyClient\Games\RollerCoaster Tycoon 2 Triple Thrill Pack)",
    //         R"(C:\Program Files\Atari\RollerCoaster Tycoon 2)",
    //         R"(C:\Program Files (x86)\Atari\RollerCoaster Tycoon 2)",
    //         R"(C:\Program Files\Infogrames\RollerCoaster Tycoon 2)",
    //         R"(C:\Program Files (x86)\Infogrames\RollerCoaster Tycoon 2)",
    //         R"(C:\Program Files\Infogrames Interactive\RollerCoaster Tycoon 2)",
    //         R"(C:\Program Files (x86)\Infogrames Interactive\RollerCoaster Tycoon 2)",
    //     };

    //     for (const auto& location : searchLocations)
    //     {
    //         if (Platform::OriginalGameDataExists(location))
    //         {
    //             return u8string(location);
    //         }
    //     }

    //     auto steamPath = Platform::GetSteamPath();
    //     if (!steamPath.empty())
    //     {
    //         std::string location = Path::Combine(steamPath, Platform::GetRCT2SteamDir());
    //         if (Platform::OriginalGameDataExists(location))
    //         {
    //             return location;
    //         }
    //     }

    //     auto discordPath = Platform::GetFolderPath(SPECIAL_FOLDER::RCT2_DISCORD);
    //     if (!discordPath.empty() && Platform::OriginalGameDataExists(discordPath))
    //     {
    //         return discordPath;
    //     }

    //     auto exePath = Path::GetDirectory(Platform::GetCurrentExecutablePath());
    //     if (Platform::OriginalGameDataExists(exePath))
    //     {
    //         return exePath;
    //     }
    //     return {};
    // }

    // for csgIsUsable
    // constexpr uint32_t Num_LL_CSG_Entries = 69917;
    // constexpr uint32_t LL_CSG1_DAT_FileSize = 41402869;
    // sizeof(RCT1G1Element) = 0x10 (16 bytes)
    // so CSG1i filesize would be 1118672