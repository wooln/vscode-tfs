/* global console */

var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * Get the list of pending changes for the entire workspace.
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
      vscode.window.setStatusBarMessage(null);
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
      changes.push({
        label:  '◊ INCLUDED CHANGES',
        detail: '‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾'
      });
      
      response.status.includedChanges.forEach(function(change) {
        changes.push({
          label:       change.fileName,
          detail:      change.filePath,
          description: change.action.toUpperCase(),
          action:      'exclude'
        });
      });
    }
    
    if (response.status.detectedChanges.length) {
      changes.push('');
      changes.push({
        label:  '◊ DETECTED CHANGES',
        detail: '‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾'
      });
      
      response.status.detectedChanges.forEach(function(change) {
        changes.push({
          label:       change.fileName,
          detail:      change.filePath,
          description: change.action.toUpperCase(),
          action:      change.action
        });
      });
    }
    
    var promise = vscode.window.showQuickPick(changes);
    
    promise.then(function(change) {
      if (!change.action) {
        return;
      }
      
      console.log(change.action);
    });
  };
  
  tfs('status', itemspec, {
    recursive: true
  }, callback);
};

module.exports = status;
