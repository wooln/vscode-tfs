var tfs     = require('tfs'),
    vscode  = require('vscode');

/**
 * @module  TFS Checkin
 * @version 0.5.0
 * 
 * @param {Array} itemspec File(s) and folder(s) to checkin.
 */
var checkin = function(itemspec) {
  var promise = vscode.window.showInputBox({
    value: 'Comment...'
  })
 
  promise.then(function(checkinComment) {
    vscode.window.setStatusBarMessage('TFS: Checking In...');
    
    if (!checkinComment) {
      vscode.window.showWarningMessage('TFS: Your must enter a Check In comment.');
      return;
    }
    
    try {
      var response = tfs('checkin', itemspec, { comment: checkinComment });
    }
    catch (exception) {
      // console.error(exception);
    }
    
    if (response.isError) {
      // console.error(response.error);
      vscode.window.setStatusBarMessage();
            
      vscode.window.showWarningMessage('TFS: There are no pending changes matching the specified items.');
      return;
    }
    
    vscode.window.setStatusBarMessage('TFS: Check In successful.');
  });
};

module.exports = checkin;
