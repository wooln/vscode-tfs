const vscode = require("vscode")

const fromDocumentAction = action => async () => {
  const { document } = vscode.window.activeTextEditor || {}
  if (document && !document.isUntitled) {
    return await action(document)
  }
}

module.exports = {
  menu: fromDocumentAction(require("./action/menu")),
  add: fromDocumentAction(require("./action/add")),
  checkout: fromDocumentAction(require("./action/checkout")),
  openInBrowser: fromDocumentAction(require("./action/openInBrowser")),
  undo: fromDocumentAction(require("./action/undo")),
  delete: fromDocumentAction(require("./action/delete"))
}
