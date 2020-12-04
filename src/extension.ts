// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as testJson from './no-instance.json'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('to terminal');

	console.log(testJson)

	interface Error {
		message: string
		
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('haskell-debugging.showHighlight', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('message');
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const filename = document.fileName;
			const uri = document.uri;

			let diagnosticCollection = vscode.languages.createDiagnosticCollection("stuff");

			const errors = testJson.errors;
			const diagnostics = errors.map(error => error.locations.map(
				l => new vscode.Diagnostic(new vscode.Range(l.fromLine, l.fromColumn, l.toLine, l.toColumn), error.message))).flat();
			diagnosticCollection.set(uri, diagnostics)
			
		}

	});
	

	context.subscriptions.push(disposable);
}



const jsonToDiagnostics = function(string: string) : vscode.Diagnostic[] {

	interface error {
		message: string
		locations: location[]
	}
	interface location{
		fromLine: number
		toLine: number
		fromColumn: number
		toColumn: number
	}

	interface parsedJson {
		fileName: string
		moduleName: string
		errors: error[] 
	}

	
	const json : parsedJson= JSON.parse(string);

	const diagnostics = json.errors.map((e : error) => e.locations.map(
		l => new vscode.Diagnostic(new vscode.Range(l.fromLine, l.fromColumn, l.toLine, l.toColumn), e.message))).flat();

		return diagnostics
	} 

// this method is called when your extension is deactivated
export function deactivate() {}
