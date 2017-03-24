var bg = chrome.extension.getBackgroundPage();
var bgScreencapture = bg.screenshot;
var videoRecorder = bg.videoRecorder;
//bg.onClassHas = 'impossibleClassAdd';
//bg.onTabRealy = true;
//bg.thisCrop = 'thisCrop';
//bg.thisEr = true;

bgScreencapture.selectedOptionFunction(function () {

    var mainButtonBlock = $("#visible, #fragment, #area, #scroll, #entire, #window, #blank");

    if (chrome.extension.getBackgroundPage().thisFragment) {
        mainButtonBlock.attr('disabled', 'disabled');
        $("#visible, #area, #scroll, #entire, #window, #blank").css({backgroundPosition: '0px -70px', color: 'gray'});
    }
    if (chrome.extension.getBackgroundPage().thisCrop) {
        mainButtonBlock.attr('disabled', 'disabled');
        $("#visible, #fragment, #scroll, #entire, #window, #blank").css({backgroundPosition: '0px -70px', color: 'gray'});
    }
    if (chrome.extension.getBackgroundPage().thisScrollCrop) {
        mainButtonBlock.attr('disabled', 'disabled');
        $("#visible, #fragment, #area, #scroll, #entire, #window, #blank").css({backgroundPosition: '0px -70px', color: 'gray'});
    }

//    if (chrome.extension.getBackgroundPage().thisEr) {
//        $("#visible, #fragment, #area, #scroll, #entire, #window, #blank").css({backgroundPosition: '0px -70px', color: 'gray'});
//    }

    if (localStorage.quickCapture !== 'false') {
        $("#" + localStorage.quickCapture).click();
    }
});

var t = null;
function checkRecord() {
    if (videoRecorder.getStatus()) {
        showTime(videoRecorder.getTimeRecord());
        showRecordStatus();
    } else {
        showCaptureOptions();
        clearTimeout(t)
    }
    t = setTimeout(checkRecord, 300);
}

function showCaptureOptions() {
    $('.capture_options').show();
    $('.record_options').hide();
    $('.record_status').hide();
}

function showRecordOptions() {
    $('.capture_options').hide();
    $('.record_options').show();
    $('.record_status').hide();
}

function showRecordStatus() {
    $('.capture_options').hide();
    $('.record_options').hide();
    $('.record_status').show();
}

function showTime(time) {
    var t = new Date(time);
    $('.record_title span.recordtime').text(('0' + t.getUTCMinutes()).slice(-2) + ':' + ('0' + t.getUTCSeconds()).slice(-2))
}

$(function () {
    (function setLocale() {
        $('h3.capture_title').text(chrome.i18n.getMessage("popupTitle"));
        $("#visible span").text(chrome.i18n.getMessage("popupBtnVisible"));
        $("#fragment span").text(chrome.i18n.getMessage("popupBtnFragment"));
        $("#area span").text(chrome.i18n.getMessage("popupBtnArea"));
        $("#scroll span").text(chrome.i18n.getMessage("popupBtnScroll"));
        $("#entire span").text(chrome.i18n.getMessage("popupBtnEntire"));
        $("#window span").text(chrome.i18n.getMessage("popupBtnWindow"));
        $("#blank span").text(chrome.i18n.getMessage("popupBtnBlank"));
        $("#android span").text(chrome.i18n.getMessage("popupBtnAndroid"));
        $("#video span").text(chrome.i18n.getMessage("popupBtnVideo"));
        $("#options span").text(chrome.i18n.getMessage("popupBtnOptions"));
        $("#enableEdit option[value='edit']").text(chrome.i18n.getMessage("popupBtnEnableEdit"));
        $("#enableEdit option[value='save']").text(chrome.i18n.getMessage("popupBtnEnableDownload"));
        $("#enableEdit option[value='done']").text(chrome.i18n.getMessage("popupBtnEnableSave"));
        $("#enableEdit option[value='copy']").text(chrome.i18n.getMessage("popupBtnEnableCopy"));
        $('h3.video_title').text(chrome.i18n.getMessage("popupVideoTitle"));
        $("#microphone-sound label").text(chrome.i18n.getMessage("popupLabelRecordMic"));
        $("#tab-sound label").text(chrome.i18n.getMessage("popupLabelRecordTab"));
        $("#cursor-animate label").text(chrome.i18n.getMessage("popupLabelCursorAnimate"));
        $("#countdown label").text(chrome.i18n.getMessage("popupLabelCountdown"));
        $("#tab-record span").text(chrome.i18n.getMessage("popupBtnTabRecord"));
        $("#desktop-record span").text(chrome.i18n.getMessage("popupBtnDesktopRecord"));
        $("#back span").text(chrome.i18n.getMessage("popupBtnBack"));
        $('h3.record_title b').text(chrome.i18n.getMessage("popupRecordTitle"));
        $("#stop-record span").text(chrome.i18n.getMessage("popupBtnStopRecord") + ' (Ctrl+Shift+0)');
    })();

    $("#entire").click(function () {
        bgScreencapture.captureEntire();
        window.close();
    });

    $("#fragment").click(function () {
        bgScreencapture.captureFragment();
        window.close();
    });

    $("#area").click(function () {
        bgScreencapture.captureSelected();
        window.close();
    });

    $("#scroll").click(function () {
        bgScreencapture.scrollSelected();
        window.close();
    });

    $("#visible").click(function () {
        bgScreencapture.captureVisible();
        window.close();
    });

    $("#window").click(function () {
        bgScreencapture.captureWindow();
        window.close();
    });

    $("#blank").click(function () {
        bgScreencapture.createBlank();
        window.close();
    });

    $("#android").click(function () {
        bgScreencapture.openPage('https://play.google.com/store/apps/details?id=com.fvd.nimbus');
        window.close();
    });

    $("#video").click(function () {
        showRecordOptions();
    });

    $("#tab-record").click(function () {
        videoRecorder.capture({
            type:      'tab',
            countdown: +$('#countdown input').val() > 0 ? +$('#countdown input').val() : 0
        });
        checkRecord();
    });

    $("#desktop-record").click(function () {
        videoRecorder.capture({
            type:      'desktop',
            countdown: +$('#countdown input').val() > 0 ? +$('#countdown input').val() : 0
        });
        checkRecord();
    });

    $('#stop-record').click(function () {
        $('.record_title span.recordtime').removeClass('recordtime');
        videoRecorder.stopRecord();
        showRecordOptions();
        clearTimeout(t);
    });

    $("#options").click(function () {
        chrome.tabs.create({url: 'options.html'}, function (tab) {
        });
    });

    $("#back").click(function () {
        showCaptureOptions();
    });

    $('#micsound').click(function () {
        localStorage.micSound = $(this).prop("checked");
    });

    $('#tabsound').click(function () {
        localStorage.tabSound = $(this).prop("checked");
    });

    $('#cursoranimate').click(function () {
        localStorage.cursorAnimate = $(this).prop("checked");
    });

    $("input#micsound").prop('checked', (localStorage.micSound !== 'false'));
    $("input#tabsound").prop('checked', (localStorage.tabSound !== 'false'));
    $("input#cursoranimate").prop('checked', (localStorage.cursorAnimate !== 'false'));

    if (!bgScreencapture.enableNpapi) $("#enableEdit option[value='copy']").remove();
    $("select#enableEdit")
        .val(localStorage.enableEdit)
        .bind("change click", function () {
            localStorage.enableEdit = $(this).val();
        });

    if (videoRecorder.getStatus()) {
        checkRecord();
    } else {
        showCaptureOptions();
    }
});