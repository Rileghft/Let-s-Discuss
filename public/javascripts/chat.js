/**
 * Created by fnsne on 2017/1/2.
 */
var socket;
var hostUrl = window.location.host;
document.addEventListener('DOMContentLoaded', function(){

    socket = new WebSocket(`ws://${hostUrl}/ws`);

    $('#chat_submit').click(function () {
        var $input_area = $('#chat_input_text');
        var input_text = $input_area.val();
        socket.send(input_text);
        $input_area.prop("value", "");
    });

    socket.onmessage = function (event) {
        append_message_2_chat(event.data);
    }
});

function append_message_2_chat( text ) {
    var $msg_box = $('.msg-box');
    var temp = $msg_box.prop("innerText");
    $msg_box.prop("innerText", temp+"\n"+text);

}