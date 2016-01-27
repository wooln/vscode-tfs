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
  
  require('./tfs/' + command)([itemspec]);
}

function tfsList() {
  var promise = vscode.window.showQuickPick([
    'Check In',
    'Get Latest Version',
    'Undo'
  ]);
  
  promise.then(function(commandName) {
    switch (commandName) {
      case 'Check In':
        tfsExec('checkin');
        break;
        
      case 'Get Latest Version':
        tfsExec('get');
        break;
        
      case 'Undo':
        tfsExec('undo');
        break;
                
      default:
        console.error('TFS: Something went wrong');
        break;
    }
  });
}

exports.activate = function(context) {
  vscode.workspace.onDidSaveTextDocument(function() {
    console.log(123);
  });
  
  var disposables = [
    vscode.commands.registerCommand('vscode-tfs.checkin',  function() { tfsExec('checkin'); }),
    vscode.commands.registerCommand('vscode-tfs.get',      function() { tfsExec('get'); }),
    vscode.commands.registerCommand('vscode-tfs.list',     tfsList),
    vscode.commands.registerCommand('vscode-tfs.undo',     function() { tfsExec('undo'); })
  ];
  
  context.subscriptions.concat(disposables);
}

exports.deactivate = function() {}
