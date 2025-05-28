import * as vscode from "vscode";
import { registerTreeView } from "./viewProviders/treeViewProvider";

export function activate(context: vscode.ExtensionContext) {
  registerTreeView(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
