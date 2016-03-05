/* global console */

var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * @todo Add a description
 * 
 * @module  TFS Add
 * @version 0.5.0
 * 
 * @param {Array} itemspec File(s) and folder(s) to add.
 */
var add = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Adding...');
  
  var response = tfs('add', itemspec);
  
  if (response.isError) {
    console.error(response.error);
    
    var error = response.error.split('\n');
    vscode.window.showErrorMessage('TFS: ' + error[0]);
    return;
  }
  
  vscode.window.setStatusBarMessage('TFS: File successfully added.');
}

module.exports = add;
