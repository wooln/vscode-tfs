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
    'Add',
    'Check In',
    'Check Out',
    'Get Latest Version',
    'Status (Pending Changes)',
    'Undo'
  ]);
  
  promise.then(function(commandName) {
    switch (commandName) {
      case 'Add':
        tfsExec('add');
        break;
      
      case 'Check In':
        tfsExec('checkin');
        break;
       
      case 'Check Out':
        tfsExec('checkout');
        break;
       
      case 'Get Latest Version':
        tfsExec('get');
        break;
       
      case 'Status (Pending Changes)':
        tfsExec('status');
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
    tfsExec('checkout');
  });
  
  var disposables = [
    vscode.commands.registerCommand('vscode-tfs.add',     function() { tfsExec('add'); }),
    vscode.commands.registerCommand('vscode-tfs.checkin', function() { tfsExec('checkin'); }),
    vscode.commands.registerCommand('vscode-tfs.get',     function() { tfsExec('get'); }),
    vscode.commands.registerCommand('vscode-tfs.list',    tfsList),
    vscode.commands.registerCommand('vscode-tfs.status',  function() { tfsExec('status'); }),
    vscode.commands.registerCommand('vscode-tfs.undo',    function() { tfsExec('undo'); })
  ];
  
  context.subscriptions.concat(disposables);
}

exports.deactivate = function() {}
