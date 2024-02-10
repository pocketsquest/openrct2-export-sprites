import fs from 'fs';
import p from 'path';


/** Characters disallowed in file names */
const prohibitedCharacters = new RegExp(/[<>*\\:|?"/]/);

/**
 * Returns a new object containing only a subset of an object's properties.
 * @param {Object<*,*>} obj 
 * @param {(string | number | symbol)[]} props 
 * @returns 
 */
function pick(obj,props) {
  const subObj = {};
  props.forEach((prop) => {
    if (obj[prop]) {subObj[prop] = obj[prop];}
  });
  return subObj
}


function resolveCasing(path) {
  // separate path into an array with each folder, ending with the basename
  let {dir, base} = p.parse(p.normalize(path))
  const pathsArray = []
  while (base) {
    pathsArray = [...pathsArray, base];
    const parsedDir = p.parse(dir);
    dir = parsedDir.dir;
    base = parsedDir.base;
  }

  

}