import * as vscode from "vscode"
import * as ui from "../ui"
import { tf } from "../tfs/tfExe"

export async function undo(uri: vscode.Uri): Promise<void> {
  await ui.showStatus("TFS: Undoing...", tf(["undo", uri.fsPath, "/recursive"]))
  await ui.revert(uri)
  await ui.showMessage(`TFS: Pending changes undone in ${uri.fsPath}`)
}
