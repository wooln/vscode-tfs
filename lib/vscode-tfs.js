var vscode = require('vscode');

function tfsExec(command) {
  if (!vscode.window.visibleTextEditors.length) {
    vscode.window.showErrorMessage('TFS: There is no file opened.');
    return;
  }
  
  var itemspec = vscode.window.visibleTextEditors[0].document.uri.toString();
   

  if (itemspec.substr(0, 8) !== 'file:///') {
    vscode.window.showErrorMessage('TFS: You need to save your file somewhere before.');
    return;
  }
  
  itemspec = decodeURIComponent(itemspec).substr(8);
  
  require('./tfs/' + command)(itemspec);
}

exports.activate = function(context) {
  var disposables = [
    vscode.commands.registerCommand('vscode-tfs.checkin',  function() { tfsExec('checkin'); }),
    vscode.commands.registerCommand('vscode-tfs.checkout', function() { tfsExec('checkout'); }),
    vscode.commands.registerCommand('vscode-tfs.get',      function() { tfsExec('get'); }),
    vscode.commands.registerCommand('vscode-tfs.history',  function() { tfsExec('history'); }),
    vscode.commands.registerCommand('vscode-tfs.undo',     function() { tfsExec('undo'); })
  ];
  
  context.subscriptions.concat(disposables);
}

exports.deactivate = function() {}
