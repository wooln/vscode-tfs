const vscode = require("vscode")

async function revert(document) {
  return vscode.commands.executeCommand(
    "workbench.action.files.revert",
    document.uri
  )
}

module.exports = revert
