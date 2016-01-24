var vscode = require('vscode');

function tfsExec(command) {
  if (!vscode.window.visibleTextEditors.length) {
    vscode.window.showErrorMessage('TFS: There is no open file to ' + command + '.');
    return;
  }
  
  var itemspec = vscode.window.visibleTextEditors[0].document.uri.toString();
   

  if (itemspec.substr(0, 8) !== 'file:///') {
    vscode.window.showErrorMessage('TFS: You need to save the file before to ' + command + ' it.');
    return;
  }
  
  itemspec = decodeURIComponent(itemspec).substr(8);
  
  require('./tfs/' + command)(itemspec);
}

function activate(context) {
  var getDisposable = vscode.commands.registerCommand('extension.get', function() { tfsExec('get'); });
  context.subscriptions.push(getDisposable);
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
