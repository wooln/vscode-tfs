const ui = require("../ui")
const checkout = require("./checkout")
const fs = require("../util/fs")

module.exports = async function checkoutOrRevert({ uri }) {
  if (!(await fs.isWritable(uri.fsPath))) {
    if (await ui.promptForConfirmation(`Checkout ${uri.fsPath}?`)) {
      await checkout(uri)
    } else {
      await ui.revert(uri)
    }
  }
}
