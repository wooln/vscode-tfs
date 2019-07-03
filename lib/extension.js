const vscode = require("vscode")
const commands = require("./commands")
const only = require("./util/only")
const checkoutOrRevert = only(require("./action/checkoutOrRevert"))

module.exports.activate = function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.menu", commands.menu))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.add", commands.add))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.checkout", commands.checkout))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.undo", commands.undo))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.delete", commands.delete))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.openInBrowser", commands.openInBrowser))

  vscode.workspace.onDidChangeTextDocument(event => {
    const { document } = event
    if (document.isDirty && !document.isUntitled) {
      checkoutOrRevert(document.uri)
    }
  })
}

module.exports.deactivate = function deactivate() {}
