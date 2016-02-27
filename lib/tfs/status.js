var tfs     = require('tfs'),
    vscode  = require('vscode');

var status = function(itemspec) {
  vscode.window.setStatusBarMessage('TFS: Adding...');
  
  var response = tfs('status', itemspec, {
    recursive: true
  });
  
  if (response.isError) {
    console.error(response.error);
    
    var error = response.error.split('\n');
    vscode.window.showErrorMessage('TFS: ' + error[0]);
    return;
  }
  
  console.log(123);
  
  // vscode.window.setStatusBarMessage('TFS: File successfully added.');
}

module.exports = status;
