window.thisEr = true;
var xsP;
var ysP;
var wsP;
var hsP;
var scrollToCrop = false;
var hideFixedElements = false;
var fixedElements = [];
var tik = null;
var overflow = document.defaultView.getComputedStyle(document.documentElement, "").getPropertyValue("overflow");

var endCapture = function () {
    window.clearTimeout(tik);
    tik = null;
    window.thisEr = false;
    document.documentElement.style.overflow = overflow;
    enableFixedPosition(true);
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

function getPositions(cb) {
    document.body.scrollTop = 0;
    document.documentElement.style.overflow = "hidden";

    var body = document.body,
        html = document.documentElement,
        fullWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
        fullHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        arrangements = [],

        scrollPad = 200,

        xs = xsP, ys = ysP, hs = hsP, ws = wsP,
        ymax = hs + ys - windowHeight, xmax = ws + xs - windowWidth,

        yDelta = windowHeight - (windowHeight > scrollPad ? scrollPad : 0),
        xDelta = windowWidth,
        yPos = fullHeight - yDelta,
        xPos, numArrangements;

    if (scrollToCrop == true) {
        yPos = ymax;
        while (yPos > ys - yDelta) {
            xPos = xs;
            while (xPos < xmax + xDelta) {
                arrangements.push([xPos, yPos]);
                xPos += xDelta;
            }
            yPos -= yDelta;
        }
    } else {
        while (yPos > -yDelta) {
            xPos = 0;
            while (xPos < fullWidth) {
                arrangements.push([xPos, yPos]);
                xPos += xDelta;
            }
            yPos -= yDelta;
        }
    }

    numArrangements = arrangements.length;

    (function scrollTo() {
        if (!arrangements.length) {
            endCapture();
            if (scrollToCrop == true) {
                chrome.extension.sendRequest({msg: 'openPage', 'x': xs, 'y': ys, 'w': ws, 'h': hs, devicePixelRatio: window.devicePixelRatio || 1});
                return cb && cb();
            } else {
                window.scrollTo(0, 0);
                chrome.extension.sendRequest({msg: 'openPage'});
                return cb && cb();
            }
        }

        var next = arrangements.shift(), x = next[0], y = next[1];

        window.scrollTo(x, y);

        enableFixedPosition(false);

        var data = {
            msg:              'capturePage',
            x:                window.scrollX,
            y:                window.scrollY,
            width:            windowWidth,
            height:           windowHeight,
            complete:         (numArrangements - arrangements.length) / numArrangements,
            totalWidth:       fullWidth,
            totalHeight:      fullHeight,
            devicePixelRatio: window.devicePixelRatio || 1
        };

        return (tik = window.setTimeout(function () {
            chrome.extension.sendRequest(data, function (response) {
                if (tik && typeof(response) != 'undefined') {
                    scrollTo();
                }
            });
        }, 200));
    })();
}
