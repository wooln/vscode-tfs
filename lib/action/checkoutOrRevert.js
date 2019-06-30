const ui = require("../ui")
const checkout = require("./checkout")
const revert = require("./revert")
const fs = require("../util/fs")

module.exports = async function checkoutOrRevert(document) {
  if (document.isDirty && !(await fs.isWritable(document.uri.fsPath))) {
    if (await ui.promptForConfirmation(`Checkout ${document.uri.fsPath}?`)) {
      await checkout(document)
    } else {
      await revert(document)
    }
  }
}
