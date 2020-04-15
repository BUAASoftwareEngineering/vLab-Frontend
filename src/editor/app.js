import $ from 'jquery';

import * as appearance from './Appearances.js';
import * as defaultCodes from './DefaultCodes.js';
import * as editormanage from './Editor.js';

export function initEditor() {
	
	editormanage.addNewEditor(defaultCodes.defaultCode_python, 'python');
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

	appearance.setTheme('xcode-default');
}