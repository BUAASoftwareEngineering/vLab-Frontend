import * as appearance from './Appearances.js';
import * as File from './File';
import { removeUnnecessaryMenu } from './Appearances';
import bridge from '../components/bridge';

import { StandaloneCodeEditorServiceImpl } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeServiceImpl.js';
import { version } from 'vscode';

var overrided = false;
export var MonacoAppSingleton;

export class MonacoApp {
	constructor(project_info_data_element, BASE_DIR, editorTheme='light') {
		this.currentProject = project_info_data_element;
		this.BASE_DIR = BASE_DIR;
		this.wsUrl = "ws://" + this.currentProject.ip + ":" + this.currentProject.languagePort;
		switch (editorTheme) {
			case 'light':
			  appearance.setTheme('xcode-default');
			  break;
			case 'dark':
			  appearance.setTheme('tomorrow-night');
			  break;
			default:
			  appearance.setTheme('xcode-default');
			  break;
		}
		this.model2editor = new Map();
		removeUnnecessaryMenu();
		removeUnnecessaryMenu();
		removeUnnecessaryMenu();
	}

	async addEditor(filePath, newlyCreated = true, elementId) {
		if (!overrided)
			overrideMonaco();
		var editor = await File.openFile(this.currentProject.projectId, filePath, this.BASE_DIR, this.wsUrl, newlyCreated, elementId);
		editor.onDidChangeModelContent((e) => {
			File.saveFile(this.currentProject.projectId, editor, filePath);
		});
		this.model2editor.set(editor.getModel(), editor);
		return editor;
	}

	closeEditor(editor) {
		this.model2editor.delete(editor.getModel());

	}
}

export function createMonacoApp(project_info_data_element, BASE_DIR, editorTheme='light') {
	MonacoAppSingleton = new MonacoApp(project_info_data_element, BASE_DIR, editorTheme);
	return MonacoAppSingleton;
}

function overrideMonaco() {
	overrided = true;

	// console.log("Overriding Monaco StandaloneCodeEditorServiceImpl !");

	StandaloneCodeEditorServiceImpl.prototype.doOpenEditor = async function (editor, input) {
		let foundedModel = monaco.editor.getModel(input.resource);

		// console.log("foundedModel @ Go To Definition = ", foundedModel);
		// console.log(MonacoAppSingleton.model2editor);
		if (!foundedModel || !MonacoAppSingleton.model2editor.get(foundedModel)) {
			// console.log("model have not been opened");

			if (!input.resource) {
				return null;
			}
			let filePath = input.resource.path;
			let temp = filePath.split('/');
			let label = temp[temp.length - 1];
			bridge.$emit('overrideMonaco', [filePath, label]);
			var editor = await new Promise((resolve) => {
				bridge.$on('overrideMonacoReturn', (myEditor) => {
					myEditor.focus();
					position(myEditor, input);
					resolve(myEditor);
				})
			})
		} else {
			// console.log("model have been opened");
			let filePath = input.resource.path;
			let temp = filePath.split('/');
			let label = temp[temp.length - 1];
			bridge.$emit('add', [filePath, label, '/code/']);

			var editor = MonacoAppSingleton.model2editor.get(foundedModel);
			editor.focus();
			position(editor, input);
		}

		return editor;
	};
}

function position(editor, input) {
	var selection = input.options.selection;
	if (selection) {
		if (typeof selection.endLineNumber === 'number' && typeof selection.endColumn === 'number') {
			editor.setSelection(selection);
			editor.revealRangeInCenter(selection, 1 /* Immediate */);
		}
		else {
			var pos = {
				lineNumber: selection.startLineNumber,
				column: selection.startColumn
			};
			editor.setPosition(pos);
			editor.revealPositionInCenter(pos, 1 /* Immediate */);
		}
	}
}