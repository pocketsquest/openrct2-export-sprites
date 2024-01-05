// mimicking OpenRCT2's core/Path namespace to avoid confusion

import p from 'path';
import fs from 'fs';

/**
 * Namespace providing utility functions for working with file paths.
 * @namespace Path
 */
const Path = {
  /**
   * Combines multiple path segments into a single path.
   * @param {...string} paths - Path segments to combine.
   * @returns {string} The combined path.
   */
  Combine: function(...paths) {
    paths = paths.map(path => p.normalize(path));
    return p.join(...paths)
  },

  /**
   * Gets the directory portion of a path.
   * @param {string} path - The input path.
   * @returns {string} The directory portion of the path.
   */
  GetDirectory: function(path) {
    return p.dirname(p.normalize(path));
  },

  /**
   * Creates a directory at the specified path.
   * @param {string} path - The path of the directory to create.
   * @returns {boolean} True if the directory was created successfully, false otherwise.
   */
  CreateDirectory: function(path) {
    try {
      fs.mkdirSync(p.normalize(path), {recursive: true});
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Checks if a directory exists at the specified path.
   * @param {string} path - The path to check for the existence of a directory.
   * @returns {boolean} True if the directory exists, false otherwise.
   */
  DirectoryExists: function(path) {
    return fs.existsSync(path) ? fs.statSync(path).isDirectory() : false;
  },

  /**
   * Deletes a directory at the specified path.
   * @param {string} path - The path of the directory to delete.
   * @returns {boolean} True if the directory was deleted successfully, false otherwise.
   */
  DeleteDirectory: function(path) {
    try {
      fs.rmdirSync(path);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Gets the file name from the specified path.
   * @param {string} path - The input path.
   * @returns {string} The file name extracted from the path.
   */
  GetFileName: function(path) {
    path = p.normalize(path);
    return p.basename(path);
  },

  /**
   * Gets the file name without extension from the specified path.
   * @param {string} path - The input path.
   * @returns {string} The file name without extension.
   */
  GetFileNameWithoutExtension: function(path) {
    path = p.normalize(path);
    return p.basename(path, p.extname(path));
  },
  /**
   * Gets the extension from the specified path.
   * @param {string} path - The input path.
   * @returns {string} The file extension, including the dot.
   */
  GetExtension: function(path) {
    path = p.normalize(path);
    return p.extname(path);
  },

  /**
   * Appends a new extension to the specified path.
   * @param {string} path - The input path.
   * @param {string} newExtension - The new extension to append. (The dot is optional: '.dat' and 'dat' both work the same as inputs)
   * @returns {string} The path with the new extension.
   */
  WithExtension: function(path, newExtension) {
    path = p.normalize(path);
    const {dir, name} = p.parse(p.normalize(path));
    return p.format({dir, name, ext: newExtension});
  },

  /**
   * Checks if the specified path is absolute.
   * @param {string} path - The input path.
   * @returns {boolean} True if the path is absolute, false otherwise.
   */
  IsAbsolute: function(path) {
    return p.isAbsolute(p.normalize(path));
  },

  /**
   * Gets the absolute path for the specified relative path.
   * @param {string} relative - The relative path.
   * @returns {string} The absolute path.
   */
  GetAbsolute: function(relative) {
    return p.resolve(p.normalize(relative));
  },

  /**
   * Gets the relative path from the specified path to the base path.
   * @param {string} path - The path to make relative.
   * @param {string} base - The base path.
   * @returns {string} The relative path.
   */
  GetRelative: function(path, base) {
    return p.relative(p.normalize(path), p.normalize(base))
  },

  /**
   * Checks if two paths are equal.
   * @param {string} a - The first path.
   * @param {string} b - The second path.
   * @returns {boolean} True if the paths are equal, false otherwise.
   */
  Equals: function(a, b) {
    const {dir: dirA, base: baseA} = p.parse(p.normalize(a.toUpperCase()));
    const {dir: dirB, base: baseB} = p.parse(p.normalize(a.toUpperCase()));
    return (dirA === dirB) && (baseA === baseB)
  },

  /**
   * Checks if the given path is a file, returns its normalized path string if true, returns empty string if false. Note: So far, I am only configuring for Windows, and leaving other platforms for later. So this function is a little redundant, but I'm including it so that it's easier to match up with OpenRCT2's code.
   * 
   * Description from OpenRCT2: Checks if the given path is a file. If not, resolves the casing by
   * selecting the first file with a different casing based on character sort.  Returns the resolved path with correct casing.
   * Note: This will not resolve the case for Windows.
   * @param {string} path - The input path.
   * @returns {string} The normalized path, or empty string if it doesn't exist
   */
  ResolveCasing: function(path) {
    path = p.normalize(path);
    return fs.existsSync(path) ? path : "";
  },
};
