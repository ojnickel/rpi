'use strict';

var service = analytics.getService('screens_chrome');
var tracker = service.getTracker('UA-67774717-13');
tracker.sendAppView('MainView');
var SLACK_UPLOAD = analytics.EventBuilder.builder().category('screenshot').action('uploadSlack');

var LS = {};
var nimbus_screen = {
    canvasManager:       null,
    dom:                 {},
    info:                {
        win_zoom:            window.devicePixelRatio || 1,
        file:                {
            size: 0
        },
        first_canvas_width:  null,
        first_canvas_height: null
    },
    locationParam:       function () {
        var p = window.location.href.match(/\?(\w+)$/);
        return (p && p[1]) || '';
    },
    kbToMb:              function (size, n) {
        return ((size) / 1024 / 1024).toFixed(n || 0) + ' MB';
    },
    copyTextToClipboard: function (text) {
        $('body').append('<textarea id="textarea_for_copy"/>');
        var $textarea = $('#textarea_for_copy');
        $textarea.text(text).select();
        document.execCommand('copy');
        $textarea.remove();
        $.ambiance({message: chrome.i18n.getMessage("notificationUrlCopied")});
    },
    setOptions:          function () {
        $("#line-width").val(LS.setting.width);
        $('#line-width-styler').find('.text').text(LS.setting.width + 'px').removeAttr('class').addClass("text line_width" + LS.setting.width);
        $('#numbers').addClass((LS.enablenumbers) ? 'enable' : '');
        $("#fillcolor").spectrum({
            color:       LS.fillColor,
            showAlpha:   true,
            showButtons: false,
            move:        function (color) {
                nimbus_screen.canvasManager.changeFillColor(color.toRgbString());
            }
        });
        $("#strokecolor").spectrum({
            color:       LS.setting.color,
            showAlpha:   true,
            showButtons: false,
            move:        function (color) {
                nimbus_screen.canvasManager.changeStrokeColor(color.toRgbString());
            }
        });
    },
    getEditCanvasSize:   function () {
        var width = nimbus_screen.dom.$edit_canvas.width();
        var height = nimbus_screen.dom.$edit_canvas.height();
        if (nimbus_screen.info.first_canvas_width == null) {
            nimbus_screen.info.first_canvas_width = width;
        }
        if (nimbus_screen.info.first_canvas_height == null) {
            nimbus_screen.info.first_canvas_height = height;
        }

        return {w: width, h: height, fW: nimbus_screen.info.first_canvas_width, fH: nimbus_screen.info.first_canvas_height};
    },
    initScreenPage:      function (data) {
        nimbus_screen.dom.$edit_canvas = $("#editcanva");
        nimbus_screen.dom.$edit_image = $('#imageedit');
        nimbus_screen.dom.$button_done = $("#done");

        nimbus_screen.dom.$edit_canvas.width(nimbus_screen.dom.$edit_image.width() / nimbus_screen.info.win_zoom).height(nimbus_screen.dom.$edit_image.height() / nimbus_screen.info.win_zoom);
        nimbus_screen.dom.$edit_image.hide();

        nimbus_screen.canvasManager = nimbus_screen.dom.$edit_canvas.canvasPaint();
        nimbus_screen.canvasManager.loadBackgroundImage(data, function () {
            nimbus_screen.canvasManager.autoZoom();

            if (nimbus_screen.locationParam() === 'done' || nimbus_screen.locationParam() === 'nimbus') {
                nimbus_screen.dom.$button_done.click();
                if (nimbus_screen.locationParam() === 'nimbus') {
                    nimbus.init(function (auth) {
                        if (!auth) {
                            $('#nsc_popup_connect_nimbus').show();
                        }
                    });
                }
            }
        });
        nimbus_screen.canvasManager.changeStrokeSize(LS.setting.width);
        nimbus_screen.canvasManager.changeStrokeColor(LS.setting.color);
        nimbus_screen.canvasManager.changeFillColor(LS.fillColor);
        nimbus_screen.canvasManager.changeShadow(LS.shadow);
        nimbus_screen.canvasManager.setEnableNumbers(LS.enablenumbers);
        nimbus_screen.canvasManager.setFontFamily(LS.font.family);
        nimbus_screen.canvasManager.setFontSize(LS.font.size);

        $('[data-tool-id]').closest('select, button').on('set-default-tool', function () {
            var tool = $(this).find(':selected').data('tool-id');
            if (this.tagName == 'BUTTON') {
                tool = $(this).find('span').data('tool-id');
            }
            console.log()
            nimbus_screen.canvasManager.setTool(tool);
            localStorage.defaultTool = tool;
        });

        window.setTimeout(function () {
            if (localStorage.defaultTool) {
                nimbus_screen.canvasManager.setTool(localStorage.defaultTool);
                var $option = $('[data-tool-id=' + localStorage.defaultTool + ']');
                $option.closest('select').next('.jqselect').find('li.' + $option[0].className).trigger('click');
            }
        }, 50);

        if (nimbus_screen.locationParam() === 'blank') {
            $('.add-img').show();
            if (!LS.disableHelper) {
                $('#capture-windows-helper').fadeIn(100);
            }
        } else {
            $('#drop-file').remove();
        }

    },
    togglePanel:         function (panel) {
        $('#nsc_send').data('type', panel).trigger('change-type');
        $('#nsc_done_slack').css('display', panel == 'slack' ? 'flex' : 'none');
        $('#nsc_done_nimbus').css('display', panel == 'nimbus' ? 'flex' : 'none');
        chrome.extension.sendMessage({msg: 'set_setting', key: 'nimbusPanel', value: panel == 'nimbus'});
        chrome.extension.sendMessage({msg: 'set_setting', key: 'slackPanel', value: panel == 'slack'});
    }
};

(function (data) {
    LS.imgdata = data.imgdata;
    LS.screenname = data.screenname;
    LS.pageinfo = JSON.parse(data.pageinfo || '{}');
    LS.format = data.format || 'png';
    LS.imageQuality = data.imageQuality || '92';
    LS.fillColor = data.fillColor || 'rgba(0,0,0,0)';
    LS.setting = JSON.parse(data.setting || '{"width": 5, "color": "#f00"}');
    LS.shadow = JSON.parse(data.shadow || '{"enable": true, "color": "#000000", "blur": 5 }');
    LS.enablenumbers = data.enablenumbers === 'true';
    LS.google_upload_folder = JSON.parse(data.google_upload_folder || '{"id":"root","title":"Main folder"}');
    LS.nimbus_share = data.nimbus_share !== 'false';
    LS.disableHelper = data.disableHelper === 'true';
    LS.font = JSON.parse(data.font || '{"family": "Arial", "size": 35}');
    LS.shareOnGoogle = data.shareOnGoogle === 'true';
})(localStorage);

$(function () {

    var imgdata = LS.imgdata;
    var screenname = LS.screenname;
    var pageinfo = LS.pageinfo;
    var imgnewdata = null;
    var image = $('#imageedit');
    var canvasManager;
    var jcrop;
    var tools = '#shape-styler';
    var google_auth = false;
    var google_auth_token = null;
    var param = (function () {
        var p = window.location.href.match(/\?(\w+)$/);
        return (p && p[1]) || '';
    })();
    var videoBlob;

    var manifest = chrome.runtime.getManifest();

    var $nsc_redactor_page = $('#nsc_redactor_page');
    var $nsc_done_page = $('#nsc_done_page');
    var resizeimg = $(".drop.resize_image");
    var $nsc_linked = $('#nsc_linked');

    $('#nimbus_limit_free_account_go').on('click', function () {
        window.open('http://nimbus.everhelper.me/pricing.php', '_blank');
    });

    $('.nsc-popup-close, #nimbus_limit_free_account_no').on('click', function () {
        $(this).closest('.nsc-popup').hide();
    });

    if (localStorage.version != manifest.version) {
        $('#new_release_popup').show(function () {
            localStorage.version = manifest.version;
        });
    }

    $(window).resize(function () {
        if (nimbus_screen.canvasManager) {
            nimbus_screen.canvasManager.zoom(true);
        }
    });

    function destroyCrop() {
        if (jcrop) {
            jcrop.destroy();
            jcrop = undefined;

            if ($('#forcrop')) {
                $('#forcrop').remove()
            }
            $('#crop').removeClass('active');
            $(tools).addClass('active');
        }
    }

    function disableActive(btn) {
        $('#editpanel').find('button').removeClass('active');
        $('#editpanel').find('.jq-selectbox').removeClass('active');
        $(btn).addClass('active');
        if ($(btn).attr('id') !== 'crop') tools = btn;
        $("#resize").removeClass('active');
        $(".drop").removeClass('open');
    }

    function newImage(img, cb) {
        imgdata = img;
        nimbus_screen.canvasManager.undoAll();
        nimbus_screen.canvasManager.loadBackgroundImage(img, function () {
            nimbus_screen.canvasManager.autoZoom();
            cb && cb();
        });
        $('#drop-file').hide();
    }

    function addFileAddEvents() {
        window.addEventListener('paste', function (event) {
            if (!!imgnewdata) return true;
            try {
                var items = (event.clipboardData || event.originalEvent.clipboardData).items;

                if (!items[0].type.match('image.*')) {
                    $.ambiance({message: chrome.i18n.getMessage("notificationWrongInsert"), timeout: 1});
                    return true;
                }

                var blob = items[0].getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    newImage(event.target.result);
                };
                reader.readAsDataURL(blob);
            } catch (e) {
                console.log(e);
            }
        });

        function handleFileSelect(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.target.files || (evt.dataTransfer && evt.dataTransfer.files);

            for (var i = 0, f; f = files[i]; i++) {
                if (!f.type.match('image.*')) {
                    $.ambiance({message: chrome.i18n.getMessage("notificationInsertInfo"), timeout: 1});
                    continue;
                }

                screenname = f.name.replace(/\.[^.]+$/, "");
                var reader = new FileReader();

                reader.onload = (function (theFile) {
                    return function (e) {
                        newImage(e.target.result);
                    };
                })(f);

                reader.readAsDataURL(f);
            }
            return false;
        }

        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
//                evt.dataTransfer.dropEffect = 'copy';
            $(this).addClass('drop');
        }

        function handleDragEnd(evt) {
            $(this).removeClass('drop');
        }

        var dropZone = document.getElementById('editcanva');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);
        dropZone.addEventListener('drop', handleDragEnd, false);
        dropZone.addEventListener('dragleave', handleDragEnd, false);

        document.getElementById('file-open').addEventListener('change', handleFileSelect, false);

        $('#open-image').on('click', function () {
            $('#file-open').click();
        });

        $('#capture-windows, #capture-desktop').click(function () {
            var bgScreen = chrome.extension.getBackgroundPage().screenshot;
            bgScreen.captureDesctop(function (data) {
                newImage(data);
            });
        });

        $('#create-blank').click(function () {
            $('#drop-file').hide();
        })
    }

    function addEvents() {
        var mousemove_event;

        document.onmousemove = function (e) {
            mousemove_event = e;
        };

        document.onkeydown = function (e) {
            var k = e.keyCode;

            if (k == 37 /*left*/ || k == 38 /*up*/ || k == 39 /*right*/ || k == 40 /*down*/) {
                nimbus_screen.canvasManager.move(k);
            }
            if (k == 46) {
                nimbus_screen.canvasManager.delete();
            }
            if (e.ctrlKey) {
                if (k == 86) { // V
//                    console.log('paste');
                    nimbus_screen.canvasManager.paste(mousemove_event);
                    e.preventDefault();
                    return false;
                }
                if (k == 67) { // C
//                    console.log('copy');
                    nimbus_screen.canvasManager.copy(mousemove_event);
                    e.preventDefault();
                    return false;
                }
                if (k == 90) {
                    nimbus_screen.canvasManager.undo();
                    e.preventDefault();
                    return false;
                }
                if (k == 89) {
                    nimbus_screen.canvasManager.redo();
                    e.preventDefault();
                    return false;
                }
            }
            return true;
        };

        $('#editpanel button:not(#crop)').click(function () {
            destroyCrop()
        });

        $('#nsc_button_back').click(function () {
            imgnewdata = null;
            $nsc_redactor_page.show();
            $nsc_done_page.hide();
            $('html, body').css('height', 'auto');
        });

        $("#done").click(function () {
            $('html, body').css('height', '100%');
            $('#message').hide();
            $nsc_linked.hide();
            $nsc_done_page.show();
            $nsc_redactor_page.hide();

            slackShare.init();
            nimbus.init();

            nimbus_screen.canvasManager.done();

            var canvaFon = document.getElementById("canvasfon");
            var canvaBg = document.getElementById("canvasbg");
            var oCanvas = document.createElement('canvas');
            var z = window.devicePixelRatio || 1;
            var w = canvaFon.width * z;
            var h = canvaFon.height * z;

            $('#nsc_indicator_size span').text(w + ' ✖ ' + h);

            oCanvas.width = w;
            oCanvas.height = h;

            var ctx = oCanvas.getContext('2d');
            ctx.drawImage(canvaFon, 0, 0, w, h);
            ctx.drawImage(canvaBg, 0, 0, w, h);

            var $nsc_preview_img = $('#nsc_preview_img');
            var $nsc_indicator = $('#nsc_indicator');
//            var $nsc_main_title = $('#nsc_main_title');
            var name = (new Date()).getTime() + 'screensave.';
            var format = LS.format || 'png';

            name += format;
            imgnewdata = oCanvas.toDataURL('image/' + format, LS.imageQuality / 100);

            var bgScreen = chrome.extension.getBackgroundPage().screenshot;
            var path = bgScreen.path + name;
            bgScreen.createBlob(imgnewdata, name, function (size) {
//                $nsc_main_title.attr('href', path);
                $nsc_preview_img.attr('src', path);
                showFileSize(size);
                nimbus_screen.info.file.size = size;

                window.setTimeout(function () {
                    var max_width = 200;
                    if ($nsc_preview_img.width() > 200) {
                        max_width = $nsc_preview_img.width();
                    }
                    $nsc_indicator.css({'max-width': max_width});
                }, 300);

                chrome.extension.sendMessage({msg: 'enable_save_as'}, function (enable_save_as) {
                    console.log('enable_save_as', enable_save_as);
                    if (enable_save_as === 'true') {

                        $("#nsc_button_save_image").append('<div id="flash-save"></div>');
                        var g = "10", h = null, i = {
                            data:          imgnewdata.split(",")[1].replace(/\+/g, "%2b"),
                            dataType:      "base64",
                            filename:      screenname + '.' + (format == 'jpeg' ? 'jpg' : 'png'),
                            downloadImage: "images/pattern.png",
                            width:         100,
                            height:        35
                        }, j = {allowScriptAccess: "always"}, k = {id: "CreateSaveWindow", name: "CreateSaveWindow", align: "middle"};
                        swfobject.embedSWF("swf/CreateSaveWindow.swf", "flash-save", "100", "35", g, h, i, j, k);

                        $("#nsc_main_title").append('<div id="flash-save-title"></div>');
                        i.width = 276;
                        i.height = 36;
                        swfobject.embedSWF("swf/CreateSaveWindow.swf", "flash-save-title", "276", "36", g, h, i, j, k);

                    }
                });

            });

            // chrome.identity.getAuthToken({ 'interactive': false }, function (token) {
            //     if (typeof token !== 'undefined') {
            //         google_auth = true;
            //         setUploadFolderTooltip();
            //     }
            // });

            nimbusAccountPopup.init();
        });

        $("#resize").click(function () {
            if ($('#resize-img').is(':visible')) {
                $("#resize").removeClass('active');
                resizeimg.removeClass('open');
            } else {
                $("#resize").addClass('active');
                var size = nimbus_screen.getEditCanvasSize();
                $('#img-width').val(size.w);
                $('#img-height').val(size.h);
                resizeimg.addClass('open');
            }
        });

        $('#resize-cancel').click(function () {
            $("#resize").removeClass('active');
            resizeimg.removeClass('open');
            return false;
        });

        $("#resize-img").find('form').submit(function () {
            var w = this.width.value;
            var h = this.height.value;
            nimbus_screen.canvasManager.changeSize(w * 1, h * 1);
            $("#resize").removeClass('active');
            resizeimg.removeClass('open');
            return false;
        });

        $("#font").click(function () {
            function hide() {
                $("#font").removeClass('active');
                $('.drop.tools_font').removeClass('open');
            }

            if ($('#tools-font').is(':visible')) {
                hide();
            } else {
                $("#font").addClass('active');
                //var f = canvasManager.getFont();
                //$('#font-width').val(s.blur);
                //$('#enable-font').prop("checked", s.enable).trigger('refresh');
                //$('#colorfont').val(s.color).trigger('refresh');
                //$('#colorfont-styler').find('.text').css('background-color', s.color);
                $('.drop.tools_font').addClass('open');
                $('#editcanva').one('mousedown', function () {
                    hide();
                })
            }
        });

        $('#font-width').on('change', function () {
            nimbus_screen.canvasManager.setFontSize(+this.value);
        });

        $('#tools-font .font-list div').on('click', function () {
            nimbus_screen.canvasManager.setFontFamily($(this).data('font'));
        });

        $("#shadow").click(function () {
            function hide() {
                $("#shadow").removeClass('active');
                $('.drop.tools_shadow').removeClass('open');
            }

            if ($('#tools-shadow').is(':visible')) {
                hide();
            } else {
                $("#shadow").addClass('active');
                var s = nimbus_screen.canvasManager.getShadow();
                $('#shadow-width').val(s.blur);
                $('#enable-shadow').prop("checked", s.enable).trigger('refresh');
                $('#colorshadow').val(s.color).trigger('refresh');
                $('#colorshadow-styler').find('.text').css('background-color', s.color);
                $('.drop.tools_shadow').addClass('open');
                $('#editcanva').one('mousedown', function () {
                    hide();
                })
            }
        });

        function getShadowParam() {
            return {
                enable: $('#enable-shadow').prop("checked"),
                blur:   $('#shadow-width').val(),
                color:  $('#colorshadow').val()
            }
        }

        $('#shadow-width').on('change', function () {
            LS.shadow = getShadowParam();
            nimbus_screen.canvasManager.changeShadow(LS.shadow, 'blur');
        });

        $('#enable-shadow').on('change', function () {
            LS.shadow = getShadowParam();
            nimbus_screen.canvasManager.changeShadow(LS.shadow, 'enable');
        });

        $('#colorshadow').on('change', function () {
            LS.shadow = getShadowParam();
            nimbus_screen.canvasManager.changeShadow(LS.shadow, 'color');
            $('#colorshadow-styler').find('.text').css('background-color', LS.shadow.color);
        });

        $('.percent').change(function () {
            destroyCrop();
            var z = +this.value;
            nimbus_screen.canvasManager.zoom(z);
            return false;
        });

        $("#zoomminus").click(function () {
            var z = nimbus_screen.canvasManager.getZoom();
            if (z > 0.25) {
                z -= 0.25;
            }
            $(".percent").val(z);
            $(".percent").trigger('refresh');
            nimbus_screen.canvasManager.zoom(z);
        });

        $("#zoomplus").click(function () {
            var z = nimbus_screen.canvasManager.getZoom();
            if (z < 2) {
                z += 0.25;
            }
            $(".percent").val(z);
            $(".percent").trigger('refresh');
            nimbus_screen.canvasManager.zoom(z);
        });

        $('#img-width').on('input', function () {
            if ($('#proportional').attr('checked')) {
                var size = nimbus_screen.getEditCanvasSize();
                $('#img-height').val(Math.round(this.value * size.h / size.w));
            }
        });

        $('#img-height').on('input', function () {
            if ($('#proportional').attr('checked')) {
                var size = nimbus_screen.getEditCanvasSize();
                $('#img-width').val(Math.round(this.value * size.w / size.h));
            }
        });

        $('#proportional-styler').click(function () {
            if ($('#proportional').attr('checked')) {
                var firstSize = nimbus_screen.getEditCanvasSize();
                $('#img-width').val(firstSize.fW);
                $('#img-height').val(firstSize.fH);
            }
        });

        $('#pens-styler, #pens-styler .text').click(function () {
            var value = $('#pens').val();
            switch (value) {
                case 'pen':
                    nimbus_screen.canvasManager.activatePen();
                    break;
                case 'highlight':
                    nimbus_screen.canvasManager.activateHighlight();
                    break;
            }
            $(this).find('.text').removeAttr('class').addClass('text').addClass(value);
            destroyCrop();
            disableActive($('#pens-styler'));
            return false;
        }).contextmenu(function (e) {
            if (confirm('Set by default?')) {
                $(e.target).click();
                $('#pens').trigger('set-default-tool');
            }
            return false;
        });

        $('#shape-styler, #shape-styler .text').click(function () {
            var value = $('#shape').val();
            switch (value) {
                case 'rectangle':
                    nimbus_screen.canvasManager.activateEmptyRectangle();
                    break;
                case 'rounded_rectangle':
                    nimbus_screen.canvasManager.activateRoundedRectangle();
                    break;
                case 'sphere':
                    nimbus_screen.canvasManager.activateEmptyCircle();
                    break;
                case 'ellipse':
                    nimbus_screen.canvasManager.activateEllipse();
                    break;
            }
            $(this).find('.text').removeAttr('class').addClass('text').addClass(value);
            destroyCrop();
            disableActive($('#shape-styler'));
            return false;
        }).contextmenu(function (e) {
            if (confirm('Set by default?')) {
                $(e.target).click();
                $('#shape').trigger('set-default-tool');
            }
            return false;
        });

        $('#arrow-styler, #arrow-styler .text').click(function (e) {
            var value = $('#arrow').val();
            switch (value) {
                case 'arrow_line':
                    nimbus_screen.canvasManager.activateArrow();
                    break;
                case 'arrow_curve':
                    nimbus_screen.canvasManager.activateCurveArrow();
                    break;
                case 'arrow_double':
                    nimbus_screen.canvasManager.activateDoubleArrow();
                    break;
                case 'line':
                    nimbus_screen.canvasManager.activateLine();
                    break;
                case 'line_curve':
                    nimbus_screen.canvasManager.activateCurveLine();
                    break;
                case 'line_dotted':
                    nimbus_screen.canvasManager.activateDottedLine();
                    break;
            }
            $(this).find('.text').removeAttr('class').addClass('text').addClass(value);
            destroyCrop();
            disableActive($('#arrow-styler'));
            return false;
        }).contextmenu(function (e) {
            if (confirm('Set by default?')) {
                $(e.target).click();
                $('#arrow').trigger('set-default-tool');
            }
            return false;
        });

        $('#inscription-styler, #inscription-styler .text').click(function () {
            if ($('#inscription').val() === 'sticker') {
                nimbus_screen.canvasManager.sticker();
                $(this).find('.text').removeAttr('class').addClass('text').addClass('sticker');
            } else {
                nimbus_screen.canvasManager.textArrow();
                $(this).find('.text').removeAttr('class').addClass('text').addClass('text_arrow');
            }
            destroyCrop();
            disableActive($('#inscription-styler'));
            return false;
        }).contextmenu(function (e) {
            if (confirm('Set by default?')) {
                $(e.target).click();
                $('#inscription').trigger('set-default-tool');
            }
            return false;
        });

        $("#text").click(function () {
            nimbus_screen.canvasManager.text();
            disableActive(this);
        }).contextmenu(function (e) {
            if (confirm('Set by default?')) {
                $(e.target).click();
                $('#text').trigger('set-default-tool');
            }
            return false;
        });

        $('#line-width-styler').click(function (e) {
            nimbus_screen.canvasManager.changeStrokeSize($('#line-width').val());
            var clas = $(e.target).attr('class');
            if (clas !== undefined) {
                clas = clas.replace('selected sel', '');
                $(this).find('.text').removeAttr('class').addClass('text').addClass(clas);
            }
        });

        $("#eraser").click(function () {
            nimbus_screen.canvasManager.activateEraser();
            disableActive(this);
        });

        $('#blur-styler').click(function () {
            if ($('#blur').val() === 'blur') {
                nimbus_screen.canvasManager.activateBlur();
                $(this).find('.text').removeAttr('class').addClass('text').addClass('blur');
            } else {
                nimbus_screen.canvasManager.activateBlurOther();
                $(this).find('.text').removeAttr('class').addClass('text').addClass('blur_all');
            }
            destroyCrop();
            disableActive(this);
        });

        $('#blur-styler .text').click(function () {
            if ($('#blur').val() === 'blur') {
                nimbus_screen.canvasManager.activateBlur();
            } else {
                nimbus_screen.canvasManager.activateBlurOther();
            }
            destroyCrop();
            disableActive($('#blur-styler'));
            return false;
        });

        $("#undo").click(function () {
            nimbus_screen.canvasManager.undo();
        });

        $("#undo-all").click(function () {
            nimbus_screen.canvasManager.undoAll();
            nimbus_screen.canvasManager.loadBackgroundImage(imgdata);
        });

        $("#redo").click(function () {
            nimbus_screen.canvasManager.redo();
        });

        $("#numbers").click(function () {
            if ($(this).hasClass('enable')) {
                $(this).removeClass('enable');
                LS.enablenumbers = false;
                nimbus_screen.canvasManager.setEnableNumbers(false);
            } else {
                $(this).addClass('enable');
                LS.enablenumbers = true;
                nimbus_screen.canvasManager.setEnableNumbers(true);
            }

            localStorage.setItem('enablenumbers', LS.enablenumbers);
        });

        $("#crop").click(function () {
            disableActive(this);

            if (jcrop) {
                return true;
            }

            var pole = $('<div id="forcrop">').appendTo('#photo');
            var size = nimbus_screen.getEditCanvasSize();
            var zoom = nimbus_screen.canvasManager.getZoom();

            var position = $('#editcanva').offset();

            pole.css('width', size.w * zoom);
            pole.css('height', size.h * zoom);
            pole.css('position', 'absolute');
            pole.css('left', position.left + 'px');
            pole.css('top', position.top + 'px');

            var crop = $('<div>').appendTo(pole);

            crop.css('width', '100%');
            crop.css('height', '100%');
            crop.css('position', 'absolute');
            crop.css('left', '0px');
            crop.css('top', '0px');

            jcrop = $.Jcrop(crop, {
                keySupport:  true,
                onSelect:    createCoords,
                onChange:    showCards,
                onMousemove: function (e) {
                    nimbus_screen.canvasManager.scrollPage(e);
                },
                onEnter:     function (e) {
                    $("#crop-image").click();
                }
            });
        });

        $('#nsc_button_save_image, #nsc_main_title').click(function () {
            var bgScreen = chrome.extension.getBackgroundPage().screenshot;
            bgScreen.download({
                url:      $('#nsc_preview_img').attr('src'),
                pageinfo: pageinfo
            });

        });

        $('#nsc_button_save_video').click(function () {
            chrome.downloads.download({
                url:      localStorage.videoUrl,
                filename: 'nimbus-record-video.webm',
                saveAs:   true
            });
        });

        $('#nsc_button_google_drive').click(function (e) {
            saveToGdrive();
            hidePopup();
        });

        $('#nsc_button_copy_to_clipboard').click(function () {
        });

        $('#nsc_button_print').click(function () {
            var f = $("iframe#print")[0],
                c = f.contentDocument,
                d = f.contentWindow,
                i = c.getElementById("image"),
                t = c.getElementById("link");
            i.onload = function () {
                this.style.width = 718 < this.width ? "100%" : "auto";
                d.focus();
                d.print();
                i.setAttribute("src", '');
            };
            i.setAttribute("src", imgnewdata);

            var date = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
            var month = new Date().getMonth() < 9 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
            var year = new Date().getFullYear();

            t.innerHTML = pageinfo.url + '<br>' + date + '.' + month + '.' + year;
        });
    }

    var nimbusAccountPopup = (function () {
        var popup = $('#nsc_account_popup');
        var bind = function () {
            popup.unbind();
            popup.find('.nimbus_account_create').on('click', function () {
                popup.hide();
                $('#nsc_popup_register_nimbus').show();
            })
        };
        var init = function () {
            if (!localStorage.getItem("showAccountPopup")) {
                bind();
                nimbus.server.user.authState(function (res) {
                    if (res.errorCode !== 0 || !res.body || !res.body.authorized) {
                        popup.show();
                    }
                });
                localStorage.setItem('showAccountPopup', 'false');
            }
        };
        return {
            init: init
        };
    })();

    $('#nimbus_rate').bind('click', function () {
        $(this).fadeOut();
    });
    $('#disable-rate-message').bind('click', function (e) {
        nimbusRate.disableRate();
        e.preventDefault();
    });

    function createCoords(c) {

        var btncancel = $('<button/>', {
            html:    '<i class="cancel"></i><div class="name">Cancel</div>',
            'id':    'caancel-crop',
            'class': 'edit_btn cancel'
        });

        var btncrop = $('<button/>', {
            html:    '<i class="save"></i><div class="name">Crop</div>',
            'id':    'crop-image',
            'class': 'edit_btn edit'
        });

        $('#screenshotsize').remove();
        $('#screenshotbutton').remove();

        $('.jcrop-dragbar').first().before('<div id="screenshotsize"></div>');
        $('.jcrop-dragbar').first().before('<div id="screenshotbutton" class="nimbus_screenshot_buttons crop_buttons"></div>');

        $('#screenshotbutton').append(btncrop).append(btncancel);

        btncancel.click(function () {
            destroyCrop();
        });

        btncrop.click(function () {
            destroyCrop();
            nimbus_screen.canvasManager.cropImage(c);
        });

        $('.edit_btn').hover(function () {
            $(".name", this).stop().animate({top: '35px', bottom: '0px'}, {queue: false, duration: 160});
        }, function () {
            $(".name", this).stop().animate({top: '47px', bottom: '0'}, {queue: false, duration: 160});
        });

        showCards(c);
    }

    function showCards(c) {
        var zoom = nimbus_screen.canvasManager.getZoom();
        var size = nimbus_screen.getEditCanvasSize();
        var z = window.devicePixelRatio || 1;
        $('#screenshotsize').html('<span>' + (Math.round(c.w / zoom) + z) + ' x ' + (Math.round(c.h / zoom) * z) + '</span>');

        if ((c.h + c.y + 55) > (size.h * zoom)) {
            $('#screenshotbutton').css('bottom', '8px');
        } else {
            $('#screenshotbutton').css('bottom', '-55px');
        }
    }

    var setPublicGdrive = function (fileId) {
        chrome.identity.getAuthToken({'interactive': true}, function (token) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://www.googleapis.com/drive/v2/files/' + fileId + '/permissions');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.setRequestHeader('Content-Type', 'application/json');

            var permission = {
                "role": "reader",
                "type": "anyone"
            };
            var body = JSON.stringify(permission);

            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {

                }
            };

            xhr.send(body);
        });

    };

    var gFolders = {
        gAccessToken:    '',
        fList:           {},
        fParents:        {},
        fCurrent:        'root',
        getUploadFolder: function () {
            return LS.google_upload_folder;
        },
        setUploadFolder: function (folder) {
            LS.google_upload_folder = folder;
            localStorage.setItem('google_upload_folder', JSON.stringify(folder));
        },
        setAccessToken:  function (t) {
            gFolders.gAccessToken = t;
        },
        addFolder:       function (folder) {
            var f = $('<li>', {
                'html':    '<img src="images/icon_folder.png "> ' + folder.title,
                'data-id': folder.id
            }).appendTo('#file_manager .folders');
            f.bind('click', function () {
                var cur = $(this).data('id');
                gFolders.fParents[cur] = gFolders.fCurrent;
                gFolders.getFolders(cur);
            });
        },
        setParent:       function (folder) {
            $('#parent').html('');
            var p = $('<div>', {
                'html':    '<img src="images/icon_folder.png "> ' + folder.title,
                'data-id': folder.id
            }).appendTo('#parent');
            p.bind('click', function () {
                gFolders.getFolders($(this).data('id'));
            });
        },
        setCurrent:      function (folder) {
            $('#current').html('');
            $('<div>', {
                'html':    '<img src="images/icon_folder.png "><span> ' + folder.title + '</span>',
                'data-id': folder.id
            }).appendTo('#current');
            var t = folder.title;
            $('#future_folder').text(chrome.i18n.getMessage("foldersLabel") + ' ' + t);

        },
        setRootFolder:   function () {
            $('#parent').html('');
            var p = $('<div>', {
                'html':    chrome.i18n.getMessage("gDriveMainFolder"),
                'data-id': 'root'
            }).appendTo('#parent');
            p.bind('click', function () {
                gFolders.getFolders($(this).data('id'));
            });
        },
        getFolderInfo:   function (folderID, callback) {
            if (gFolders.fList[folderID] == undefined) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', "https://www.googleapis.com/drive/v2/files/" + folderID);
                xhr.setRequestHeader('Authorization', 'Bearer ' + gFolders.gAccessToken);
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (xhr.status == 200) {
                            var res = JSON.parse(this.response);
                            gFolders.fList[folderID] = res;
                            callback(res);
                        } else {
                            console.log('error');
                            clearGdriveData();
                        }
                    }
                };

                xhr.send(null);

            } else {
                callback(gFolders.fList[folderID]);
            }
        },
        getParentFolder: function (folder, callback) {
            if (gFolders.fParents[folder] == undefined) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', "https://www.googleapis.com/drive/v2/files/" + folder + "/parents");
                xhr.setRequestHeader('Authorization', 'Bearer ' + gFolders.gAccessToken);
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (xhr.status == 200) {
                            var res = JSON.parse(this.response);
                            if (res.items.length > 0) {
                                gFolders.fParents[folder] = res.items[0].id;
                                callback(res.items[0].id);
                            } else {
                                gFolders.setRootFolder();
                            }
                            $('#file_manager').show();
                        } else {
                            console.log('error');
                        }
                        $('#uploadimg').hide();
                    }
                };

                xhr.send(null);
            } else {
                callback(gFolders.fParents[folder]);
            }
        },
        getFolders:      function (folder) {
            folder = folder || 'root';

            $('#file_manager').fadeIn("fast");
            $('#file_manager .folders').html('').addClass('loading_folders');

            gFolders.fCurrent = folder;
            gFolders.getParentFolder(folder, function (id) {
                gFolders.getFolderInfo(id, function (info) {
                    gFolders.setParent(info);
                });
            });

            gFolders.getFolderInfo(folder, function (info) {
                gFolders.setCurrent(info);
            });

            var xhr = new XMLHttpRequest();
            xhr.open('GET', "https://www.googleapis.com/drive/v2/files/" + folder + "/children?q=mimeType = 'application/vnd.google-apps.folder'");
            xhr.setRequestHeader('Authorization', 'Bearer ' + gFolders.gAccessToken);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (xhr.status == 200) {
                        var res = JSON.parse(this.response);
                        var l = res.items.length;
                        if (l > 0) {
                            for (var i = l - 1; i >= 0; i--) {
                                gFolders.getFolderInfo(res.items[i].id, function (info) {
                                    gFolders.addFolder(info);
                                })
                            }
                        } else {
                            $('#file_manager .folders').append('<span>' + chrome.i18n.getMessage("gDriveNoItems") + '</span>');
                        }
                    } else {
                        console.log('error');
                    }
                    $('#file_manager .folders').removeClass('loading_folders');
                }
            };

            xhr.send(null);
        }
    };

    function hidePopup() {
        $('#nsc_google_drive_select_folder').hide();
//        $('#nsc_button_google_drive').removeClass('active');
//        $('#choose-folder').removeClass('active');
        $('body').off('click', hidePopup);
        if (google_auth) {
            setUploadFolderTooltip();
        } else {
            $('#nsc_button_google_drive').attr('original-title', chrome.i18n.getMessage("tooltipNotAuthorized") || 'You are not authorized');
        }
    }

    function setUploadFolderTooltip(title) {
        $('#nsc_google_drive_choose_folder').show();
        $('#nsc_button_google_drive').attr('original-title', chrome.i18n.getMessage("tooltipUploadTo") + ': ' + (title || gFolders.getUploadFolder().title));
    }

    function setFolder(title) {
        $('#nsc_google_drive_select_folder .nsc-trigger-panel-title').html('<img src="images/icon_folder.png "> ' + title);
    }

    $('#btn_select').bind('click', function () {
        var info = {id: $('#current').find('div').data('id'), title: $('#current').find('span').text()};
        gFolders.setUploadFolder(info);
        setUploadFolderTooltip(info.title);
        $('#file_manager').fadeOut("fast");
    });

    $('.btn_cancel').bind('click', function () {
        $('.popup_bg').fadeOut("fast");
    });

    $('#nsc_google_drive_choose_folder').click(function (e) {
        var s = $('#nsc_google_drive_select_folder');

        if (!s.is(':visible')) {
            setFolder(gFolders.getUploadFolder().title);
            s.find('input[name=share]').prop('checked', !LS.shareOnGoogle);
            s.show();
            setTimeout(function () {
                $('body').on('click', hidePopup);
            }, 10);
        }
    });

    $('#nsc_google_drive_select_folder .nsc-trigger-panel-title').click(function () {
        chrome.identity.getAuthToken({'interactive': true}, function (token) {
            if (typeof token !== 'undefined') {
                gFolders.setAccessToken(token);
                gFolders.getFolders(gFolders.getUploadFolder().id);
                hidePopup();
            }
        });
        return false;
    });

    $('#nsc_google_drive_select_folder input[name=share]').on('change', function () {
        LS.shareOnGoogle = !$(this).prop('checked');
        localStorage.setItem('shareOnGoogle', LS.shareOnGoogle);
    });

    $('#nimbus_folder').click(function (e) {
        nimbus.foldersShowManager();
        e.preventDefault();
    });

    $('#nimbus-btn-select').bind('click', function () {
        $('.popup_bg').fadeOut("fast");

        var nff = $('#nimbus-future_folder');
        var cur = {id: nff.data('f-id'), title: nff.data('f-title')};
        nimbus.uploadSetFolder(cur);
    });

    $('#nsc_nimbus_private_share').change(function () {
        LS.nimbus_share = !this.checked;
        localStorage.setItem('nimbus_share', LS.nimbus_share);
    });

    $('#nsc_google_drive_logout').click(function () {
        google_auth = false;
        $('#nsc_google_drive_choose_folder').hide();
        clearGdriveData();
        hidePopup();
        return false;
    });

    var clearGdriveData = function () {
        chrome.identity.getAuthToken({'interactive': false}, function (current_token) {
            chrome.identity.removeCachedAuthToken({token: current_token});

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + current_token);
            xhr.send();

        });
        console.log('clear');
    };

    var saveToGdrive = function () {
        chrome.identity.getAuthToken({'interactive': true}, function (token) {
            if (typeof token === 'undefined') {
                return;
            }

            if (!google_auth) {
                setUploadFolderTooltip();
                google_auth = true;
                return;
            }

            $('#message').hide();
            $nsc_linked.hide();
            $('#uploadimg').show();

            var format = LS.format || 'png';
            var data = imgnewdata.replace(/^data:image\/(png|jpeg|bmp);base64,/, "");
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.setRequestHeader('Content-Type', 'multipart/mixed; boundary="--287032381131322"');

            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    $('#uploadimg').hide();

                    switch (xhr.status) {
                        case 200:	// success
                            var res = JSON.parse(xhr.response);
                            if (res.alternateLink && res.ownerNames) {
                                if (LS.shareOnGoogle) setPublicGdrive(res.id);
                                $('#nsc_linked').css('display', 'flex')
                                $('#nsc_linked input').val(res.alternateLink);
                                nimbus_screen.copyTextToClipboard(res.alternateLink)
                            }
                            break;

                        case 401: // login fail
                            $.ambiance({message: chrome.i18n.getMessage("notificationLoginFail"), type: "error", timeout: 2});
                            clearGdriveData();
                            break;

                        default: 	// network error
                            $.ambiance({message: chrome.i18n.getMessage("notificationWrong"), type: "error", timeout: 2});
                            clearGdriveData();
                    }

                    xhr = null;
                }
            };

            var boundary = '--287032381131322';
            var delimiter = "\r\n--" + boundary + "\r\n";
            var close_delim = "\r\n--" + boundary + "--";
            var metadata = {
                "title":       screenname + "." + format,
                "mimeType":    "image/" + format,
                "description": "Uploaded by Nimbus Screen Capture",
                "parents":     [
                    {
                        "kind": "drive#fileLink",
                        "id":   gFolders.getUploadFolder().id
                    }
                ]
            };
            var multipartRequestBody = delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) + delimiter + 'Content-Type: ' + 'image/' + format + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + data + close_delim;
            xhr.send(multipartRequestBody);
        });
    };

    $nsc_linked.find('input').on('focus', function () {
        $(this).select();
    });

    $("#nsc_copy_url").click(function () {
        nimbus_screen.copyTextToClipboard($('#nsc_linked input').val());
    });

    $("#nsc_short_url").click(function () {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://nimb.ws/dantist_api.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            //alert(this.responseText);
            var obj = jQuery.parseJSON(this.responseText);
            $('#nsc_linked input').val(obj.short_url);
            nimbus_screen.copyTextToClipboard(obj.short_url);
        };
        xhr.send('url=' + encodeURIComponent($('#nsc_linked input').val()));
    });

    $('#capture-windows-helper .close_helper_tooltip').click(function () {
        $('#capture-windows-helper').fadeOut(100);
        localStorage.setItem('disableHelper', true);
        LS.disableHelper = true;
    });

    nimbus_screen.setOptions();
    $nsc_redactor_page.hide();
    $nsc_done_page.hide();
    if (param === 'video') {
        $('html').removeClass('pre-loader');

        $nsc_done_page.show();
        nimbus.init();
//        $('#nsc_screen_name').val('Screencast');
        $('html, body').css('height', '100%');
        $('#message').hide();
        $('#nsc_linked').hide();
        $('#nsc_button_back').hide();
        $('#nsc_button_save_image').hide();
        $('#nsc_button_slack').hide();
        $('#nsc_button_google_drive').hide();
        $('#nsc_button_print').hide();
        $('#nsc_preview_img').hide();
        $('#nsc_button_save_video').show();

        addEvents();
        saveVideo();
    } else {
        $('#nsc_stream_video').hide();
        image.load(function () {
            $('html').removeClass('pre-loader');
            $nsc_redactor_page.show();

            nimbus_screen.initScreenPage(imgdata);
            addEvents();
            addFileAddEvents();
        });
        image.attr('src', imgdata);
    }

    function saveVideo() {

//        $('#save-buttons').css({'margin': '0 auto', 'width': '320px'});
//        $('.save_screenshot_block').css({'width': '170px'});
//        $("#background").css('z-index', '1200');
//        $('html').css("overflow", "hidden");
//        $("#save-img").addClass('video-save').show();
        $('#nsc_stream_video').attr('src', localStorage.videoUrl);
//        $('#nsc_main_title')/*.click(function () {
        //            //record.save('nimbus-video-record');
        //            return false;
//         })*/.attr('href', localStorage.videoUrl);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', localStorage.videoUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            if (this.status == 200) {
                videoBlob = this.response;
                showFileSize(videoBlob.size);
            }
        };
        xhr.send();

//        setTimeout(function () {
//            $('#indicator').css({'width': $('#nsc_stream_video').width() + 'px'});
//        }, 200);
    }

    function showFileSize(size) {
        var k = (size / 1024).toFixed(2);
        if (k < 1024) {
            k = k.toString().replace(",", ".").replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,") + " KB";
        } else {
            k = (k / 1024).toFixed(2);
            k = k.toString().replace(",", ".").replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,") + " MB";
        }
        $('#nsc_indicator_weight span').text(k);
    }

    window.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.keyCode == 13 /*Enter*/) {
            $('#nsc_send').trigger('click');
            e.preventDefault();
            return false;
        }

        return true;
    }, false);

    var enviroment_info_change = function () {
        var checked = $('#nsc_environment_info input').prop('checked');
        var comment_text = $('#nsc_comment').val();
        var userAgent = navigator.userAgent;
        var browserName = navigator.appName;
        var platform = navigator.platform;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var verOffset;
        if ((verOffset = userAgent.indexOf("Opera")) != -1) {
            browserName = "Opera";
            fullVersion = userAgent.substring(verOffset + 6);
            if ((verOffset = userAgent.indexOf("Version")) != -1)
                fullVersion = userAgent.substring(verOffset + 8);
        } else if ((verOffset = userAgent.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
            fullVersion = userAgent.substring(verOffset + 7);
        }
        var info = '\n\n-----------------\nWeb Page: ' + pageinfo.url + '\nScreen Resolution: ' + screen.width + 'x' + screen.height + '\nUser Browser: ' + browserName + ' ' + fullVersion + '\nUser Agent: ' + userAgent + '\nUser Platform: ' + platform;

        chrome.extension.sendMessage({msg: 'set_setting', key: 'environment_info', value: checked});
        if (checked) {
            $('#nsc_comment').val(comment_text + info).height(200);
        } else {
            $('#nsc_comment').val(comment_text.match(/([\s|\S]+)?\n\n-----------------[\s|\S]+/)[1]).height(22);
        }
    };

    $('#nsc_environment_info input').on('click', enviroment_info_change);

    /* slack */

    $('#nsc_button_slack').click(function () {
        if (!slackShare.data) {
            var $nsc_slack_connect = $('#nsc_slack_connect');
            var $nsc_preview_img = $('#nsc_preview_img');
            $nsc_slack_connect.show();
            var top = ($nsc_preview_img.outerHeight() - $nsc_slack_connect.find('.nsc-popup-box').outerHeight()) / 2 + $nsc_preview_img.offset().top;
            $nsc_slack_connect.find('.nsc-popup-box').css({transform: 'translate(-50%,0)', top: top + 'px'});
        } else {
            slackShare.init();
            nimbus_screen.togglePanel('slack');
        }
    });
    $('#nsc_button_connect_slack').click(function () {
        $('#nsc_slack_connect').hide();
        slackShare.login();
    });
    $('.nsc-slack-connect-close').click(function () {
        $('#nsc_slack_connect').hide();
    });
    $('#nsc_slack_logout').click(slackShare.logout);

    $('#nsc_slack_toggle').click(function (e) {
        chrome.extension.sendMessage({msg: 'set_setting', key: 'slackPanel', value: false});
        $('#nsc_done_slack').css('display', 'none');
        return false;
    });

    $('#nsc_slack_channel_search').on('keyup', function (e) {
        var $nsc_slack_list_group = $('#nsc_slack_list_group');
        var $list = $nsc_slack_list_group.find('li:visible');
        var index = $list.index($('.nsc-slack-list-selected'));
        $list.eq(index).removeClass('nsc-slack-list-selected');

        if (index == $list.length - 1) {
            index = -1
        }

        if (e.keyCode == 40 /*ArrowDown*/) {
            $list.eq(index + 1).addClass('nsc-slack-list-selected');
        } else if (e.keyCode == 38 /*ArrowUp*/) {
            $list.eq(index - 1).addClass('nsc-slack-list-selected');
        } else {
            var search_text = $(this).val();
            var is_first_item = false;
            $('#nsc_slack_channel, #nsc_slack_user').find('li').each(function () {
                var text = $(this).find('a').text();
                $(this).removeClass('nsc-slack-list-selected');
                if (search_text != '' && !new RegExp(search_text, 'gi').test(text)) {
                    $(this).hide();
                } else {
                    $(this).show();
                    if (!is_first_item) {
                        is_first_item = !is_first_item;
                        $(this).addClass('nsc-slack-list-selected');
                    }
                }
            });
        }
        var top_active_elem = $('#nsc_slack_list_group .nsc-slack-list-selected').position().top;
        $nsc_slack_list_group.scrollTop(top_active_elem + $nsc_slack_list_group.scrollTop());
    });

    /* /slack */

    $('#nsc_send').on('change-type', function () {
        var type = $(this).data('type');
        if (type == 'slack') {
            $('#nsc_send span').text(chrome.i18n.getMessage("nimbusBtnCommentSlack"));
        } else if (type == 'nimbus') {
            $('#nsc_send span').text(chrome.i18n.getMessage("nimbusBtnComment"));
        } else {
            $('#nsc_send span').text(chrome.i18n.getMessage("nimbusBtnComment"));
        }
    })
        .trigger('change-type')
        .on('click', function () {
            var channel = false;
            if ($(this).data('channel')) {
                channel = $(this).data('channel');
                $(this).data('channel', false);
            }

            if (slackShare.data && $('#nsc_send').data('type') == 'slack') {
                slackShare.sendScreenshot(imgnewdata, screenname, channel);
            } else {
                nimbus.server.user.authState(function (res) {
                    if (res.errorCode === 0 && res.body && res.body.authorized) {
                        if (param === 'video') {
                            var size_mb = Math.floor(videoBlob.size / 1024 / 1024);
                            if (+size_mb >= 10 && !nimbus.info.premium) {
                                $('#nimbus_limit_free_account').show();
                            } else {
                                pageinfo.title = 'video-record';
                                nimbus.startUploadVideo(pageinfo, videoBlob, channel);
                            }
                        } else {
                            nimbus.startUploadScreen(pageinfo, imgnewdata, channel);
                        }
                    } else {
                        $('#nsc_popup_connect_nimbus').show();
                    }
                });
            }
        });

    chrome.extension.onRequest.addListener(function (req) {
        console.log('onRequest', req);
        if (req.action == 'slack_auth' && req.oauth.access_token != 'null') {
            slackShare.data = req;
            slackShare.init();
            nimbus_screen.togglePanel('slack');
        }
        if (req.action == 'nimbus_auth') {
            nimbus.init();
            nimbus_screen.togglePanel('nimbus');
        }
    });

    chrome.extension.sendMessage({msg: 'get_setting', key: 'environment_info'}, function (val) {
        if (val === 'true') {
            $('#nsc_environment_info input').attr('checked', true).prop('checked', true);
            enviroment_info_change();
        }
    });

    chrome.extension.sendMessage({msg: 'get_setting', key: 'slackPanel'}, function (panel) {
        console.log('slackPanel', panel);
        chrome.extension.sendMessage({msg: 'get_slack_data'}, function (data) {
            if (data && param !== 'video') {
                slackShare.data = data;
                slackShare.init();
                if (panel === 'true') {
                    nimbus_screen.togglePanel('slack');
                }
            }
        });
    });

    chrome.extension.sendMessage({msg: 'get_setting', key: 'nimbusPanel'}, function (panel) {
        console.log('nimbusPanel', panel);
        nimbus.server.user.authState(function (res) {
            if (res.errorCode === 0 && res.body && res.body.authorized) {
                if (panel === 'true') {
                    nimbus_screen.togglePanel('nimbus');
                }
            }
        });
    });

    chrome.extension.sendMessage({msg: 'get_file_name', pageinfo: LS.pageinfo}, function (response) {
        $('#nsc_screen_name').val(response)
    });

    $('#editpanel select, .drop_panel input[type="checkbox"] ').styler();
    $('#nsc_button_copy_to_clipboard').hide();

    $('.size h5').text(chrome.i18n.getMessage("panelSize") + ':');
    $('.drawing_tools h5').text(chrome.i18n.getMessage("panelTools") + ':');
    $('.options_tools h5').text(chrome.i18n.getMessage("panelParameters") + ':');
    $('.actions h5').text(chrome.i18n.getMessage("panelActions") + ':');
    $('#done span').text(chrome.i18n.getMessage("editBtnDone"));
    $('#nsc_button_back span span').text(chrome.i18n.getMessage("editBtnBack"));
    $('#nsc_button_nimbus span span').text(chrome.i18n.getMessage("editBtnNimbus"));
    $('#nsc_button_save_image span span').text(chrome.i18n.getMessage("editBtnSave"));
    $('#nsc_button_google_drive span span').text(chrome.i18n.getMessage("editBtnDrive"));
    $('#nsc_button_copy_to_clipboard span span').text(chrome.i18n.getMessage("editBtnCopy"));
    $('#nsc_button_print span span').text(chrome.i18n.getMessage("editBtnPrint"));
    $('#nsc_slack_logout').attr({title: chrome.i18n.getMessage("nimbusSlackTitleLogout")});
//    $('#nsc_send span').text(chrome.i18n.getMessage("nimbusBtnComment"));
    $('#nsc_comment').attr('placeholder', chrome.i18n.getMessage("nimbusCommentPlaceholder"));
    $('.nsc-title-send-to-nimbus').text(chrome.i18n.getMessage("nimbusTitle"));
    $('.ncs-popup-description-content').text(chrome.i18n.getMessage("nimbusInfo"));

    $('#nsc_select_folder_nimbus').text(chrome.i18n.getMessage("nimbusLabelFolder"));
    $('#nsc_nimbus_private_share').next('span').text(chrome.i18n.getMessage("nimbusLabelPrivate"));

    $('a.nsc-open-popup-login-nimbus').text(chrome.i18n.getMessage("nimbusBtnLogin"));
    $('a.nsc-open-popup-register-nimbus').text(chrome.i18n.getMessage("nimbusBtnSignup"));
    $('a.nsc-open-popup-remind-pass-nimbus').text(chrome.i18n.getMessage("nimbusBtnRemind"));
//    $('button.nsc-open-popup-login-nimbus span').text(chrome.i18n.getMessage("nimbusBtnLogin"));
    $('button.nsc-open-popup-register-nimbus span').text(chrome.i18n.getMessage("nimbusBtnSignup"));
    $('button.nsc-open-popup-remind-pass-nimbus span').text(chrome.i18n.getMessage("nimbusBtnRemind"));

    $('#nsc_form_login_nimbus button span').text(chrome.i18n.getMessage("nimbusBtnLogin"));
    $('#nsc_form_register_nimbus button span').text(chrome.i18n.getMessage("nimbusBtnSignup"));
    $('#nsc_form_remind_password_nimbus button span').text(chrome.i18n.getMessage("nimbusBtnRemind"));

    $('#nsc_popup_connect_nimbus .nsc-popup-actions-title').text(chrome.i18n.getMessage("nimbusHeaderLogin"));
    $('#nsc_popup_register_nimbus .nsc-popup-actions-title').text(chrome.i18n.getMessage("nimbusHeaderRegistration"));
    $('#nsc_popup_remind_password_nimbus .nsc-popup-actions-title').text(chrome.i18n.getMessage("nimbusHeaderRemindPass"));

    $('.nsc-label-email').text(chrome.i18n.getMessage("nimbusLabelEmail") + ':').next('input').attr({placeholder: chrome.i18n.getMessage("placeholderEmail")});
    $('.nsc-label-password').text(chrome.i18n.getMessage("nimbusLabelPassword") + ':').next('input').attr({placeholder: chrome.i18n.getMessage("placeholderPassword")});
    $('.nsc-label-repass').text(chrome.i18n.getMessage("nimbusLabelRetypePass") + ':').next('input').attr({placeholder: chrome.i18n.getMessage("placeholderPassword")});

    var gdf = $('#file_manager');
    gdf.find('.file_manager_title span').text(chrome.i18n.getMessage("gDriveTitle"));
    gdf.find('.future_folder_label').text(chrome.i18n.getMessage("gDriveLabel"));
    gdf.find('#btn_select span').text(chrome.i18n.getMessage("gDriveBtnDone"));

    var npi = $('#nsc_popup_pro');
    npi.find('.nsc-popup-actions-title').html(chrome.i18n.getMessage("limitNoSpace"));
    npi.find('.nsc-popup-actions-text').html(chrome.i18n.getMessage("limitDescription"));

    $('#nsc_go_to_pro span').text(chrome.i18n.getMessage("limitGoToPro"));
    $('#nsc_nimbus_upgrade_pro').text(chrome.i18n.getMessage("limitHref"));

    $("#create-blank span").text(chrome.i18n.getMessage("popupBtnBlank"));
    $("#capture-desktop span").text(chrome.i18n.getMessage("popupBtnDesktop"));
    $("#drop-file .receiver span").text(chrome.i18n.getMessage("dropImageTitle"));
    $("#drop-file .upwards span").text(chrome.i18n.getMessage("moreOptionsTitle"));
    $("#capture-windows-helper span").text(chrome.i18n.getMessage("captureHelperWindowTitle"));
    $("#new_release_popup h2").html(chrome.i18n.getMessage("newReleaseTitle"));
    $("#new_release_popup ol").html(chrome.i18n.getMessage("newReleaseText"));

    $("#nimbus_limit_free_account_title").html(chrome.i18n.getMessage("popupFreeAccountTitle"));
    $("#nimbus_limit_free_account_text").html(chrome.i18n.getMessage("popupFreeAccountText"));
    $("#nimbus_limit_free_account_go span").text(chrome.i18n.getMessage("popupFreeAccountGo"));
    $("#nimbus_limit_free_account_no span").text(chrome.i18n.getMessage("popupFreeAccountNo"));

    if (param === 'video') {
        $('#nsc_main_title span span').text(chrome.i18n.getMessage("titleSaveScreencast"));
    } else {
        $('#nsc_main_title span span').text(chrome.i18n.getMessage("titleSaveScreenshot"));
    }
    $('#nsc_rate_us').text(chrome.i18n.getMessage("rateUs"));
    $('#nsc_support').text(chrome.i18n.getMessage("support"));
    $('#nsc_note_name').text(chrome.i18n.getMessage("titleNoteName"));

    $('#nsc_title_comment').text(chrome.i18n.getMessage("titleComment"));
    $('#nsc_environment_info span').text(chrome.i18n.getMessage("titleEnvironmentInfo"));

    $('#nsc_slack_toggle').text(chrome.i18n.getMessage("hideSlackPanel"));
    $('#nsc_slack_channel_search').attr('placeholder', chrome.i18n.getMessage("search"));
    $('#nsc_title_channels').text(chrome.i18n.getMessage("titleChannels"));
    $('#nsc_title_private_message').text(chrome.i18n.getMessage("titlePrivateMessage"));
    $('#nsc_title_select_channel').text(chrome.i18n.getMessage("titleSelectChannel"));
    $('#nsc_title_slack_panel').text(chrome.i18n.getMessage("titleSlackPanel"));
    $('#nsc_title_nimbus_panel').text(chrome.i18n.getMessage("titleNimbusPanel"));
    $('#nsc_title_sign_to_nimbus').text(chrome.i18n.getMessage("titleSignToNimbus"));
    $('#nsc_connect_to_nimbus span').text(chrome.i18n.getMessage("nimbusBtnLogin"));
    $('#nsc_connect_to_google span').text(chrome.i18n.getMessage("buttonConnectToGoogle"));
    $('#nsc_connect_to_facebook span').text(chrome.i18n.getMessage("buttonConnectToFacebook"));
    $('#nsc_register_to_nimbus').text(chrome.i18n.getMessage("buttonRegisterToNimbus"));
    $('#nsc_nimbus_toggle').text(chrome.i18n.getMessage("hideNimbusPanel"));

    $('#zoomplus').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipZoomPlus"));
    $('#zoomminus').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipZoomMinus"));
    $('#resize').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipResize"));
    $('#crop').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipCrop"));
    $('#text').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipText"));
    $('#undo').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipUndo"));
    $('#redo').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipRedo"));
    $('#undo-all').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipUndoAll"));
    $('#shadow').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipShadow"));
    $('#numbers').tipsy().attr('original-title', chrome.i18n.getMessage("tooltipNumbers"));
    $('#pens-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipPen")).tipsy();
    $('#shape-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipShape")).tipsy();
    $('#ellipse-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipEllipse")).tipsy();
    $('#rectangle-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipRectangle")).tipsy();
    $('#line-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipLine")).tipsy();
    $('#arrow-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipArrow")).tipsy();
    $('#line-width-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipLineWidth")).tipsy();
    $('#blur-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipBlur")).tipsy();
    $('#inscription-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipNote")).tipsy();
    $('#nsc_copy_url').attr('original-title', chrome.i18n.getMessage("tooltipCopy")).tipsy();
    $('#nsc_short_url').attr('original-title', chrome.i18n.getMessage("tooltipShortUrl")).tipsy();
    $('#strokecolor').next('.sp-replacer.sp-light').attr('original-title', chrome.i18n.getMessage("tooltipColor")).tipsy();
    $('#fillcolor').next('.sp-replacer.sp-light').attr('original-title', chrome.i18n.getMessage("tooltipFill")).tipsy();
    $('#open-image').attr('original-title', chrome.i18n.getMessage("tooltipOpenFile")).tipsy({gravity: 'nw'});
    $('#capture-windows').attr('original-title', chrome.i18n.getMessage("tooltipMakeScreenshot")).tipsy({gravity: 'nw'});

    $("#percent").on('refresh', function () {
        $('#percent-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipZoom")).tipsy();
    });

    $('.select').bind('click', function () {
        $(this).tipsy('hide');
    });

});