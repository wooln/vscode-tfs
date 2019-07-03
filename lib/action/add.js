const tf = require("../vscode-tfs").tf
const ui = require("../ui")

module.exports = async function add({ uri }) {
  ui.showStatus(`TFS: Adding...`)
  await tf(["add", uri.fsPath, "/recursive"])
  await ui.showMessage(`TFS: ${uri.fsPath} successfully added to version control.`)
  ui.showStatus()
}
