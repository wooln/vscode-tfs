var tfs     = require('tfs'),
    vscode  = require('vscode');

var checkin = function(itemspec) {
  var response = tfs('checkout', itemspec);
  
  if (response.isError) {
    var error = response.error.split('\n');
    vscode.window.showErrorMessage('TFS: ' + error[0]);
    return;
  }
  
  vscode.window.setStatusBarMessage('TFS: File automatically checked out for edit.');
}

module.exports = checkin;
