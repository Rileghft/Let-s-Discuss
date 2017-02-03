/**
 * Created by 楊舜宇 on 2017/1/19.
 */

var $chat_msg = $('#chat-input');
var content = document.getElementById('chat-content');
var username = "";
var authInfo = {};
var credential = "";
var isLogin = false;
var isNewMessage = false;
var discuss = (function (firebase) {
    this.config = {
        apiKey: "AIzaSyCqcXBkEdvDp-v5SCnh7pkJebWUgGX8Moc",
        authDomain: "lets-discuss-df8a6.firebaseapp.com",
        databaseURL: "https://lets-discuss-df8a6.firebaseio.com",
        storageBucket: "lets-discuss-df8a6.appspot.com",
        messagingSenderId: "381232184546"
    };
    return {
        init: function () {
            firebase.initializeApp(config);
            this.db = firebase.database().ref(`${roomName}/message`);
            this.auth = firebase.auth();
            this.storage = firebase.storage();
            this.isAuth();
        },
        isAuth: function () {
            let loadMessage = this.loadMessage;
            let listenMessage = this.listenMessage;
            let ref = this.db;
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    window.username = user.displayName;
                    $('#user-name').text(window.username);
                    listenMessage(ref);
                    loadMessage(ref);
                    memo.init();
                    firepadInit();
                }
                else {
                    $('#login-panel').modal();
                }
            })
        },
        signIn: function (provider_name) {
            let provider;
            if (provider_name === 'google') {
                provider = new firebase.auth.GoogleAuthProvider();
            }
            else if (provider_name === 'facebook') {
                provider = new firebase.auth.FacebookAuthProvider();
            }

            let loadMessage = this.loadMessage;
            let listenMessage = this.listenMessage;
            let ref = this.db;
            this.auth.signInWithPopup(provider).then(function (result) {
                window.username = result.user.displayName;
                window.authInfo = result;
                window.credential = result.credential;
                $('#login-panel').modal('hide');
            }).catch(function (error) {
                console.log(error);
            });
        },
        signOut: function () {
            this.auth.signOut();
            location.href = "/";
        },
        loadMessage: function (ref) {
            ref.limitToLast(20).once('value', function (snapshot) {
                if (snapshot.val() === null) {
                    window.isNewMessage = true;
                    return;
                }
                let msgs = Object.values(snapshot.val());
                msgs.forEach(msg => {
                    append_message(msg);
                });
                window.isNewMessage = true;
                content.scrollTop = content.scrollHeight;
            });
        },
        sendMessage: function () {
            this.db.push({
                'user': username,
                'content': $chat_msg.val(),
                'time': new Date().getTime()
            });
            $chat_msg.val("");
        },
        listenMessage: function (ref) {
            ref.limitToLast(1).on('child_added', function (snapshot) {
                if (window.isNewMessage) {
                    let msg = snapshot.val();
                    append_message(msg);
                }
                content.scrollTop = content.scrollHeight;
            });
        }
    }
})(firebase);

var firepad;

$(document).ready(function() {
    discuss.init();
    if (username !== "") {
        firepadInit();
    }
});

function firepadInit() {
    firepad = Firepad.fromCodeMirror(firebase.database().ref(`${roomName}/doc`), codeMirror, { richTextShortcuts: true, richTextToolbar: true });
    firepad.on('ready', function() {
        if (firepad.isHistoryEmpty()) {
            firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
        }
    });
}

$('.logout').click(function () {
    discuss.signOut();
});

$('#login-google').click(function () {
    discuss.signIn('google');
});
$('#login-fb').click(function () {
    discuss.signIn('facebook');
});
$('#chat-submit').click(function () {
    discuss.sendMessage();
});
$('#chat-input').keyup(function (event) {
    let msg = $(this).val();
    if(!event.shiftKey && event.keyCode==13)
    {
        if (msg !== "")
        {
            discuss.sendMessage();
        }
    }
});
var $msg_box = $('#chat-content');
var preSender = "";
function append_message(msg) {
    let hiddenClass = (msg.user === preSender || msg.user == window.username)? " hidden": "";
    let senderClass = (msg.user === window.username)? "me": "other";
    let template = `
    <div class='msg_buble'>
        <div class="user_name_row">
            <div class='usr_name${hiddenClass}'>${msg.user}</div>
        </div>
        <div class='${senderClass} msg_container' draggable='true' ondragstart='drag(event)'>
            <span class='my_msg msg'>${msg.content}</span>
        </div>
    </div>`;
    $msg_box.append(template);
    preSender = msg.user;
}
