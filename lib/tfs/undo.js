var tfs     = require('tfs'),
    vscode  = require('vscode');

var checkin = function(itemspec) {
  var response = tfs('undo', itemspec);
  
  if (response.isError) {
    var error = response.error.split('\n');
    vscode.window.showErrorMessage('TFS: ' + error[0]);
    return;
  }
  
  vscode.window.setStatusBarMessage('TFS: Undo successful.');
}

module.exports = checkin;
