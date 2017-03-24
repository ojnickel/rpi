'use strict';

var MediaStream = window.MediaStream;

if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
    MediaStream = webkitMediaStream;
}

/*global MediaStream:true */
if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
    MediaStream.prototype.stop = function () {
        this.getAudioTracks().forEach(function (track) {
            track.stop();
        });

        this.getVideoTracks().forEach(function (track) {
            track.stop();
        });
    };
}

var videoRecorder = (function () {
    var $recordRTC = {};
    var $streamVideo = {};
    var $streamAudio = {};
    var $streamElement;
    var $timeStart;
    var $tabCursor;

    var tabSound;
    var micSound;
    var nacl;
    var countdown = 0;
    var timer = null;
    var activeTab = null;

    function onMediaAccess(access) {
        if (access) {
            $streamVideo.active && recordStream($streamVideo)
        } else {
            stopStream();
        }
    }

    function openVideo(url) {
        localStorage.videoUrl = url;
        screenshot.createEditPage('video');
    }

    function initNacl(d, f, g) {
        function h() {
            p.addEventListener("crash", j, true), p.addEventListener("message", k, true)
        }

        function i() {
            p.removeEventListener("message", k, true), p.removeEventListener("crash", j, true)
        }

        function j() {
            b.error("pnacl module crashed", r.lastError), q.onCrash && q.onCrash(r.lastError)
        }

        function k(a) {
            //console.log(a);
            q.onMessage && q.onMessage(a)
        }

        var l = f || "nacl";
        var m = ["<embed ", "width=0 height=0 ", 'src="' + d + '" ', ' type="application/x-' + l + '" />'].join("");
        var n, p = document.createElement("div"), q = {isLoaded: false};
        var r;

        g || (g = document.body);
        q.onMessage = void 0;
        q.onCrash = void 0;

        return q.load = function (cb) {
            function b() {
                p.removeEventListener("load", d, true);
                p.removeEventListener("error", f, true)
            }

            function d() {
                b();
                console.log('resolved');
                cb && cb();
            }

            function f() {
                b();
                console.log(r.lastError);
            }

            if (!n) {
                p.addEventListener("load", d, true),
                    p.addEventListener("error", f, true),
                    h(),
                    p.innerHTML = m,
                    r = p.children[0],
                    g.appendChild(p),
                    p.focus();
            }
        }, q.unload = function () {
            q.isLoaded = false, i(), p.innerHTML = "", g.removeChild(p), r = null, n = null
        }, q.getElement = function () {
            return r;
        }, q.postMessage = function (a) {
            if (!r) throw new Error("not loaded");
            console.log(a);
            r.postMessage(a)
        }, q
    }

    nacl = initNacl('manifest_record.nmf', 'nacl', null);

    function captureUseNacl(audio, video) {
        console.log('captureUseNacl');
        console.log(audio, video);
        nacl.load(function () {
            nacl.postMessage({
                type: 'start',
                data: {
                    audioTrack: audio,
                    videoTrack: video,
                    filename:   "/html5_persistent/nimbus-video.webm"
                }
            });
        });
        iconService.setRec();
        if (video.label !== "Screen") {
            injectionCursor();
        }
    }

    function stopNacl() {
        nacl.postMessage({
            type: 'stop',
            data: {}
        });
        setTimeout(function () {
            nacl.unload();
            var url = 'filesystem:chrome-extension://bpconcjcammlapcogcnnelfmaeghhagj/persistent/nimbus-video.webm';
            openVideo(url);
        }, 1000);
    }

    function recordStream(stream) {
        $streamVideo = stream;
        var audio = stream.getAudioTracks()[0];
        var video = stream.getVideoTracks()[0];

        if (micSound) {
            window.navigator.webkitGetUserMedia({ audio: true}, function (s) {
                console.log(s);
                $streamAudio = s;
                audio = s.getAudioTracks()[0];
                captureUseNacl(audio, video);
            }, function (e) {
                console.log(e);
                chrome.tabs.create({url: 'mic.html'});
            })
        } else {
            console.log('captureUseNacl');
            captureUseNacl(audio, video);

            (function () {
                var v = document.createElement('video');
                document.body.appendChild(v);
                v.setAttribute('autoplay', '');
                v.addEventListener('canplay', function () {
                    console.log('play video');
                }, false);
                v.src = window.URL.createObjectURL(stream);
                $streamElement = v;
            })()
        }
        $timeStart = Date.now();
    }

    function failure_handler(error) {
        console.log(error);
    }

    function countdownRun(cb) {
        (function () {
            function time() {
                iconService.showBadge(countdown || '');
                countdown--;
                if (countdown > -1) {
                    timer = setTimeout(time, 1000);
                } else {
                    timer = null;
                    cb && cb();
                }
            }

            time();
        })()
    }

    function captureTab() {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
            activeTab = tabs[0];
            var constraints = {
                audio:            !micSound && tabSound,
                video:            true,
                videoConstraints: {
                    mandatory: {
                        chromeMediaSource: 'tab',
                        maxWidth:          activeTab.width,
                        maxHeight:         activeTab.height
                    }
                }
            };
            countdownRun(function () {
                chrome.tabCapture.capture(constraints, recordStream);
            })
        });
//        chrome.tabs.getSelected(null, function (tab) {
//            var constraints = {
//                audio:            !micSound && tabSound,
//                video:            true,
//                videoConstraints: {
//                    mandatory: {
//                        chromeMediaSource: 'tab',
//                        maxWidth:          tab.width,
//                        maxHeight:         tab.height
//                    }
//                }
//            };
//            countdownRun(function () {
//                chrome.tabCapture.capture(constraints, recordStream);
//            })
//        });
    }

    function captureDesktop() {
        chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], function (streamId) {
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
                countdownRun(function () {
                    window.navigator.webkitGetUserMedia(obj, recordStream, failure_handler);
                })
            }
        });

    }

    function capture(param) {
        countdown = param.countdown;
        micSound = localStorage.micSound === 'true';
        tabSound = localStorage.tabSound === 'true';
        if (param.type === 'tab') {
            captureTab();
        } else if (param.type === 'desktop') {
            captureDesktop();
        }
    }

    function stopRecord() {
        console.log('stopRecord', timer);
        if (timer) {
            clearInterval(timer);
            iconService.showBadge('');
            countdown = 0;
            timer = null;
        } else {
            stopNacl();
            setTimeout(function () {
                stopStream();
            }, 1000);
            iconService.setDefault();
            $tabCursor && chrome.tabs.sendMessage($tabCursor.id, {cursor: false});
            $tabCursor = null;
            activeTab = null;
        }
    }

    function stopStream() {
        $timeStart = null;

        $streamVideo.active && $streamVideo.stop();
        $streamAudio.active && $streamAudio.stop();

        $streamElement && $streamElement.parentNode.removeChild($streamElement);
        $streamElement = null;
    }

    function getStatus() {
        return timer || !!$streamVideo.active;
    }

    function getTimeRecord() {
        return $timeStart ? (Date.now() - $timeStart) : 0;
    }

    function getRecord() {
        return $recordRTC;
    }

    function injectionCursor() {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            $tabCursor = tabs[0];

            chrome.tabs.insertCSS(tabs[0].id, {file: "css/content-cursor.css"});
            chrome.tabs.executeScript(tabs[0].id, {file: "js/content-cursor.js"}, function () {
                chrome.tabs.sendMessage(tabs[0].id, {cursor: true, cursorAnimate: localStorage.cursorAnimate === 'true'}, function (response) {
                });
            });
        });
    }

    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if (info.status == "complete" && tabs[0].id && tabs[0].id == tabId && $tabCursor) {
                console.log(arguments);
                injectionCursor();
            }
        });
    });

    chrome.tabs.onRemoved.addListener(function (tabId, info) {
        if (activeTab && activeTab.id == tabId) {
            stopRecord();
        }
    });

    chrome.commands.onCommand.addListener(function (command) {
        if (command == 'nimbus-stop-video') {
            stopRecord();
        }
    });

    return {
        capture:        capture,
        captureUseNacl: captureUseNacl,
        stopRecord:     stopRecord,
        getStatus:      getStatus,
        getTimeRecord:  getTimeRecord,
        getRecord:      getRecord,
        onMediaAccess:  onMediaAccess
    }
})();

localStorage.micSound = localStorage.micSound || 'true';
localStorage.tabSound = localStorage.tabSound || 'false';
localStorage.cursorAnimate = localStorage.cursorAnimate || 'true';