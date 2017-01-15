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
var preUsername = "";
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
    var $msg_box = $('#chat_body');
    let resp = JSON.parse(response);
    let append_element = "";
    if(resp.user == username) {
        append_element = "<div class='msg_buble'><div class='me msg_container' draggable='true' ondragstart='drag(event)'><span class='my_msg msg'> " + resp.msg + "</span></div></div>";
    }else {
        if (preUsername == resp.user) {
            append_element = "<div class='msg_buble'><div class='other msg_container' draggable='true' ondragstart='drag(event)'><span class='other_msg msg'> " + resp.msg + "</span></div></div>";
            preUsername = resp.user;
        } else {
            append_element = "<div class='msg_buble'><div class='other_name'>" + resp.user + "</div><div class='other msg_container' draggable='true' ondragstart='drag(event)'><span class='other_msg msg'> " + resp.msg + "</span></div></div>";
            preUsername = resp.user;
        }
    }
    $msg_box.append(append_element);
}
/*
        <div class='msg_buble'>
            <div class='me msg_container'>
                <span class='my_msg msg>
                    訊息
                </span>
            </div>
        </div>

 */