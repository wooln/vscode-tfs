var fs       = require('fs'),
    utils    = require('../utils/common');
    vscode   = require('vscode');

var vscodeTfsFilePath = vscode.workspace.rootPath + '/.vscodetfs';

/**
 * @type {Object}
 */
var statusManager = {
  /**
  * Add an excluded file to .vscodetfs
   *
   * @module  Utilities StatusManager
   * @version 0.5.3
   *
   * @param {String} filePath Workspace file path
   */
  exclude: function(filePath) {
    // We create a .vscodetfs if it doesn't exist
    var vscodeTfsFile = vscode.workspace.rootPath + '/.vscodetfs';
    if (!utils.fileExists(vscodeTfsFilePath)) {
      fs.writeFile(vscodeTfsFilePath, JSON.stringify({
        excludedFiles: []
      }, null, 2), 'utf8');
    }

    var excludedFiles = statusManager.list();
    excludedFiles.push(filePath);
    statusManager.save(excludedFiles);
  },

  /**
   * Remove an excluded file from .vscodetfs
   *
   * @module  Utilities StatusManager
   * @version 0.5.3
   *
   * @param {String} filePath Workspace file path
   */
  include: function(filePath) {
    var excludedFiles = statusManager.list();
    excludedFiles.splice(excludedFiles.indexOf(filePath), 1);
    statusManager.save(excludedFiles);
  },

  /**
   * List excluded files in .vscodetfs
   *
   * @module  Utilities StatusManager
   * @version 0.5.3
   *
   * @returns {Array} List of workspace file paths
   */
  list: function() {
    if (!utils.fileExists(vscodeTfsFilePath)) {
      return [];
    };

    var content = JSON.parse(fs.readFileSync(vscodeTfsFilePath, 'utf8'));
    return content.excludedFiles || [];
  },

  /**
   * @todo Save excluded files to .vscodetfs
   *
   * @module  Utilities StatusManager
   * @version 0.5.3
   *
   * @param {Array} List of workspace file paths
   */
  save: function(excludedFiles) {
    fs.writeFile(vscodeTfsFilePath, JSON.stringify({
      excludedFiles: excludedFiles
    }, null, 2), 'utf8');
  }
}

module.exports = statusManager;
