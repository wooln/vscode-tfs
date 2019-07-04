const vscode = require("vscode")
const tf = require("../vscode-tfs").tf
const ui = require("../ui")
const parse = require("../tf/parse")
const { buildVersionControlUrl } = require("../tf/web")

const tfWorkfold = fsPath => tf(["workfold", fsPath]).then(res => parse.info(res.stdout))
const tfInfo = fsPath => tf(["info", fsPath]).then(res => parse.info(res.stdout))

module.exports = async function openInBrowser({ uri }) {
  await ui.showStatus("TFS: Retrieving file info...")
  const [workfold, info] = await Promise.all([tfWorkfold(uri.fsPath), tfInfo(uri.fsPath)])

  if (!info.localInformation.serverPath) {
    throw new Error(`The file is not under version control`)
  }

  const versionControlUrl = buildVersionControlUrl(workfold.collection, info.localInformation.serverPath)
  const urlToOpen = vscode.Uri.parse(versionControlUrl)

  await ui.showStatus("TFS: Opening in browser...")
  await vscode.commands.executeCommand("vscode.open", urlToOpen)
}
