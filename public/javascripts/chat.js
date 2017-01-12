/**
 * Created by fnsne on 2017/1/2.
 */
var socket;
var hostUrl = window.location.host;
var chat_packet = {
    'user' : '預設使用者',
    'msg' : "I'm msg"
};

var username = prompt("請輸入名字", "預設使用者");
if(username != null){
    chat_packet.user = username;
}

document.addEventListener('DOMContentLoaded', function(){

    socket = new WebSocket(`ws://${hostUrl}/ws`);

    $('#chat_submit').click(function () {
        var $input_area = $('#chat_input_text');
        var input_text = $input_area.val();
        chat_packet.msg = input_text;
        socket.send(JSON.stringify(chat_packet));
        $input_area.prop("value", "");
    });

    socket.onmessage = function (event) {
        append_message_2_chat(event.data);
    }
});

function append_message_2_chat( response ) {
    var $msg_box = $('.msg-box');
    var temp = $msg_box.prop("innerText");
    let resp = JSON.parse(response);
    $msg_box.prop( "innerText", temp+"\n"+resp.user+" : " + resp.msg );
}