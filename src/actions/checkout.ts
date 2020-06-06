import * as vscode from "vscode"
import * as ui from "../ui"
import { tf } from "../tfs/tfExe"

export async function checkout(uri: vscode.Uri): Promise<void> {
  await ui.showStatus(`TFS: Checking...`, tf(["checkout", uri.fsPath, "/recursive"]))
  await ui.showMessage(`TFS: ${uri.fsPath} successfully checked out for editing.`)
}
