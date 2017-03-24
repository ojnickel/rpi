(function ($) {
    window.thisScrollCrop = true;
    var jcrop;
    var firstMove = 0;
    var isDown;
    var hideFixedElements = false;
    var fixedElements = [];

    function autoScroll(event) {
        $("#areafon").unbind('mousemove', autoScroll);

        var clientY = event.clientY, clientX = event.clientX, restY = window.innerHeight - clientY, restX = window.innerWidth - clientX;
        if (clientY < 40) document.body.scrollTop -= 20;
        if (clientX < 40) document.body.scrollLeft -= 20;
        if (restY < 40) document.body.scrollTop += 50 - restY;
        if (restX < 40) document.body.scrollLeft += 50 - restX;
    }

    scrollCrop();

    function hasClass(a, b) {
        return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
    }

    function addClass(a, b) {
        hasClass(a, b) || (a.className += " " + b)
    }

    function removeClass(a, b) {
        if (hasClass(a, b)) {
            var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
            a.className = a.className.replace(c, " ")
        }
    }

    function enableFixedPosition(enableFlag) {
        if (!hideFixedElements) return;

        if (enableFlag) {
            if (location.host == 'www.facebook.com') {
                var b = document.getElementsByClassName('_64b')[0];
                addClass(b, "fixed_elem");
            }

            for (var i = 0, l = fixedElements.length; i < l; ++i) {
                fixedElements[i].style.position = "fixed";
            }
            fixedElements = [];
        } else {
            if (location.host == 'www.facebook.com') {
                var b = document.getElementsByClassName('_64b')[0];
                removeClass(b, "fixed_elem");
            }

            var nodeIterator = document.createNodeIterator(document.documentElement, NodeFilter.SHOW_ELEMENT, null, false);
            var currentNode;
            while (currentNode = nodeIterator.nextNode()) {
                var nodeComputedStyle = document.defaultView.getComputedStyle(currentNode, "");
                // Skip nodes which don't have computeStyle or are invisible.
                if (!nodeComputedStyle)
                    return;
                var nodePosition = nodeComputedStyle.getPropertyValue("position");
                if (nodePosition == "fixed") {
                    fixedElements.push(currentNode);
                    currentNode.style.position = "absolute";
                }
            }
        }
    }

    function getSize() {
        var body = document.body,
            html = document.documentElement,
            page_w = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
            page_h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        return {w: page_w, h: page_h};
    }

    function scrollCrop() {
        var size = getSize();
        var pole = $('<div id="areafon">').appendTo('body');
        var position = $('body').offset();
        pole.append('<div class="cropNotification">Drag and Capture Page (Press Esc to Exit)</div>');

        console.log(size);
        pole.css({
            width:           size.w,
            height:          size.h,
            position:        'absolute',
            left:            '0',
            top:             '0',
            zIndex:          999999,
            backgroundColor: 'rgba(0,0,0,0.2)'
        });

        var crop = $('<div>').appendTo(pole);

        crop.css({
            opacity:  '0.1',
            width:    '100%',
            height:   '100%',
            position: 'absolute',
            left:     '0px',
            top:      '0px'
        });

        jcrop = $.Jcrop(crop, {
            onSelect:  createCoords,
            //setSelect:   [size.w,size.w, size.w-100, size.w-100 ],
            onChange:  showCoords,
            onRelease: function () {
                pole.css({backgroundColor: 'rgba(0,0,0,0.2)'});
            }
        });

        chrome.extension.sendMessage({msg: 'getCropScrollPosition'}, function (response) {
            if (response.x2 && response.x2 <= size.w && response.y2 <= size.h) {
                jcrop.setSelect([response.x, response.y, response.x2, response.y2]);
                $("html, body").animate({ scrollTop: response.y}, "slow");
                pole.css({backgroundColor: 'transparent'});
            }
            hideFixedElements = response.hideFixedElements;
        });

        $('.jcrop-holder').css({
            background: '',
            overflow:   'hidden'
        });

        $('.jcrop-tracker').bind("mousedown", function () {
            pole.css({backgroundColor: 'transparent'});
        });

        pole.bind({
            'mousemove': function (e) {
                if (e.which == 3) {
                    destroyCrop();
                    return false;
                }
            }
        });

        pole.bind("contextmenu", function () {
            destroyCrop();
            return false;
        });
    }

    function createCoords(c) {
        console.log(c);
        isDown = true;
        saveCropPosition(c);

        if ($("div").is("#screenshotbutton") && $("div").is("#screenshotsize")) {
            showCoords(c);
            //cropImage(true);
            return;
        }

        var btne = $('<button/>', {
            html:    '<i class="edit"></i><div class="name">Edit</div>',
            'id':    'screenshoted',
            'class': 'edit_btn edit'
        });

        var btnc = $('<button/>', {
            html:    '<i class="cancel"></i><div class="name">Cancel</div>',
            'id':    'screenshotcn',
            'class': 'edit_btn cancel'
        });

        var btns = $('<div/>', {
            'id':    'screenshotbutton',
            'class': 'nimbus_screenshot_buttons'
        });

        btns.append(btne);
        btns.append('<a class="edit_btn save" id="imgdownload"><i class="save"></i><div class="name">Save</div></a>');
        btns.append(btnc);

        var drag = $('.jcrop-dragbar').first();
        drag.before('<div id="screenshotsize"></div>');
        drag.before(btns);

        var btnsdone = $('<div/>', {
            'id':    'screenshotbuttonsdone',
            'class': 'nimbus_screenshot_buttons'
        });

        var btnnimbus = $('<button/>', {
            html:    '<i class="nimbus"></i>',
            'id':    'screenshotnimbus',
            'class': 'edit_btn nimbus',
            'title': chrome.i18n.getMessage("cropBtnNimbus")
        });
        btnsdone.append(btnnimbus);
        drag.before(btnsdone);

        btnnimbus.bind('click', function () {
            destroyCrop();
            chrome.extension.sendRequest({'operation': 'nimbusScroll'});
        });

        btnc.bind('click', function () {
            destroyCrop();
        });

        btne.bind('click', function () {
            chrome.extension.sendRequest({'operation': 'cropScroll'});
            enableFixedPosition(false);
            destroyCrop();
        });

        btns.bind('click', function () {
            destroyCrop();
            chrome.extension.sendRequest({operation: 'saveScroll', 'scrollToCrop': false}, function (response) {
                console.log(response);
            });
        });

        $('.edit_btn').hover(function () {
            $(".name", this).stop().animate({top: '35px', bottom: '0px'}, {queue: false, duration: 160});
        }, function () {
            $(".name", this).stop().animate({top: '47px', bottom: '0'}, {queue: false, duration: 160});
        });

        showCoords(c);
    }

    function saveCropPosition(c) {
        chrome.extension.sendMessage({msg: 'saveCropScrollPosition', position: c}, function (response) {
            console.log(response);
        });
    }

    function destroyCrop() {
        window.thisScrollCrop = false;
        enableFixedPosition(true);
        $('#areafon').remove();
    }

    function showCoords(c) {
        var z = window.devicePixelRatio || 1;
        $('#screenshotsize').html('<span>' + (c.w * z) + ' x ' + (c.h * z) + '</span>');

        if ((c.h + c.y + 55) > $(window).height() + $(window).scrollTop()) {
            $('#screenshotbutton').css('bottom', '8px');
        } else {
            $('#screenshotbutton').css('bottom', '-55px');
        }

        if ((c.w + c.x + 55) > $(window).width() + $(window).scrollLeft()) {
            $('#screenshotbuttonsdone').css('right', '8px');
        } else {
            $('#screenshotbuttonsdone').css('right', '-53px');
        }

        $("#areafon").bind('mousemove', autoScroll);

        cropImage(c);
    }

    function cropImage(c) {
        chrome.extension.sendRequest({
            'operation': 'cap',
            'xs':        c.x,
            'ys':        c.y,
            'ws':        c.w,
            'hs':        c.h
        });
    }

    window.addEventListener('keydown', function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            destroyCrop();
        }
    }, false);

}(jQuery));