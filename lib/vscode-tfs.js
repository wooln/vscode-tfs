const vscode = require("vscode")
const spawn = require("child-process-promise").spawn

async function tf(args) {
  const tfPath = vscode.workspace.getConfiguration("tfs").get("location")

  return spawn(tfPath, args, { capture: ["stdout", "stderr"] }).catch(err => {
    throw err.stderr ? new Error(err.stderr) : err
  })
}

module.exports = {
  tf
}
