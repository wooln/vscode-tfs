const vscode = require("vscode")
const spawn = require("child-process-promise").spawn
const path = require("path")

async function tf(args) {
  const tfPath = vscode.workspace.getConfiguration("tfs").get("location")

  return spawn(tfPath, args, {
    capture: ["stdout", "stderr"]
  })
}

function getCurrentFileInfo() {
  return !vscode.window.activeTextEditor
    ? undefined
    : {
        localPath: vscode.window.activeTextEditor.document.fileName,
        get name() {
          return path.basename(this.localPath)
        }
      }
}

module.exports = {
  getCurrentFileInfo,
  tf
}
