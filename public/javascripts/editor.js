/**
 * Created by fnsne on 2017/1/1.
 */
var editor;
var editor_container;
var delta;
var toolbar_options = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header':[1,2,3,4,5,6,false]}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    ['link', 'image', 'video', 'formula'],
    [{'color': [] }, {'background': [] } ],
    [{'font': [] } ],
    [{'align': [] } ]
];
var options = {
    modules:{
        toolbar: toolbar_options
    },
    theme: 'snow',
    placeholder: "預設值",
    scrollingContainer: "",
};
var on_off = true;

document.addEventListener('DOMContentLoaded', function(){
    init();
    create_editor();
    $('#save_delta').click(function () {
        delta = editor.getContents();
    });

    $('#load_delta').click(function () {
        editor.setContents(delta);
    });

    $('#on_off_btn').click(function () {
        on_off = !on_off;
        editor.enable(on_off);
    });
});

function create_editor() {
    options.scrollingContainer = editor_container;
    editor = new Quill('#editor', options);
}

function init() {
    editor_container = document.getElementById("editor");
}