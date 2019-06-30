const vscode = require("vscode")
const menu = require("./menu")
const only = require("./util/only")
const checkoutOrRevert = only(require("./action/checkoutOrRevert"))

module.exports.activate = function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.list", menu))

  vscode.workspace.onDidChangeTextDocument(event => checkoutOrRevert(event.document))
}

module.exports.deactivate = function deactivate() {}
