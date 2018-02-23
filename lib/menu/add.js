const tf = require("../vscode-tfs").tf
const ui = require("../ui")

module.exports = {
  label: "Add",
  detail: "Adds current file to TFS.",

  async call(file) {
    ui.showStatus("TFS: Adding...")
    return tf(["add", file.localPath])
      .then(() => ui.showMessage(`TFS: ${file.localPath} successfully added.`))
      .catch(err => ui.showErrorMessage(`TFS: ${err.stderr}`))
  }
}
