/**
 * Created by fnsne on 2017/1/21.
 */

var username = "";
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
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    window.username = user.displayName;
                    window.isLogin = true;
                    $('#user-name').text(window.username);
                }
                else {
                    $('#login-panel').modal();
                }
            });
        },
        isAuth: function () {
            if (firebase.auth().currentUser){
                return true;
            }
            else {
                return false;
            }
        },
        signIn: function (provider_name) {
            let provider;
            if (provider_name === 'google') {
                provider = new firebase.auth.GoogleAuthProvider();
            }
            else if (provider_name === 'facebook') {
                provider = new firebase.auth.FacebookAuthProvider();
            }

            let ref = this.db;
            this.auth.signInWithPopup(provider).then(function (result) {
                window.username = result.user.displayName;
                window.authInfo = result;
                window.credential = result.credential;
                $('#login-panel').modal('hide');
                $('#user').show();
                $('#logout').show();
            }).catch(function (error) {
                console.log(error);
            });
        },
        signOut: function () {
            this.auth.signOut();
            location.href = "/";
        }
    }
})(firebase);

/*
var discusses = {
    'num': '2',
    'discusses': [
        {
            'name': 'test',
            'launcher': 'Rileghft'
        },
        {
            'name': '123',
            'launcher': 'fnsne'
        }
    ]
};
var $history_container;
$(document).ready(function () {
    $history_container = $('.discuss-history-container');
    for(var i = 0 ; i < discusses.num; i++){
        append_discuss(discusses.discusses[i].name, discusses.discusses[i].launcher);
    }
});

function append_discuss(name, launcher) {
    let href_append = "`discuss/"+name+"`";
    let template = `
    <div class="discuss-history" onclick="location.href+=${href_append}" >
        <div class="discuss-name">${name}</div>
        <div class="discuss-launcher">${launcher}</div>
    </div>`;
    $history_container.append(template);
}
*/
$(document).ready(function () {
    discuss.init();
    if (discuss.isAuth()){
        $('#user').show();
        $('#logout').show();
        $('#login').hide();
        window.username = firebase.auth().currentUser.displayName;
        $('#user-name').text(window.username);
    }
});

//login
/*
var isLogin = false;
$('.login').click(function () {
    $('#login-panel').modal();
});

$('#login-google').click(function () {
    discuss.signIn('google');
});
$('#login-fb').click(function () {
    discuss.signIn('facebook');
});
$('.logout').click(function () {
    discuss.signOut();
});
*/
//start discuss
$('#discuss-name').keyup(function (event) {
    let roomName = $(this).val();
    if(!event.shiftKey && event.keyCode==13) {
        if (roomName !== "") {
            //if (username !== "") {
                location.href += `discuss/${roomName}`;
            /*}
            else {
                $('#login-panel').modal();
            }*/
        }
    }
});

// homepage video
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
        windowHeight = $(window).height() + 5,
        videoWidth,
        videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}