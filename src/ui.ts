import * as vscode from "vscode"

export function showMessage(message: string): Thenable<unknown> {
  return vscode.window.showInformationMessage(message)
}

export function showErrorMessage(message: string): Thenable<unknown> {
  return vscode.window.showErrorMessage(message)
}

export function showStatus<T>(message: string, hideWhenDone: Thenable<T>): Thenable<T> {
  vscode.window.setStatusBarMessage(message, hideWhenDone)
  return hideWhenDone
}

export function revert(uri: vscode.Uri): Thenable<unknown> {
  return vscode.commands.executeCommand("workbench.action.files.revert", uri)
}

function getActiveDocument() {
  const { document } = vscode.window.activeTextEditor || {}
  return document && !document.isUntitled ? document : undefined
}

export function handle(action: (uri: vscode.Uri) => Promise<void>) {
  return async (uri: vscode.Uri | undefined): Promise<void> => {
    if (!uri) {
      const document = getActiveDocument()
      uri = document ? document.uri : undefined
    }

    if (!uri) {
      throw new Error("Unknown path")
    }

    try {
      await action(uri)
    } catch (e) {
      await showErrorMessage(String(e))
    } finally {
      showStatus("", Promise.resolve())
    }
  }
}
