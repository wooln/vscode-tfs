const vscode = require("vscode")

const items = {
  add: {
    label: "Add",
    detail: "Adds files and folders to version control.",
    command: "vscode-tfs.add"
  },
  checkout: {
    label: "Check Out for Edit",
    detail: "Checks out a file and changes its pending change status to Edit.",
    command: "vscode-tfs.checkout"
  },
  del: {
    label: "Delete",
    detail: "Removes files and folders from the TFS and deletes them from the disk.",
    command: "vscode-tfs.delete"
  },
  undo: {
    label: "Undo Pending Changes",
    detail: "Discards one or more pending changes to files or folders.",
    command: "vscode-tfs.undo"
  },
  openInBrowser: {
    label: "Open in Browser",
    detail: "Opens files and folders in browser.",
    command: "vscode-tfs.openInBrowser"
  }
}

module.exports = async function menu({ uri }) {
  const selectedItem = await vscode.window.showQuickPick(Object.values(items))
  if (selectedItem) {
    return vscode.commands.executeCommand(selectedItem.command, uri)
  }
}
