/**
 - author: hasesanches
 - date: 27.09.16
 - http://hase.su
 **/

var overflow = document.defaultView.getComputedStyle(document.documentElement, "").getPropertyValue("overflow");
document.documentElement.style.overflow = "hidden";

chrome.runtime.onMessage.addListener(function (req) {
    if (req.msg == 'restore_overflow') {
        document.documentElement.style.overflow = overflow;
    }
});
