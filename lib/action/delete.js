const tf = require("../vscode-tfs").tf
const ui = require("../ui")

module.exports = async function del({ uri }) {
  ui.showStatus(`TFS: Deleting...`)
  await tf(["delete", uri.fsPath, "/recursive"])
  await ui.showMessage(`TFS: ${uri.fsPath} successfully deleted from version control.`)
  ui.showStatus()
}
