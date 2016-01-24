var tfs     = require('tfs'),
    vscode  = require('vscode');

var get = function(itemspec) {
  var response =tfs('get', itemspec);
  
  if (response.isError) {
    var error = response.error.split('\n');
    vscode.window.showErrorMessage('TFS: ' + error[0]);
    return;
  }
  
  vscode.window.setStatusBarMessage('TFS: Get Latest successful.');
}

module.exports = get;
