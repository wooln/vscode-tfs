/* global console */
/* global decodeURIComponent */

var tfsExec = require('./utils/tfsExec'),
    utils   = require('./utils/common'),
    vscode  = require('vscode');

// Let's check if vscode-tfs is outdated
utils.checkLastRelease();

var globalCommands = [
  {
    label: 'Get',
    detail: 'Get the latest version of files for the entire workspace.'
  },
  {
    label: 'Status',
    detail: 'Show pending changes for the entire workspace.'
  }
];

var fullCommands = globalCommands.concat([
  {
    label: 'Add',
    detail: 'Adds current file to TFS.'
  },
  {
    label: 'CheckIn',
    detail: 'Adds current file to TFS.'
  },
  {
    label: 'Undo',
    detail: 'Undo current file pending changes.'
  }
]);

// We sort the commands array by their label property
fullCommands.sort(function (commandA, commandB) {
  return (commandA.label < commandB.label) ? -1 : 1;
});

/**
 * Show a selectable list of available commands.
 * 
 * @version 0.5.0
 */
function tfsList() {
  var isGlobal = !utils.getCurrentFilePath(),
      commands = isGlobal ? globalCommands : fullCommands,
      promise = vscode.window.showQuickPick(commands);
  
  promise.then(function(command) {
    if (!command) {
      return;
    }
    
    tfsExec(command.label.toLowerCase(), isGlobal);
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
    vscode.commands.registerCommand('vscode-tfs.list', tfsList)
  ];
  
  context.subscriptions.concat(disposables);
}

exports.deactivate = function() {};
