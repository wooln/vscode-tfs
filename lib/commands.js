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
  menu: fromAction(require("./action/menu")),
  add: fromDocumentAction(require("./action/add")),
  checkout: fromDocumentAction(require("./action/checkout")),
  openInBrowser: fromDocumentAction(require("./action/openInBrowser")),
  undo: fromDocumentAction(require("./action/undo")),
  delete: fromDocumentAction(require("./action/delete"))
}
