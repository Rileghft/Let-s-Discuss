/**
 * Created by fnsne on 2017/1/14.
 */

document.addEventListener('DOMContentLoaded', function(){

});

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    let msg=  event.currentTarget.innerText;
    let data = {
        'user': username,
        'msg' : msg
    };
    event.dataTransfer.setData('text/plain', JSON.stringify(data));
}

function drop(event) {
    event.preventDefault();
    var data = JSON.parse(event.dataTransfer.getData('text/plain'));
    var user = data.user;
    //msg span
    var summary = document.createElement('span');
    var att_sumary_class = document.createAttribute('class');
    att_sumary_class.value = 'msg my_msg';
    summary.setAttributeNode(att_sumary_class);
    summary.innerText = data.msg;

    //msg_container
    var msg_container = document.createElement('div');
    var att_msg_container_class = document.createAttribute('class');
    att_msg_container_class.value = 'me msg_container';
    msg_container.setAttributeNode(att_msg_container_class);
    msg_container.appendChild(summary);

    //msg_buble
    var msg_buble = document.createElement('div');
    var att_msg_buble_class = document.createAttribute('class');
    att_msg_buble_class.value = 'msg_buble';
    msg_buble.setAttributeNode(att_msg_buble_class);
    msg_buble.appendChild(msg_container);

    event.currentTarget.appendChild(msg_buble);
}

