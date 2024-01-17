import fs from 'fs';
import p from 'path';
import { fileURLToPath } from 'url';
import { 
  BASEID,
  BASEID_LIST,
  PATHID_LIST,
  idToString
} from './configTypes.js';

/** Location of config.json file */
export const configPath = p.join(p.dirname(fileURLToPath(import.meta.url)), 'config.json');

/**
 * Extracts the data from the config.json file, and returns an object which can be used to initialize a new PlatformEnvironment
 * @returns { {basePaths: {[x in BASEID]?: string }, filePaths: {[x in PATHID]?: string}} }
 */
export function configRead() {

    /** @type {{basePaths: {[x in BASEID]?: string }, filePaths: {[x in PATHID]?: string}}} */
    const configData = { basePaths: {}, filePaths: {} };

    const configJson = fs.readFileSync(configPath, {encoding: 'utf-8'});
    const { basePaths={}, filePaths={} } = JSON.parse(configJson);
    // Get just the information needed
    // If path.normalize throws an error, just show it on the console and leave the value as undefined
    BASEID_LIST.forEach((baseid) => {
      if (basePaths[baseid]) {
        try {
          configData.basePaths[baseid] = p.normalize(basePaths[baseid]);
        } catch (err) {
          console.error('%s for %s',err.message, idToString.basePaths[baseid], basePaths[baseid])
        }
      }
    });
    
    PATHID_LIST.forEach((pathid) => {
      if (filePaths[pathid]) {
        try {
          configData.filePaths[pathid] = p.normalize(filePaths[pathid]);
        } catch (err) {
          console.error('%s for %s',err.message, idToString.filePaths[pathid], filePaths[pathid])
        }
      }
    });
    
    return configData;
}

