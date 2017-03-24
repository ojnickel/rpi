$(function () {
    $('.access_error').hide();
    window.navigator.webkitGetUserMedia({ audio: true}, function (s) {
        s.getAudioTracks()[0].stop();
        chrome.extension.getBackgroundPage().videoRecorder.onMediaAccess(true);
        window.close();
    }, function (s) {
        console.log(s);
        chrome.extension.getBackgroundPage().videoRecorder.onMediaAccess(false);
        $('.access_error').show();
    });
});