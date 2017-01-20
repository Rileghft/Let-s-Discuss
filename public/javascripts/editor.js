var editor;
var codeMirror;
$(document).ready(function () {
    editor = document.getElementById('editor');
    codeMirror = CodeMirror(editor, { lineWrapping: true});
});
