"use strict";
var screenshot = {
    path: 'filesystem:chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/temporary/',
    generated: false,
    newwholepage: true,
    enableNpapi: false,
    imgData: null,

    setScreenName: function(cb) {
        LS.screenname = 'screenshot-by-nimbus';

        chrome.tabs.getSelected(null, function(tab) {
            var info = {'url': tab.url, 'title': tab.title, 'time': getTimeStamp()};
            LS.pageinfo = JSON.stringify(info);
            LS.screenname = screenshot.getFileName(info);

            if(typeof cb == 'function') cb(info);
//            name = contentURL.split('?')[0].split('#')[0];
//            if (name) {
//                name = name.replace(/^https?:\/\//, '').replace(/[^A-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^[_\-]+/, '').replace(/[_\-]+$/, '');
//            }
        });

    },
    openPage: function(url) {
        window.open(url);
    },
    dataToBlob: function (dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {type: mimeString});
    },
    createBlob: function(dataURI, name, callback) {
        screenshot.imgData = dataURI;
        var blob = screenshot.dataToBlob(dataURI);

        function onwriteend() {
//            window.open('filesystem:chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/temporary/' + name);
            if (callback) callback(blob.size);
        }

        function errorHandler() {
            console.log('uh-oh');
        }

        window.webkitRequestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
            fs.root.getFile(name, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = onwriteend;
                    fileWriter.write(blob);
                }, errorHandler);
            }, errorHandler);
        }, errorHandler);

    },

    createBlank: function() {

        var canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 800;

        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, 800, 800);

        LS.imgdata = canvas.toDataURL();
        screenshot.createEditPage('blank');
    },
    createEditPage: function(params) {
        var option = params || LS.enableEdit;
        switch (option) {
            case 'copy':
                screenshot.copyToClipboard(LS.imgdata);
                break;
            case 'save':
                screenshot.setScreenName(function (pageinfo) {
                    screenshot.convertBase64To(LS.imgdata, function (data) {
                        screenshot.download({
                            url: data,
                            pageinfo: pageinfo
                        });
                    })
                });
                break;
            case 'edit':
            case 'done':
            default:
                screenshot.setScreenName();
                chrome.tabs.create({url: 'edit.html' + ((option == 'edit') ? '' : ('?' + option))}, function(tab) {
                });
                break;
        }
    },
    init: function() {
    },
    copyToClipboard: function(img) {
    },
    convertBase64To: function(data, cb){
        if (LS.format == 'png') {
                cb(data);
        } else {
            var img = new Image();
            img.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var fonData = ctx.getImageData(0, 0, img.width, img.height);
                var dataurl = canvas.toDataURL('image/' + LS.format, LS.imageQuality/100);
                cb(dataurl);
            };
            img.src = LS.imgdata;
        }
    },
    download: function(data) {
        //TODO bug in Chrome 35 on Ubuntu
        if(/Linux/.test(window.navigator.platform) && /Chrome\/35/.test(window.navigator.userAgent)){
            LS.enableSaveAs = 'false';
        }
        console.log(data.url);
        chrome.downloads.download({
            url: data.url,
            filename: screenshot.getFileName(data.pageinfo, true),
            saveAs: (LS.enableSaveAs !== 'false')
        }, function(downloadId) {
        });
    },
    getFileName: function(pageinfo, format) {
        var s = LS.fileNamePattern || '';
        if (typeof pageinfo == 'object') {
            try {
                s = s.replace(/{url}/, pageinfo.url || '')
                    .replace(/{title}/, pageinfo.title || '')
                    .replace(/{domain}/, pageinfo.url.match(/^[^/]+\/\/([^/]+)/)[1] || '')
                    .replace(/{date}/, pageinfo.time.split(' ')[0] || '')
                    .replace(/{time}/, pageinfo.time.split(' ')[1] || '');
            } catch (e) {
                console.log(s);
            }
        }
        return s.replace(/[\*\|\\\:\"\<\>\?\/]+/ig, ' ') + (format ? ('.' + LS.format) : '');
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
    return    y + '-' + m + '-' + d + ' ' + h + '-' + M + '-' + s;
}

function getBlankData () {
    var canvas = document.createElement('canvas');
    canvas.width = 770;
    canvas.height = 350;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, 770, 350);
    return canvas.toDataURL();
}

var LS = {};

chrome.storage.local.get('firstInstall', function(data) {
    if (!data.firstInstall) {
        chrome.storage.local.set({
            'firstInstall': 'false'
        }, function() {
            window.setTimeout(function () {
                screenshot.openPage(chrome.i18n.getMessage("welcomeUrl"));
            }, 2000);
        });
    }
});