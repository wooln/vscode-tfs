/* global console */

const tfs = require('tfs')
const vscode  = require('vscode')

/**
 * Get the list of pending changes for the entire workspace.
 *
 * @module  TFS Status
 * @version 0.5.0
 *
 * @param {Array} itemspec File(s) and folder(s) to get status of.
 */
module.exports = (itemspec) => {
  vscode.window.setStatusBarMessage('TFS: Listing pending changes...')

  const callback = (responseError, response) => {
    if (responseError) {
      vscode.window.setStatusBarMessage(null)
      vscode.window.showErrorMessage('TFS: ' + responseError.error)
      return
    }

    vscode.window.setStatusBarMessage('TFS: Pending changes successfully listed.')

    if (!response.hasPendingChanges) {
      vscode.window.showInformationMessage('TFS: ' + response.message)
      return
    }

    let changes = []

    if (response.status.includedChanges.length) {
      changes.push('Included changes :')
      response.status.includedChanges.forEach((change) => {
        changes.push('› ' + change.fileName + ' [' + change.action + ']')
      })
    }

    if (response.status.detectedChanges.length) {
      changes.push('Detected changes :')
      response.status.detectedChanges.forEach((change) => {
        changes.push('› ' + change.fileName + ' [' + change.action + ']')
      })
    }

    vscode.window.showQuickPick(changes)
  }

  tfs('status', itemspec, {
    recursive: true
  }, callback)
}
