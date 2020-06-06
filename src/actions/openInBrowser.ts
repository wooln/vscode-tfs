import * as vscode from "vscode"
import * as ui from "../ui"
import { tf } from "../tfs/tfExe"
import { parse } from "../tfs/output/parse"
import { buildVersionControlUrl } from "../tfs/web"

const tfWorkfold = (fsPath: string) => tf(["workfold", fsPath]).then((res) => parse(res.stdout))
const tfInfo = (fsPath: string) => tf(["info", fsPath]).then((res) => parse(res.stdout))

// FIXME: workaround for https://github.com/microsoft/vscode/issues/25852
const hasIssue = !String(vscode.Uri.parse("http://host/#test=value")).includes("test=value")
function applyWorkaround(uri: vscode.Uri, expectedUri: string) {
  if (hasIssue) {
    ;(uri as any)._formatted = expectedUri
  }
}

export async function openInBrowser(uri: vscode.Uri): Promise<void> {
  const [workfold, info]: [any, any] = await ui.showStatus(
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
