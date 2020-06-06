import * as vscode from "vscode"
import * as ui from "../ui"
import { tf } from "../tfs/tfExe"

export async function del(uri: vscode.Uri): Promise<void> {
  await ui.showStatus(`TFS: Deleting...`, tf(["delete", uri.fsPath, "/recursive"]))
  await ui.showMessage(`TFS: ${uri.fsPath} successfully deleted from version control.`)
}
