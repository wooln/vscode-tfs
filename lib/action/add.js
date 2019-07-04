const tf = require("../vscode-tfs").tf
const ui = require("../ui")

module.exports = async function add({ uri }) {
  await ui.showStatus(`TFS: Adding...`)
  await tf(["add", uri.fsPath, "/recursive"])
  await ui.showMessage(`TFS: ${uri.fsPath} successfully added to version control.`)
}
