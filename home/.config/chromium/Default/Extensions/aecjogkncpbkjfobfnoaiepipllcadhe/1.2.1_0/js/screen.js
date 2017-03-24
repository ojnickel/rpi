'use strict';
$(function() {

    var imgdata = getBlankData();
    var screenname = 'nimbus-image';
    var pageinfo = {};
    var imgnewdata = null;
    var image = $('#imageedit');
    var canvasManager;
    var jcrop;
    var tools = '#shape-styler';
    var authorized = false;
    var param = '';

    function setOptions () {
        $("#line-width").val(LS.setting.width);
        $('#line-width-styler').find('.text').text(LS.setting.width + 'px').removeAttr('class').addClass("text line_width" + LS.setting.width);
        $('#numbers').addClass((LS.enablenumbers)?'enable':'');
        $("#fillcolor").spectrum({
            color: LS.fillColor,
            showAlpha: true,
            showButtons: false,
            move: function(color) {
                canvasManager.changeFillColor(color.toRgbString());
            }
        });
        $("#strokecolor").spectrum({
            color: LS.setting.color,
            showAlpha: true,
            showButtons: false,
            move: function(color) {
                canvasManager.changeStrokeColor(color.toRgbString());
            }
        });
    }

    $('#editpanel select, .drop_panel input[type="checkbox"] ').styler();

    $('#copy-to-clipboard').hide();

    window.copyUrlToClipboard = function(text) {
        $('body').append('<textarea id="url_for_copy"/>');
        var $test = $('#url_for_copy');
        $test.text(text || $('#linked input').val());
        $test.select();
        document.execCommand('copy');
        $.ambiance({message: chrome.i18n.getMessage("notificationUrlCopied")});
    };

    (function () {
        $('.size h5').text(chrome.i18n.getMessage("panelSize") + ':');
        $('.drawing_tools h5').text(chrome.i18n.getMessage("panelTools") + ':');
        $('.drawing_tools .options_tools h5').text(chrome.i18n.getMessage("panelParameters") + ':');
        $('.actions h5').text(chrome.i18n.getMessage("panelActions") + ':');

        $('#imgfordownload span').text(chrome.i18n.getMessage("doneTitle"));
        $('#done span').text(chrome.i18n.getMessage("editBtnDone"));
        $('#back span').text(chrome.i18n.getMessage("editBtnBack"));
        $('#save-nimbus span').text(chrome.i18n.getMessage("editBtnNimbus"));
        $('#save-image span').text(chrome.i18n.getMessage("editBtnSave"));
        $('#send-to-google span').text(chrome.i18n.getMessage("editBtnDrive"));
        $('#copy-to-clipboard span').text(chrome.i18n.getMessage("editBtnCopy"));
        $('#print-img span').text(chrome.i18n.getMessage("editBtnPrint"));

        $('#nimbus-comment-upload span').text(chrome.i18n.getMessage("nimbusBtnComment"));
        $('#nimbus-comment textarea').attr('placeholder', chrome.i18n.getMessage("nimbusCommentPlaceholder"));
        $('.nimbus_title span').text(chrome.i18n.getMessage("nimbusTitle"));
        $('.nimbus_info').text(chrome.i18n.getMessage("nimbusInfo"));
        $('span.private').text(chrome.i18n.getMessage("nimbusLabelPrivate"));

        var up = $('#user-panel .nimbus_form .nimbus-submit');
        up.find('button[name="signin"] span').text(chrome.i18n.getMessage("nimbusBtnLogin"));
        up.find('button[name="signup"] span').text(chrome.i18n.getMessage("nimbusBtnSignup"));
        up.find('button[name="confirm"] span').text(chrome.i18n.getMessage("nimbusBtnRemind"));


        var lp = $('#login-panel');
        lp.find('.nimbus_header').text(chrome.i18n.getMessage("nimbusHeaderLogin"));
        lp.find('.login').text(chrome.i18n.getMessage("nimbusLabelLogin") + ':');
        lp.find('.password').text(chrome.i18n.getMessage("nimbusLabelPassword") + ':');
        lp.find('#forgot-pass').text(chrome.i18n.getMessage("nimbusLabelForgotPass"));

        var rp = $('#register-panel');
        rp.find('.nimbus_header').text(chrome.i18n.getMessage("nimbusHeaderRegistration"));
        rp.find('.email').text(chrome.i18n.getMessage("nimbusLabelEmail") + ':');
        rp.find('.password').text(chrome.i18n.getMessage("nimbusLabelPassword") + ':');
        rp.find('.repass').text(chrome.i18n.getMessage("nimbusLabelRetypePass") + ':');

        var rpp = $('#remind-password-panel');
        rpp.find('.nimbus_header').text(chrome.i18n.getMessage("nimbusHeaderRemindPass"));
        rpp.find('.email').text(chrome.i18n.getMessage("nimbusLabelEmail") + ':');

        var np = $('#nimbus-panel');
        np.find('.username').text(chrome.i18n.getMessage("nimbusLabelUsername") + ':');
        np.find('.folder').text(chrome.i18n.getMessage("nimbusLabelFolder") + ':');
        np.find('.comment').text(chrome.i18n.getMessage("nimbusLabelComment") + ':');

        np.find('#my-uploads-nimbus span').text(chrome.i18n.getMessage("nimbusBtnMyUploads"));
        np.find('#save-to-nimbus span').text(chrome.i18n.getMessage("nimbusBtnStart"));

//        $('#select_folder #change_folder').text(chrome.i18n.getMessage("gDriveSelectFolder"));
        var gdf = $('#file_manager');
        gdf.find('.file_manager_title span').text(chrome.i18n.getMessage("gDriveTitle"));
        gdf.find('.future_folder_label').text(chrome.i18n.getMessage("gDriveLabel"));
        gdf.find('#btn_select span').text(chrome.i18n.getMessage("gDriveBtnDone"));

        $('#to-nimbus-pro').text(chrome.i18n.getMessage("limitHref"));
        var npi = $('.nimbus-pro-info');
        $(npi[0]).html(chrome.i18n.getMessage("limitNoSpace"));
        $(npi[1]).html(chrome.i18n.getMessage("limitDescription"));
        $('#go-to-nimbus-pro').text(chrome.i18n.getMessage("limitGoToPro"));


        $("#create-blank span").text(chrome.i18n.getMessage("popupBtnBlank"));
        $("#capture-desktop span").text(chrome.i18n.getMessage("popupBtnDesktop"));
        $("#drop-file .receiver span").text(chrome.i18n.getMessage("dropImageTitle"));
        $("#drop-file .upwards span").text(chrome.i18n.getMessage("moreOptionsTitle"));
        $("#capture-windows-helper span").text(chrome.i18n.getMessage("captureHelperWindowTitle"));
    })();


    function beginDesktop () {

        var w = chrome.app.window.current();

        chrome.desktopCapture.chooseDesktopMedia(['screen','window'],function (streamId) {

            function success_handler (stream) {
                var v = document.createElement('video');

                v.addEventListener('canplay', function () {
                    var canvas = document.createElement('canvas'),
                      ctx = canvas.getContext('2d');

                    canvas.width = v.videoWidth;
                    canvas.height = v.videoHeight;

                    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);

                    v.pause();
                    v.src = '';
                    stream.getTracks()[0].stop();
                    $(v).remove();
                    $(canvas).remove();

                    newImage(canvas.toDataURL(), function () {
                        w.show();
                    });

                }, false);

                v.src = window.URL.createObjectURL(stream);

            }

            function failure_handler (error) {
                console.log(error);
            }

            if (streamId) {
                var obj = {
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: "desktop",
                            chromeMediaSourceId: streamId,
                            maxWidth: 2560,
                            maxHeight: 1440
                        }
                    }
                };

                window.navigator.webkitGetUserMedia(obj, success_handler, failure_handler);
            }
        });
    }

    function initPage() {

        $('#editcanva').width(image.width()).height(image.height());
        image.hide();

        canvasManager = $("#editcanva").canvasPaint();
        canvasManager.loadBackgroundImage(imgdata, function(){

                if ((param === 'done') || (param === 'nimbus')) {
                    $("#done").click();
                    if (param === 'nimbus') {
                        nimbus.show();
                    }
                }
        });
        canvasManager.changeStrokeSize(LS.setting.width);
        canvasManager.changeStrokeColor(LS.setting.color);
        canvasManager.changeFillColor(LS.fillColor);
        canvasManager.changeShadow(LS.shadow);
        canvasManager.setEnableNumbers(LS.enablenumbers);
        canvasManager.setFontFamily(LS.font.family);
        canvasManager.setFontSize(LS.font.size);

        $('#open-image').show();

        setPanelTop();

        addEvents();

        addFileAddEvents();

    }

    $(window).resize(function() {
        setPanelTop();
    });

    function setPanelTop() {
        var panel = $('#editpanel');
        var title = panel.find('h5');

        if ($('body').width() < 1500) {
            title.hide();
            $('.tools').css('max-width', '760px');
        } else {
            title.show();
            $('.tools').css('max-width', '1055px');
        }

        $('#photo').css('padding-top', (panel.height() + 10) + 'px');
        canvasManager && canvasManager.zoom(true);
    }

    var firstWidth = null;
    var firstHeight = null;

    function getSize() {
        var width = $('#editcanva').width();
        var height = $('#editcanva').height();
        if (firstWidth == null) {
            var firstWidth = width;
        }
        if (firstHeight == null) {
            var firstHeight = height;
        }

        return {w: width, h: height, fW: firstWidth, fH: firstHeight};
    }

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

    function newImage (img, cb) {
        imgdata = img;
        canvasManager.undoAll();
        canvasManager.loadBackgroundImage(img, function(){
            canvasManager.autoZoom();
            cb && cb();
        });
        $('#drop-file').hide();
    }

    function addFileAddEvents() {

        window.addEventListener('paste', function(event){

            if (!!imgnewdata) return true;
            try {
                var items = (event.clipboardData || event.originalEvent.clipboardData).items;

                if (!items[0].type.match('image.*')) {
                    $.ambiance({message: chrome.i18n.getMessage("notificationWrongInsert"), timeout: 1});
                    return true;
                }

                var blob = items[0].getAsFile();
                var reader = new FileReader();
                reader.onload = function(event){
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

                reader.onload = (function(theFile) {
                    return function(e) {
                        newImage(e.target.result);
                        //if (evt.type === "drop") {
                        //    canvasManager.loadImageObject(e.target.result, evt.pageX, evt.pageY)
                        //} else {
                        //canvasManager.undoAll();
                        //canvasManager.loadBackgroundImage(e.target.result);
                        //$('#drop-file').hide();
                        //}
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
            beginDesktop();
        });

        $('#create-blank').click(function() {
            $('#drop-file').hide();
        })
    }

    function addEvents() {
        document.onkeydown = function(e) {
            var k = e.keyCode;

            if (k == 46) {
                canvasManager.delete();
            }

            if (e.ctrlKey) {
                if (k == 90) {
                    canvasManager.undo();
                    e.preventDefault();
                    return false;
                }
                if (k == 89) {
                    canvasManager.redo();
                    e.preventDefault();
                    return false;
                }
            }
            return true;
        };

        var saveimg = $("#save-img");
        var resizeimg = $(".drop.resize_image");
        var bg = $("#background");

        $('#back').click(function() {
            imgnewdata = null;
            saveimg.hide();
            bg.css('z-index', '1000');
            $('html').css("overflow", "auto");
            return false;
        });

        $('#editpanel button:not(#crop)').click(function() {
            destroyCrop()
        });

        $("#done").click(function() {
            canvasManager.done();

            var canvaFon = document.getElementById("canvasfon");
            var canvaBg = document.getElementById("canvasbg");

            var oCanvas = document.createElement('canvas');
            oCanvas.width = canvaFon.width;
            oCanvas.height = canvaFon.height;

            var ctx = oCanvas.getContext('2d');
            ctx.drawImage(canvaFon, 0, 0);
            ctx.drawImage(canvaBg, 0, 0);

            var previewImg = $('#preview');
            var imgfordw = $('#imgfordownload');
            var name = (new Date()).getTime() + 'screensave.';
            var format = LS.format || 'png';

            name += format;
            imgnewdata = oCanvas.toDataURL('image/'+format, LS.imageQuality/100);

            var bgScreen = screenshot;
            var path = bgScreen.path + name;
            bgScreen.createBlob(imgnewdata, name, function(size) {
                imgfordw.attr('href', path);
                previewImg.find('img').attr('src', path);
                var k = (size / 1000).toFixed(2);
                if (k < 1000) {
                    k = k.toString().replace(",", ".").replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,") + " KB";
                } else {
                    k = (k / 1024).toFixed(2);
                    k = k.toString().replace(",", ".").replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,") + " MB";
                }
                $('#indicator').find('.screenweight').html('<span>' + k + '</span>');
                nimbus.setScreenSize(size)
            });

            $('#indicator').find('.screensize').html('<span>' + canvaFon.width + ' x ' + canvaFon.height + '</span>');
            previewImg.find('img').load(function() {
                var w = previewImg.find('img').width();
                $('#indicator').css('width', w + 'px');
                $('#nimbus-comment').css('width', (w > 300 ? w : 680) + 'px');
                resizeImagePreview();
            });

            $('#message').hide();
            $('#linked').hide();
            bg.css('z-index', '1200');
            $('html').css("overflow", "hidden");
            saveimg.show();

            chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
                if (typeof token === 'undefined') {
                    $('#choose-folder').hide();
                } else {
                    authorized = true;
                    setUploadFolderTooltip();
                }
            });

            if (nimbus.user_authorized()) {
                $('#choose-nimbus-share').show();
                $('#save-nimbus').attr('original-title', '');
//                $('#save-nimbus').attr('original-title', 'Upload to: ' + nimbus.user_upload_folder.title);
            } else {
                $('#choose-nimbus-share').hide();
            }

            nimbusRate.showMessage();
            nimbusAccountPopup.init();
        });

        function resizeImagePreview() {
            var h = $('#save-img').height() + 20;
            var hb = $('#background').height();
//            console.log(h,hb);
//            var z = 1;
            var t = 20;
            if (h > hb) {
//                z = hb / h;
//                if (z < 0.75) {
//                    z = 0.75;
//                }
                t = 0;
            }
            $('#save-img').css('top', t + 'px');
//            $('#save-img').css('zoom', z);
        }

        $("#resize").click(function() {
            if ($('#resize-img').is(':visible')) {
                $("#resize").removeClass('active');
                resizeimg.removeClass('open');
            } else {
                $("#resize").addClass('active');
                var size = getSize();
                $('#img-width').val(size.w);
                $('#img-height').val(size.h);
                resizeimg.addClass('open');
            }
        });

        $('#resize-cancel').click(function() {
            $("#resize").removeClass('active');
            resizeimg.removeClass('open');
            return false;
        });

        $("#resize-img").find('form').submit(function() {
            var w = this.width.value;
            var h = this.height.value;
            canvasManager.changeSize(w * 1, h * 1);
            $("#resize").removeClass('active');
            resizeimg.removeClass('open');
            return false;
        });

        $("#font").click(function() {
            function hide () {
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
            canvasManager.setFontSize(+this.value);
        });

        $('#tools-font .font-list div').on('click', function () {
            canvasManager.setFontFamily($(this).data('font'));
        });

        $("#shadow").click(function() {
            function hide () {
                $("#shadow").removeClass('active');
                $('.drop.tools_shadow').removeClass('open');
            }
            if ($('#tools-shadow').is(':visible')) {
                hide();
            } else {
                $("#shadow").addClass('active');
                var s = canvasManager.getShadow();
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
                blur: $('#shadow-width').val(),
                color: $('#colorshadow').val()
            }
        }

        $('#shadow-width').on('change', function(){
            LS.shadow = getShadowParam();
            canvasManager.changeShadow(LS.shadow, 'blur');
        });

        $('#enable-shadow').on('change', function(){
            LS.shadow = getShadowParam();
            canvasManager.changeShadow(LS.shadow, 'enable');
        });

        $('#colorshadow').on('change', function(){
            LS.shadow = getShadowParam();
            canvasManager.changeShadow(LS.shadow, 'color');
            $('#colorshadow-styler').find('.text').css('background-color', LS.shadow.color);
        });

        $('.percent').change(function() {
            destroyCrop();
            var z = +this.value;
            canvasManager.zoom(z);
            return false;
        });

        $("#zoomminus").click(function() {
            var z = canvasManager.getZoom();
            if (z > 0.25) {
                z -= 0.25;
            }
            $(".percent").val(z);
            $(".percent").trigger('refresh');
            canvasManager.zoom(z);
        });

        $("#zoomplus").click(function() {
            var z = canvasManager.getZoom();
            if (z < 2) {
                z += 0.25;
            }
            $(".percent").val(z);
            $(".percent").trigger('refresh');
            canvasManager.zoom(z);
        });


        $('#img-width').on('input', function() {
            if ($('#proportional').attr('checked')) {
                var size = getSize();
                $('#img-height').val(Math.round(this.value * size.h / size.w));
            }
        });

        $('#img-height').on('input', function() {
            if ($('#proportional').attr('checked')) {
                var size = getSize();
                $('#img-width').val(Math.round(this.value * size.w / size.h));
            }
        });

        $('#proportional-styler').click(function() {

            if ($('#proportional').attr('checked')) {
                var firstSize = getSize();
                $('#img-width').val(firstSize.fW);
                $('#img-height').val(firstSize.fH);
            }
        });

        $('#pens-styler, #pens-styler .text').click(function() {
            var value = $('#pens').val();
            switch (value) {
                case 'pen':
                    canvasManager.activatePen();
                    break;
                case 'highlight':
                    canvasManager.activateHighlight();
                    break;
            }
            $(this).find('.text').removeAttr('class').addClass('text').addClass(value);
            destroyCrop();
            disableActive($('#pens-styler'));
            return false;
        });

        $('#shape-styler, #shape-styler .text').click(function() {
            var value = $('#shape').val();
            switch (value) {
                case 'rectangle':
                    canvasManager.activateEmptyRectangle();
                    break;
                case 'rounded_rectangle':
                    canvasManager.activateRoundedRectangle();
                    break;
                case 'sphere':
                    canvasManager.activateEmptyCircle();
                    break;
                case 'ellipse':
                    canvasManager.activateEllipse();
                    break;
            }
            $(this).find('.text').removeAttr('class').addClass('text').addClass(value);
            destroyCrop();
            disableActive($('#shape-styler'));
            return false;
        });

        $('#arrow-styler, #arrow-styler .text').click(function() {
            var value = $('#arrow').val();
            switch (value) {
                case 'arrow':
                    canvasManager.activateArrow();
                    break;
                case 'arrow_curve':
                    canvasManager.activateCurveArrow();
                    break;
                case 'line':
                    canvasManager.activateLine();
                    break;
                case 'line_curve':
                    canvasManager.activateCurveLine();
                    break;
            }
            $(this).find('.text').removeAttr('class').addClass('text').addClass(value);
            destroyCrop();
            disableActive($('#arrow-styler'));
            return false;
        });

        $('#inscription-styler').click(function() {
            if ($('#inscription').val() === 'sticker') {
                canvasManager.sticker();
                $(this).find('.text').removeAttr('class').addClass('text').addClass('sticker');
            } else {
                canvasManager.textArrow();
                $(this).find('.text').removeAttr('class').addClass('text').addClass('text_arrow');
            }
            destroyCrop();
            disableActive(this);
        });

        $('#inscription-styler .text').click(function() {
            if ($('#inscription').val() === 'sticker') {
                canvasManager.sticker();
            } else {
                canvasManager.textArrow();
            }
            destroyCrop();
            disableActive($('#inscription-styler'));
            return false;
        });

        $("#text").click(function() {
            canvasManager.text();
            disableActive(this);
        });

        $('#line-width-styler').click(function(e) {
            canvasManager.changeStrokeSize($('#line-width').val());
            var clas = $(e.target).attr('class');
            if (clas !== undefined) {
                clas = clas.replace('selected sel', '');
                $(this).find('.text').removeAttr('class').addClass('text').addClass(clas);
            }
        });

        $("#eraser").click(function() {
            canvasManager.activateEraser();
            disableActive(this);
        });

        $('#blur-styler').click(function() {
            if ($('#blur').val() === 'blur') {
                canvasManager.activateBlur();
                $(this).find('.text').removeAttr('class').addClass('text').addClass('blur');
            } else {
                canvasManager.activateBlurOther();
                $(this).find('.text').removeAttr('class').addClass('text').addClass('blur_all');
            }
            destroyCrop();
            disableActive(this);
        });

        $('#blur-styler .text').click(function() {
            if ($('#blur').val() === 'blur') {
                canvasManager.activateBlur();
            } else {
                canvasManager.activateBlurOther();
            }
            destroyCrop();
            disableActive($('#blur-styler'));
            return false;
        });

        $("#undo").click(function() {
            canvasManager.undo();
        });

        $("#undo-all").click(function() {
            canvasManager.undoAll();
            canvasManager.loadBackgroundImage(imgdata);
        });

        $("#redo").click(function() {
            canvasManager.redo();
        });

        $("#numbers").click(function() {
            if($(this).hasClass('enable')) {
                $(this).removeClass('enable');
                LS.enablenumbers = false;
                canvasManager.setEnableNumbers(false);
            } else {
                $(this).addClass('enable');
                LS.enablenumbers = true;
                canvasManager.setEnableNumbers(true);
            }

            chrome.storage.local.set({
                'enablenumbers': LS.enablenumbers
            }, function() {});
        });

        $("#crop").click(function() {

            disableActive(this);

            if (jcrop) {
                return true;
            }

            var pole = $('<div id="forcrop">').appendTo('#photo');
            var size = getSize();
            var zoom = canvasManager.getZoom();

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
                keySupport: true,
                onSelect: createCoords,
                onChange: showCards,
                onMousemove: function (e) {
                    canvasManager.scrollPage(e);
                },
                onEnter: function (e) {
                    $("#crop-image").click();
                }
            });
        });

        $('#save-image').click(function() {

            function exportToFileEntry(fileEntry) {
                if(!fileEntry) return;
                fileEntry.createWriter(function(fileWriter) {
                    var truncated = false;
                    var blob = screenshot.dataToBlob(imgnewdata);
                    fileWriter.onwriteend = function(e) {
                        if (!truncated) {
                            truncated = true;
                            this.truncate(blob.size);
                            return;
                        }
                        chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
                            $.ambiance({message: 'Saved to \''+ path +'\''});
                        });
                    };
                    fileWriter.onerror = function(e) {
                        $.ambiance({message:  chrome.i18n.getMessage("notificationWrong")});
                    };
                    fileWriter.write(blob);
                });
            }

            chrome.fileSystem.chooseEntry( {
                type: 'saveFile',
                suggestedName: screenname + '-' + (new Date()).getTime() + '.' + (LS.format || 'png'),
                accepts: [{
                    mimeTypes: ['image/*']
                }],
                acceptsAllTypes: true
            }, exportToFileEntry);

        });

        $('#save-nimbus, #nimbus-comment-upload').click(function() {

            nimbus.userExistsInfo(function() {
                nimbus.show();
            });
        });
        $('#save-to-nimbus').click(function(){
            nimbus.startUpload(pageinfo, imgnewdata);
        });
        $('#my-uploads-nimbus').click(function(e){
            window.open('https://nimbus.everhelper.me/client/', '_blank');
            e.preventDefault();
        });
        $('#go-to-nimbus-pro').click(function(e){
            window.open('http://nimbus.everhelper.me/pricing.php', '_blank');
            e.preventDefault();
        });

        $('#send-to-google').click(function() {
            saveToGdrive();
            hidePopup();
        });

        $('#copy-to-clipboard').click(function() {
//            try {
//                if(saveToClipboard(imgnewdata)) {
//                    $.ambiance({message:  chrome.i18n.getMessage("notificationCopy")});
//                } else {
//                    throw 'problem with NPAPI';
//                }
//            } catch (e) {
//                $.ambiance({message: chrome.i18n.getMessage("notificationWrong"), type: "error", timeout: 2});
//            }
        });

        $('#print-img').click(function() {

            var f = $("iframe#print")[0],
              c = f.contentDocument,
              d = f.contentWindow,
              i = c.getElementById("image");
            i.onload = function () {
                this.style.width = 718 < this.width ? "100%" : "auto";
                d.focus();
                d.print();
                i.setAttribute("src", '');
            };
            i.setAttribute("src", imgnewdata)

        });

        $('button.panel_btn').tipsy();
        (function () {
            $('#zoomplus').attr('original-title', chrome.i18n.getMessage("tooltipZoomPlus"));
            $('#zoomminus').attr('original-title', chrome.i18n.getMessage("tooltipZoomMinus"));
            $('#resize').attr('original-title', chrome.i18n.getMessage("tooltipResize"));
            $('#crop').attr('original-title', chrome.i18n.getMessage("tooltipCrop"));
            $('#pen').attr('original-title', chrome.i18n.getMessage("tooltipPen"));
            $('#text').attr('original-title', chrome.i18n.getMessage("tooltipText"));
            $('#undo').attr('original-title', chrome.i18n.getMessage("tooltipUndo"));
            $('#redo').attr('original-title', chrome.i18n.getMessage("tooltipRedo"));
            $('#undo-all').attr('original-title', chrome.i18n.getMessage("tooltipUndoAll"));
            $('#shadow').attr('original-title', chrome.i18n.getMessage("tooltipShadow"));
            $('#numbers').attr('original-title', chrome.i18n.getMessage("tooltipNumbers"));
        })();
        $('#percent-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipZoom")).tipsy();
        $('#ellipse-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipEllipse")).tipsy();
        $('#rectangle-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipRectangle")).tipsy();
        $('#line-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipLine")).tipsy();
        $('#arrow-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipArrow")).tipsy();
        $('#line-width-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipLineWidth")).tipsy();
        $('#blur-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipBlur")).tipsy();
        $('#inscription-styler .select').attr('original-title', chrome.i18n.getMessage("tooltipNote")).tipsy();
        $('#copy_URL').attr('original-title', chrome.i18n.getMessage("tooltipCopy")).tipsy();
        $('#short_URL').attr('original-title', chrome.i18n.getMessage("tooltipShortUrl")).tipsy();
        $('#send-to-google').attr('original-title', chrome.i18n.getMessage("tooltipNotAuthorized")).tipsy();
        $('#user-logout').attr('original-title', chrome.i18n.getMessage("tooltipLogout")).tipsy({gravity: 'w'});
        $('#strokecolor').next('.sp-replacer.sp-light').attr('original-title', chrome.i18n.getMessage("tooltipColor")).tipsy();
        $('#fillcolor').next('.sp-replacer.sp-light').attr('original-title', chrome.i18n.getMessage("tooltipFill")).tipsy();
        $('#open-image').attr('original-title', chrome.i18n.getMessage("tooltipOpenFile")).tipsy({gravity: 'nw'});
        $('#capture-windows').attr('original-title', chrome.i18n.getMessage("tooltipMakeScreenshot")).tipsy({gravity: 'nw'});

        $('.select').bind('click', function() {
            $(this).tipsy('hide');
        });

        $('#form-change-pass input').tipsy({trigger: 'focus', gravity: 'w'});
        $('#form-login input').tipsy({trigger: 'focus', gravity: 'w'});
        $('#form-register input').tipsy({trigger: 'focus', gravity: 'w'});
        $('#remind-password input').tipsy({trigger: 'focus', gravity: 'w'});

        $('#linked input').click(function() {
            $(this).select();
        });
    }

    var nimbusRate = {
        urls: {
            'opera' : {
                'feedback': 'https://fvdmedia.userecho.com/list/21580-nimbus-products/?category=7165',
                'review': 'https://addons.opera.com/extensions/details/nimbus-screen-capture/'
            }
        },
        ratePopup: $('#nimbus-rate'),
        getRateInfo: function() {
            var obj = {};
            var time = (new Date()).getTime();
            try {
                obj = JSON.parse(LS['nimbus_rate_info']);
            } catch (e) {
                obj = {install: time, show: true, lastshow: -Infinity};
                LS['nimbus_rate_info'] = JSON.stringify(obj);
            }
            return obj;
        },

        saveRateInfo: function(obj) {
            LS['nimbus_rate_info'] = JSON.stringify(obj);
        },

        disableRate: function() {
            var obj = this.getRateInfo();
            obj.show = false;
            this.saveRateInfo(obj);
        },

        detectBrowser: function() {
            var browser = $.browser;
            for (var i in this.urls) {
                if (browser[i]) {
                    this.ratePopup.find('.feedback').attr('href', this.urls[i].feedback);
                    this.ratePopup.find('.reviews').attr('href', this.urls[i].review);
                    break;
                }
            }
        },

        showMessage: function() {
            var obj = this.getRateInfo();
            var day = 24 * 60 * 60 * 1000;
            var now = Date.now();
            this.detectBrowser();

            if (obj.show) {
                if (now > (+obj.install + 3 * day)) {
                    if (now > (+obj.lastshow + +day)) {
                        setTimeout(function() {
                            nimbusRate.ratePopup.fadeIn();
                        }, 500);
                        this.saveRateInfo({install: obj.install, show: true, lastshow: now});
                    }
                }
            }
        }
    };
    nimbusRate.getRateInfo();

    var nimbusAccountPopup = (function () {
        var popup = $('#nimbus-account-popup ');
        var bind = function () {
            popup.unbind();
            popup.find('button.create_account').on('click', function (){
                popup.hide();
                nimbus.show();
            })
        };
        var init = function (){
            chrome.storage.local.get(['showAccountPopup'], function(data) {

                if (!data.showAccountPopup) {
                    bind();
                    nimbus.userAuthState(function(res) {
                        if (res.errorCode !== 0 || !res.body || !res.body.authorized) {
                            popup.show();
                        }
                    });

                    chrome.storage.local.set({
                        'showAccountPopup': 'false'
                    }, function() {});
                }

            });

        };
        return {
            init: init
        };
    })();

    $('#nimbus-rate').bind('click', function() {
        $(this).fadeOut();
    });
    $('#disable-rate-message').bind('click', function(e) {
        nimbusRate.disableRate();
        e.preventDefault();
    });

    function createCoords(c) {

        var btncancel = $('<button/>', {
            html: '<i class="cancel"></i><div class="name">Cancel</div>',
            'id': 'caancel-crop',
            'class': 'edit_btn cancel'
        });

        var btncrop = $('<button/>', {
            html: '<i class="save"></i><div class="name">Crop</div>',
            'id': 'crop-image',
            'class': 'edit_btn edit'
        });

        $('#screenshotsize').remove();
        $('#screenshotbutton').remove();

        $('.jcrop-dragbar').first().before('<div id="screenshotsize"></div>');
        $('.jcrop-dragbar').first().before('<div id="screenshotbutton" class="nimbus_screenshot_buttons crop_buttons"></div>');

        $('#screenshotbutton').append(btncrop).append(btncancel);

        btncancel.click(function() {
            destroyCrop();
        });

        btncrop.click(function() {
            destroyCrop();
            canvasManager.cropImage(c);
        });

        $('.edit_btn').hover(function() {
            $(".name", this).stop().animate({top: '35px', bottom: '0px'}, {queue: false, duration: 160});
        }, function() {
            $(".name", this).stop().animate({top: '47px', bottom: '0'}, {queue: false, duration: 160});
        });

        showCards(c);
    }


    function showCards(c) {
        var zoom = canvasManager.getZoom();
        $('#screenshotsize').html('<span>' + Math.round(c.w / zoom) + ' x ' + Math.round(c.h / zoom) + '</span>');
        var size = getSize();
        if ((c.h + c.y + 55) > size.h) {
            $('#screenshotbutton').css('bottom', '8px');
        }
    }

    var setPublicGdrive = function(fileId) {
        chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://www.googleapis.com/drive/v2/files/' + fileId + '/permissions');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.setRequestHeader('Content-Type', 'application/json');

            var permission = {
                "role": "reader",
                "type": "anyone"
            };
            var body = JSON.stringify(permission);

            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {

                }
            };

            xhr.send(body);
        });

    };

    var gFolders = {
        gAccessToken: '',
        fList: {},
        fParents: {},
        fCurrent: 'root',
        getUploadFolder: function () {
            return LS.google_upload_folder;
        },
        setUploadFolder: function (folder) {
            LS.google_upload_folder = folder;
            chrome.storage.local.set({
                'google_upload_folder': JSON.stringify(folder)
            }, function() {});
        },
        setAccessToken: function(t) {
            gFolders.gAccessToken = t;
        },
        addFolder: function(folder) {
            var f = $('<li>', {
                'html': '<img src="images/icon_11_folder.png"> ' + folder.title,
                'data-id': folder.id
            }).appendTo('#file_manager .folders');
            f.bind('click', function() {
                var cur = $(this).data('id');
                gFolders.fParents[cur] = gFolders.fCurrent;
                gFolders.getFolders(cur);
            });
        },
        setParent: function(folder) {
            $('#parent').html('');
            var p = $('<div>', {
                'html': '<img src="images/icon_11_folder.png"> ' + folder.title,
                'data-id': folder.id
            }).appendTo('#parent');
            p.bind('click', function() {
                gFolders.getFolders($(this).data('id'));
            });
        },
        setCurrent: function(folder) {
            $('#current').html('');
            $('<div>', {
                'html': '<img src="images/icon_11_folder.png"><span> ' + folder.title + '</span>',
                'data-id': folder.id
            }).appendTo('#current');
            var t = folder.title;
            $('#future_folder').text(chrome.i18n.getMessage("foldersLabel") + ' ' + t);

        },
        setRootFolder: function() {
            $('#parent').html('');
            var p = $('<div>', {
                'html': chrome.i18n.getMessage("gDriveMainFolder"),
                'data-id': 'root'
            }).appendTo('#parent');
            p.bind('click', function() {
                gFolders.getFolders($(this).data('id'));
            });
        },
        getFolderInfo: function(folderID, callback) {
            if (gFolders.fList[folderID] == undefined) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', "https://www.googleapis.com/drive/v2/files/" + folderID);
                xhr.setRequestHeader('Authorization', 'Bearer ' + gFolders.gAccessToken);
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onreadystatechange = function() {
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
        getParentFolder: function(folder, callback) {
            if (gFolders.fParents[folder] == undefined) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', "https://www.googleapis.com/drive/v2/files/" + folder + "/parents");
                xhr.setRequestHeader('Authorization', 'Bearer ' + gFolders.gAccessToken);
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onreadystatechange = function() {
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
        getFolders: function(folder) {
            folder = folder || 'root';

            $('#file_manager').fadeIn("fast");
            $('#file_manager .folders').html('').addClass('loading_folders');

            gFolders.fCurrent = folder;
            gFolders.getParentFolder(folder, function(id) {
                gFolders.getFolderInfo(id, function(info) {
                    gFolders.setParent(info);
                });
            });

            gFolders.getFolderInfo(folder, function(info) {
                gFolders.setCurrent(info);
            });

            var xhr = new XMLHttpRequest();
            xhr.open('GET', "https://www.googleapis.com/drive/v2/files/" + folder + "/children?q=mimeType = 'application/vnd.google-apps.folder'");
            xhr.setRequestHeader('Authorization', 'Bearer ' + gFolders.gAccessToken);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (xhr.status == 200) {
                        var res = JSON.parse(this.response);
                        var l = res.items.length;
                        if (l > 0) {
                            for (var i = l - 1; i >= 0; i--) {
                                gFolders.getFolderInfo(res.items[i].id, function(info) {
                                    gFolders.addFolder(info);
                                })
                            }
                        } else {
                            $('#file_manager .folders').append('<span>'+chrome.i18n.getMessage("gDriveNoItems")+'</span>');
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
        $('#select_folder').hide();
        $('#send-to-google').removeClass('active');
        $('#choose-folder').removeClass('active');
        $('body').unbind('click', hidePopup);
        if (authorized) setUploadFolderTooltip();
    }

    function setUploadFolderTooltip (title) {
        $('#send-to-google').attr('original-title', chrome.i18n.getMessage("tooltipUploadTo") + ': ' + (title || gFolders.getUploadFolder().title));
    }

    function setFolder(title) {
        $('#select_folder').find('span.title').html('<img src="images/icon_11_folder.png"> ' + title);
    }

    $('#btn_select').bind('click', function() {
        var info = {id: $('#current').find('div').data('id'), title: $('#current').find('span').text()};
        gFolders.setUploadFolder(info);
        setUploadFolderTooltip(info.title);
        $('#file_manager').fadeOut("fast");
    });

    $('.btn_cancel').bind('click', function() {
        $('.popup_bg').fadeOut("fast");
    });

    $('.popup_bg').bind('click', function(e) {
        if (e.target == this) {
            $('.popup_bg').fadeOut("fast");
        }
    });

    $('#choose-folder').bind('click', function() {
        var s = $('#select_folder');
        if (!s.is(':visible')) {
            setFolder(gFolders.getUploadFolder().title);
            $('#select_folder input[name=share]').prop('checked', !LS.shareOnGoogle)
            s.show();
            $('#send-to-google').addClass('active');
            $('#send-to-google').attr('original-title', '');
            $('#choose-folder').addClass('active');
            setTimeout(function() {
                $('body').bind('click', hidePopup);
            }, 10);
        }

    });

    $('.panel_settings').bind('click', function(e) {
//        e.preventDefault();
        e.stopPropagation();
//        return false;
    });

    $('#select_folder span.title').bind('click', function() {
        chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
            gFolders.setAccessToken(token);
            gFolders.getFolders(gFolders.getUploadFolder().id);
            hidePopup();
        });
        return false;
    });

    $('#select_folder input[name=share]').on('change', function () {
        LS.shareOnGoogle = !$(this).prop('checked');
        chrome.storage.local.set({
            'shareOnGoogle': LS.shareOnGoogle
        }, function() {});
    });

    $('#nimbus-add-comments').click(function(e) {
        $('#nimbus-comment').slideToggle('fast').find('textarea').focus();
        e.preventDefault();
    });

    $('#nimbus_folder').click(function(e) {
        nimbus.foldersShowManager();
        e.preventDefault();
    });

    $('#nimbus-btn-select').bind('click', function() {
        $('.popup_bg').fadeOut("fast");

        var nff = $('#nimbus-future_folder');
        var cur = {id: nff.data('f-id'), title: nff.data('f-title')};
        nimbus.uploadSetFolder(cur);

        $('#save-nimbus').attr('original-title', chrome.i18n.getMessage("tooltipUploadTo") + ': ' + nimbus.user_upload_folder.title);
    });

    $('#choose-nimbus-share').bind('click', function() {
        var s = $('#select-nimbus-setting');
        if (!s.is(':visible')) {
            $('#nimbus-user-email').text(decodeURIComponent(nimbus.user_email));
            $('#nimbus-folder').text(nimbus.user_upload_folder.title);
            s.show();
            $('#save-nimbus').attr('original-title', '');
            $('#save-nimbus').addClass('active');
            $('#choose-nimbus-share').addClass('active');
            setTimeout(function() {
                $('body').bind('click', hidePopupNimbusShare);
            }, 10);
        }

    });


    $('#nimbus-share').change(function() {
        LS.nimbus_share = !this.checked;
        chrome.storage.local.set({
            'nimbus_share': LS.nimbus_share
        }, function() {});
    });

    var clearGdriveData = function() {
        chrome.identity.getAuthToken({ 'interactive': false }, function(current_token) {
            chrome.identity.removeCachedAuthToken({ token: current_token }, function() {});

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + current_token);
            xhr.send();

            console.log(current_token);
        });
        console.log('clear');
    };

    var saveToGdrive = function() {

        chrome.identity.getAuthToken({ 'interactive': true }, function(token) {

            if(typeof token === 'undefined') {
                return;
            }

            if (!authorized) {
                $('#choose-folder').show();
                setUploadFolderTooltip();
                authorized = true;
                return;
            }

            $('#message').hide();
            $('#linked').hide();
            $('#uploadimg').show();

            var format = LS.format || 'png';
            var data = imgnewdata.replace(/^data:image\/(png|jpeg|bmp);base64,/, "");

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.setRequestHeader('Content-Type', 'multipart/mixed; boundary="--287032381131322"');

            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    $('#uploadimg').hide();

                    switch (xhr.status) {
                        case 200:	// success
                            var res = JSON.parse(xhr.response);
                            if (res.alternateLink && res.ownerNames) {
                                if(LS.shareOnGoogle) setPublicGdrive(res.id);
                                $('#linked').show();
                                $('#linked input').val(res.alternateLink);
                                copyUrlToClipboard(res.alternateLink)
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
                "title": screenname + "." + format,
                "mimeType": "image/" + format,
                "description": "Uploaded by Nimbus Screen Capture",
                "parents": [
                    {
                        "kind": "drive#fileLink",
                        "id": gFolders.getUploadFolder().id
                    }
                ]
            };

            var multipartRequestBody = delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) + delimiter + 'Content-Type: ' + 'image/' + format + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + data + close_delim;

            xhr.send(multipartRequestBody);

        });

    };

    $("#copy_URL").click(function() {
        copyUrlToClipboard();
    });

    $("#short_URL").click(function() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://nimb.ws/dantist_api.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            //alert(this.responseText);
            var obj = jQuery.parseJSON(this.responseText);
            $('#linked input').val(obj.short_url);
            copyUrlToClipboard(obj.short_url);
        };
        xhr.send('url=' + encodeURIComponent($('#linked input').val()));
    });

    $('#capture-windows-helper .close_helper_tooltip').click(function(){
        $('#capture-windows-helper').fadeOut(100);
        chrome.storage.local.set({
            'disableHelper': true
        }, function() {
            LS.disableHelper = true;
        });
    });

    image.load(function() {
        initPage();
        if (!LS.disableHelper) {
             $('#capture-windows-helper').fadeIn(100);
        }
    });

    chrome.storage.local.get([
        'format',
        'imageQuality',
        'fillColor',
        'setting',
        'shadow',
        'enablenumbers',
        'google_upload_folder',
        'nimbus_share',
        'disableHelper',
        'font'
    ], function(data) {
        LS.format = data.format || 'png';
        LS.imageQuality = data.imageQuality || '92';
        LS.fillColor = data.fillColor || 'rgba(0,0,0,0)';
        LS.setting = JSON.parse(data.setting || '{"width": 3, "color": "#f00"}');
        LS.shadow = JSON.parse(data.shadow || '{"enable": true, "color": "#000000", "blur": 5 }');
        LS.enablenumbers = data.enablenumbers || false;
        LS.google_upload_folder = JSON.parse(data.google_upload_folder || '{"id":"root","title":"Main folder"}');
        LS.nimbus_share = data.nimbus_share || false;
        LS.disableHelper = data.disableHelper || false;
        LS.font = JSON.parse(data.font || '{"family": "Arial", "size": 35}');
        LS.shareOnGoogle = data.shareOnGoogle  || false;

        setOptions();
        image.attr('src', imgdata);
    });
});