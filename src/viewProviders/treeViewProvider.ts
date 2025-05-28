import path from 'path';
import * as vscode from 'vscode';
import fs from 'fs';

export class ExcelDiffTreeViewProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    onDidChangeTreeData?: vscode.Event<void | vscode.TreeItem | vscode.TreeItem[] | null | undefined> | undefined;
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        const workSpaceFolders = vscode.workspace.workspaceFolders;
        if (!workSpaceFolders) {
            return [];
        }
        const rootPath = workSpaceFolders[0].uri.fsPath;
        return this.findExcelFiles(rootPath);
    }

    private findExcelFiles(dir: string): ExcelFileItem[] {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: ExcelFileItem[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...this.findExcelFiles(fullPath));
      } else if (entry.name.endsWith('.xlsx') || entry.name.endsWith('.xls')|| entry.name.endsWith('.csv')) {
        files.push(new ExcelFileItem(fullPath));
      }
    }
    return files;
    }

}

class ExcelFileItem extends vscode.TreeItem {
    constructor(public readonly filePath: string) {
        super(path.basename(filePath), vscode.TreeItemCollapsibleState.None);
        this.tooltip = filePath;
        this.command = {
            title: "Open Excel File",
            command: "vscode.open",
            arguments: [vscode.Uri.file(filePath)]
        };
        this.iconPath = new vscode.ThemeIcon('file', new vscode.ThemeColor('treeView.fileIconForeground'));
    }
}

export const registerTreeView = (context: vscode.ExtensionContext) => {
        const treeProvider = new ExcelDiffTreeViewProvider();
        vscode.window.createTreeView('xlDiffView', {
            treeDataProvider: treeProvider,
    });
};