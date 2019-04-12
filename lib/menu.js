const vscode = require("vscode")

const items = {
  add: {
    label: "Add",
    detail: "Adds current file to TFS.",
    handler: require("./action/add")
  },
  checkout: {
    label: "Checkout",
    detail: "Checkout current file from TFS for edit.",
    handler: require("./action/checkout")
  },
  openInBrowser: {
    label: "Open In Browser",
    detail: "Open current file in browser.",
    handler: require("./action/openInBrowser")
  },
  undo: {
    label: "Undo",
    detail: "Undo current file pending changes.",
    handler: require("./action/undo")
  },
  delete: {
    label: "Delete",
    detail: "Delete current file from TFS",
    handler: require("./action/delete")
  },
}

module.exports = async function menu() {
  const { document } = vscode.window.activeTextEditor || {}
  const command = await vscode.window.showQuickPick(Object.values(items))

  if (command && document) {
    return command.handler(document)
  }
}
