/**
 * Created by fnsne on 2017/1/1.
 */
var editor;
var editor_container;
var options = {
    modules:{
        toolbar: true
    },
    placeholder: "預設值",
    scrollingContainer: "",
    theme: 'snow'
};

document.addEventListener('DOMContentLoaded', function(){
    init();
    create_editor();
});

function create_editor() {
    options.scrollingContainer = editor_container;
    editor = new Quill('#editor', options);
}

function init() {
    editor_container = document.getElementById("editor");
}