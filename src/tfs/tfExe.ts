import * as vscode from "vscode"
import { spawn, SpawnPromiseResult } from "child-process-promise"

export async function tf(args: Array<string>): Promise<SpawnPromiseResult> {
  const tfPath: string | undefined = vscode.workspace.getConfiguration("tfs").get("location")

  if (!tfPath) {
    throw new Error("tf.exe path is not configured")
  }

  return spawn(tfPath, args, { capture: ["stdout", "stderr"] }).catch((err) => {
    throw err.stderr ? new Error(err.stderr) : err
  })
}
