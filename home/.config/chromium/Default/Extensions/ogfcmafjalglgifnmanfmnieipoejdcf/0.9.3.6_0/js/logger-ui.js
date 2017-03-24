/*******************************************************************************

    uMatrix - a browser extension to benchmark browser session.
    Copyright (C) 2015 Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/sessbench
*/

/* global vAPI, uDom */

/******************************************************************************/

(function() {

'use strict';

/******************************************************************************/

var messager = vAPI.messaging.channel('logger-ui.js');
var tbody = document.querySelector('#content tbody');
var trJunkyard = [];
var tdJunkyard = [];
var firstVarDataCol = 2;  // currently, column 2 (0-based index)
var lastVarDataIndex = 3; // currently, d0-d3
var maxEntries = 0;
var noTabId = '';
var allTabIds = {};
var allTabIdsToken;

var emphasizeTemplate = document.querySelector('#emphasizeTemplate > span');
var hiddenTemplate = document.querySelector('#hiddenTemplate > span');

var prettyRequestTypes = {
    'main_frame': 'doc',
    'stylesheet': 'css',
    'sub_frame': 'frame',
    'xmlhttprequest': 'xhr'
};

var timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};

var dateOptions = {
    month: 'short',
    day: '2-digit'
};

/******************************************************************************/

// Adjust top padding of content table, to match that of toolbar height.

document.getElementById('content').style.setProperty(
    'margin-top',
    document.getElementById('toolbar').offsetHeight + 'px'
);

/******************************************************************************/

var escapeHTML = function(s) {
    return s.replace(reEscapeLeftBracket, '&lt;')
            .replace(reEscapeRightBracket, '&gt;');
};

var reEscapeLeftBracket = /</g;
var reEscapeRightBracket = />/g;

/******************************************************************************/

var classNameFromTabId = function(tabId) {
    if ( tabId === noTabId ) {
        return 'tab_bts';
    }
    if ( tabId !== '' ) {
        return 'tab_' + tabId;
    }
    return '';
};

/******************************************************************************/

// Emphasize hostname and cookie name.

var emphasizeCookie = function(s) {
    var pnode = emphasizeHostname(s);
    if ( pnode.childNodes.length !== 3 ) {
        return pnode;
    }
    var prefix = '-cookie:';
    var text = pnode.childNodes[2].textContent;
    var beg = text.indexOf(prefix);
    if ( beg === -1 ) {
        return pnode;
    }
    beg += prefix.length;
    var end = text.indexOf('}', beg);
    if ( end === -1 ) {
        return pnode;
    }
    var cnode = emphasizeTemplate.cloneNode(true);
    cnode.childNodes[0].textContent = text.slice(0, beg);
    cnode.childNodes[1].textContent = text.slice(beg, end);
    cnode.childNodes[2].textContent = text.slice(end);
    pnode.replaceChild(cnode.childNodes[0], pnode.childNodes[2]);
    pnode.appendChild(cnode.childNodes[0]);
    pnode.appendChild(cnode.childNodes[0]);
    return pnode;
};

/******************************************************************************/

// Emphasize hostname in URL.

var emphasizeHostname = function(url) {
    var hnbeg = url.indexOf('://');
    if ( hnbeg === -1 ) {
        return document.createTextNode(url);
    }
    hnbeg += 3;

    var hnend = url.indexOf('/', hnbeg);
    if ( hnend === -1 ) {
        hnend = url.slice(hnbeg).search(/\?#/);
        if ( hnend !== -1 ) {
            hnend += hnbeg;
        } else {
            hnend = url.length;
        }
    }

    var node = emphasizeTemplate.cloneNode(true);
    node.childNodes[0].textContent = url.slice(0, hnbeg);
    node.childNodes[1].textContent = url.slice(hnbeg, hnend);
    node.childNodes[2].textContent = url.slice(hnend);
    return node;
};

/******************************************************************************/

var createCellAt = function(tr, index) {
    var td = tr.cells[index];
    var mustAppend = !td;
    if ( mustAppend ) {
        td = tdJunkyard.pop();
    }
    if ( td ) {
        td.removeAttribute('colspan');
        td.textContent = '';
    } else {
        td = document.createElement('td');
    }
    if ( mustAppend ) {
        tr.appendChild(td);
    }
    return td;
};

/******************************************************************************/

var createRow = function(layout) {
    var tr = trJunkyard.pop();
    if ( tr ) {
        tr.className = '';
    } else {
        tr = document.createElement('tr');
    }
    for ( var index = 0; index < firstVarDataCol; index++ ) {
        createCellAt(tr, index);
    }
    var i = 1, span = 1, td;
    for (;;) {
        td = createCellAt(tr, index);
        if ( i === lastVarDataIndex ) {
            break;
        }
        if ( layout.charAt(i) !== '1' ) {
            span += 1;
        } else {
            if ( span !== 1 ) {
                td.setAttribute('colspan', span);
            }
            index += 1;
            span = 1;
        }
        i += 1;
    }
    if ( span !== 1 ) {
        td.setAttribute('colspan', span);
    }
    index += 1;
    while ( (td = tr.cells[index]) ) {
        tdJunkyard.push(tr.removeChild(td));
    }
    return tr;
};

/******************************************************************************/

var createHiddenTextNode = function(text) {
    var node = hiddenTemplate.cloneNode(true);
    node.textContent = text;
    return node;
};

/******************************************************************************/

var createGap = function(tabId, url) {
    var tr = createRow('1');
    tr.classList.add('doc');
    tr.classList.add('tab');
    tr.classList.add('canMtx');
    tr.classList.add('tab_' + tabId);
    tr.cells[firstVarDataCol].textContent = url;
    tbody.insertBefore(tr, tbody.firstChild);
};

/******************************************************************************/

var renderLogEntry = function(entry) {
    var tr;
    var fvdc = firstVarDataCol;

    switch ( entry.cat ) {
    case 'error':
    case 'info':
        tr = createRow('1');
        if ( entry.d0 === 'cookie' ) {
            tr.cells[fvdc].appendChild(emphasizeCookie(entry.d1));
        } else {
            tr.cells[fvdc].textContent = entry.d0;
        }
        break;

    case 'net':
        tr = createRow('111');
        tr.classList.add('canMtx');
        // If the request is that of a root frame, insert a gap in the table
        // in order to visually separate entries for different documents. 
        if ( entry.d2 === 'doc' && entry.tab !== noTabId ) {
            createGap(entry.tab, entry.d1);
        }
        if ( entry.d3 ) {
            tr.classList.add('blocked');
            tr.cells[fvdc].textContent = '--';
        } else {
            tr.cells[fvdc].textContent = '';
        }
        tr.cells[fvdc+1].textContent = (prettyRequestTypes[entry.d2] || entry.d2);
        if ( entry.d2 === 'cookie' ) {
            tr.cells[fvdc+2].appendChild(emphasizeCookie(entry.d1));
        } else {
            tr.cells[fvdc+2].appendChild(emphasizeHostname(entry.d1));
        }
        break;

    default:
        tr = createRow('1');
        tr.cells[fvdc].textContent = entry.d0;
        break;
    }

    // Fields common to all rows.
    var time = new Date(entry.tstamp);
    tr.cells[0].textContent = time.toLocaleTimeString('fullwide', timeOptions);
    tr.cells[0].title = time.toLocaleDateString('fullwide', dateOptions);

    if ( entry.tab ) {
        tr.classList.add('tab');
        tr.classList.add(classNameFromTabId(entry.tab));
        if ( entry.tab === noTabId ) {
            tr.cells[1].appendChild(createHiddenTextNode('bts'));
        }
    }
    if ( entry.cat !== '' ) {
        tr.classList.add('cat_' + entry.cat);
    }

    rowFilterer.filterOne(tr, true);

    tbody.insertBefore(tr, tbody.firstChild);
};

/******************************************************************************/

var renderLogEntries = function(response) {
    var entries = response.entries;
    if ( entries.length === 0 ) {
        return;
    }

    // Preserve scroll position
    var height = tbody.offsetHeight;

    var tabIds = response.tabIds;
    var n = entries.length;
    var entry;
    for ( var i = 0; i < n; i++ ) {
        entry = entries[i];
        // Unlikely, but it may happen
        if ( entry.tab && tabIds.hasOwnProperty(entry.tab) === false ) {
            continue;
        }
        renderLogEntry(entries[i]);
    }

    // Prevent logger from growing infinitely and eating all memory. For
    // instance someone could forget that it is left opened for some
    // dynamically refreshed pages.
    truncateLog(maxEntries);

    var yDelta = tbody.offsetHeight - height;
    if ( yDelta === 0 ) {
        return;
    }

    // Chromium:
    //   body.scrollTop = good value
    //   body.parentNode.scrollTop = 0
    if ( document.body.scrollTop !== 0 ) {
        document.body.scrollTop += yDelta;
        return;
    }

    // Firefox:
    //   body.scrollTop = 0
    //   body.parentNode.scrollTop = good value
    var parentNode = document.body.parentNode;
    if ( parentNode && parentNode.scrollTop !== 0 ) {
        parentNode.scrollTop += yDelta;
    }
};

/******************************************************************************/

var synchronizeTabIds = function(newTabIds) {
    var oldTabIds = allTabIds;
    var autoDeleteVoidRows = !!vAPI.localStorage.getItem('loggerAutoDeleteVoidRows');
    var rowVoided = false;
    var trs;
    for ( var tabId in oldTabIds ) {
        if ( oldTabIds.hasOwnProperty(tabId) === false ) {
            continue;
        }
        if ( newTabIds.hasOwnProperty(tabId) ) {
            continue;
        }
        // Mark or remove voided rows
        trs = uDom('.tab_' + tabId);
        if ( autoDeleteVoidRows ) {
            toJunkyard(trs);
        } else {
            trs.removeClass('canMtx');
            rowVoided = true;
        }
        // Remove popup if it is currently bound to a removed tab.
        if ( tabId === popupManager.tabId ) {
            popupManager.toggleOff();
        }
    }

    var select = document.getElementById('pageSelector');
    var selectValue = select.value;
    var tabIds = Object.keys(newTabIds).sort(function(a, b) {
        return newTabIds[a].localeCompare(newTabIds[a]);
    });
    var option;
    for ( var i = 0, j = 2; i < tabIds.length; i++ ) {
        tabId = tabIds[i];
        if ( tabId === noTabId ) {
            continue;
        }
        option = select.options[j];
        j += 1;
        if ( !option ) {
            option = document.createElement('option');
            select.appendChild(option);
        }
        option.textContent = newTabIds[tabId];
        option.value = classNameFromTabId(tabId);
        if ( option.value === selectValue ) {
            option.setAttribute('selected', '');
        } else {
            option.removeAttribute('selected');
        }
    }
    while ( j < select.options.length ) {
        select.removeChild(select.options[j]);
    }
    if ( select.value !== selectValue ) {
        select.selectedIndex = 0;
        select.value = '';
        select.options[0].setAttribute('selected', '');
        pageSelectorChanged();
    }

    allTabIds = newTabIds;

    return rowVoided;
};

/******************************************************************************/

var truncateLog = function(size) {
    if ( size === 0 ) {
        size = 5000;
    }
    var tbody = document.querySelector('#content tbody');
    size = Math.min(size, 10000);
    var tr;
    while ( tbody.childElementCount > size ) {
        tr = tbody.lastElementChild;
        trJunkyard.push(tbody.removeChild(tr));
    }
};

/******************************************************************************/

var onLogBufferRead = function(response) {
    // This tells us the behind-the-scene tab id
    noTabId = response.noTabId;

    // This may have changed meanwhile
    if ( response.maxLoggedRequests !== maxEntries ) {
        maxEntries = response.maxLoggedRequests;
        uDom('#maxEntries').val(maxEntries || '');
    }

    // Neuter rows for which a tab does not exist anymore
    var rowVoided = false;
    if ( response.tabIdsToken !== allTabIdsToken ) {
        rowVoided = synchronizeTabIds(response.tabIds);
        allTabIdsToken = response.tabIdsToken;
    }

    renderLogEntries(response);

    if ( rowVoided ) {
        uDom('#clean').toggleClass(
            'disabled',
            tbody.querySelector('tr.tab:not(.canMtx)') === null
        );
    }

    // Synchronize toolbar with content of log
    uDom('#clear').toggleClass(
        'disabled',
        tbody.querySelector('tr') === null
    );

    vAPI.setTimeout(readLogBuffer, 1200);
};

/******************************************************************************/

// This can be called only once, at init time. After that, this will be called
// automatically. If called after init time, this will be messy, and this would
// require a bit more code to ensure no multi time out events.

var readLogBuffer = function() {
    messager.send({ what: 'readMany' }, onLogBufferRead);
};

/******************************************************************************/

var pageSelectorChanged = function() {
    var style = document.getElementById('tabFilterer');
    var tabClass = document.getElementById('pageSelector').value;
    var sheet = style.sheet;
    while ( sheet.cssRules.length !== 0 )  {
        sheet.deleteRule(0);
    }
    if ( tabClass !== '' ) {
        sheet.insertRule(
            '#content table tr:not(.' + tabClass + ') { display: none; }',
            0
        );
    }
    uDom('#refresh').toggleClass(
        'disabled',
        tabClass === '' || tabClass === 'tab_bts'
    );
};

/******************************************************************************/

var refreshTab = function() {
    var tabClass = document.getElementById('pageSelector').value;
    var matches = tabClass.match(/^tab_(.+)$/);
    if ( matches === null ) {
        return;
    }
    if ( matches[1] === 'bts' ) {
        return;
    }
    messager.send({ what: 'forceReloadTab', tabId: matches[1] });
};

/******************************************************************************/

var onMaxEntriesChanged = function() {
    var raw = uDom(this).val();
    try {
        maxEntries = parseInt(raw, 10);
        if ( isNaN(maxEntries) ) {
            maxEntries = 0;
        }
    } catch (e) {
        maxEntries = 0;
    }

    messager.send({
        what: 'userSettings',
        name: 'maxLoggedRequests',
        value: maxEntries
    });

    truncateLog(maxEntries);
};

/******************************************************************************/

var rowFilterer = (function() {
    var filters = [];

    var parseInput = function() {
        filters = [];

        var rawPart, hardBeg, hardEnd;
        var raw = uDom('#filterInput').val().trim();
        var rawParts = raw.split(/\s+/);
        var reStr, reStrs = [], not = false;
        var n = rawParts.length;
        for ( var i = 0; i < n; i++ ) {
            rawPart = rawParts[i];
            if ( rawPart.charAt(0) === '!' ) {
                if ( reStrs.length === 0 ) {
                    not = true;
                }
                rawPart = rawPart.slice(1);
            }
            hardBeg = rawPart.charAt(0) === '|';
            if ( hardBeg ) {
                rawPart = rawPart.slice(1);
            }
            hardEnd = rawPart.slice(-1) === '|';
            if ( hardEnd ) {
                rawPart = rawPart.slice(0, -1);
            }
            if ( rawPart === '' ) {
                continue;
            }
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
            reStr = rawPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            if ( hardBeg ) {
                reStr = '(?:^|\\s)' + reStr;
            }
            if ( hardEnd ) {
                reStr += '(?:\\s|$)';
            }
            reStrs.push(reStr);
            if ( i < (n - 1) && rawParts[i + 1] === '||' ) {
                i += 1;
                continue;
            }
            reStr = reStrs.length === 1 ? reStrs[0] : reStrs.join('|');
            filters.push({
                re: new RegExp(reStr, 'i'),
                r: !not
            });
            reStrs = [];
            not = false;
        }
    };

    var filterOne = function(tr, clean) {
        var ff = filters;
        var fcount = ff.length;
        if ( fcount === 0 && clean === true ) {
            return;
        }
        // do not filter out doc boundaries, they help separate important
        // section of log.
        var cl = tr.classList;
        if ( cl.contains('doc') ) {
            return;
        }
        if ( fcount === 0 ) {
            cl.remove('f');
            return;
        }
        var cc = tr.cells;
        var ccount = cc.length;
        var hit, j, f;
        // each filter expression must hit (implicit and-op)
        // if...
        //   positive filter expression = there must one hit on any field
        //   negative filter expression = there must be no hit on all fields
        for ( var i = 0; i < fcount; i++ ) {
            f = ff[i];
            hit = !f.r;
            for ( j = 0; j < ccount; j++ ) {
                if ( f.re.test(cc[j].textContent) ) {
                    hit = f.r;
                    break;
                }
            }
            if ( !hit ) {
                cl.add('f');
                return;
            }
        }
        cl.remove('f');
    };

    var filterAll = function() {
        // Special case: no filter
        if ( filters.length === 0 ) {
            uDom('#content tr').removeClass('f');
            return;
        }
        var tbody = document.querySelector('#content tbody');
        var rows = tbody.rows;
        var i = rows.length;
        while ( i-- ) {
            filterOne(rows[i]);
        }
    };

    var onFilterChangedAsync = (function() {
        var timer = null;
        var commit = function() {
            timer = null;
            parseInput();
            filterAll();
        };
        return function() {
            if ( timer !== null ) {
                clearTimeout(timer);
            }
            timer = vAPI.setTimeout(commit, 750);
        };
    })();

    var onFilterButton = function() {
        var cl = document.body.classList;
        cl.toggle('f', cl.contains('f') === false);
    };

    uDom('#filterButton').on('click', onFilterButton);
    uDom('#filterInput').on('input', onFilterChangedAsync);

    return {
        filterOne: filterOne,
        filterAll: filterAll
    };
})();

/******************************************************************************/

var toJunkyard = function(trs) {
    trs.remove();
    var i = trs.length;
    while ( i-- ) {
        trJunkyard.push(trs.nodeAt(i));
    }
};

/******************************************************************************/

var clearBuffer = function() {
    var tbody = document.querySelector('#content tbody');
    var tr;
    while ( tbody.firstChild !== null ) {
        tr = tbody.lastElementChild;
        trJunkyard.push(tbody.removeChild(tr));
    }
    uDom('#clear').addClass('disabled');
    uDom('#clean').addClass('disabled');
};

/******************************************************************************/

var cleanBuffer = function() {
    var rows = uDom('#content tr.tab:not(.canMtx)').remove();
    var i = rows.length;
    while ( i-- ) {
        trJunkyard.push(rows.nodeAt(i));
    }
    uDom('#clean').addClass('disabled');
};

/******************************************************************************/

var toggleCompactView = function() {
    document.body.classList.toggle(
        'compactView',
        document.body.classList.contains('compactView') === false
    );
};

/******************************************************************************/

var popupManager = (function() {
    var realTabId = null;
    var localTabId = null;
    var container = null;
    var popup = null;
    var popupObserver = null;
    var style = null;
    var styleTemplate = [
        'tr:not(.tab_{{tabId}}) {',
            'cursor: not-allowed;',
            'opacity: 0.2;',
        '}'
    ].join('\n');

    var resizePopup = function() {
        if ( popup === null ) {
            return;
        }
        var popupBody = popup.contentWindow.document.body;
        if ( popupBody.clientWidth !== 0 && container.clientWidth !== popupBody.clientWidth ) {
            container.style.setProperty('width', popupBody.clientWidth + 'px');
        }
        popup.style.removeProperty('height');
        if ( popupBody.clientHeight !== 0 && popup.clientHeight !== popupBody.clientHeight ) {
            popup.style.setProperty('height', popupBody.clientHeight + 'px');
        }
        var ph = document.documentElement.clientHeight;
        var crect = container.getBoundingClientRect();
        if ( crect.height > ph ) {
            popup.style.setProperty('height', 'calc(' + ph + 'px - 1.8em)');
        }
        // Adjust width for presence/absence of vertical scroll bar which may
        // have appeared as a result of last operation.
        var cw = container.clientWidth;
        var dw = popup.contentWindow.document.documentElement.clientWidth;
        if ( cw !== dw ) {
            container.style.setProperty('width', (2 * cw - dw) + 'px');
        }
    };

    var toggleSize = function() {
        container.classList.toggle('hide');
    };

    var onResizeRequested = function() {
        var popupBody = popup.contentWindow.document.body;
        if ( popupBody.getAttribute('data-resize-popup') !== 'true' ) {
            return;
        }
        popupBody.removeAttribute('data-resize-popup');
        resizePopup();
    };

    var onLoad = function() {
        resizePopup();
        var popupBody = popup.contentDocument.body;
        popupBody.removeAttribute('data-resize-popup');
        popupObserver.observe(popupBody, {
            attributes: true,
            attributesFilter: [ 'data-resize-popup' ]
        });
    };

    var toggleOn = function(td) {
        var tr = td.parentNode;
        var matches = tr.className.match(/(?:^| )tab_([^ ]+)/);
        if ( matches === null ) {
            return;
        }
        realTabId = localTabId = matches[1];
        if ( localTabId === 'bts' ) {
            realTabId = noTabId;
        }

        container = document.getElementById('popupContainer');

        container.querySelector('div > span:nth-of-type(1)').addEventListener('click', toggleSize);
        container.querySelector('div > span:nth-of-type(2)').addEventListener('click', toggleOff);

        popup = document.createElement('iframe');
        popup.addEventListener('load', onLoad);
        popup.setAttribute('src', 'popup.html?tabId=' + realTabId);
        popupObserver = new MutationObserver(onResizeRequested);
        container.appendChild(popup);

        style = document.getElementById('popupFilterer');
        style.textContent = styleTemplate.replace('{{tabId}}', localTabId);

        document.body.classList.add('popupOn');
    };

    var toggleOff = function() {
        document.body.classList.remove('popupOn');

        container.querySelector('div > span:nth-of-type(1)').removeEventListener('click', toggleSize);
        container.querySelector('div > span:nth-of-type(2)').removeEventListener('click', toggleOff);
        container.classList.remove('hide');

        popup.removeEventListener('load', onLoad);
        popupObserver.disconnect();
        popupObserver = null;
        popup.setAttribute('src', '');
        container.removeChild(popup);
        popup = null;

        style.textContent = '';
        style = null;

        container = null;
        realTabId = null;
    };

    var exports = {
        toggleOn: function(ev) {
            if ( realTabId === null ) {
                toggleOn(ev.target);
            }
        },
        toggleOff: function() {
            if ( realTabId !== null ) {
                toggleOff();
            }
        }
    };

    Object.defineProperty(exports, 'tabId', {
        get: function() { return realTabId || 0; }
    });

    return exports;
})();

/******************************************************************************/

uDom.onLoad(function() {
    readLogBuffer();

    uDom('#pageSelector').on('change', pageSelectorChanged);
    uDom('#refresh').on('click', refreshTab);
    uDom('#compactViewToggler').on('click', toggleCompactView);
    uDom('#clean').on('click', cleanBuffer);
    uDom('#clear').on('click', clearBuffer);
    uDom('#maxEntries').on('change', onMaxEntriesChanged);
    uDom('#content table').on('click', 'tr.canMtx > td:nth-of-type(2)', popupManager.toggleOn);
});

/******************************************************************************/

})();
