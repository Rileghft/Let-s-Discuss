/**
 * Created by fnsne on 2017/1/2.
 */

//var isLogin = false;
var socket;
var hostUrl = window.location.host;
var chat_packet = {
    'user' : '預設使用者',
    'msg' : "I'm msg"
};

//var username = '楊舜宇';
//var preUsername = "";
/*if(username != null){
    chat_packet.user = username;
}*/

$(document).ready(function(){
    /*socket = new WebSocket(`ws://${hostUrl}/ws`);
    $('#chat_submit').click(function () {
        var $input_area = $('#chat-input');
        var input_text = $input_area.val();
        chat_packet.msg = input_text;
        socket.send(JSON.stringify(chat_packet));
        $input_area.prop("value", "");
    });


document.addEventListener('DOMContentLoaded', function(){

    socket = new WebSocket(`ws://${hostUrl}/ws`);
        $('#chat_submit').click(function () {
            var $input_area = $('#chat_input_text');
            var input_text = $input_area.val();
            if (input_text == "") {
                return false;
            }
            else {
                chat_packet.msg = input_text;
                socket.send(JSON.stringify(chat_packet));
                $input_area.prop("value", "");
            }
        });

        document.getElementById('chat_input_text').addEventListener('keydown',function(e){
            var $input_area = $('#chat_input_text');
            var input_text = $input_area.val();
            if( e.shiftKey && e.keyCode==13)
            {
               return
            }
            if(e.keyCode==13)
            {
                if (input_text != "")
                {
                    chat_packet.msg = input_text;
                    socket.send(JSON.stringify(chat_packet));
                    $input_area.prop("value", "");
                    document.getElementById('chat_input_text').focus();
                }
            }
            else
                return;
            e.returnValue= false;

        });

    socket.onmessage = function (event) {
        append_message_2_chat(event.data);
    }*/
});

function append_message_2_chat( response ) {
    var $msg_box = $('#chat-content');
    let resp = JSON.parse(response);
    let append_element = "";
    if(resp.msg == "")
    {
        return false;
    }
    else {
        if (resp.user == username) {
            append_element = "<div class='msg_buble'><div class='user_name_row'><div class='usr_name hidden'>" + resp.user + "</div></div><div class='me msg_container' draggable='true' ondragstart='drag(event)'><span class='my_msg msg'> " + resp.msg + "</span></div></div>";
        } else {
            if (preUsername == resp.user) {
                append_element = "<div class='msg_buble'><div class='user_name_row'><div class='usr_name hidden'>" + resp.user + "</div></div><div class='other msg_container' draggable='true' ondragstart='drag(event)'><span class='other_msg msg'> " + resp.msg + "</span></div></div>";
            } else {
                append_element = "<div class='msg_buble'><div class='user_name_row'><div class='usr_name'>" + resp.user + "</div></div><div class='other msg_container' draggable='true' ondragstart='drag(event)'><span class='other_msg msg'> " + resp.msg + "</span></div></div>";
            }
        }
    }
    preUsername = resp.user;
    $msg_box.append(append_element);
}

