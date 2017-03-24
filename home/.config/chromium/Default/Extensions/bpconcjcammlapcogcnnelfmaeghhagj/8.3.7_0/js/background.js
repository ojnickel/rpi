"use strict";
var plugin = {};

var screenshot = {
    path:                   'filesystem:chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/temporary/',
    generated:              false,
    newwholepage:           true,
    enableNpapi:            false,
    imgData:                null,
    videoRecorder:          videoRecorder,
    selectedOptionFunction: function (callback) {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {file: "js/consentNimbus.js"}, function () {
                callback(tabs[0]);
            });
        });
    },

    detectOS: function () {
//        return /Win||Linux/.test(window.navigator.platform) && !/CrOS/.test(window.navigator.userAgent);
        return screenshot.enableNpapi;
    },

    createMenu:      function () {
        var root = chrome.contextMenus.create({
            "title":    chrome.i18n.getMessage("appName"),
            "contexts": ["all"]
        });

        chrome.contextMenus.create({
            title:    chrome.i18n.getMessage("popupBtnVisible"),
            contexts: ["all"],
            parentId: root,
            onclick:  function () {
                screenshot.captureVisible()
            }
        });

        chrome.contextMenus.create({
            title:    chrome.i18n.getMessage("popupBtnFragment"),
            contexts: ["all"],
            parentId: root,
            onclick:  function () {
                screenshot.captureFragment()
            }
        });

        chrome.contextMenus.create({
            title:    chrome.i18n.getMessage("popupBtnArea"),
            contexts: ["all"],
            parentId: root,
            onclick:  function () {
                screenshot.captureSelected()
            }
        });

        chrome.contextMenus.create({
            title:    chrome.i18n.getMessage("popupBtnScroll"),
            contexts: ["all"],
            parentId: root,
            onclick:  function () {
                screenshot.scrollSelected()
            }
        });

        chrome.contextMenus.create({
            title:    chrome.i18n.getMessage("popupBtnEntire"),
            contexts: ["all"],
            parentId: root,
            onclick:  function () {
                screenshot.captureEntire()
            }
        });

        //if (screenshot.detectOS()) {
        chrome.contextMenus.create({
            title:    chrome.i18n.getMessage("popupBtnWindow"),
            contexts: ["all"],
            parentId: root,
            onclick:  function () {
                screenshot.captureWindow()
            }
        });
        //}

        chrome.contextMenus.create({
            title:    chrome.i18n.getMessage("popupBtnVideo"),
            contexts: ["all"],
            parentId: root,
            onclick:  function () {
                videoRecorder.capture({
                    type:      'tab',
                    countdown: 0
                });
            }
        });

        chrome.contextMenus.create({
            title:    "separator",
            type:     "separator",
            contexts: ["all"],
            parentId: root
        });

        chrome.contextMenus.create({
            title:    chrome.i18n.getMessage("popupBtnOptions"),
            contexts: ["all"],
            parentId: root,
            onclick:  function () {
                chrome.tabs.create({url: 'options.html'}, function (tab) {
                });
            }
        });

    },
    openPage:        function (url) {
        chrome.tabs.create({url: url}, function (tab) {
        });
    },
    captureEntire:   function () {
        var screencanvas = {};
        var tab;

        function sendScrollMessage(tab) {
            screenshot.newwholepage = true;
            screencanvas = {};

            if (scrollToCrop == true) {
                chrome.tabs.sendRequest(tab.id, {msg: 'scrollPage', 'scrollToCrop': true, 'hideFixedElements': (localStorage.hideFixedElements === 'true'), 'xs': xs, 'ys': ys, 'ws': ws, 'hs': hs}, function (response) {
                });
            } else {
                chrome.tabs.sendRequest(tab.id, {msg: 'scrollPage', 'scrollToCrop': false, 'hideFixedElements': (localStorage.hideFixedElements === 'true')}, function (response) {
                });
            }
        }

        if (!screenshot.generated) {
            screenshot.generated = true;
            chrome.extension.onRequest.addListener(function (request, sender, callback) {
                var fn = {'capturePage': capturePage, 'openPage': openPage}[request.msg];
                if (fn) {
                    fn(request, sender, callback);
                }
            });
        }

        function capturePage(data, sender, callback) {
            var z = data.devicePixelRatio || 1;
            var canvas;
            if (screenshot.newwholepage) {
                screenshot.newwholepage = false;
                canvas = document.createElement('canvas');
                var maxSize = 32767;
                var maxArea = 268435456;
                var width = Math.round(Math.min(data.totalWidth, maxSize) * z);
                var height = Math.round(Math.min(data.totalHeight, maxSize) * z);
                if (width * height < maxArea) {
                    canvas.width = width;
                    canvas.height = height;
                } else {
                    canvas.width = width;
                    canvas.height = Math.floor(maxArea / width);
                }
                screencanvas.canvas = canvas;
                screencanvas.ctx = canvas.getContext('2d');
            }

            chrome.tabs.captureVisibleTab(null, {format: localStorage.format, quality: 100}, function (dataURI) {
                if (dataURI) {
                    var image = new Image();
                    image.onload = function () {
                        console.log(data);

                        if (data.scrollToCrop) {
                            screencanvas.ctx.drawImage(
                                image,
                                Math.round(data.x * z),
                                Math.round(data.y_shift * z),
                                Math.round(data.w * z),
                                Math.round(data.h * z),
                                0,
                                Math.round((data.y - data.y_crop) * z),
                                Math.round(data.w * z),
                                Math.round(data.h * z)
                            );
                        } else {
                            screencanvas.ctx.drawImage(
                                image,
                                0,
                                Math.round((data.elem ? (data.h < data.elem.h ? (data.elem.y + (data.elem.h - data.h)) : data.elem.y) : 0) * z),
                                Math.round(data.w * z),
                                Math.round(data.h * z),
                                Math.round(data.x * z),
                                Math.round((data.elem ? (data.y + data.elem.y) : data.y) * z),
                                Math.round(data.w * z),
                                Math.round(data.h * z)
                            );
                        }
                        callback(true);

                    };
                    image.src = dataURI;
                }
            });
        }

        function openPage(data) {
            var z = data.devicePixelRatio || 1;
            var dataurl = screencanvas.canvas.toDataURL('image/' + localStorage.format, localStorage.imageQuality / 100);
            var name = Date.now() + 'screencapture.' + localStorage.format;

            if (scrollToCrop == true) {
                scrollToCrop = false;
            }

            screencanvas.ctx.scale(1 / z, 1 / z);

            screenshot.createBlob(dataurl, name, function () {
                localStorage.imgdata = screenshot.path + name;
                if (saveScroll == true) {
                    saveScroll = false;
                    pathImg = localStorage.imgdata;
                    screenshot.setScreenName(function (pageinfo) {
                        screenshot.download({
                            url:      pathImg,
                            pageinfo: pageinfo
                        });
                    });
                } else if (nimbusScroll) {
                    screenshot.createEditPage('nimbus');
                } else {
                    screenshot.createEditPage();
                }
            });
        }

        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
            tab = tabs[0];
//                chrome.tabs.executeScript(tab.id, {file: "js/jquery.js"}, function () {
            chrome.tabs.executeScript(tab.id, {file: "js/page.js"}, function () {
                sendScrollMessage(tab);
            });
//                });
        });

    },
    setScreenName:   function (cb) {
        localStorage.screenname = 'screenshot-by-nimbus';

        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
            var tab = tabs[0];
//                console.log(tab);
            var info = {'url': tab.url, 'title': tab.title, 'time': getTimeStamp()};
            localStorage.pageinfo = JSON.stringify(info);
            localStorage.screenname = screenshot.getFileName(info);

            if (typeof cb == 'function') cb(info);
        });

    },
    captureSelected: function () {
        chrome.tabs.insertCSS(null, {file: "css/jquery.Jcrop.css"});
        chrome.tabs.insertCSS(null, {file: "css/stylecrop.css"});

        chrome.tabs.executeScript(null, {file: "js/jquery.js"}, function () {
            chrome.tabs.executeScript(null, {file: "js/jquery.Jcrop.js"}, function () {
                chrome.tabs.executeScript(null, {file: "js/crop.js"}, function () {
                    chrome.tabs.captureVisibleTab(null, {format: localStorage.format, quality: 100}, function (img) {
                        localStorage.imgdata = img;

                        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
                            var tab = tabs[0];

                            chrome.tabs.sendRequest(tab.id, {msg: 'crop', image: img});
                        });
                    });
                });
            });
        });

    },

    scrollSelected: function () {
        chrome.tabs.insertCSS(null, {file: "css/jquery.Jcrop.css"});
        chrome.tabs.insertCSS(null, {file: "css/stylecrop.css"});

        chrome.tabs.executeScript(null, {file: "js/jquery.js"}, function () {
            chrome.tabs.executeScript(null, {file: "js/jquery.Jcrop.js"}, function () {
                chrome.tabs.executeScript(null, {file: "js/scrollCrop.js"}, function () {
                })
            })
        })
    },

    fragmentsData: [],

    loadFragments:      function (cb, tab_id) {
        var self = this;
        var load = function (i) {
            var image = new Image();
            image.onload = function () {
                self.fragmentsData[i].image = image;
                check(++i);
            };
            image.src = self.fragmentsData[i].src;
        };

        var check = function (i) {
            if (self.fragmentsData[i] == undefined) {
                cb();
            } else {
                load(i);
            }
        };
        check(0);
    },
    createFullFragment: function (position, zoom, cb, tab_id) {
        var self = this;

        this.loadFragments(function () {
            var canvas = document.createElement('canvas');
            var content = canvas.getContext("2d");
            canvas.width = Math.round(position.w * zoom);
            canvas.height = Math.round(position.h * zoom);
            content.scale(zoom, zoom);

            for (var i = 0, len = self.fragmentsData.length; i < len; i++) {
                content.drawImage(
                    self.fragmentsData[i].image,
                    Math.round(position.x * zoom),
                    0,
                    Math.round(position.w * zoom),
                    Math.round(self.fragmentsData[i].window_size.h * zoom),
                    0,
                    Math.round(self.fragmentsData[i].window_size.y - position.y),
                    Math.round(position.w),
                    Math.round(self.fragmentsData[i].window_size.h)
                );
            }

            cb(canvas.toDataURL('image/' + localStorage.format, localStorage.imageQuality / 100));
        }, tab_id);
    },
    cropFragment:       function (position, window_size, zoom) {
        var self = this;
        chrome.tabs.captureVisibleTab(null, {format: localStorage.format, quality: 100}, function (fragment_data) {
            chrome.tabs.query({active: true/*, lastFocusedWindow: true*/}, function (tabs) {
                var tab = tabs[0];

                if (window_size.y == position.y ||
                    self.fragmentsData.length ||
                    (position.y >= window_size.y && position.y + position.h <= window_size.y + window_size.h)) {

                    self.fragmentsData.push({window_size: window_size, src: fragment_data});
                }

                if (!self.fragmentsData.length &&
                    (position.y < window_size.y || position.y + position.h > window_size.y + window_size.h)) {
                    chrome.tabs.sendMessage(tab.id, {
                        msg:         'capture_fragment_scroll',
                        position:    position,
                        window_size: window_size,
                        scroll:      {
                            x: 0,
                            y: position.y
                        }
                    });
                } else if (self.fragmentsData.length &&
                    position.y + position.h > window_size.y + window_size.h) {
                    chrome.tabs.sendMessage(tab.id, {
                        msg:         'capture_fragment_scroll',
                        position:    position,
                        window_size: window_size,
                        scroll:      {
                            x: 0,
                            y: window_size.y + window_size.h
                        }
                    });
                } else {
                    console.log('createFullFragment');
                    self.createFullFragment(position, zoom, function (image) {
                        var name = Date.now() + 'screencapture.' + localStorage.format;

                        screenshot.createBlob(image, name, function () {
                            localStorage.imgdata = screenshot.path + name;
                            chrome.tabs.sendMessage(tab.id, {
                                msg:         'capture_fragment_set_image',
                                image:       image,
                                position:    position,
                                window_size: window_size
                            });
                        });

                    }, tab.id);
                }
            })
        })
    },
    captureFragment:    function () {
        this.fragmentsData = [];

        chrome.tabs.insertCSS(null, {file: "css/stylecrop.css"});

        chrome.tabs.executeScript(null, {file: "js/jquery.js"}, function () {
            chrome.tabs.executeScript(null, {file: "js/jquery.Jcrop.js"}, function () {
            });
        });

        chrome.tabs.query({active: true/*, lastFocusedWindow: true*/}, function (tabs) {
            var tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, {msg: 'capture_fragment_init'});
        });
    },
    captureVisible:     function () {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
            var tab = tabs[0];
            chrome.tabs.executeScript(tab.id, {file: "js/visible.js"}, function () {
                window.setTimeout(function () {

                    chrome.tabs.captureVisibleTab(tab.windowId, {format: localStorage.format == 'jpg' ? 'jpeg' : 'png', quality: 100}, function (img) {
                        chrome.tabs.sendMessage(tab.id, {msg: 'restore_overflow'});

                        var name = Date.now() + 'screencapture.' + localStorage.format;
                        screenshot.createBlob(img, name, function () {
                            localStorage.imgdata = screenshot.path + name;
                            screenshot.createEditPage();
                        });
                    });

                }, 100);
            });
        });
    },
    captureWindow:      function () {
        screenshot.captureDesctop(function (img) {
            localStorage.imgdata = img;
            screenshot.createEditPage();
        });
    },
    captureDesctop:     function (cb) {
        chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], function (streamId) {
            function success_handler(stream) {
                var v = document.createElement('video');
                v.addEventListener('canplay', function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');

                    canvas.width = v.videoWidth;
                    canvas.height = v.videoHeight;

                    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
                    v.pause();
                    v.src = '';
                    stream.getTracks()[0].stop();
                    v.remove();
                    canvas.remove();

                    cb && cb(canvas.toDataURL());

                }, false);
                v.src = window.URL.createObjectURL(stream);
            }

            function failure_handler(error) {
                console.log(error);
            }

            if (streamId) {
                var obj = {
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource:   "desktop",
                            chromeMediaSourceId: streamId,
                            maxWidth:            2560,
                            maxHeight:           1440
                        }
                    }
                };
                window.navigator.webkitGetUserMedia(obj, success_handler, failure_handler);
            }
        });
    },
//    captureScreenCallback: function (data) {
//        screenshot.createBlob("data:image/bmp;base64," + data, 'screencapture.' + localStorage.format, function () {
//            localStorage.imgdata = screenshot.path + 'screencapture.' + localStorage.format;
//            screenshot.createEditPage();
//        });
//    },
    createBlob:         function (dataURI, name, callback) {
        console.log(name);
        // screenshot.imgData = dataURI;
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        var blob = new Blob([ab], {type: mimeString});

        function onwriteend() {
            // window.open(screenshot.path + name);
            if (callback) callback(blob.size);
        }

        function errorHandler() {
            console.log('uh-oh', arguments);
        }

        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(
            window.TEMPORARY, 200 * 1024 * 1024, function (fs) {
                fs.root.getFile(name, {create: true}, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.onerror = errorHandler;
                        fileWriter.onwriteend = onwriteend;
                        fileWriter.write(blob);
                    }, errorHandler);
                }, errorHandler);
            }, errorHandler);
    },
    createBlank:        function () {
        var canvas = document.createElement('canvas');
        canvas.width = 770;
        canvas.height = 350;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, 770, 350);
        localStorage.imgdata = canvas.toDataURL();
        screenshot.createEditPage('blank');
    },
    createEditPage:     function (params) {
        var option = params || localStorage.enableEdit;
        switch (option) {
            case 'copy':
                screenshot.copyToClipboard(localStorage.imgdata);
                break;
            case 'save':
                screenshot.setScreenName(function (pageinfo) {
//                        screenshot.convertBase64To(localStorage.imgdata, function (data) {
                    screenshot.download({
                        url:      localStorage.imgdata,
                        pageinfo: pageinfo
                    });
//                        })
                });
                break;
            case 'edit':
            case 'done':
            default:
                screenshot.setScreenName();
                chrome.tabs.create({url: 'edit.html' + ((option == 'edit') ? '' : ('?' + option))}, function (tab) {
                });
                break;
        }
    },
    slack:              {
        oauth:        {
            access_token: null
        },
        requestToApi: function (action, param, cb) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.readyState != 4) return;

//                    console.log('req.status', xhr.status);
                if (xhr.status == 200) {
                    var res = JSON.parse(xhr.responseText);
//                        console.log('response', res);
                    cb && cb(null, res)
                } else {
                    cb && cb(true, null)
                }
            };
            xhr.onerror = function (err) {
                console.error(err, null);
            };
            xhr.open('GET', 'https://slack.com/api/' + action + '?' + param, true);
            xhr.send();
        },
        sendData:     function () {
//                console.log(screenshot.slack.oauth.access_token);
            if (screenshot.slack.oauth.access_token) {
                screenshot.slack.requestToApi('channels.list', 'token=' + screenshot.slack.oauth.access_token, function (err, channels) {
                    screenshot.slack.requestToApi('users.list', 'token=' + screenshot.slack.oauth.access_token, function (err, users) {
                        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
                            var tab = tabs[0];
//                                console.log(tab);
                            chrome.tabs.sendRequest(tab.id, {
                                action:   'slack_auth',
                                oauth:    screenshot.slack.oauth,
                                channels: channels.channels,
                                users:    users.members,
                                settings: {
                                    panel:   ((localStorage.slackPanel == undefined || localStorage.slackPanel === 'true') ? true : false),
                                    channel: localStorage.slackChannel || null
                                }
                            });
                        });
                    })
                })
            }
        },
        oauthAccess:  function () {
            chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                if (changeInfo.status == "loading" && /nimbus\.everhelper\.me\/slack\/\?code/.test(tab.url)) {
//                        console.log(tab);
                    var code = tab.url.match(/code=(.+)&/)[1];
                    var client_id = '17258488439.50405596566';
                    var client_secret = '55775ecb78fe5cfc10250bd0119e0fc5';
                    chrome.tabs.remove(tabId);

                    screenshot.slack.requestToApi('oauth.access', 'client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code, function (err, oauth) {
                        screenshot.slack.oauth = oauth;
                        localStorage.slackToken = screenshot.slack.oauth.access_token;
                        screenshot.slack.sendData();
                    })
                }
            });
        },
        init:         function () {
//                screenshot.slack.oauth.access_token = "xoxp-36528459077-36538995330-36528650757-30b9c11c65";

            if (localStorage.slackToken) {
                screenshot.slack.oauth.access_token = localStorage.slackToken;
            }

//                chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//                    if (changeInfo.status == "complete") {
////                        console.log(tab);
//                        screenshot.slack.sendData();
//                    }
//                });

            screenshot.slack.oauthAccess();
        }
    },
    init:               function () {
        screenshot.createMenu();
        screenshot.slack.init();
    },
    copyToClipboard:    function (img) {
//        var text = chrome.i18n.getMessage("notificationCopy");
//        if (!screenshot.enableNpapi || !plugin.saveToClipboard(img)) {
//            text = chrome.i18n.getMessage("notificationWrong");
//        }
//
//        var notification = webkitNotifications.createNotification('favicon.png', chrome.i18n.getMessage("appName"), text);
//        notification.show();
//        window.setTimeout(function() {
//            notification.cancel();
//        }, 5000);
    },
//    convertBase64To: function (data, cb) {
//        if (localStorage.format == 'png') {
//            cb(data);
//        } else {
//            var img = new Image();
//            img.onload = function () {
//                var canvas = document.createElement('canvas');
//                canvas.width = img.width;
//                canvas.height = img.height;
//                var ctx = canvas.getContext('2d');
//                ctx.drawImage(img, 0, 0, img.width, img.height);
////                    var fonData = ctx.getImageData(0, 0, img.width, img.height);
//                var dataurl = canvas.toDataURL('image/' + localStorage.format, localStorage.imageQuality / 100);
//                cb && cb(dataurl);
//            };
//            img.src = data;
//        }
//    },
    download:           function (data) {
        //TODO bug in Chrome 35 on Ubuntu
        if (/Linux/.test(window.navigator.platform) && /Chrome\/35/.test(window.navigator.userAgent)) {
            localStorage.enableSaveAs = 'false';
        }

        chrome.downloads.download({
            url:      data.url,
            filename: screenshot.getFileName(data.pageinfo, true),
            saveAs:   (localStorage.enableSaveAs !== 'false')
        }, function (downloadId) {
            function errorHandler() {
                console.log('uh-oh');
            }

            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(window.TEMPORARY, 200 * 1024 * 1024, function (fs) {
                fs.root.getFile('screencapture.' + localStorage.format, {create: true}, function (fileEntry) {
                    fileEntry.remove(function () {
                        console.log('File removed.');
                    }, errorHandler);
                }, errorHandler);
            }, errorHandler);
        });
    },
    getFileName:        function (pageinfo, format) {
        var s = localStorage.fileNamePattern;
        var f = localStorage.format == 'jpeg' ? 'jpg' : 'png';
        if (typeof pageinfo == 'object') {
            try {
                s = s.replace(/\{url}/, pageinfo.url || '')
                    .replace(/\{title}/, pageinfo.title || '')
                    .replace(/\{domain}/, pageinfo.url.match(/^[^/]+\/\/([^/]+)/)[1] || '')
                    .replace(/\{date}/, pageinfo.time.split(' ')[0] || '')
                    .replace(/\{time}/, pageinfo.time.split(' ')[1] || '');
            } catch (e) {
                console.log(s);
            }
        }
        return s.replace(/[\*\|\\\:\"\<\>\?\/]+/ig, ' ') + (format ? ('.' + f) : '');
    }
};

function getTimeStamp() {
    var y, m, d, h, M, s;
    var time = new Date();
    y = time.getFullYear();
    m = time.getMonth() + 1;
    d = time.getDate();
    h = time.getHours();
    M = time.getMinutes();
    s = time.getSeconds();
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    if (h < 10) h = '0' + h;
    if (M < 10) M = '0' + M;
    if (s < 10) s = '0' + s;
    return y + '-' + m + '-' + d + ' ' + h + '-' + M + '-' + s;
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.msg == 'cut') {
        localStorage.imgdata = request.img;
        screenshot.createEditPage();
    } else if (request.msg == 'crop_fragment') {
        screenshot.cropFragment(request.position, request.window_size, request.zoom)
    } else if (request.msg == 'save_fragment') {
        pathImg = localStorage.imgdata;
        screenshot.setScreenName(function (pageinfo) {
            screenshot.download({
                url:      pathImg,
                pageinfo: pageinfo
            });
        });
    } else if (request.msg == 'save_image') {
        screenshot.setScreenName(function (pageinfo) {
            screenshot.download({
                url:      request.data,
                pageinfo: pageinfo
            });
        });
    } else if (request.msg === 'openeditpagepage') {
        screenshot.createEditPage();
    } else if (request.msg === 'copytoclipboard') {
        screenshot.copyToClipboard(request.img)
    } else if (request.msg === 'sendtonimbus') {
        localStorage.imgdata = request.img;
        screenshot.createEditPage('nimbus');
    } else if (request.msg === 'openpage') {
        screenshot.openPage(request.url);
    } else if (request.msg === 'getformat') {
        sendResponse({
            format:  localStorage.format,
            quality: localStorage.imageQuality
        });
    } else if (request.msg === 'saveCropPosition') {
        localStorage.cropPosition = JSON.stringify(request.position);
    } else if (request.msg === 'getCropPosition') {
        sendResponse((localStorage.saveCropPosition === 'true') && JSON.parse(localStorage.cropPosition));
    } else if (request.msg === 'saveCropScrollPosition') {
        localStorage.cropScrollPosition = JSON.stringify(request.position);
    } else if (request.msg === 'getCropScrollPosition') {
        var res = {};
        if (localStorage.saveCropPosition === 'true') {
            res = JSON.parse(localStorage.cropScrollPosition);
        }
        res.hideFixedElements = (localStorage.hideFixedElements === 'true');
        sendResponse(res);
    } else if (request.msg === 'get_file_name') {
        request.pageinfo.time = getTimeStamp();
        sendResponse(screenshot.getFileName(request.pageinfo, false));
    } else if (request.msg === 'set_setting') {
        localStorage[request.key] = request.value;
    } else if (request.msg === 'get_setting') {
        sendResponse(localStorage[request.key]);
    } else if (request.msg === 'slack_logout') {
        screenshot.slack.oauth.access_token = null;
        localStorage.slackToken = null;
    } else if (request.msg === 'enable_save_as') {
        sendResponse(localStorage.enableSaveAs);
    } else if (request.msg === 'get_slack_data') {
        if (screenshot.slack.oauth.access_token) {
            screenshot.slack.requestToApi('channels.list', 'token=' + screenshot.slack.oauth.access_token, function (err, channels) {
                screenshot.slack.requestToApi('users.list', 'token=' + screenshot.slack.oauth.access_token, function (err, users) {
                    sendResponse({
                        action:   'slack_auth',
                        oauth:    screenshot.slack.oauth,
                        channels: channels.channels,
                        users:    users.members,
                        settings: {
                            panel:   ((localStorage.slackPanel == undefined || localStorage.slackPanel === 'true') ? true : false),
                            channel: localStorage.slackChannel || null
                        }
                    });
                });
            });
            return true;
        }
    }
});

// these variables are responsible for the ability of all functions
var onTabRealy, onClassHas;
//these variables are responsible for the operation of each function in separate tabs
var thisCrop, thisFragment, thisEr, thisScrollCrop;
//These variables are parameters which are responsible for a function to scroll
var xs, ys, ws, hs, scrollToCrop = false, saveScroll = false, pathImg, nimbusScroll = false;

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {

    if (request.operation == 'cap') {
        xs = request.xs;
        ys = request.ys;
        ws = request.ws;
        hs = request.hs;
    }

    if (request.operation == 'cropScroll') {
        scrollToCrop = true;
        screenshot.captureEntire()
    }

    if (request.operation == 'nimbusScroll') {
        nimbusScroll = true;
        scrollToCrop = true;
        screenshot.captureEntire()
    }

    if (request.operation == 'saveScroll') {
        scrollToCrop = true;
        saveScroll = true;
        screenshot.captureEntire();
    }

    if (request.operation == 'onTab') {
        onTabRealy = request.parameter;
        onClassHas = 'classHas';
    }

    if (request.operation == 'Fragment') {
        thisFragment = request.parameter;
    }

    if (request.operation == 'Crop') {
        thisCrop = request.parameter;
    }

    if (request.operation == 'Er') {
        thisEr = request.parameter;
    }

    if (request.operation == 'Scroll') {
        thisScrollCrop = request.parameter;
    }
    if (request.operation == 'hotkeys') {
        sendResponse({hotkeys: localStorage.hotkeys});
    } else if (request.operation == 'hotkey') {
        if (request.name == 'visible') {
            screenshot.captureVisible();
        }
        if (request.name == 'fragment') {
            screenshot.captureFragment();
        }
        if (request.name == 'selected') {
            screenshot.captureSelected();
        }
        if (request.name == 'scroll') {
            screenshot.scrollSelected();
        }
        if (request.name == 'entire') {
            screenshot.captureEntire();
        }
        if (request.name == 'window') {
            screenshot.captureWindow();
        }
    }
});

if (localStorage.hotkeys) {
    var hotkeys = JSON.parse(localStorage.hotkeys);
    localStorage.hotkeys = JSON.stringify({
        visible:  hotkeys.visible || 49,
        fragment: hotkeys.fragment || 54,
        selected: hotkeys.selected || 50,
        scroll:   hotkeys.scroll || 54,
        entire:   hotkeys.entire || 52,
        window:   hotkeys.window || 53
    });
} else {
    localStorage.hotkeys = JSON.stringify({visible: '49', fragment: '54', selected: '50', scroll: '51', entire: '52', window: '53'});
}

localStorage.format = localStorage.format || 'png';
localStorage.imageQuality = localStorage.imageQuality || '92';
localStorage.enableEdit = localStorage.enableEdit || 'edit';
localStorage.quickCapture = localStorage.quickCapture || 'false';
localStorage.enableSaveAs = localStorage.enableSaveAs || 'true';
localStorage.saveCropPosition = localStorage.saveCropPosition || 'false';
localStorage.hideFixedElements = localStorage.hideFixedElements || 'true';
localStorage.cropPosition = localStorage.cropPosition || JSON.stringify({"x": 50, "y": 50, "x2": 450, "y2": 250, "w": 400, "h": 200});
localStorage.cropScrollPosition = localStorage.cropScrollPosition || JSON.stringify({"x": 50, "y": 50, "x2": 450, "y2": 250, "w": 400, "h": 200});
localStorage.fileNamePattern = localStorage.fileNamePattern || 'screenshot-{domain}-{date}-{time}';

chrome.storage.sync.get('nimbus_screenshot_first_install', function (data) {
    if (!data.nimbus_screenshot_first_install) {
        chrome.storage.sync.set({'nimbus_screenshot_first_install': true}, function () {
            screenshot.openPage('http://nimbus-screenshot.everhelper.me/install.php');
        });
    }
});

window.onload = function () {
    screenshot.init();
};

chrome.runtime.setUninstallURL('https://nimbus.everhelper.me/screenshot-uninstall/');

//chrome.management.onUninstalled.addListener(function (id) {
//    chrome.tabs.create({url: 'https://nimbus.everhelper.me/screenshot-uninstall/'});
//});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete" && /everhelper\.me\/auth\/openidconnect/.test(tab.url) && /###EVERFAUTH:/.test(tab.title)) {
        var json = JSON.parse(tab.title.match(/###EVERFAUTH:(.+)/)[1]);
        json.action = 'nimbus_auth';
        console.log(json);

        chrome.tabs.remove(tabId);
        chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.sendRequest(tabs[i].id, json);
            }
        });
    }
});

//chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
//    console.log(token);
//    chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
//        var tab = tabs[0];
//        chrome.tabs.sendRequest(tab.id, {
//            action:     'google_auth',
//            authorized: typeof token !== 'undefined'
//        });
//    });
//});

//
//chrome.commands.getAll(function(command) {
//    console.log('getAll:', command);
//});


