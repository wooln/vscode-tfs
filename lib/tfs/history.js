var tfs     = require('tfs'),
    vscode  = require('vscode');

var checkin = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Opening history.');
  
  var response = tfs('history', itemspec);
  
  if (response.isError) {
    var error = response.error.split('\n');
    vscode.window.showErrorMessage('TFS: ' + error[0]);
    return;
  }
}

module.exports = checkin;
