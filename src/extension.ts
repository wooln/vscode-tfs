import * as vscode from "vscode"
import * as actions from "./actions"
import { handle } from "./ui"

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.add", handle(actions.add)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.checkout", handle(actions.checkout)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.delete", handle(actions.del)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.undo", handle(actions.undo)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.openInBrowser", handle(actions.openInBrowser)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.menu", handle(actions.menu)))
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
