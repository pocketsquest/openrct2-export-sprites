import fs from 'fs';
import p from 'path';
import Path from './core/Path.js'

/**
 * Enum for the base directories
 * @readonly
 * @enum {number}
 */
const DIRBASE = {
  RCT1: 0,
  RCT2: 1,
  OPENRCT2: 2,
  OPENRCT2DOCS: 3,
  EXPORTS: 4,
};

/**
 * Enum for directories used
 * @readonly
 * @enum {number}
 */
const DIRID = {
  DATA: 0,
  OBJECT: 1,
  OBJDATA: 2,
  DETAILS: 3,
  SPRITES: 4,
  SPRITES_RCT1: 5,
  SPRITES_RCT2: 6,
  SPRITES_OBJDATA: 7
};

/**
 * Enum for file names
 * @readonly
 * @enum {number}
 */
const PATHID = {
  G1: 0,
  CSG1: 1,
  CSG1I: 2,
  RCT1COMBINE: 3,
  DETAILS_RCT1: 4,
  DETAILS_RCT2: 5,
  DETAILS_OBJDATA: 6
};

/**
 * Human-interpretable names of base directories for printing to the console.
 */
const baseToString = [
  'RCT1', 'RCT2', 'OpenRCT2', 'OpenRCT2 User Directory', 'Exports'
]

/**
 * The folder names for directories.
 */
const defaultDirectoryNames = [
  "data",
  "object",
  "ObjData",
  "details",
  "sprites",
  "spritesRCT1",
  "spritesRCT2",
  "spritesObjData"
];

/**
 * The names of each file, including extensions
 */
const defaultPathNames = [
  'g1.DAT',
  'csg1.DAT',
  'csg1i.DAT',
  'gx.DAT',
  'detailsRCT1.csv',
  'detailsRCT2.csv',
  'detailsObjData.json'
];

/**
 * For interacting with the user's custom inputs,
 */
class Config {
  #basepaths = [];

  constructor() {
    // Read config file, create if doesn't exist
  }

  setBasePath(base, path) {
    if (typeof base === 'string') {
      base = DIRBASE[base];
    }
    switch (base) {
      case DIRBASE.RCT1:
      case DIRBASE.RCT2:
      case DIRBASE.OPENRCT2:
      case DIRBASE.OPENRCT2DOCS:
      case DIRBASE.EXPORTS:
        this.#basepaths[base] = Path.GetAbsolute(path);

    }
    
  }

  getBasePath(base) {

  }

  #write() {

  }

}

class PlatformEnvironment {
  #baseNames = [,,,,,];

  constructor(baseNames) {

  }

  setBasePath(base, path) {

  }

  getDirectoryPath(base, did) {

  }

  getFilePath(pathid) {

  }

  // returns path string if exists, undefined otherwise
  findFile(base, did, path) {

  }

  makeDirectory(did) {

  }

  readFile(pathid, options) {

  }

  #getDefaultBaseDirectory() {

  }
}



function createNewPlatformEnvironment() {
  const baseNames = [];
  // Figure out basenames
  const env = new PlatformEnvironment(baseNames);
  // Do any instance methods
  return env
}

    // /**
    //  * Interface for retrieving paths and other environment related things.
    //  */
    // struct IPlatformEnvironment
    // {
    //     virtual ~IPlatformEnvironment() = default;

    //     virtual u8string GetDirectoryPath(DIRBASE base) const abstract;
    //     virtual u8string GetDirectoryPath(DIRBASE base, DIRID did) const abstract;
    //     virtual u8string GetFilePath(PATHID pathid) const abstract;
    //     virtual u8string FindFile(DIRBASE base, DIRID did, u8string_view fileName) const abstract;
    //     virtual void SetBasePath(DIRBASE base, u8string_view path) abstract;
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