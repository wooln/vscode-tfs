const vscode = require("vscode")

async function promptForConfirmation(message, okButtonText = "OK", cancelButtonText = "Cancel") {
  const pick = await vscode.window.showWarningMessage(
    message,
    // { modal: true },
    { title: okButtonText },
    { title: cancelButtonText, isCloseAffordance: true }
  )

  return pick === okButtonText
}

async function showMessage(message) {
  vscode.window.setStatusBarMessage()
  return vscode.window.showInformationMessage(message)
}

async function showErrorMessage(message) {
  vscode.window.setStatusBarMessage()
  return vscode.window.showErrorMessage(message)
}

async function showStatus(message) {
  vscode.window.setStatusBarMessage(message)
}

async function revert(document) {
  return vscode.commands.executeCommand("workbench.action.files.revert", document.uri)
}

const ui = {
  promptForConfirmation,
  showStatus,
  showMessage,
  showErrorMessage,
  revert
}

module.exports = ui
