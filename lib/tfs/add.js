var tfs     = require('tfs'),
    vscode  = require('vscode');

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
