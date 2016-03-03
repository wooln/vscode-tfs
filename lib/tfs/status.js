/* global console */

var tfs     = require('tfs'),
    vscode  = require('vscode');

var status = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Listing pending changes...');
  
  var callback = function(error, response) {
    if (error) {
      console.error(error);
      
      // var error = response.error.split('\n');
      // vscode.window.showErrorMessage('TFS: ' + error[0]);
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
    
    vscode.window.setStatusBarMessage('TFS: Pending changes successfully listed.');
    
    if (changes.length) {
      vscode.window.showQuickPick(changes);
    } else {
      vscode.window.showInformationMessage('TFS: No pending changes.');
    }
  };
  
  tfs('status', itemspec, {
    recursive: true
  }, callback);

}

module.exports = status;
