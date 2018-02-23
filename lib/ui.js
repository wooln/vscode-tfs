const vscode = require("vscode")

async function promptForConfirmation(message, okButtonText = "OK") {
  const pick = await vscode.window.showWarningMessage(message, okButtonText)

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

const ui = {
  promptForConfirmation,
  showStatus,
  showMessage,
  showErrorMessage
}

module.exports = ui
