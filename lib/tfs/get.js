var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * @todo Add a description
 * 
 * @module  TFS Get
 * @version 0.5.0
 * 
 * @param {Array} itemspec File(s) and folder(s) to get latest version of.
 */
var get = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Getting latest version...');
  
  var response = tfs('get', itemspec);
  
  if (response.isError) {
    console.error(response.error);
    
    var error = response.error.split('\n');
    vscode.window.showErrorMessage('TFS: ' + error[0]);
    return;
  }
  
  vscode.window.setStatusBarMessage('TFS: Get Latest Version successful.');
}

module.exports = get;
