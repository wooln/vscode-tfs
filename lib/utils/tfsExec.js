/* global decodeURIComponent */

var vscode = require('vscode');

/**
 * Execute a TFS command.
 * 
 * @version 0.5.0
 * 
 * @param {String}  command  TFS command to execute
 * @param {Boolean} isGlobal Is this command for the entire workspace ?
 */
var tfsExec = function(command, isGlobal) {
  isGlobal = !!isGlobal;
  
  if (!isGlobal && !vscode.window.visibleTextEditors.length) {
    vscode.window.showErrorMessage('TFS: There is no file opened.');
    return;
  }
  
  var itemspec;
  
  if (isGlobal) {
    itemspec = vscode.workspace.rootPath;
  } else {
    itemspec = vscode.window.visibleTextEditors[0].document.uri.toString();

    if (itemspec.substr(0, 8) !== 'file:///') {
      vscode.window.showErrorMessage('TFS: You need to save your file somewhere before.');
      return;
    }
    
    itemspec = decodeURIComponent(itemspec).substr(8);
  }
  
  require('../tfs/' + command)([itemspec]);
}

module.exports = tfsExec;
