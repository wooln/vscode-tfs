const vscode = require("vscode")

const items = {
  add: {
    label: "Add",
    detail: "Adds file to TFS.",
    command: "vscode-tfs.add"
  },
  checkout: {
    label: "Checkout",
    detail: "Checkout file from TFS for edit.",
    command: "vscode-tfs.checkout"
  },
  undo: {
    label: "Undo",
    detail: "Undo file pending changes.",
    command: "vscode-tfs.undo"
  },
  del: {
    label: "Delete",
    detail: "Delete file from TFS",
    command: "vscode-tfs.delete"
  },
  openInBrowser: {
    label: "Open In Browser",
    detail: "Open file in browser.",
    command: "vscode-tfs.openInBrowser"
  },
}

module.exports = async function menu({ uri }) {
  const selectedItem = await vscode.window.showQuickPick(Object.values(items))
  if (selectedItem) {
    return vscode.commands.executeCommand(selectedItem.command, uri)
  }
}
