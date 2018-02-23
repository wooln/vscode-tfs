const vscode = require("vscode")
const menu = require("./menu")

module.exports = {
  activate(context) {
    context.subscriptions.push(
      vscode.commands.registerCommand("vscode-tfs.list", () => menu.call())
    )

    // We automatically checkout (for edit) files when they're modified
    vscode.workspace.onWillSaveTextDocument(event =>
      event.waitUntil(menu.items.checkout.call())
    )
  },

  deactivate() {}
}
