var tfs     = require('tfs'),
    vscode  = require('vscode');

var get = function(itemspec) {

  try {
    tfs('get', itemspec);
  }
  catch (exception) {
    var error = exception.toString().split('\n');
    vscode.window.showErrorMessage('TFS: ' + error[1]);
    return;
  }
  
  vscode.window.setStatusBarMessage('TFS: Get Latest successful.');
}

module.exports = get;
