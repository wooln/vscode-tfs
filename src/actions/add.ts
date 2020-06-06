import * as vscode from "vscode"
import * as ui from "../ui"
import { tf } from "../tfs/tfExe"

export async function add(uri: vscode.Uri): Promise<void> {
  await ui.showStatus(`TFS: Adding...`, tf(["add", uri.fsPath, "/recursive"]))
  await ui.showMessage(`TFS: ${uri.fsPath} successfully added to version control.`)
}
