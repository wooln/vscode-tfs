/* global console */

var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * @todo Add a description
 * 
 * @module  TFS Status
 * @version 0.5.0
 * 
 * @param {Array} itemspec File(s) and folder(s) to get status of.
 */
var status = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Listing pending changes...');
  
  var callback = function(responseError, response) {
    if (responseError) {
      vscode.window.showErrorMessage('TFS: ' + responseError.error);
      return;
    }
      
    vscode.window.setStatusBarMessage('TFS: Pending changes successfully listed.');
      
    if (!response.hasPendingChanges) {
      vscode.window.showInformationMessage('TFS: ' + response.message);
      return;
    }
    
    var changes = [];
    
    if (response.status.includedChanges.length) {
      changes.push('Included changes :');
      response.status.includedChanges.forEach(function(change) {
        changes.push('› ' + change.fileName + ' [' + change.action + ']');        
      });
    }
    
    if (response.status.detectedChanges.length) {
      changes.push('Detected changes :');
      response.status.detectedChanges.forEach(function(change) {
        changes.push('› ' + change.fileName + ' [' + change.action + ']');        
      });
    }
    
    vscode.window.showQuickPick(changes);
  };
  
  tfs('status', itemspec, {
    recursive: true
  }, callback);
}

module.exports = status;
