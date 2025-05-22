import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "xl-diff" is now active!');

  const disposable = vscode.commands.registerCommand("xl-diff.xl-diff", () => {
    vscode.window.showInformationMessage(
      "Welcome! Let's start hacking xl-diff."
    );
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
