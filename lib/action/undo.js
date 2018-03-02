const tf = require("../vscode-tfs").tf
const ui = require("../ui")
const revert = require("./revert")

module.exports = async function undo(document) {
  ui.showStatus("TFS: Undoing...")

  try {
    await tf(["undo", document.uri.fsPath])
    await revert(document)
    await ui.showMessage(
      `TFS: Pending changes undone in ${document.uri.fsPath}`
    )
  } catch (err) {
    await ui.showErrorMessage(`TFS: ${err.stderr}`)
  }
}
