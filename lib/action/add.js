const tf = require("../vscode-tfs").tf
const ui = require("../ui")

module.exports = async function add(document) {
  ui.showStatus(`TFS: Adding...`)
  await tf(["add", document.uri.fsPath])
  await ui.showMessage(`TFS: ${document.uri.fsPath} successfully added to version control.`)
}
