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
  return vscode.window.showInformationMessage(message)
}

async function showErrorMessage(message) {
  return vscode.window.showErrorMessage(message)
}

function showStatus(message, hideWhenDone) {
  vscode.window.setStatusBarMessage(message, hideWhenDone)
  return hideWhenDone
}

async function revert(uri) {
  return vscode.commands.executeCommand("workbench.action.files.revert", uri)
}

const getActiveDocument = () => {
  const { document } = vscode.window.activeTextEditor || {}
  return document && !document.isUntitled ? document : undefined
}

const ui = {
  promptForConfirmation,
  showStatus,
  showMessage,
  showErrorMessage,
  revert,
  getActiveDocument
}

module.exports = ui
