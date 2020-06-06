const tf = require("../tfs/tfExe").tf
const ui = require("../ui")

module.exports = async function add({ uri }) {
  await ui.showStatus(`TFS: Adding...`, tf(["add", uri.fsPath, "/recursive"]))
  await ui.showMessage(`TFS: ${uri.fsPath} successfully added to version control.`)
}
