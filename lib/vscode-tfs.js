var tfsExec = require('./utils/tfsExec'),
    utils   = require('./utils/common'),
    vscode  = require('vscode');
var patchModule = require('./utils/patchModule');

var extension = 'vscode-tfs';
var globalCommands = [
  {
    label: 'Get',
    detail: 'Get the latest version of files for the entire workspace.',
    isGlobal: true
  },
  {
    label: 'Status',
    detail: 'Show pending changes for the entire workspace.',
    isGlobal: true
  }
];

var fullCommands = globalCommands.concat([
  {
    label: 'Add',
    detail: 'Adds current file to TFS.',
    isGlobal: false
  },
  {
    label: 'CheckIn',
    detail: 'Adds current file to TFS.',
    isGlobal: false
  },
  {
    label: 'Undo',
    detail: 'Undo current file pending changes.',
    isGlobal: false
  }
]);

// We sort the commands array by their label property
fullCommands.sort(function (commandA, commandB) {
  return (commandA.label < commandB.label) ? -1 : 1;
});

function getConfiguration() {
  return vscode.workspace.getConfiguration(extension, vscode.window.activeTextEditor.document.uri);
}

// Inject VS Code settings into the tfs library.
patchModule('tfs/lib/setup', function(origSetup) {
  var setup = utils.once(origSetup);
  var settings = new Proxy({}, {
    get: function (target, name) {
      var configuration = getConfiguration();
      return configuration.has(name) ? configuration.get(name) : setup()[name];
    }
  });

  return () => settings;
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
    
    tfsExec(command.label.toLowerCase(), command.isGlobal);
  });
}

/**
 * Extension activation
 * 
 * @version 0.5.3
 */
exports.activate = function(context) {
  // We automatically checkout (for edit) files when they're modified
  vscode.workspace.onWillSaveTextDocument(function(e) {
    if (utils.getCurrentFilePath()) {
      tfsExec('checkout');
    }
  });
  
  // We link disposable commands
  var disposables = [
    vscode.commands.registerCommand('vscode-tfs.get',    function() { tfsExec('get', true); }),
    vscode.commands.registerCommand('vscode-tfs.list',   tfsList)/*,
    vscode.commands.registerCommand('vscode-tfs.status', function() { tfsExec('status', true); })*/
  ];
  
  context.subscriptions.concat(disposables);
}

exports.deactivate = function() {};
