
/**
 * Enum for the base directories
 * @readonly
 * @enum {string}
 */
export const BASEID = {
  /** RCT1 install directory @const*/
  RCT1: 'RCT1',
  /** RCT2 install directory @const*/
  RCT2: 'RCT2',
  /** OpenRCT2 install directory  @const*/
  OPENRCT2: 'OPENRCT2',
  /** OpenRCT2 User directory @const */
  OPENRCT2DOCS: 'OPENRCT2DOCS',
  /** Directory for exported sprite files @const*/
  EXPORTS: 'EXPORTS',
};

/** 
 * An array containing the members of BASEID
 * @const {BASEID[]} 
 */
export const BASEID_LIST = Object.values(BASEID);

/**
 * Enum for file names and subdirectory names, as relative paths to their respective base directories
 * @readonly
 * @enum {string}
 */
export const PATHID = {
  /** RCT2 data/g1.dat sprite file @const*/
  G1: 'G1',
  /** RCT1 sprite file @const*/
  CSG1: 'CSG1',
  /** RCT1 sprite index file @const*/
  CSG1I: 'CSG1I',
  /** RCT2 object dat files directory @const*/
  OBJDATA: 'OBJDATA',
  /** OpenRCT2 object directory for custom objects @const*/
  OBJECT: 'OBJECT',
  /** New g1 file made from csg1 and csg1i @const*/
  RCT1COMBINE: 'RCT1COMBINE',
  /** Data for each rct1 image @const*/
  DETAILS_RCT1: 'DETAILS_RCT1',
  /** Data for each rct2 image @const*/
  DETAILS_RCT2: 'DETAILS_RCT2',
  /** Data for the rct2 objects @const*/
  DETAILS_OBJDATA: 'DETAILS_OBJDATA',
  /** Directory for RCT1 sprites @const*/
  SPRITES_RCT1: 'SPRITES_RCT1',
  /** Directory for RCT2 sprites @const*/
  SPRITES_RCT2: 'SPRITES_RCT2',
  /** Directory for RCT2 object sprites @const */
  SPRITES_OBJDATA: 'SPRITES_OBJDATA'
};

/** 
 * An array containing the members of PATHID
 * @const {PATHID[]} 
*/
export const PATHID_LIST = Object.values(PATHID);

/**
 * Human-interpretable names of base directories and file paths for printing to the console.
 */
export const idToString = {
  basePaths: {
  [BASEID.RCT1]: 'RCT1',
  [BASEID.RCT2]: 'RCT2',
  [BASEID.OPENRCT2]: 'OpenRCT2',
  [BASEID.OPENRCT2DOCS]: 'OpenRCT2 User Directory',
  [BASEID.EXPORTS]: 'Exports'
  },
  filePaths: {
  [PATHID.G1]: 'G1',
  [PATHID.CSG1]: 'CSG1',
  [PATHID.CSG1I]: 'CSG1I',
  [PATHID.OBJDATA]: 'OBJDATA',
  [PATHID.OBJECT]: 'OBJECT',
  [PATHID.RCT1COMBINE]: 'RCT1COMBINE',
  [PATHID.DETAILS_RCT1]: 'DETAILS_RCT1',
  [PATHID.DETAILS_RCT2]: 'DETAILS_RCT2',
  [PATHID.DETAILS_OBJDATA]: 'DETAILS_OBJDATA',
  [PATHID.SPRITES_RCT1]: 'SPRITES_RCT1',
  [PATHID.SPRITES_RCT2]: 'SPRITES_RCT2',
  [PATHID.SPRITES_OBJDATA]: 'SPRITES_OBJDATA'
  }
};


/**
 * Object for holding the absolute or relative paths for directories
 * @typedef {Object} ConfigData
 * @property {{[x in BASEID]?: string }} [basePaths] - Object with base paths identified by baseid.
 * @property {{[x in PATHID]?: string }} [filePaths] - Object with file paths identified by pathid.
 */
