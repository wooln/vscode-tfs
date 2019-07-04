const vscode = require("vscode")

const fromAction = action => async uri => {
  return await action({ uri })
}

const fromDocumentAction = action => async uri => {
  if (!uri) {
    const { document } = vscode.window.activeTextEditor || {}
    if (document && !document.isUntitled) {
      uri = document.uri
    }
  }

  return await action({ uri })
}

module.exports = {
  add: fromDocumentAction(require("./action/add")),
  checkout: fromDocumentAction(require("./action/checkout")),
  delete: fromDocumentAction(require("./action/delete")),
  undo: fromDocumentAction(require("./action/undo")),
  openInBrowser: fromDocumentAction(require("./action/openInBrowser")),
  menu: fromAction(require("./action/menu"))
}
