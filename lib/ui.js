const vscode = require("vscode")

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

function getActiveDocument() {
  const { document } = vscode.window.activeTextEditor || {}
  return document && !document.isUntitled ? document : undefined
}

function handle(action) {
  return async (uri) => {
    if (!uri) {
      const document = getActiveDocument()
      uri = document ? document.uri : undefined
    }

    try {
      await action({ uri })
    } catch (e) {
      await showErrorMessage(String(e))
    } finally {
      showStatus(undefined, Promise.resolve())
    }
  }
}

const ui = {
  showStatus,
  showMessage,
  showErrorMessage,
  revert,
  handle,
}

module.exports = ui
