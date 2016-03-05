var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * @module  TFS Undo
 * @version 0.5.0
 */
var undo = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Undoing...');

  var response = tfs('undo', itemspec);
  
  if (response.isError) {
    console.error(response.error);
    // var error = response.error.split('\n');
    // vscode.window.showErrorMessage('TFS: ' + error[0]);
    return;
  }
  
  vscode.window.setStatusBarMessage('TFS: Undo successful.');
}

module.exports = undo;
