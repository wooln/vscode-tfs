const vscode = require("vscode")

const items = {
  add: {
    label: "Add",
    detail: "Adds current file to TFS.",
    command: "vscode-tfs.add"
  },
  checkout: {
    label: "Checkout",
    detail: "Checkout current file from TFS for edit.",
    command: "vscode-tfs.checkout"
  },
  openInBrowser: {
    label: "Open In Browser",
    detail: "Open current file in browser.",
    command: "vscode-tfs.openInBrowser"
  },
  undo: {
    label: "Undo",
    detail: "Undo current file pending changes.",
    command: "vscode-tfs.undo"
  },
  del: {
    label: "Delete",
    detail: "Delete current file from TFS",
    command: "vscode-tfs.delete"
  }
}

module.exports = async function menu(document) {
  const selectedItem = await vscode.window.showQuickPick(Object.values(items))
  if (selectedItem) {
    return vscode.commands.executeCommand(selectedItem.command, document)
  }
}
