const tf = require("../vscode-tfs").tf
const ui = require("../ui")

module.exports = {
  label: "Undo",
  detail: "Undo current file pending changes.",

  async call(file) {
    ui.showStatus("TFS: Undoing...")
    return tf(["undo", file.localPath])
      .then(() => ui.showMessage(`TFS: Pending changes undone in ${file.localPath}.`))
      .catch(err => ui.showErrorMessage(`TFS: ${err.stderr}`))
  }
}
