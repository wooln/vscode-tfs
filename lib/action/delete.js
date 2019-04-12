const tf = require("../vscode-tfs").tf;
const ui = require("../ui");

module.exports = async function delete(document) {
  ui.showStatus(`TFS: Deleting...`);
  await tf(["delete", document.uri.fsPath]);
  await ui.showMessage(
    `TFS: ${document.uri.fsPath} successfully deleted from version control.`
  )
}
