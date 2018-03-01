const vscode = require("vscode")
const getCurrentFileInfo = require("../vscode-tfs").getCurrentFileInfo

module.exports = {
  items: {
    add: require("./add"),
    checkout: require("./checkout"),
    openInBrowser: require("./openInBrowser"),
    undo: require("./undo")
  },

  async call() {
    const file = getCurrentFileInfo()
    const command = await vscode.window.showQuickPick(Object.values(this.items))

    if (command && file) {
      return command.call(file)
    }
  }
}
