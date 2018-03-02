const vscode = require("vscode")
const tf = require("../vscode-tfs").tf
const ui = require("../ui")
const parse = require("../tf/parse")

const tfWorkfold = fsPath =>
  tf(["workfold", fsPath])
    .then(res => parse.info(res.stdout))
    .catch(err => new Error(err.stderr))

const tfInfo = fsPath =>
  tf(["info", fsPath])
    .then(res => parse.info(res.stdout))
    .catch(err => new Error(err.stderr))

module.exports = async function openInBrowser(document) {
  try {
    ui.showStatus("TFS: Retrieving file info...")

    const [workfold, info] = await Promise.all([
      tfWorkfold(document.uri.fsPath),
      tfInfo(document.uri.fsPath)
    ])

    if (!info.localInformation.serverPath) {
      throw new Error(`TFS: The file is not under version control`)
    }

    const url = vscode.Uri.parse(workfold.collection + "/_versionControl").with(
      {
        fragment: "path=" + encodeURIComponent(info.localInformation.serverPath)
      }
    )

    ui.showStatus("TFS: Opening in browser...")
    await vscode.commands.executeCommand("vscode.open", url)
    ui.showStatus()
  } catch (err) {
    return ui.showErrorMessage(`TFS: ${err}`)
  }
}
