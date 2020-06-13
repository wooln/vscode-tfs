import * as vscode from "vscode"
import * as commands from "./commands"
import { handle } from "./executor"

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.add", handle(commands.add)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.checkin", handle(commands.checkin)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.checkout", handle(commands.checkout)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.delete", handle(commands.del)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.get", handle(commands.get)))
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.list", handle(commands.list)))
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-tfs.openInBrowser", handle(commands.openInBrowser))
  )
  context.subscriptions.push(vscode.commands.registerCommand("vscode-tfs.undo", handle(commands.undo)))
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
