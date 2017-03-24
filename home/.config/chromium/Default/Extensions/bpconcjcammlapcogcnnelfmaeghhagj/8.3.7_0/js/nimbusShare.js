var nimbus = {
    client_software:    'screens_chrome',
//    user_session_id:           '',
    user_email:         '',
//    user_auth:                 '',
    user_upload_folder: {id: 'default', title: 'My Notes'},
    user_temp_pass:     '',
    can_upload:         true,
    img_size:           0,
    info:               {
        usage:   {
            current: 0,
            max:     0
        },
        premium: false
    },
    send:               function (data, success, error) {
        $.ajax({
            type:     'POST',
            url:      'https://sync.everhelper.me',
            data:     JSON.stringify(data),
            dataType: 'json',
            async:    true,
            success:  success,
            error:    function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.readyState == 4) {
                    $.ambiance({message: chrome.i18n.getMessage("notificationNetworkError"), timeout: 5}); // server
                } else if (XMLHttpRequest.readyState == 0) {
                    $.ambiance({message: chrome.i18n.getMessage("notificationNetworkError"), timeout: 5}); // network connect
                } else {
                    error && error();
                }
            }
        });
    },
    uploadReadFolder:   function () {
        var obj = {};
        try {
            obj = JSON.parse(localStorage['screens_upload_folder_' + nimbus.user_email]);
        } catch (e) {
            obj = {id: 'default', title: 'My Notes'};
        }
        nimbus.user_upload_folder = obj;
        return obj;
    },
    uploadSetFolder:    function (f) {
        nimbus.user_upload_folder = f;
        localStorage['screens_upload_folder_' + nimbus.user_email] = JSON.stringify(f);
    },
    startUploadVideo:   function (pageinfo, blob, channel) {
        if (nimbus.can_upload) {
            nimbus.videoSave(pageinfo, blob, channel);
        } else {
            $.ambiance({message: chrome.i18n.getMessage("notificationReachedLimit"), timeout: 5});
        }
    },
    videoSave:          function (pageinfo, blob, channel) {
        $('#message').hide();
        $('#nsc_linked').hide();
        $('#uploadimg').show();

        var fd = new FormData();
        fd.append("video", blob, ('video.webw'));

        $.ajax({
            url:         "https://sync.everhelper.me/files:preupload",
            type:        "POST",
            data:        fd,
            processData: false,
            contentType: false
        }).done(function (res) {
            if (res.errorCode === 0) {
                nimbus.notesUpdate(pageinfo, res.body.files["video"], 'video', channel);
                $.ambiance({message: chrome.i18n.getMessage("notificationUploaded"), timeout: 5});
            } else {
                $.ambiance({message: chrome.i18n.getMessage("notificationWrong"), type: "error", timeout: 5});
            }
            $('#uploadimg').hide();
        });
    },
    startUploadScreen:  function (pageinfo, imgnewdata, channel) {
        if (nimbus.can_upload) {
            nimbus.uploadFile(pageinfo, imgnewdata, channel);
        } else {
            $.ambiance({message: chrome.i18n.getMessage("notificationReachedLimit"), timeout: 5});
        }
    },
    screenSave:         function (pageinfo, tempname, channel) {
        console.log('tempname', tempname, pageinfo, nimbus.notesGetFileName());
        var share = nimbus.notesIsShared();
        var comment = nimbus.notesGetComment();
        if (channel) {
            comment = comment.match(/([\s|\S]+)?\n\n-----------------([\s|\S]+)/) ? comment.match(/([\s|\S]+)?\n\n-----------------([\s|\S]+)/)[2] : '';
        }
        this.send({
            "action":           "screenshots:save",
            "body":             {
                "screen": {
                    "commentText": comment,
                    "title":       nimbus.notesGetFileName(),
                    "tempname":    tempname,
                    "parent_id":   nimbus.user_upload_folder.id,
                    "url":         pageinfo.url || ''
                },
                "share":  share
            },
            "_client_software": nimbus.client_software

        }, function (msg) {
            $('#nsc_nimbus_folder .nsc-aside-list-selected a').trigger('click');
            if (msg.errorCode == '0') {
                if (share) {
                    $('#nsc_linked').css('display', 'flex').find('input').val(msg.body.location);
                    nimbus_screen.copyTextToClipboard(msg.body.location);
                } else {
                    $('#message').html('<a href="https://nimbus.everhelper.me/client/" target="_blank">' + chrome.i18n.getMessage("nimbusViewUploads") + '</a>').show();
                }
            } else {
                if (msg.errorCode == '-20') {
                    $.ambiance({message: chrome.i18n.getMessage("notificationReachedLimit"), type: "error", timeout: 5});
                } else {
                    $.ambiance({message: chrome.i18n.getMessage("notificationWrong"), type: "error", timeout: 5});
                }
            }
        }, function (msg) {
            console.log(msg);
        });
    },
    setScreenSize:      function (s) {
        nimbus.img_size = s;
    },
    notesGenerateId:    function () {
        var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var string = '';
        var min = 0;
        var max = chars.length;

        for (var i = 0; i < 3; i++) {
            var n = Math.floor(Math.random() * (max - min)) + min;
            string += chars[n];
        }

        return string + (new Date()).getTime();
    },
    notesUpdate:        function (pageinfo, tempname, type, channel) {
        var notesId = nimbus.notesGenerateId();
        var comment = nimbus.notesGetComment();
        if (channel) {
            comment = comment.match(/([\s|\S]+)?\n\n-----------------([\s|\S]+)/) ? comment.match(/([\s|\S]+)?\n\n-----------------([\s|\S]+)/)[2] : '';
        }
        this.send({
            "action": "notes:update",
            "body":   {
                "store": {
                    "notes": [
                        {
                            "global_id":    notesId,
                            "parent_id":    nimbus.user_upload_folder.id,
                            "index":        1,
                            "type":         "note",
                            "role":         "video",
                            "title":        pageinfo.title || '',
                            "text":         comment,
//                            "text": '<img src="http://habr.habrastorage.org/post_images/822/637/d27/822637d27e8d6fe1c384bd490cf261e6.png" alt="image">',
//                            "last_change_by": nimbus.client_software,
                            "url":          pageinfo.url || '',
                            "tags":         ["screens", "chrome"],
                            "attachements": [
                                {
                                    "global_id": nimbus.notesGenerateId(),
                                    "type":      type || "image",
                                    "tempname":  tempname
                                }
                            ]
                        }
                    ]
                }
            }
        }, function (msg) {
            $('#nsc_nimbus_folder .nsc-aside-list-selected a').trigger('click');
            if (nimbus.notesIsShared()) {
                nimbus.notesShare([notesId]);
            } else {
                $('#message').html('<a href="https://nimbus.everhelper.me/client/" target="_blank">' + chrome.i18n.getMessage("nimbusViewUploads") + '</a>').show();
            }
        }, function (error) {
            console.log(error);
        });

    },
    notesIsShared:      function () {
        return LS.nimbus_share;
    },
    notesShare:         function (id) {
        this.send({
            "action": "notes:share",
            "body":   {
                "global_id": id
            }
        }, function (msg) {
            $('#nsc_linked').css('display', 'flex').find('input').val(msg.body[id[0]]);
            nimbus_screen.copyTextToClipboard(msg.body[id[0]]);
        }, function (error) {
            console.log(error);
        });
    },
    notesGet:           function () {
        this.send({
            "action": "notes:get",
            "body":   {
                "last_update_time": 1366090275 // время в формате UNIX timestamp в секундах
            }
        }, function (msg) {
            console.log(msg);
        }, function (error) {
            console.log(error);
        });
    },
    notesRemove:        function () {
        this.send({
            "action": "notes:update",
            "body":   {
                "remove": {
                    "notes": ["0d21377269151318"]
                }
            }
        }, function (msg) {
            console.log(msg);
            nimbus.notesGet();
        }, function (error) {
            console.log(error);
        });
    },
    notesGetComment:    function () {
        return $('#nsc_comment').val();
    },
    notesGetFileName:   function () {
        return $('#nsc_screen_name').val();
    },
    uploadFile:         function (pageinfo, data, channel) {
        $('#message').hide();
        $('#nsc_linked').hide();
        $('#uploadimg').show();

        var format = LS.format || 'png';

        function dataURLtoBlob(dataURL) {
            var binary = atob(dataURL.split(',')[1]);
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type: 'image/' + format});
        }

        var file = dataURLtoBlob(data);
        var fd = new FormData();
        fd.append("screens", file, ('screen.' + format));

        $.ajax({
            url:         "https://sync.everhelper.me/files:preupload",
            type:        "POST",
            data:        fd,
            processData: false,
            contentType: false
        }).done(function (res) {
            if (res.errorCode === 0) {
                nimbus.screenSave(pageinfo, res.body.files["screens"], channel);
                $.ambiance({message: chrome.i18n.getMessage("notificationUploaded"), timeout: 5});
            } else {
                $.ambiance({message: chrome.i18n.getMessage("notificationWrong"), type: "error", timeout: 5});
            }
            $('#uploadimg').hide();
        });
    },
    notesGetFolders:    function (cb) {
        nimbus.send({
            "action": "notes:getFolders",
            "body":   {}
        }, cb, cb);
    },
    kbToMb:             function (size, n, text) {
        return +((size) / 1024 / 1024).toFixed(n || 0) + (!text ? ' MB' : 0);
    },
    server:             {
        user: {
            auth:           function (email, password, cb) {
                (email && password) && nimbus.send({
                    "action":           "user:auth",
                    "body":             {
                        "email":    email,
                        "password": password
                    },
                    "_client_software": nimbus.client_software
                }, cb, cb);

            },
            logout:         function (cb) {
                nimbus.send({
                    "action":           "user:logout",
                    "_client_software": nimbus.client_software
                }, cb, cb);
            },
            register:       function (email, password, cb) {
                (email && password) && nimbus.send({
                    "action":           "user:register",
                    "body":             {
                        "service":   "nimbus",
                        "email":     email,
                        "password":  password,
                        "languages": [navigator.language || navigator.userLanguage]
                    },
                    "_client_software": nimbus.client_software
                }, cb, cb);
            },
            info:           function (cb) {
                nimbus.send({
                    "action":           "user:info",
                    "_client_software": nimbus.client_software
                }, cb, cb);
            },
            authState:      function (cb) {
                nimbus.send({
                    "action":           "user:authstate",
                    "_client_software": nimbus.client_software
                }, cb, cb);
            },
            remindPassword: function (email, cb) {
                email && nimbus.send({
                    "action":           "remind_password",
                    "email":            email,
                    "_client_software": nimbus.client_software
                }, cb, cb);
            }
        }
    },
    show:               {
        folders:      function () {
            nimbus.notesGetFolders(function (res) {
                if (res.errorCode === 0) {
                    var $nimbus_folders = $('#nsc_nimbus_folder');
                    $nimbus_folders.find('li').remove();
                    for (var i = 0, l = res.body.notes.length, folder; i < l; i++) {
                        folder = res.body.notes[i];
                        $nimbus_folders.append(
                            $('<li>').append(
                                    $('<a>', {
                                        'href':    '#',
                                        'title':   folder.title,
                                        'text':    folder.title,
                                        'data-id': folder.global_id
                                    }).on('click', function () {
                                        $(this).closest('ul').find('li').removeClass('nsc-aside-list-selected');
                                        $(this).closest('li').addClass('nsc-aside-list-selected');
                                        nimbus.uploadSetFolder({id: $(this).data('id'), title: $(this).text()});
                                        return false;
                                    })
                                ).append(
                                    $('<span>').attr({
                                        'class':     'nsc-icon nsc-fast-send',
                                        'title':     chrome.i18n.getMessage("tooltipClickToUploadTo") + ' ' + folder.title,
                                        'data-text': folder.title,
                                        'data-id':   folder.global_id
                                    }).on('click', function (e) {
                                        $('#nsc_send').data('channel', $(this).data('id')).trigger('click');
                                        nimbus.uploadSetFolder({id: $(this).data('id'), title: $(this).data('text')});
                                    })
                                )
                        );
                    }
                    $nimbus_folders.find('a[data-id=default]').closest('li').addClass('nsc-aside-list-selected');
                } else {
                    console.log('error');
                }
            });
        },
        limitUsage:   function () {
            $('#nsc_nimbus_usage_text').text(chrome.i18n.getMessage("limitUsage") + ' ' + nimbus.kbToMb(nimbus.info.usage.current, 1) + ' ' + chrome.i18n.getMessage("limitOf") + ' ' + nimbus.kbToMb(nimbus.info.usage.max));
            $('#nsc_nimbus_usage_progress').width(nimbus.info.usage.current / nimbus.info.usage.max * 100);

            nimbus.can_upload = (nimbus.info.usage.current + nimbus.img_size) < nimbus.info.usage.max;

            if (nimbus.can_upload) {
                if (nimbus.info.premium) {
                    $('#nsc_nimbus_upgrade_pro').hide();
                } else {
                    $('#nsc_nimbus_upgrade_pro').show();
                }
                $('#nsc_nimbus_pro').fadeOut('fast');
            } else {
                $('#nsc_nimbus_pro').fadeIn('fast');
            }
        },
        privateShare: function () {
            $('#nsc_nimbus_private_share').prop('checked', !LS.nimbus_share);
        },
        email:        function () {
            $('#nsc_nimbus_email').text(decodeURIComponent(nimbus.user_email));
        },
        init:         function () {
            nimbus.server.user.authState(function (res) {
                if (info.errorCode !== 0 && !res.body && !res.body.authorized) return;

                nimbus.show.limitUsage();
                nimbus.show.folders();
                nimbus.show.privateShare();
                nimbus.show.email();
            });
        }
    },
    init:               function (cb) {
        nimbus.server.user.authState(function (res) {
            if (res.errorCode === 0 && res.body && res.body.authorized) {
                nimbus.server.user.info(function (info) {
                    if (info.errorCode !== 0) return;

                    nimbus.info.premium = !!info.body.premium.active;
                    nimbus.info.usage.current = +info.body.usage.notes.current;
                    nimbus.info.usage.max = +info.body.usage.notes.max;
                    nimbus.user_email = info.body.login;

                    nimbus.uploadReadFolder();

                    nimbus.show.limitUsage();
                    nimbus.show.folders();
                    nimbus.show.privateShare();
                    nimbus.show.email();

                    cb && cb(true);
                });
            } else {
                cb && cb(false);
            }
        });
    }
};

$(document).ready(function () {

    $('#nsc_form_login_nimbus').on("submit",function () {
        var wrong = false;
        var $form = $(this);
        var email = this.elements['email'];
        var password = this.elements['password'];

        if (password.value.length < 8) {
            $(password).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipPassInfo"), type: "error", timeout: 5});
            wrong = true;
        }
        if (!/\S+@\S+\.\S+/.test(email.value)) {
            $(email).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipWrongEmail"), type: "error", timeout: 5});
            wrong = true;
        }

        if (!wrong) {
            nimbus.server.user.auth(email.value, password.value, function (res) {
                if (res.errorCode === 0) {
                    $form.find('input').val('');
                    $('.nsc-popup').hide();
                    nimbus.init();
                    nimbus_screen.togglePanel('nimbus');
                } else {
                    $.ambiance({message: chrome.i18n.getMessage("notificationLoginFail"), type: "error", timeout: 5});
                }
            });
        }
        return false;
    }).find('input').on('keyup', function () {
        $(this).removeClass('wrong');

        if ($(this).val().length < 8 ||
            ($(this).attr('name') == 'email' && !/\S+@\S+\.\S+/.test($(this).val()))) {
            $(this).addClass('wrong');
        }
    });

    $('#nsc_form_register_nimbus').bind("submit",function () {
        var wrong = false;
        var email = this.elements['email'];
        var password = this.elements['password'];
        var password_repeat = this.elements['pass-repeat'];

        if (password.value.length < 8) {
            $(password).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipPassInfo"), type: "error", timeout: 5});
            wrong = true;
        }

        if (password.value !== password_repeat.value) {
            $(password).addClass('wrong');
            $(password_repeat).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipPassMatch"), type: "error", timeout: 5});
            wrong = true;
        }

        if (!/\S+@\S+\.\S+/.test(email.value)) {
            $(email).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipWrongEmail"), type: "error", timeout: 5});
            wrong = true;
        }

        if (!wrong) {
            nimbus.server.user.register(email.value, password.value, function (res) {
                console.log(res);
                if (res.errorCode === 0) {
                    nimbus.server.user.auth(email.value, password.value, function () {
                        $('.nsc-popup').hide();
                        nimbus.init();
                        nimbus_screen.togglePanel('nimbus');
                    });
                } else if (res.errorCode === -4) {
                    $.ambiance({message: chrome.i18n.getMessage("notificationEmailFail"), type: "error", timeout: 5});
                } else {
                    $.ambiance({message: chrome.i18n.getMessage("notificationRegisterFail"), type: "error", timeout: 5});
                }
            });
        }
        return false;
    }).find('input').on('keyup', function () {
        $(this).removeClass('wrong');

        if ($(this).val().length < 8 ||
            ($(this).attr('name') == 'pass-repeat' && $(this).val() !== $(this).closest('form').find("[name='pass']").val()) ||
            $(this).attr('name') == 'email' && !/\S+@\S+\.\S+/.test($(this).val())) {
            $(this).addClass('wrong');

        }
    });

    $('#nsc_form_remind_password_nimbus').on("submit",function () {
        var wrong = false;
        var email = this.elements['email'];

        if (!/\S+@\S+\.\S+/.test(email.value)) {
            $(email).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipWrongEmail"), type: "error", timeout: 5});
            wrong = true;
        }

        if (!wrong) {
            nimbus.server.user.remindPassword(email.value, function (res) {
                if (res.errorCode === 0) {
                    $.ambiance({message: chrome.i18n.getMessage("notificationRestoreSent"), timeout: 5});
                    $('.nsc-popup').hide();
                    $('#nsc_popup_login_nimbus').show()
                        .find('input[name="email"]').val(email.value).end()
                        .find('input[name="password"]').val('').focus();
                } else {
                    $.ambiance({message: chrome.i18n.getMessage("notificationEmailIncorrect"), type: "error", timeout: 5});
                }
            });
        }
        return false;
    }).find('input').bind('keyup', function () {
        $(this).removeClass('wrong');

        if ($(this).val().length < 1 || !/\S+@\S+\.\S+/.test($(this).val())) {
            $(this).addClass('wrong');
        }
    });

    $('#nsc_button_nimbus').click(function () {
        nimbus.init(function (auth) {
            if (!auth) {
                $('#nsc_popup_connect_nimbus').show();
            } else {
                if ($('#nsc_done_nimbus').css('display') == 'flex') {
                    $('#nsc_send').trigger('click');
                } else {
                    nimbus_screen.togglePanel('nimbus');
                }
            }
        });
    });

    $('#nsc_nimbus_logout').on('click', function (e) {
        nimbus.server.user.logout(function (req) {
            $('#nsc_done_nimbus').css('display', 'none');
            if (slackShare.data) {
                $('#nsc_send').data('type', 'slack').trigger('change-type');
            } else {
                $('#nsc_send').data('type', '').trigger('change-type');
            }
        });
    });

    $('.nsc-open-popup-login-nimbus, #nsc_connect_to_nimbus').on('click', function () {
        $('.nsc-popup').hide();
        $('#nsc_popup_connect_nimbus').show();
        return false;
    });

    $('.nsc-open-popup-register-nimbus, #nsc_register_to_nimbus').on('click', function () {
        $('.nsc-popup').hide();
        $('#nsc_popup_register_nimbus').show();
        return false;
    });

    $('.nsc-open-popup-remind-pass-nimbus').on('click', function () {
        $('.nsc-popup').hide();
        $('#nsc_popup_remind_password_nimbus').show();
        return false;
    });

    $('#nsc_go_to_pro').on('click', function (e) {
        window.open('http://nimbus.everhelper.me/pricing.php', '_blank');
        return false;
    });

    $('#nsc_no_go_to_pro').on('click', function (e) {
        $('#nsc_popup_pro').hide();
        return false;
    });

    $('#nsc_connect_to_google').on('click', function (e) {
        $('#nsc_popup_connect_nimbus').hide();
        window.open('https://nimbus.everhelper.me/auth/openidconnect.php?env=app&provider=google', '_blank');
        return false;
    });

    $('#nsc_connect_to_facebook').on('click', function (e) {
        $('#nsc_popup_connect_nimbus').hide();
        window.open('https://nimbus.everhelper.me/auth/openidconnect.php?env=app&provider=facebook', '_blank');
        return false;
    });

});