window.thisEr = true;
var xsP;
var ysP;
var wsP;
var hsP;
var scrollToCrop = false;
var hideFixedElements = false;
var fixedElements = [];
var tik = null;
var overflow_x = document.defaultView.getComputedStyle(document.documentElement, "").getPropertyValue("overflow-x");
//var overflow_x_body = document.defaultView.getComputedStyle(document.body, "").getPropertyValue("overflow-x");

var endCapture = function () {
    window.clearTimeout(tik);
    tik = null;
    window.thisEr = false;
//    document.body.style.overflowX = overflow_x_body;
    document.documentElement.style.overflowX = overflow_x;
    enableFixedPosition(true);
    enableScroll();
    removeMackPage();
};
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

if (!window.hasScreenCapturePage) {
    window.hasScreenCapturePage = true;
    chrome.extension.onRequest.addListener(function (request, sender, callback) {
        if (request.msg == 'scrollPage') {
            scrollToCrop = request.scrollToCrop;
            hideFixedElements = request.hideFixedElements;

            if (scrollToCrop === true) {
                xsP = request.xs;
                ysP = request.ys;

                wsP = request.ws;
                hsP = request.hs;
            }

            getPositions(callback);
        }

    });

    window.addEventListener('keydown', function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            endCapture();
        }
    }, false);
    window.addEventListener('contextmenu', function (e) {
        endCapture();
        return true;
    }, false);
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

//        document.body.style.position = "relative";

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

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function addedMackPage() {
    var body = document.body,
        html = document.documentElement,
        page_w = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
        page_h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    var div = document.createElement('div');
    div.id = 'nimbus_screenshot_mack_page';
    div.style.width = page_w + 'px';
    div.style.height = page_h + 'px';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.zIndex = '99999999999999999999999999999';

    body.appendChild(div);
}

function removeMackPage() {
    var node = document.getElementById('nimbus_screenshot_mack_page');
    node.parentElement.removeChild(node);
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

function getPositions(cb) {
    document.body.scrollTop = 0;
    document.documentElement.style.overflowX = "hidden";

    disableScroll();
    addedMackPage();

    var body = document.body,
        html = document.documentElement,
        fullWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
        fullHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        arrangements = [],
        yPos = fullHeight - windowHeight,
        xPos = 0;

    var elems = document.body.getElementsByTagName("*");
    var elems_scroll = [];
    for (var i = 0, parent_scroll_size, parent_rect, parent_overflow_y; i < elems.length; i++) {
        parent_scroll_size = Math.ceil(Math.max(elems[i].parentNode.clientHeight, elems[i].parentNode.scrollHeight, elems[i].parentNode.offsetHeight));
        parent_rect = elems[i].parentNode.getBoundingClientRect();
        parent_overflow_y = document.defaultView.getComputedStyle(elems[i].parentNode, "").getPropertyValue("overflow-y");

        // if (parent_overflow_y == 'scroll' || parent_overflow_y == 'auto') {
        //     console.log(Math.ceil(windowWidth), Math.ceil(parent_rect.width) * 2, Math.ceil(parent_rect.height), parent_scroll_size);
        //     console.log(elems[i].parentNode);
        // }

        if (Math.ceil(windowWidth) < Math.ceil(parent_rect.width) * 2 && Math.ceil(parent_rect.height) < parent_scroll_size
            && parent_rect.left + parent_rect.width > 0 && parent_rect.top + parent_rect.height > 0
            && (parent_overflow_y == 'scroll' || parent_overflow_y == 'auto')
            && elems[i].parentNode.tagName != 'BODY') {

            // console.log(Math.ceil(windowWidth), Math.ceil(parent_rect.width) * 2, Math.ceil(parent_rect.height), parent_scroll_size);
            // console.log(elems[i].parentNode);

            if (elems[i].parentNode.classList.contains('is_added_scroll_elem')) {
                continue;
            }

            fullHeight += (parent_scroll_size - parent_rect.height);

            for (var b = 0; b < parent_scroll_size; b += parent_rect.height) {
                elems[i].parentNode.classList.add('is_added_scroll_elem');
                console.log(elems[i].parentNode);
                elems_scroll.push({
                    x:    0,
                    y:    b,
                    w:    windowWidth,
                    h:    parent_scroll_size - b > parent_rect.height ? parent_rect.height : parent_scroll_size - b,
                    elem: {
                        x:   parent_rect.left,
                        y:   parent_rect.top,
                        w:   parent_rect.width,
                        h:   parent_rect.height,
                        dom: elems[i].parentNode
                    }
                });

            }

            console.log(elems_scroll);
        }
    }

    for (var c = 0, clear_elems = document.getElementsByClassName('is_added_scroll_elem'); c < clear_elems.length; c++) {
        clear_elems[c].classList.remove('is_added_scroll_elem');
    }

    if (scrollToCrop == true) {
        var originfullWidth = fullWidth;
        var originfullHeight = fullHeight;
        fullWidth = wsP;
        fullHeight = hsP;
        yPos = ysP;
        while (yPos < ysP + fullHeight) {
            xPos = xsP;
            while (xPos < xsP + fullWidth) {
                arrangements.push({
                    x:       xPos,
                    x_crop:  xsP,
                    x_shift: 0,
                    y:       yPos,
                    y_crop:  ysP,
                    y_shift: originfullHeight - windowHeight < yPos ? yPos - (originfullHeight - windowHeight) : 0,
                    w:       wsP,
                    h:       hsP > windowHeight ? windowHeight : hsP,
                    elem:    null
                });
                xPos += windowWidth;
            }
            hsP -= windowHeight;
            yPos += windowHeight;
            console.log(hsP);
        }
    } else {
        var elem_scroll;
        while (yPos > -windowHeight) {
            xPos = 0;
            while (xPos < fullWidth) {

                var added_elems_scroll = null;

                if (elems_scroll.length) {
                    elem_scroll = elems_scroll[0].elem;
                    if (elem_scroll.y >= yPos && elem_scroll.y + elem_scroll.h <= yPos + windowHeight) {
                        added_elems_scroll = elems_scroll;
                    }
                }

                if (added_elems_scroll) {
                    if (elem_scroll.y > yPos) {
                        arrangements.push({
                            x:    xPos,
                            y:    yPos > 0 ? yPos : 0,
                            w:    windowWidth,
                            h:    elem_scroll.y - yPos,
                            elem: null
                        });
                    }

                    arrangements = arrangements.concat(added_elems_scroll);

                    console.log(elem_scroll.y, elem_scroll.h, yPos, windowHeight);

                    if (elem_scroll.y + elem_scroll.h < yPos + windowHeight) {
                        arrangements.push({
                            x:    xPos,
                            y:    elem_scroll.y + elem_scroll.h,
                            w:    windowWidth,
                            h:    (yPos + windowHeight) - (elem_scroll.y + elem_scroll.h),
                            elem: null
                        });
                    }
                } else {
                    arrangements.push({
                        x:    xPos,
                        y:    yPos > 0 ? yPos : 0,
                        w:    windowWidth,
                        h:    elem_scroll ? (elem_scroll.y < (yPos > 0 ? yPos : 0) + windowHeight ? (yPos > 0 ? yPos : 0) - elem_scroll.y : windowHeight) : windowHeight,
                        elem: null
                    });
                }
                xPos += windowWidth;
            }
            yPos -= windowHeight;
        }
    }

    var last_elem, last_elem_overflow;

    (function scrollTo() {
        if (!arrangements.length) {
            endCapture();
            if (scrollToCrop != true) {
                window.scrollTo(0, 0);
            }
            chrome.extension.sendRequest({msg: 'openPage'});
            return cb && cb();
        }

        enableFixedPosition(false);

        var next = arrangements.shift();
        console.log(next);

        var data = {
            msg:              'capturePage',
            x:                next.x,
            x_crop:           next.x_crop || 0,
            x_shift:          next.x_shift || 0,
            y:                next.y,
            y_crop:           next.y_crop || 0,
            y_shift:          next.y_shift || 0,
            w:                next.w,
            h:                next.h,
            scrollTop:        document.body.scrollTop,
            scrollLeft:       document.body.scrollLeft,
            index:            arrangements.length,
            elem:             null,
            totalWidth:       fullWidth,
            totalHeight:      fullHeight,
            devicePixelRatio: window.devicePixelRatio || 1,
            scrollToCrop:     scrollToCrop
        };

        if (next.elem) {
            if (location.host == 'www.charmeck.org') { // TODO: устранить эту бубуйню
                next.elem.dom.style.position = 'absolute';
                next.elem.dom.style.top = 0;
                next.elem.dom.style.left = 0;
                next.elem.dom.style.right = 0;
                next.elem.dom.style.bottom = 0;
            }
            last_elem_overflow = document.defaultView.getComputedStyle(next.elem.dom).getPropertyValue("overflow-y");
            next.elem.dom.style.overflowY = "hidden";
            last_elem = next.elem.dom;
            next.elem.dom.scrollTop = next.y;
            data.elem = {
                x: next.elem.x,
                y: next.elem.y,
                w: next.elem.w,
                h: next.elem.h
            }
        }

        window.scrollTo(next.x, next.y);

        return (tik = window.setTimeout(function (step) {
            chrome.extension.sendRequest(data, function (response) {
                if (tik && typeof(response) != 'undefined') {
                    if (last_elem) {
                        last_elem.style.overflowY = last_elem_overflow;
                        last_elem = last_elem_overflow = null;
                    }
                    scrollTo();
                }
            });
        }, 200));
    })();
}
