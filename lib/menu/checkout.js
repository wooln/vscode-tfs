const tf = require("../vscode-tfs").tf
const ui = require("../ui")

module.exports = {
  label: "Checkout",
  detail: "Checkout current file from TFS for edit.",

  async call(file) {
    if (await ui.promptForConfirmation(`Checkout ${file.localPath}?`)) {
      ui.showStatus(`TFS: Checking ${file.name}...`)
      return tf(["checkout", file.localPath])
        .then(() => ui.showStatus(`TFS: ${file.name} successfully checked out for editing.`))
        .catch(err => ui.showErrorMessage(`TFS: ${err.stderr}`))
    }
  }
}
