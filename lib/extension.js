const vscode = require("vscode")
const handle = require("./ui").handle

const commands = [
  { command: "vscode-tfs.add", action: require("./action/add") },
  { command: "vscode-tfs.checkout", action: require("./action/checkout") },
  { command: "vscode-tfs.delete", action: require("./action/delete") },
  { command: "vscode-tfs.undo", action: require("./action/undo") },
  { command: "vscode-tfs.openInBrowser", action: require("./action/openInBrowser") },
  { command: "vscode-tfs.menu", action: require("./action/menu") },
]

module.exports.activate = function activate(context) {
  for (const { command, action } of commands) {
    context.subscriptions.push(vscode.commands.registerCommand(command, handle(action)))
  }
}

module.exports.deactivate = function deactivate() {}
