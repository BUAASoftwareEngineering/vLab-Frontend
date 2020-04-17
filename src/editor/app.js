import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import $ from 'jquery';

import * as actions from './Actions.js';
import * as appearance from './Appearances.js';
import * as defaultCodes from './DefaultCodes.js';
import * as editormanage from './Editor.js';

export function initEditor(elementId) {
	
	editormanage.addNewEditor(defaultCodes.defaultCode_js, 'javascript', elementId);
	var editor = editormanage.editorArray[0];

	$(document).ready(() => {
		$(".container").keydown((event) => {
			// https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode, US keyboard, IE11 / Chrome34 / Safari7 / Gecko29
			if ((event.ctrlKey == true || event.metaKey == true) &&
				(event.which == '12' || event.which == '61' || event.which == '107' || event.which == '109' || event.which == '171' || event.which == '173' || event.which == '187' || event.which == '189')) {
				event.preventDefault();
			}
		});
	});

	actions.bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_OPEN_SQUARE_BRACKET, "editor.action.jumpToBracket");
	actions.bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_CLOSE_SQUARE_BRACKET, "editor.action.selectToBracket");
	actions.bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfold");
	actions.bindKeyWithAction(editor, monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.fold");
	actions.bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfoldRecursively");
	actions.bindKeyWithAction(editor, monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.foldRecursively");
	actions.bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_EQUAL, "editor.unfoldAll");
	actions.bindKeyWithAction(editor, monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_MINUS, "editor.foldAll");

	appearance.setTheme('xcode-default');
}