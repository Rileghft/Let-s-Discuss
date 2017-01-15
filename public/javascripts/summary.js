/**
 * Created by fnsne on 2017/1/14.
 */

document.addEventListener('DOMContentLoaded', function(){

});

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    let data=  event.currentTarget.innerText;
    event.dataTransfer.setData('text', data);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    var msg = document.createElement('div');
    msg.innerText = data;
    event.currentTarget.appendChild(msg);
}
