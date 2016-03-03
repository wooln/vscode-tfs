/* global console */

var tfs     = require('tfs'),
    vscode  = require('vscode');

var status = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Listing pending changes...');
  
  var callback = function(error, response) {
    if (error) {
      console.error(error);
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
