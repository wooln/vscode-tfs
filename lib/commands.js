const ui = require("./ui")

const fromAction = (action) => async (uri) => {
  if (!uri) {
    const document = ui.getActiveDocument()
    uri = document ? document.uri : undefined
  }

  try {
    await action({ uri })
  } catch (e) {
    await ui.showErrorMessage(String(e))
  } finally {
    ui.showStatus(undefined, Promise.resolve())
  }
}

module.exports = {
  add: fromAction(require("./action/add")),
  checkout: fromAction(require("./action/checkout")),
  delete: fromAction(require("./action/delete")),
  undo: fromAction(require("./action/undo")),
  openInBrowser: fromAction(require("./action/openInBrowser")),
  menu: fromAction(require("./action/menu")),
}
