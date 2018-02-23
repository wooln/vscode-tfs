const vscode = require("vscode")
const tf = require("../vscode-tfs").tf
const ui = require("../ui")
const parse = require("../tf/parse")

module.exports = {
  label: "Open In Browser",
  detail: "Open current file in browser.",

  async call(file) {
    try {
      ui.showStatus("TFS: Retrieving file information...")
      const batch = [tf(["workfold", file.localPath]), tf(["info", file.localPath])].map(promise =>
        promise.then(res => parse.info(res.stdout)).catch(err => {
          throw new Error(err.stderr)
        })
      )
      const [workfold, info] = await Promise.all(batch)

      if (!info.localInformation.serverPath) {
        throw new Error(`TFS: The file is not in the repository`)
      }

      const url = vscode.Uri.parse(workfold.collection + "/_versionControl").with({
        fragment: "path=" + encodeURIComponent(info.localInformation.serverPath)
      })

      ui.showStatus("TFS: Opening in browser...")
      await vscode.commands.executeCommand("vscode.open", url)
      ui.showStatus()
    } catch (err) {
      return ui.showErrorMessage(`TFS: ${err}`)
    }
  }
}
