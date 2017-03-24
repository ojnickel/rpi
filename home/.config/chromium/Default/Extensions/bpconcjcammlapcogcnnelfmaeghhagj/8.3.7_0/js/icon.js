'use strict';
var iconService = (function () {

  function getPath(a) {
    return {
      path: {
        19: "images/icons/" + a + "19.png",
        38: "images/icons/" + a + "38.png"
      }
    }
  }

  function setIcon (type) {
    chrome.browserAction.setIcon(getPath(type));
  }

  function setDefault () {
    setIcon('default');
  }

  function setRec () {
    setIcon('rec');
  }

  function setPause () {
    setIcon('pause');
  }


  function showBadge (t) {
    chrome.browserAction.setBadgeText({ text: t.toString() });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#000'});
  }

  return {
    setDefault: setDefault,
    setRec: setRec,
    setPause: setPause,
    showBadge: showBadge
  }
})();