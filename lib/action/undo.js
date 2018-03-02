const tf = require("../vscode-tfs").tf
const ui = require("../ui")
const revert = require("./revert")

module.exports = async function undo(document) {
  ui.showStatus("TFS: Undoing...")

  await tf(["undo", document.uri.fsPath])
  await revert(document)
  await ui.showMessage(`TFS: Pending changes undone in ${document.uri.fsPath}`)
}
