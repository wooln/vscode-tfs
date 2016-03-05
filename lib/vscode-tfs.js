/* global console */
/* global decodeURIComponent */

var vscode = require('vscode');

/**
 * Execute a TFS command.
 * 
 * @version 0.5.0
 * 
 * @param {String}  command  TFS command to execute
 * @param {Boolean} isGlobal Is this command for the entire workspace ?
 */
function tfsExec(command, isGlobal) {
  isGlobal = !!isGlobal;
  
  if (!isGlobal && !vscode.window.visibleTextEditors.length) {
    vscode.window.showErrorMessage('TFS: There is no file opened.');
    return;
  }
  
  var itemspec;
  
  if (isGlobal) {
    itemspec = vscode.workspace.rootPath;
  } else {
    itemspec = vscode.window.visibleTextEditors[0].document.uri.toString();

    if (itemspec.substr(0, 8) !== 'file:///') {
      vscode.window.showErrorMessage('TFS: You need to save your file somewhere before.');
      return;
    }
    
    itemspec = decodeURIComponent(itemspec).substr(8);
  }
  
  require('./tfs/' + command)([itemspec]);
}

/**
 * Show a selectable list of available commands.
 * 
 * @version 0.5.0
 */
function tfsList() {
  var promise = vscode.window.showQuickPick([
    'Add',
    'Check In',
    'Check Out',
    'Get Latest Version (entire workspace)',
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
       
      case 'Get Latest Version (entire workspace)':
        tfsExec('get', true);
        break;
       
      case 'Status (Pending Changes)':
        tfsExec('status', true);
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

/**
 * @todo Add a description
 * 
 * @version 0.5.0
 */
exports.activate = function(context) {
  vscode.workspace.onDidChangeTextDocument(function() {
    tfsExec('checkout');
  });
  
  var disposables = [
    vscode.commands.registerCommand('vscode-tfs.add',     function() { tfsExec('add'); }),
    vscode.commands.registerCommand('vscode-tfs.checkin', function() { tfsExec('checkin'); }),
    vscode.commands.registerCommand('vscode-tfs.get',     function() { tfsExec('get', true); }),
    vscode.commands.registerCommand('vscode-tfs.list',    tfsList),
    vscode.commands.registerCommand('vscode-tfs.status',  function() { tfsExec('status', true); }),
    vscode.commands.registerCommand('vscode-tfs.undo',    function() { tfsExec('undo'); })
  ];
  
  context.subscriptions.concat(disposables);
}

exports.deactivate = function() {};
