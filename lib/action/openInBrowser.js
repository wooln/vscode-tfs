const vscode = require("vscode")
const tf = require("../vscode-tfs").tf
const ui = require("../ui")
const parse = require("../tf/parse")
const { buildVersionControlUrl } = require("../tf/web")

const tfWorkfold = (fsPath) => tf(["workfold", fsPath]).then((res) => parse.info(res.stdout))
const tfInfo = (fsPath) => tf(["info", fsPath]).then((res) => parse.info(res.stdout))

// FIXME: workaround for https://github.com/microsoft/vscode/issues/25852
const hasIssue = !String(vscode.Uri.parse("http://host/#test=value")).includes("test=value")
function applyWorkaround(uri, expectedUri) {
  if (hasIssue) {
    uri._formatted = expectedUri
  }
}

module.exports = async function openInBrowser({ uri }) {
  const [workfold, info] = await ui.showStatus(
    "TFS: Retrieving file info...",
    Promise.all([tfWorkfold(uri.fsPath), tfInfo(uri.fsPath)])
  )

  if (!info.localInformation.serverPath) {
    throw new Error(`The file is not under version control`)
  }

  const versionControlUrl = buildVersionControlUrl(workfold.collection, info.localInformation.serverPath)
  const urlToOpen = vscode.Uri.parse(versionControlUrl)
  applyWorkaround(urlToOpen, versionControlUrl)

  await ui.showStatus("TFS: Opening in browser...", vscode.commands.executeCommand("vscode.open", urlToOpen))
}
