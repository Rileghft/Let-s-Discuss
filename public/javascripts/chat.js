/**
 * Created by fnsne on 2017/1/2.
 */
var socket;
document.addEventListener('DOMContentLoaded', function(){
    socket = new WebSocket("ws://localhost:9000/ws");
});