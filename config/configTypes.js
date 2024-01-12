/**
 * Entries from the enum {@link BASEID}
 * @typedef {string} Base_id
*/

/**
 * Enum for the base directories
 * @readonly
 * @enum {Base_id}
 */
export const BASEID = {
  /** RCT1 install directory 
   * @type {Base_id}
  */
  RCT1: 'RCT1',
  /** RCT2 install directory 
   * @type {Base_id}
  */
  RCT2: 'RCT2',
  /** OpenRCT2 install directory 
   * @type {Base_id}
  */
  OPENRCT2: 'OPENRCT2',
  /** OpenRCT2 User directory 
   * @type {Base_id}
  */
  OPENRCT2DOCS: 'OPENRCT2DOCS',
  /** Directory for exported sprite files 
   * @type {Base_id}
  */
  EXPORTS: 'EXPORTS',
};

/** @const {[string, string][]} */
export const BASEID_ENTRIES = Object.entries(BASEID);

/** 5 base paths 
 * @const {number} */
export const BASEID_COUNT = BASEID_ENTRIES.length;

/**
 * Entries from the enum {@link PATHID}
 * @typedef {string} Path_id
*/

/**
 * Enum for file names and subdirectory names, as relative paths to their respective base directories
 * @readonly
 * @enum
 */
export const PATHID = {
  /** RCT2 data/g1.dat sprite file 
   * @type {Path_id}
  */
  G1: 'G1',
  /** RCT1 sprite file 
   * @type {Path_id}
  */
  CSG1: 'CSG1',
  /** RCT1 sprite index file 
   * @type {Path_id}
  */
  CSG1I: 'CSG1I',
  /** RCT2 object dat files directory 
   * @type {Path_id}
  */
  OBJDATA: 'OBJDATA',
  /** OpenRCT2 object directory for custom objects 
   * @type {Path_id}
  */
  OBJECT: 'OBJECT',
  /** New g1 file made from csg1 and csg1i 
   * @type {Path_id}
  */
  RCT1COMBINE: 'RCT1COMBINE',
  /** Data for each rct1 image 
   * @type {Path_id}
  */
  DETAILS_RCT1: 'DETAILS_RCT1',
  /** Data for each rct2 image 
   * @type {Path_id}
  */
  DETAILS_RCT2: 'DETAILS_RCT2',
  /** Data for the rct2 objects 
   * @type {Path_id}
  */
  DETAILS_OBJDATA: 'DETAILS_OBJDATA',
  /** Directory for RCT1 sprites 
   * @type {Path_id}
  */
  SPRITES_RCT1: 'SPRITES_RCT1',
  /** Directory for RCT2 sprites 
   * @type {Path_id}
  */
  SPRITES_RCT2: 'SPRITES_RCT2',
  /** Directory for RCT2 object sprites 
   * @type {Path_id}
  */
  SPRITES_OBJDATA: 'SPRITES_OBJDATA'
};

/** @const {[string,string][]} */
export const PATHID_ENTRIES = Object.entries(PATHID);

/** 12 file paths 
 * @const {number} */
export const PATHID_COUNT = PATHID_ENTRIES.length;


/**
 * Human-interpretable names of base directories for printing to the console.
 * @type { {[x in Base_id]: string} }
 */
export const baseToString = {
  [BASEID.RCT1]: 'RCT1',
  [BASEID.RCT2]: 'RCT2',
  [BASEID.OPENRCT2]: 'OpenRCT2',
  [BASEID.OPENRCT2DOCS]: 'OpenRCT2 User Directory',
  [BASEID.EXPORTS]: 'Exports',
};