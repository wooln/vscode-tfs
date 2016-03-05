var tfs     = require('tfs'),
    vscode  = require('vscode');

var checkout = function(itemspec) {
  var response = tfs('checkout', itemspec);
  
  if (response.isError) {
    vscode.window.showWarningMessage('TFS: Is this file under TFS versionning ?');
    return;
  }
  
  vscode.window.setStatusBarMessage('TFS: File automatically checked out for edit.');
}

module.exports = checkout;
