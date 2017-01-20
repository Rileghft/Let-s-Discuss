/**
 * Created by fnsne on 2017/1/14.
 */

document.addEventListener('DOMContentLoaded', function(){

});
var isNewMemo = false;
var memo = (function (firebase) {
    return {
        init: function () {
            this.db = firebase.database().ref(`${roomName}/memo`);
            this.listenMemo(this.db);
            this.loadMemo(this.db);
        },
        loadMemo: function (ref) {
            ref.limitToLast(20).once('value', function (snapshot) {
                if (snapshot.val() === null) {
                    window.isNewMemo = true;
                    return;
                }
                snapshot.forEach(memo => {
                    document.getElementById('memo_container').appendChild(create_memo(memo.key, memo.val()));
                });
                window.isNewMemo = true;
            });
        },
        listenMemo: function (ref) {
            ref.limitToLast(1).on('child_added', function (snapshot) {
                if (window.isNewMemo) {
                    let memo = snapshot.val();
                    document.getElementById('memo_container').appendChild(create_memo(snapshot.key, memo));
                }
            });
        },
        sendMemo: function (msg, time) {
            this.db.push({
                'user': username,
                'content': msg,
                'time': time
            });
        },
        removeMemo: function (key) {
            this.db.child(key).remove();
        }
    }
})(firebase);
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    console.log(event);
    let user = event.target.parentNode.children[0].textContent;
    let msg =  event.target.children[0].textContent;
    let time = new Date().getTime();
    let data = {
        'user': user,
        'content' : msg,
        'time': time
    };
    event.dataTransfer.setData('text/plain', JSON.stringify(data));
}

function drop(event) {
    event.preventDefault();
    var data = JSON.parse(event.dataTransfer.getData('text/plain'));
    memo.sendMemo(data.content, data.time);
}

function create_memo(key, data) {
    let user = data.user;
    //msg span
    var summary = document.createElement('span');
    var att_sumary_class = document.createAttribute('class');
    att_sumary_class.value = 'msg other_msg';
    summary.setAttributeNode(att_sumary_class);
    summary.innerText = data.content;

    //msg_container
    var msg_container = document.createElement('div');
    var att_msg_container_class = document.createAttribute('class');
    att_msg_container_class.value = 'other msg_container';
    msg_container.setAttributeNode(att_msg_container_class);
    msg_container.appendChild(summary);

    //user_name
    var user_name = document.createElement('div');
    var attr_user_name_class = document.createAttribute('class');
    attr_user_name_class.value = 'usr_name';
    user_name.innerText = user;
    user_name.setAttributeNode(attr_user_name_class);

    //msg_buble
    var msg_buble = document.createElement('div');
    var att_msg_buble_class = document.createAttribute('class');
    att_msg_buble_class.value = 'msg_buble';
    msg_buble.setAttributeNode(att_msg_buble_class);
    let data_key = document.createAttribute('data-key');
    data_key.value = key;
    msg_buble.setAttributeNode(data_key);

    //close button
    var close_button = document.createElement('div');
    var attr_close_button_class = document.createAttribute('class');
    attr_close_button_class.value = 'close_button';
    close_button.setAttributeNode(attr_close_button_class);
    close_button.innerText = '❌';
    close_button.addEventListener('click', function (event) {
        let _this = event.currentTarget;
        let msg_buble = _this.parentNode.parentNode;
        msg_buble.parentNode.removeChild(msg_buble);
        memo.removeMemo(key);
    });

    //userName and close row
    var username_row = document.createElement('div');
    var attr_username_row_class = document.createAttribute('class');
    attr_username_row_class.value = 'user_name_row';
    username_row.setAttributeNode(attr_username_row_class);
    username_row.appendChild(user_name);
    username_row.appendChild(close_button);

    msg_buble.appendChild(username_row);
    msg_buble.appendChild(msg_container);
    return msg_buble;
}
