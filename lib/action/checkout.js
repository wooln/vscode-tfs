const tf = require("../vscode-tfs").tf
const ui = require("../ui")

module.exports = async function checkout(document) {
  ui.showStatus(`TFS: Checking...`)

  try {
    await tf(["checkout", document.uri.fsPath])
    await ui.showMessage(
      `TFS: ${document.uri.fsPath} successfully checked out for editing.`
    )
  } catch (err) {
    await ui.showErrorMessage(`TFS: ${err.stderr}`)
  }
}
