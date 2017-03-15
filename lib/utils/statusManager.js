const fs = require('fs')
const utils = require('../utils/common')
const vscode = require('vscode')

var vscodeTfsFilePath = `${vscode.workspace.rootPath}/.vscodetfs`

/**
 * @type {Object}
 */
module.exports = {
  /**
  * Add an excluded file to .vscodetfs
   *
   * @module  Utilities StatusManager
   * @version 0.5.3
   *
   * @param {String} filePath Workspace file path
   */
  exclude: (filePath) => {
    // We create a .vscodetfs if it doesn't exist
    var vscodeTfsFile = `${vscode.workspace.rootPath}/.vscodetfs`
    if (!utils.fileExists(vscodeTfsFilePath)) {
      fs.writeFile(vscodeTfsFilePath, JSON.stringify({
        excludedFiles: []
      }, null, 2), 'utf8')
    }

    var excludedFiles = statusManager.list()
    excludedFiles.push(filePath)
    statusManager.save(excludedFiles)
  },

  /**
   * Remove an excluded file from .vscodetfs
   *
   * @module  Utilities StatusManager
   * @version 0.5.3
   *
   * @param {String} filePath Workspace file path
   */
  include: (filePath) => {
    var excludedFiles = statusManager.list()
    excludedFiles.splice(excludedFiles.indexOf(filePath), 1)
    statusManager.save(excludedFiles)
  },

  /**
   * List excluded files in .vscodetfs
   *
   * @module  Utilities StatusManager
   * @version 0.5.3
   *
   * @returns {Array} List of workspace file paths
   */
  list: () => {
    if (!utils.fileExists(vscodeTfsFilePath)) {
      return []
    }

    const content = JSON.parse(fs.readFileSync(vscodeTfsFilePath, 'utf8'))
    return content.excludedFiles || []
  },

  /**
   * Save excluded files to .vscodetfs
   *
   * @module  Utilities StatusManager
   * @version 0.5.3
   *
   * @param {Array} List of workspace file paths
   */
  save: (excludedFiles) => {
    fs.writeFile(vscodeTfsFilePath, JSON.stringify({
      excludedFiles: excludedFiles
    }, null, 2), 'utf8')
  }
}
