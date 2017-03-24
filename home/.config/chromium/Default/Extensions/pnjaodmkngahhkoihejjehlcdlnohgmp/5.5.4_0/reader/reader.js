//
// Ext.js
//     Static things, that we don't want to separate into files because that would
//     be a pain to separate into different files.
//

var Ext = {
	getBackgroundPage: function() {
		if ( Ext.isSafari() )
			return safari.extension.globalPage.contentWindow;
		else if ( Ext.isOnline() ) {
			return window.top;
		}
		return chrome.extension.getBackgroundPage();
	},
	
	isChrome: function() {
		return !!(window.chrome && window.chrome.extension);
	},
	
	isSafari: function() {
		return !!(window.safari && window.safari.extension);
	},
	
	isOnline: function() {
		return ! this.isChrome() && ! this.isSafari();
	},

	isMobile: function() {
		return screen.width <= 480;
	},
	
	path: function(path) {
		if ( Ext.isChrome() )
			return chrome.extension.getURL(path);
		if ( Ext.isSafari() )
			return safari.extension.baseURI + path;
		if ( Ext.isOnline() )
			return "/reader/" + path;
	}
};

if ( window.document && document.documentElement ) {
	var platform;
	if ( Ext.isSafari() )
		platform = "safari";
	else if ( Ext.isChrome() )
		platform = "chrome";
	else if ( Ext.isOnline() )
		platform = "online";
	document.body.className += " platform-" + platform;
	if (platform === "safari") {
		document.documentElement.className += " html-platform-safari";
	} else if (Ext.isMobile()) 
		document.documentElement.className += " html-platform-mobile";
}
;
/*! jQuery v1.10.1 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
*/
(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.1",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=lt(),k=lt(),E=lt(),S=!1,A=function(){return 0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=bt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+xt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return At(e.replace(z,"$1"),t,n,i)}function st(e){return K.test(e+"")}function lt(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function ut(e){return e[b]=!0,e}function ct(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function pt(e,t,n){e=e.split("|");var r,i=e.length,a=n?null:t;while(i--)(r=o.attrHandle[e[i]])&&r!==t||(o.attrHandle[e[i]]=a)}function ft(e,t){var n=e.getAttributeNode(t);return n&&n.specified?n.value:e[t]===!0?t.toLowerCase():null}function dt(e,t){return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}function ht(e){return"input"===e.nodeName.toLowerCase()?e.defaultValue:t}function gt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function mt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function yt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function vt(e){return ut(function(t){return t=+t,ut(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.parentWindow;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),i&&i.frameElement&&i.attachEvent("onbeforeunload",function(){p()}),r.attributes=ct(function(e){return e.innerHTML="<a href='#'></a>",pt("type|href|height|width",dt,"#"===e.firstChild.getAttribute("href")),pt(B,ft,null==e.getAttribute("disabled")),e.className="i",!e.getAttribute("className")}),r.input=ct(function(e){return e.innerHTML="<input>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}),pt("value",ht,r.attributes&&r.input),r.getElementsByTagName=ct(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ct(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ct(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=st(n.querySelectorAll))&&(ct(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ct(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=st(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ct(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=st(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},r.sortDetached=ct(function(e){return 1&e.compareDocumentPosition(n.createElement("div"))}),A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return gt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?gt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:ut,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=bt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?ut(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ut(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?ut(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ut(function(e){return function(t){return at(e,t).length>0}}),contains:ut(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:ut(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:vt(function(){return[0]}),last:vt(function(e,t){return[t-1]}),eq:vt(function(e,t,n){return[0>n?n+t:n]}),even:vt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:vt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:vt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:vt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=mt(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=yt(n);function bt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function xt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function wt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function Tt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function Ct(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function Nt(e,t,n,r,i,o){return r&&!r[b]&&(r=Nt(r)),i&&!i[b]&&(i=Nt(i,o)),ut(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||St(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:Ct(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=Ct(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=Ct(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function kt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=wt(function(e){return e===t},s,!0),p=wt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[wt(Tt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return Nt(l>1&&Tt(f),l>1&&xt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&kt(e.slice(l,r)),i>r&&kt(e=e.slice(r)),i>r&&xt(e))}f.push(n)}return Tt(f)}function Et(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=Ct(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?ut(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=bt(e)),n=t.length;while(n--)o=kt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Et(i,r))}return o};function St(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function At(e,t,n,i){var a,s,u,c,p,f=bt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&xt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}o.pseudos.nth=o.pseudos.eq;function jt(){}jt.prototype=o.filters=o.pseudos,o.setFilters=new jt,r.sortStable=b.split("").sort(A).join("")===b,p(),[0,0].sort(A),r.detectDuplicates=S,x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!l||i&&!u||(n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)
}),n=s=l=u=r=o=null,t}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=x(this),l=t,u=e.match(T)||[];while(o=u[a++])l=r?l:!s.hasClass(o),s[l?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);
u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);

$.fn.rect = function() {
	var rect = this.offset();
	rect.width  = this.width();
	rect.height = this.height();
	return rect;
}

$.fn.sizeRect = function() {
	return {width: this.width(), height: this.height()};
}

$.fn.forEach = function(callback, bind) {
	return $.makeArray(this).forEach(callback, bind);
}
;
// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.0.0",
        round = Math.round, i,
        // internal storage for language config files
        languages = {},

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing tokens
        parseMultipleFormatChunker = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenWord = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i, // any word (or two) characters or numbers including two word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO seperator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        // preliminary iso regex
        // 0000-00-00 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000
        isoRegex = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.S', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Month|Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return ~~(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(~~(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(a / 60), 2) + ":" + leftZeroFill(~~a % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(10 * a / 6), 4);
            },
            X    : function () {
                return this.unix();
            }
        };

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a));
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i]);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var data = this._data = {},
            years = duration.years || duration.year || duration.y || 0,
            months = duration.months || duration.month || duration.M || 0,
            weeks = duration.weeks || duration.week || duration.w || 0,
            days = duration.days || duration.day || duration.d || 0,
            hours = duration.hours || duration.hour || duration.h || 0,
            minutes = duration.minutes || duration.minute || duration.m || 0,
            seconds = duration.seconds || duration.second || duration.s || 0,
            milliseconds = duration.milliseconds || duration.millisecond || duration.ms || 0;

        // representation for dateAddRemove
        this._milliseconds = milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = months +
            years * 12;

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;
        seconds += absRound(milliseconds / 1000);

        data.seconds = seconds % 60;
        minutes += absRound(seconds / 60);

        data.minutes = minutes % 60;
        hours += absRound(minutes / 60);

        data.hours = hours % 24;
        days += absRound(hours / 24);

        days += weeks * 7;
        data.days = days % 30;

        months += absRound(days / 30);

        data.months = months % 12;
        years += absRound(months / 12);

        data.years = years;
    }


    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }
        return a;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding) {
        var ms = duration._milliseconds,
            d = duration._days,
            M = duration._months,
            currentDate;

        if (ms) {
            mom._d.setTime(+mom + ms * isAdding);
        }
        if (d) {
            mom.date(mom.date() + d * isAdding);
        }
        if (M) {
            currentDate = mom.date();
            mom.date(1)
                .month(mom.month() + M * isAdding)
                .date(Math.min(currentDate, mom.daysInMonth()));
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (~~array1[i] !== ~~array2[i]) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }


    /************************************
        Languages
    ************************************/


    Language.prototype = {
        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex, output;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy);
        },
        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    };

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        if (!key) {
            return moment.fn._lang;
        }
        if (!languages[key] && hasModule) {
            require('./lang/' + key);
        }
        return languages[key];
    }


    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[.*\]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += typeof array[i].call === 'function' ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return m.lang().longDateFormat(input) || input;
        }

        while (i-- && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        }

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token) {
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
            return parseTokenFourDigits;
        case 'YYYYY':
            return parseTokenSixDigits;
        case 'S':
        case 'SS':
        case 'SSS':
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'a':
        case 'A':
            return parseTokenWord;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
            return parseTokenOneOrTwoDigits;
        default :
            return new RegExp(token.replace('\\', ''));
        }
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, b,
            datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            datePartArray[1] = (input == null) ? 0 : ~~input - 1;
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[1] = a;
            } else {
                config._isValid = false;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DDDD
        case 'DD' : // fall through to DDDD
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                datePartArray[2] = ~~input;
            }
            break;
        // YEAR
        case 'YY' :
            datePartArray[0] = ~~input + (~~input > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
            datePartArray[0] = ~~input;
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = ((input + '').toLowerCase() === 'pm');
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[3] = ~~input;
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[4] = ~~input;
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[5] = ~~input;
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
            datePartArray[6] = ~~ (('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            a = (input + '').match(parseTimezoneChunker);
            if (a && a[1]) {
                config._tzh = ~~a[1];
            }
            if (a && a[2]) {
                config._tzm = ~~a[2];
            }
            // reverse offsets
            if (a && a[0] === '+') {
                config._tzh = -config._tzh;
                config._tzm = -config._tzm;
            }
            break;
        }

        // if the input is null, the date is not valid
        if (input == null) {
            config._isValid = false;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromArray(config) {
        var i, date, input = [];

        if (config._d) {
            return;
        }

        for (i = 0; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[3] += config._tzh || 0;
        input[4] += config._tzm || 0;

        date = new Date(0);

        if (config._useUTC) {
            date.setUTCFullYear(input[0], input[1], input[2]);
            date.setUTCHours(input[3], input[4], input[5], input[6]);
        } else {
            date.setFullYear(input[0], input[1], input[2]);
            date.setHours(input[3], input[4], input[5], input[6]);
        }

        config._d = date;
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var tokens = config._f.match(formattingTokens),
            string = config._i,
            i, parsedInput;

        config._a = [];

        for (i = 0; i < tokens.length; i++) {
            parsedInput = (getParseRegexForToken(tokens[i]).exec(string) || [])[0];
            if (parsedInput) {
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            }
            // don't parse if its not a known token
            if (formatTokenFunctions[tokens[i]]) {
                addTimeToArrayFromToken(tokens[i], parsedInput, config);
            }
        }
        // handle am pm
        if (config._isPm && config._a[3] < 12) {
            config._a[3] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[3] === 12) {
            config._a[3] = 0;
        }
        // return
        dateFromArray(config);
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            tempMoment,
            bestMoment,

            scoreToBeat = 99,
            i,
            currentDate,
            currentScore;

        while (config._f.length) {
            tempConfig = extend({}, config);
            tempConfig._f = config._f.pop();
            makeDateFromStringAndFormat(tempConfig);
            tempMoment = new Moment(tempConfig);

            if (tempMoment.isValid()) {
                bestMoment = tempMoment;
                break;
            }

            currentScore = compareArrays(tempConfig._a, tempMoment.toArray());

            if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempMoment;
            }
        }

        extend(config, bestMoment);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i,
            string = config._i;
        if (isoRegex.exec(string)) {
            config._f = 'YYYY-MM-DDT';
            for (i = 0; i < 4; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (parseTokenTimezone.exec(string)) {
                config._f += " Z";
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromArray(config);
        } else {
            config._d = input instanceof Date ? new Date(+input) : new Date(input);
        }
    }


    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        return Math.ceil(moment(mom).add('d', daysToDayOfWeek).dayOfYear() / 7);
    }


    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || input === '') {
            return null;
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = extend({}, input);
            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang) {
        return makeMoment({
            _i : input,
            _f : format,
            _l : lang,
            _isUTC : false
        });
    };

    // creating with utc
    moment.utc = function (input, format, lang) {
        return makeMoment({
            _useUTC : true,
            _isUTC : true,
            _l : lang,
            _i : input,
            _f : format
        });
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var isDuration = moment.isDuration(input),
            isNumber = (typeof input === 'number'),
            duration = (isDuration ? input._data : (isNumber ? {} : input)),
            ret;

        if (isNumber) {
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        }

        ret = new Duration(duration);

        if (isDuration && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var i;

        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(key, values);
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment;
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };


    /************************************
        Moment Prototype
    ************************************/


    moment.fn = Moment.prototype = {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d;
        },

        unix : function () {
            return Math.floor(+this._d / 1000);
        },

        toString : function () {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._d;
        },

        toJSON : function () {
            return moment.utc(this).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            if (this._isValid == null) {
                if (this._a) {
                    this._isValid = !compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray());
                } else {
                    this._isValid = !isNaN(this._d.getTime());
                }
            }
            return !!this._isValid;
        },

        utc : function () {
            this._isUTC = true;
            return this;
        },

        local : function () {
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = this._isUTC ? moment(input).utc() : moment(input).local(),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            if (units) {
                // standardize on singular form
                units = units.replace(/s$/, '');
            }

            if (units === 'year' || units === 'month') {
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                output += ((this - moment(this).startOf('month')) - (that - moment(that).startOf('month'))) / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that) - zoneDiff;
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? diff / 864e5 : // 1000 * 60 * 60 * 24
                    units === 'week' ? diff / 6048e5 : // 1000 * 60 * 60 * 24 * 7
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            var diff = this.diff(moment().startOf('day'), 'days', true),
                format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            var year = this.year();
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },

        isDST : function () {
            return (this.zone() < moment([this.year()]).zone() ||
                this.zone() < moment([this.year(), 5]).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return input == null ? day :
                this.add({ d : input - day });
        },

        startOf: function (units) {
            units = units.replace(/s$/, '');
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.day(0);
            }

            return this;
        },

        endOf: function (units) {
            return this.startOf(units).add(units.replace(/s?$/, 's'), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) === +moment(input).startOf(units);
        },

        zone : function () {
            return this._isUTC ? 0 : this._d.getTimezoneOffset();
        },

        daysInMonth : function () {
            return moment.utc([this.year(), this.month() + 1, 0]).date();
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    };

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    /************************************
        Duration Prototype
    ************************************/


    moment.duration.fn = Duration.prototype = {
        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              this._months * 2592e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        lang : moment.fn.lang
    };

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });


    /************************************
        Exposing Moment
    ************************************/


    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    }
    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['moment'] = moment;
    }
    /*global define:false */
    if (typeof define === "function" && define.amd) {
        define("moment", [], function () {
            return moment;
        });
    }
}).call(this);

;
function TRYIT(fn, b, extraData) {
	extraData = extraData || {};
	var ret = fn.call(b);
	return ret;
}

;
Function.prototype.withCallback = function(callback) {
	var func = this;
	return function() {
		var args = Array.prototype.slice.call(arguments);
		args.push(callback);
		return func.apply(this, args);
	};
};

Function.prototype.andArguments = function() {
	var addedArgs = Array.prototype.slice.call(arguments);
	var func = this;
	return function() {
		var args = Array.prototype.slice.call(arguments);
		args = [].concat(args, addedArgs);
		return func.apply(this, args);
	};
};

Function.prototype.withArguments = function() {
	var args = Array.prototype.slice.call(arguments);
	var func = this;
	return function() {
		return func.apply(this, args);
	};
};

Function.prototype.delay = function(ms) {
	var args = Array.prototype.slice.call(arguments, 1);
	var func = this;
	setTimeout(function() {
		func.apply(this, args);
	}, ms);
	return this;
};

/* FOR DEBUGGING PURPOSES */
var nativeBind = Function.prototype.bind;
if (!nativeBind) {
	Function.prototype.bind = function(b) {
		var func = this;
		var ret = function() {
			return func.apply(b, arguments);
		};
		ret.toString = function() {
			return 'BOUND(' + func.toString() + ')';
		};
		return ret;
	};
}

function toOptions(params, defaults) {
	params = params || {};
	for ( var key in defaults ) if ( defaults.hasOwnProperty(key) ) {
		if ( typeof params[key] === 'undefined' )
			params[key] = defaults[key];
	}
	return params;
}

function fireCallback(callback) {
	if ( callback && typeof callback === "function" )
		callback.apply(this, Array.prototype.slice.call(arguments, 1));
}

function objectToQueryString(params, arrayedParamsToMultipleKey) {
	arrayedParamsToMultipleKey = arrayedParamsToMultipleKey || false;
	
	var pairs = [];
	for ( var key in params ) if ( params.hasOwnProperty(key) ) {
		var val = params[key];
		if ( typeof val === "object" && val.constructor === Array ) {
			val.forEach(function(a) {
				pairs.push(encodeURIComponent(key) + (arrayedParamsToMultipleKey ? '' : '[]') + '=' + encodeURIComponent(a));
			});
		} else {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		}
	}
	return pairs.join("&");
}
;
/*
	PUT EXTERNAL LIBS HERE
*/

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
	var initializing = false;
	var fnTest = /\b_super\b/;
	
	// The base Class implementation (does nothing)
	this.Class = function(){};
	
	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var parent = this.prototype;
		
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
		
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			if ( typeof prop[name] === "function" &&  typeof parent[name] == "function" && fnTest.test(prop[name]) )
				prototype[name] = (function(name, fn){
					return function() {
						var tmp = this._super;
						
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = parent[name];
						
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);				
						this._super = tmp;
						
						return ret;
					};
				})(name, prop[name]);
			else
				prototype[name] = prop[name];
		}
		
		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing ) {
				var self = this;
				
				// Bind all methods to this
				for ( var name in prototype ) if ( typeof prototype[name] === "function" && ["constructor"].indexOf(name) === -1 ) (function(name) {
					this[name] = this[name].bind ? this[name].bind(this) : function() {
						return self[name].apply(self, arguments);
					};
				}).call(this, name);
				
				if ( this.initialize )
					this.initialize.apply(this, arguments);
			}
		}
		
		// Populate our constructed prototype object
		Class.prototype = prototype;
		
		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;
		
		return Class;
	};
})();

/**
*
*  https://gist.github.com/1287361
*
**/
 
function crc32(s/*, polynomial = 0x04C11DB7, initialValue = 0xFFFFFFFF, finalXORValue = 0xFFFFFFFF*/) {
  s = String(s);
  var polynomial = arguments.length < 2 ? 0x04C11DB7 : arguments[1],
      initialValue = arguments.length < 3 ? 0xFFFFFFFF : arguments[2],
      finalXORValue = arguments.length < 4 ? 0xFFFFFFFF : arguments[3],
      crc = initialValue,
      table = [], i, j, c;

  function reverse(x, n) {
    var b = 0;
    while (n) {
      b = b * 2 + x % 2;
      x /= 2;
      x -= x % 1;
      n--;
    }
    return b;
  }

  for (i = 255; i >= 0; i--) {
    c = reverse(i, 32);

    for (j = 0; j < 8; j++) {
      c = ((c * 2) ^ (((c >>> 31) % 2) * polynomial)) >>> 0;
    }

    table[i] = reverse(c, 32);
  }

  for (i = 0; i < s.length; i++) {
    c = s.charCodeAt(i);
    if (c > 255) {
      throw new RangeError();
    }
    j = (crc % 256) ^ c;
    crc = ((crc / 256) ^ table[j]) >>> 0;
  }

  return ((crc ^ finalXORValue) >>> 0).toString(16);
}
;
function Chainable(func, args) {
	this.stack = [];
	this.isRunning = false;
	if ( func ) {
		this.stack.push([func, args]);
		this.run();
	}
}

Chainable.prototype.run = function() {
	this.next();
	return this;
};

// Then passes the result of the previous function into the arguments
Chainable.prototype.then = Chainable.prototype.chain = function(func) {
	return this.add(func, arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : false);
};

// And doesn't pass anything back from the previous function
Chainable.prototype.and = function(func) {
	return this.add(func, arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : []);
};

// End a chain, calls a function without any arguments at all
Chainable.prototype.end = function(func) {
	return this.add(func || function() {}, arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [], chain.ending);
};

// A synchronous call, without worrying about callbacks
Chainable.prototype.andSync = function(func) {
	var link = this;

	return this.add(function() {
		var ret = func.apply(this, [].slice.call(arguments, 0, -1));
		if (ret === chain.exit)
			return;
		link.callbackWasCalled = true;
		link.next();
	}, arguments.length > 1 ? [].slice.call(arguments, 1) : []);
};

Chainable.prototype.thenSync = function(func) {
	var link = this;

	return this.add(function() {
		var ret = func.apply(this, [].slice.call(arguments, 0, -1));
		if (ret === chain.exit)
			return;
		link.callbackWasCalled = true;
		link.next();
	}, arguments.length > 1 ? [].slice.call(arguments, 1) : false);
};

Chainable.prototype.add = function(func, args, meta) {
	if ( typeof func !== "function" )
		throw new Error("func in chainable not valid callback");
	this.stack.push([func, args, meta]);
	if ( ! this.isRunning )
		this.next();
	return this;
};

Chainable.prototype.makeArgs = function(args, meta) {
	if ( meta === chain.ending )
		return args;
	args = Array.prototype.slice.call(args || []);
	args.push(this.callback.bind(this));
	return args;
};

Chainable.prototype.callback = function() {
	this.callbackWasCalled = true;
	this.currentArgs = arguments;

	if ( ! this.wasSynchronous )
		this.next();
};

/*
	Run through the chain. The algorithm is as follows:

	1. Pop from stack
	2. Run
	3. Was callback called?
	    4a. Yes? Repeat
	    4b. No?  Wait, then repeat
*/

Chainable.prototype.next = function() {
	if ( this.isAborted )
		return;

	var current = this.stack.shift();

	// Chain is now empty. Maybe something is added after this though?
	if ( ! current ) {
		this.isRunning = false;
		return;
	}

	var func = current[0], args = current[1], meta = current[2];

	this.isRunning = true;
	this.wasSynchronous = true;
	this.callbackWasCalled = false;

	var ret = func.apply(this, this.makeArgs(args || this.currentArgs, meta));

	// If a function returns the exit method of chain, stop execution
	if ( ret === chain.exit )
		return;

	if ( ! this.callbackWasCalled )
		this.wasSynchronous = false;
	else {
		this.next(); // repeat
	}
};

Chainable.prototype.abort = function() {
	this.stack = [];
	this.isAborted = true;
};

function chain(func) {
	return new Chainable(func, Array.prototype.slice.call(arguments, 1));
}

chain.exit = function() { /* exit */ };
chain.ending = function() { /* ending */ };

;
Array.prototype.remove = function(item) {
	for (var i = this.length; i--;)
		if (this[i] === item) this.splice(i, 1);
	return this;
};

Array.prototype.contains = function(search) {
	return this.indexOf(search) !== -1;
};

// Uses a reverse-unique-algorithm for Google Reader
Array.prototype.unique = function(){
   var u = {}, a = [];
   for(var l = 0, i = this.length-1; i >= 0; --i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.unshift(this[i]);
      u[this[i]] = 1;
   }
   return a;
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
;
String.prototype.trimChars = function(charlist) {
	charlist = charlist || ' \r\n\t';
    var l = 0, i = 0;
    
    var ret = this;
    
    l = ret.length;
    for (i = 0; i < l; i++) {
        if (charlist.indexOf(ret.charAt(i)) === -1) {
            ret = ret.substring(i);
            break;
        }
    }
    
    l = ret.length;
    for (i = l - 1; i >= 0; i--) {
        if (charlist.indexOf(ret.charAt(i)) === -1) {
            ret = ret.substring(0, i + 1);
            break;
        }
    }
    
    return charlist.indexOf(ret.charAt(0)) === -1 ? ret : '';
};

String.prototype.contains = function(str) {
	return this.indexOf(str) !== -1;
};

String.prototype.cleanData = function() {
	return this.replace(/<!\[CDATA\[(.*)\]\]>/, function(a, b) { return b; }).trim();
};

String.prototype.upperCaseFirst = function() {
	return this.replace(/^./, function(a) {
		return a.toUpperCase();
	});
};

String.prototype.stripHTMLEntities = function() {
	var el = document.createElement("div");
	var html = this.replace(/<img/g, '<x-img');
	el.innerHTML = html;
	return el.innerText;
}
;

Element.prototype.forEachElement = function(func, bind) {
	var el = this.firstElementChild;
	if ( ! el )
		return;
	
	var els = []; 
	do {
		els.push(el);
	} while (el = el.nextElementSibling);
	
	els.forEach(func, bind);
};

Element.prototype.getAllAttributes = function() {
	var attributes = {};
	for ( var attr, i = 0, attrs = this.attributes, l = attrs.length; i < l; i++ ){
	    attr = attrs.item(i)
		attributes[attr.nodeName] = attr.nodeValue;
	}
	return attributes;
};

Element.prototype.cloneChildrenFrom = function(from) {
	from.forEachElement(function(el) {
		this.appendChild(el.cloneNode(true));
	}, this);
};

Element.prototype.getParents = function() {
	var parents = [];
	var current = this.parentElement;
	do {
		parents.push(current);
	} while (current = current.parentElement);
	return parents;
};

Element.prototype.clearChildren = function() {
	while ( this.firstChild )
		this.removeChild(this.firstChild);
};

Element.prototype.hide = function() {
	this.style.display = "none";
};

Element.prototype.show = function() {
	this.style.display = "block";
};

Element.prototype.hasChild = function(element) {
	if ( ! this.firstElementChild )
		return false;
	
	var el = this.firstElementChild;
	do {
		if ( el === element )
			return true;
	} while (el = el.nextElementSibling);
	
	return false;
};

function getTransitionEndEventName(element) {
	if ('onwebkittransitionend' in window) {
		// Chrome/Saf (+ Mobile Saf)/Android
		transition = 'webkitTransitionEnd';
	} else if('onotransitionend' in element || navigator.appName == 'Opera') {
		// Opera
		// As of Opera 10.61, there is no "onotransitionend" property added to DOM elements,
		// so it will always use the navigator.appName fallback
		transition = 'oTransitionEnd';
	} else {
		transition = "transitionend";
	}

	return transition;
}

function addTransitionEndEvent(element, func) {
	if ( ! Modernizr.csstransitions )
		return;

	element.addEventListener(getTransitionEndEventName(element), func, false);
}

function removeTransitionEndEvent(element, func) {
	if ( ! Modernizr.csstransitions )
		return;
	element.removeEventListener(getTransitionEndEventName(element), func, false);
}

Element.prototype.inViewPort = function(margin) {
	margin = margin || {left: 0, right: 0, top: 0, bottom: 0};

	var top = this.offsetTop;
	var left = this.offsetLeft;
	var width = this.offsetWidth;
	var height = this.offsetHeight;

	var el = this;
	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
		left += el.offsetLeft;
	}
	
	return (
		top - margin.top >= window.pageYOffset &&
		left - margin.left >= window.pageXOffset &&
		(top + height) + margin.bottom <= (window.pageYOffset + window.innerHeight) &&
		(left + width) + margin.left <= (window.pageXOffset + window.innerWidth)
	);
}

Element.prototype.scrollIntoViewSmart = function() {
	if ( this.inViewPort({left: 0, right: 0, top: 50, bottom: 10}) )
		return;
	var el = this, top = this.offsetTop;
	while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
	}
	window.scrollTo(0, this.offsetTop - 100);
}
;
var Request = Class.extend({
	initialize: function(params) {
		this.params = toOptions(params, {
			method: 'GET',
			contentType: 'form',
			onComplete: function() {},
			onError: function() {},
			arrayedParamsToMultipleKey: false,
			timeout: false,
			addFeederAuthorization: false
		});

		this.headers = {};

		if (this.params.addFeederAuthorization) {
			this.addFeederAuthorization();
		}

		this.request = new XMLHttpRequest();
	},

	addHeader: function(key, value) {
		this.headers[key] = value;
	},

	send: function(options) {
		options = toOptions(options, {get: {}, post: {}});
		options.get = options.get || {};
		options.post = options.post || {};

		var paramsPost = this.makeParams(options.post, this.params.contentType);
		var paramsGet = this.makeParams(options.get, 'form');
		var url = this.params.url;

		if ( paramsGet ) {
			TRYIT(function() {
				url += (url.contains('?') ? '&' : '?') + paramsGet;
			}, this, {url: url});
		}

		this.request.open(this.params.method, url, true);
		this.request.withCredentials = true;

		if ( this.params.method === 'POST' )
			if ( this.params.contentType === 'form' )
				this.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
			else if ( this.params.contentType === 'json' )
				this.request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		for ( var key in this.headers ) if ( this.headers.hasOwnProperty(key) )
			this.request.setRequestHeader(key, this.headers[key]);

		this.request.onreadystatechange = this.requestReadyStateChange;
		this.request.onerror = this.requestError;

		if ( this.params.timeout ) {
			this.request.timeout = this.params.timeout;
			this.request.ontimeout = this.requestError;
		}

		TRYIT(function() {
			this.request.send(paramsPost || null);
		}, this, {url: this.params.url, params: options});
	},

	abort: function() {
		this.request.abort();
	},

	requestReadyStateChange: function() {
		if ( this.request.readyState != 4 ) return;

		this.params.onComplete.call(this, this.request.status, this.request.responseText, this.request.responseXML);
	},

	requestError: function() {
		this.params.onError.call(this);
	},

	makeParams: function(data, contentType) {
		if ( ! data )
			return null;
		if ( contentType === 'form' )
			return objectToQueryString(data, this.params.arrayedParamsToMultipleKey);
		else if ( contentType === 'json' )
			return JSON.stringify(data);
		throw "No such content type " + contentType;
	},

	addFeederAuthorization: function() {
		if ( ! localStorage["feeder:token"] )
			return;
		this.addHeader("Authorization", btoa(JSON.parse(localStorage["feeder:token"]) + ":" + JSON.parse(localStorage["client_id"])));
	},

	getHeader: function(header) {
		return this.request.getResponseHeader(header);
	}
});

function tryToParseJSON(data) {
	try {
		return JSON.parse(data);
	} catch (e) {}

	return null;
}

function objectLength(obj) {
	return Object.keys(obj).length;
}

function queryStringGet(key) {
	var str = window.location.search.substring(1);
	var pieces = str.split("&");
	for ( var i = 0; i < pieces.length; i++ ) {
		keyValue = pieces[i].split("=");
		if ( keyValue[0] == key )
			return keyValue[1];
	}
	return "";
}

function readFileInput(fileinput, callback) {
	var filereader = new FileReader();

	filereader.onload = function(event) {
		fireCallback(callback, event.target.result);
	};

	filereader.onerror = function() {
		fireCallback(callback, false);
	};

	if ( ! fileinput.files[0] ) {
		fireCallback(callback, false);
		return;
	}

	filereader.readAsText(fileinput.files[0]);
}

Object.values = function (obj) {
    var vals = [];
    for( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) {
            vals.push(obj[key]);
        }
    }
    return vals;
}

function mergeObjects(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

function GUID() {
	var S4 = function () {
		return Math.floor(Math.random() * 0x10000 /* 65536 */).toString(16);
	};
	return (
		S4() + S4() + "-" +
		S4() + "-" +
		S4() + "-" +
		S4() + "-" +
		S4() + S4() + S4()
	);
}

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-touch-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},p.csstransitions=function(){return E("transition")};for(var F in p)x(p,F)&&(u=F.toLowerCase(),e[u]=p[F](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e}(this,this.document);

;
/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.8.3
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.com/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */

(function (root, factory) {
    // https://github.com/umdjs/umd/blob/master/returnExports.js
    if (typeof exports === 'object') {
        // Node
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.SecondLevelDomains = factory();
    }
}(this, function () {
"use strict";

var hasOwn = Object.prototype.hasOwnProperty;
var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
        "ac":"com|gov|mil|net|org",
        "ae":"ac|co|gov|mil|name|net|org|pro|sch",
        "af":"com|edu|gov|net|org",
        "al":"com|edu|gov|mil|net|org",
        "ao":"co|ed|gv|it|og|pb",
        "ar":"com|edu|gob|gov|int|mil|net|org|tur",
        "at":"ac|co|gv|or",
        "au":"asn|com|csiro|edu|gov|id|net|org",
        "ba":"co|com|edu|gov|mil|net|org|rs|unbi|unmo|unsa|untz|unze",
        "bb":"biz|co|com|edu|gov|info|net|org|store|tv",
        "bh":"biz|cc|com|edu|gov|info|net|org",
        "bn":"com|edu|gov|net|org",
        "bo":"com|edu|gob|gov|int|mil|net|org|tv",
        "br":"adm|adv|agr|am|arq|art|ato|b|bio|blog|bmd|cim|cng|cnt|com|coop|ecn|edu|eng|esp|etc|eti|far|flog|fm|fnd|fot|fst|g12|ggf|gov|imb|ind|inf|jor|jus|lel|mat|med|mil|mus|net|nom|not|ntr|odo|org|ppg|pro|psc|psi|qsl|rec|slg|srv|tmp|trd|tur|tv|vet|vlog|wiki|zlg",
        "bs":"com|edu|gov|net|org",
        "bz":"du|et|om|ov|rg",
        "ca":"ab|bc|mb|nb|nf|nl|ns|nt|nu|on|pe|qc|sk|yk",
        "ck":"biz|co|edu|gen|gov|info|net|org",
        "cn":"ac|ah|bj|com|cq|edu|fj|gd|gov|gs|gx|gz|ha|hb|he|hi|hl|hn|jl|js|jx|ln|mil|net|nm|nx|org|qh|sc|sd|sh|sn|sx|tj|tw|xj|xz|yn|zj",
        "co":"com|edu|gov|mil|net|nom|org",
        "cr":"ac|c|co|ed|fi|go|or|sa",
        "cy":"ac|biz|com|ekloges|gov|ltd|name|net|org|parliament|press|pro|tm",
        "do":"art|com|edu|gob|gov|mil|net|org|sld|web",
        "dz":"art|asso|com|edu|gov|net|org|pol",
        "ec":"com|edu|fin|gov|info|med|mil|net|org|pro",
        "eg":"com|edu|eun|gov|mil|name|net|org|sci",
        "er":"com|edu|gov|ind|mil|net|org|rochest|w",
        "es":"com|edu|gob|nom|org",
        "et":"biz|com|edu|gov|info|name|net|org",
        "fj":"ac|biz|com|info|mil|name|net|org|pro",
        "fk":"ac|co|gov|net|nom|org",
        "fr":"asso|com|f|gouv|nom|prd|presse|tm",
        "gg":"co|net|org",
        "gh":"com|edu|gov|mil|org",
        "gn":"ac|com|gov|net|org",
        "gr":"com|edu|gov|mil|net|org",
        "gt":"com|edu|gob|ind|mil|net|org",
        "gu":"com|edu|gov|net|org",
        "hk":"com|edu|gov|idv|net|org",
        "id":"ac|co|go|mil|net|or|sch|web",
        "il":"ac|co|gov|idf|k12|muni|net|org",
        "in":"ac|co|edu|ernet|firm|gen|gov|i|ind|mil|net|nic|org|res",
        "iq":"com|edu|gov|i|mil|net|org",
        "ir":"ac|co|dnssec|gov|i|id|net|org|sch",
        "it":"edu|gov",
        "je":"co|net|org",
        "jo":"com|edu|gov|mil|name|net|org|sch",
        "jp":"ac|ad|co|ed|go|gr|lg|ne|or",
        "ke":"ac|co|go|info|me|mobi|ne|or|sc",
        "kh":"com|edu|gov|mil|net|org|per",
        "ki":"biz|com|de|edu|gov|info|mob|net|org|tel",
        "km":"asso|com|coop|edu|gouv|k|medecin|mil|nom|notaires|pharmaciens|presse|tm|veterinaire",
        "kn":"edu|gov|net|org",
        "kr":"ac|busan|chungbuk|chungnam|co|daegu|daejeon|es|gangwon|go|gwangju|gyeongbuk|gyeonggi|gyeongnam|hs|incheon|jeju|jeonbuk|jeonnam|k|kg|mil|ms|ne|or|pe|re|sc|seoul|ulsan",
        "kw":"com|edu|gov|net|org",
        "ky":"com|edu|gov|net|org",
        "kz":"com|edu|gov|mil|net|org",
        "lb":"com|edu|gov|net|org",
        "lk":"assn|com|edu|gov|grp|hotel|int|ltd|net|ngo|org|sch|soc|web",
        "lr":"com|edu|gov|net|org",
        "lv":"asn|com|conf|edu|gov|id|mil|net|org",
        "ly":"com|edu|gov|id|med|net|org|plc|sch",
        "ma":"ac|co|gov|m|net|org|press",
        "mc":"asso|tm",
        "me":"ac|co|edu|gov|its|net|org|priv",
        "mg":"com|edu|gov|mil|nom|org|prd|tm",
        "mk":"com|edu|gov|inf|name|net|org|pro",
        "ml":"com|edu|gov|net|org|presse",
        "mn":"edu|gov|org",
        "mo":"com|edu|gov|net|org",
        "mt":"com|edu|gov|net|org",
        "mv":"aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro",
        "mw":"ac|co|com|coop|edu|gov|int|museum|net|org",
        "mx":"com|edu|gob|net|org",
        "my":"com|edu|gov|mil|name|net|org|sch",
        "nf":"arts|com|firm|info|net|other|per|rec|store|web",
        "ng":"biz|com|edu|gov|mil|mobi|name|net|org|sch",
        "ni":"ac|co|com|edu|gob|mil|net|nom|org",
        "np":"com|edu|gov|mil|net|org",
        "nr":"biz|com|edu|gov|info|net|org",
        "om":"ac|biz|co|com|edu|gov|med|mil|museum|net|org|pro|sch",
        "pe":"com|edu|gob|mil|net|nom|org|sld",
        "ph":"com|edu|gov|i|mil|net|ngo|org",
        "pk":"biz|com|edu|fam|gob|gok|gon|gop|gos|gov|net|org|web",
        "pl":"art|bialystok|biz|com|edu|gda|gdansk|gorzow|gov|info|katowice|krakow|lodz|lublin|mil|net|ngo|olsztyn|org|poznan|pwr|radom|slupsk|szczecin|torun|warszawa|waw|wroc|wroclaw|zgora",
        "pr":"ac|biz|com|edu|est|gov|info|isla|name|net|org|pro|prof",
        "ps":"com|edu|gov|net|org|plo|sec",
        "pw":"belau|co|ed|go|ne|or",
        "ro":"arts|com|firm|info|nom|nt|org|rec|store|tm|www",
        "rs":"ac|co|edu|gov|in|org",
        "sb":"com|edu|gov|net|org",
        "sc":"com|edu|gov|net|org",
        "sh":"co|com|edu|gov|net|nom|org",
        "sl":"com|edu|gov|net|org",
        "st":"co|com|consulado|edu|embaixada|gov|mil|net|org|principe|saotome|store",
        "sv":"com|edu|gob|org|red",
        "sz":"ac|co|org",
        "tr":"av|bbs|bel|biz|com|dr|edu|gen|gov|info|k12|name|net|org|pol|tel|tsk|tv|web",
        "tt":"aero|biz|cat|co|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel",
        "tw":"club|com|ebiz|edu|game|gov|idv|mil|net|org",
        "mu":"ac|co|com|gov|net|or|org",
        "mz":"ac|co|edu|gov|org",
        "na":"co|com",
        "nz":"ac|co|cri|geek|gen|govt|health|iwi|maori|mil|net|org|parliament|school",
        "pa":"abo|ac|com|edu|gob|ing|med|net|nom|org|sld",
        "pt":"com|edu|gov|int|net|nome|org|publ",
        "py":"com|edu|gov|mil|net|org",
        "qa":"com|edu|gov|mil|net|org",
        "re":"asso|com|nom",
        "ru":"ac|adygeya|altai|amur|arkhangelsk|astrakhan|bashkiria|belgorod|bir|bryansk|buryatia|cbg|chel|chelyabinsk|chita|chukotka|chuvashia|com|dagestan|e-burg|edu|gov|grozny|int|irkutsk|ivanovo|izhevsk|jar|joshkar-ola|kalmykia|kaluga|kamchatka|karelia|kazan|kchr|kemerovo|khabarovsk|khakassia|khv|kirov|koenig|komi|kostroma|kranoyarsk|kuban|kurgan|kursk|lipetsk|magadan|mari|mari-el|marine|mil|mordovia|mosreg|msk|murmansk|nalchik|net|nnov|nov|novosibirsk|nsk|omsk|orenburg|org|oryol|penza|perm|pp|pskov|ptz|rnd|ryazan|sakhalin|samara|saratov|simbirsk|smolensk|spb|stavropol|stv|surgut|tambov|tatarstan|tom|tomsk|tsaritsyn|tsk|tula|tuva|tver|tyumen|udm|udmurtia|ulan-ude|vladikavkaz|vladimir|vladivostok|volgograd|vologda|voronezh|vrn|vyatka|yakutia|yamal|yekaterinburg|yuzhno-sakhalinsk",
        "rw":"ac|co|com|edu|gouv|gov|int|mil|net",
        "sa":"com|edu|gov|med|net|org|pub|sch",
        "sd":"com|edu|gov|info|med|net|org|tv",
        "se":"a|ac|b|bd|c|d|e|f|g|h|i|k|l|m|n|o|org|p|parti|pp|press|r|s|t|tm|u|w|x|y|z",
        "sg":"com|edu|gov|idn|net|org|per",
        "sn":"art|com|edu|gouv|org|perso|univ",
        "sy":"com|edu|gov|mil|net|news|org",
        "th":"ac|co|go|in|mi|net|or",
        "tj":"ac|biz|co|com|edu|go|gov|info|int|mil|name|net|nic|org|test|web",
        "tn":"agrinet|com|defense|edunet|ens|fin|gov|ind|info|intl|mincom|nat|net|org|perso|rnrt|rns|rnu|tourism",
        "tz":"ac|co|go|ne|or",
        "ua":"biz|cherkassy|chernigov|chernovtsy|ck|cn|co|com|crimea|cv|dn|dnepropetrovsk|donetsk|dp|edu|gov|if|in|ivano-frankivsk|kh|kharkov|kherson|khmelnitskiy|kiev|kirovograd|km|kr|ks|kv|lg|lugansk|lutsk|lviv|me|mk|net|nikolaev|od|odessa|org|pl|poltava|pp|rovno|rv|sebastopol|sumy|te|ternopil|uzhgorod|vinnica|vn|zaporizhzhe|zhitomir|zp|zt",
        "ug":"ac|co|go|ne|or|org|sc",
        "uk":"ac|bl|british-library|co|cym|gov|govt|icnet|jet|lea|ltd|me|mil|mod|national-library-scotland|nel|net|nhs|nic|nls|org|orgn|parliament|plc|police|sch|scot|soc",
        "us":"dni|fed|isa|kids|nsn",
        "uy":"com|edu|gub|mil|net|org",
        "ve":"co|com|edu|gob|info|mil|net|org|web",
        "vi":"co|com|k12|net|org",
        "vn":"ac|biz|com|edu|gov|health|info|int|name|net|org|pro",
        "ye":"co|com|gov|ltd|me|net|org|plc",
        "yu":"ac|co|edu|gov|org",
        "za":"ac|agric|alt|bourse|city|co|cybernet|db|edu|gov|grondar|iaccess|imt|inca|landesign|law|mil|net|ngo|nis|nom|olivetti|org|pix|school|tm|web",
        "zm":"ac|co|com|edu|gov|net|org|sch"
    },
    // SLD expression for each TLD
    //expressions: {},
    // SLD expression for all TLDs
    has_expression: null,
    is_expression: null,
    // validate domain is a known SLD
    has: function(domain) {
        return !!domain.match(SLD.has_expression);
    },
    is: function(domain) {
        return !!domain.match(SLD.is_expression);
    },
    get: function(domain) {
        var t = domain.match(SLD.has_expression);
        return t && t[1] || null;
    },
    init: function() {
        var t = '';
        for (var tld in SLD.list) {
            if (!hasOwn.call(SLD.list, tld)) {
                continue;
            }

            var expression = '(' + SLD.list[tld] + ')\.' + tld;
            //SLD.expressions[tld] = new RegExp('\.' + expression + '$', 'i');
            t += '|(' + expression + ')';
        }

        SLD.has_expression = new RegExp('\\.(' + t.substr(1) + ')$', 'i');
        SLD.is_expression = new RegExp('^(' + t.substr(1) + ')$', 'i');
    }
};

SLD.init();

return SLD;
}));
/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.8.3
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.com/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
(function (root, factory) {
    // https://github.com/umdjs/umd/blob/master/returnExports.js
    if (typeof exports === 'object') {
        // Node
        module.exports = factory(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./punycode', './IPv6', './SecondLevelDomains'], factory);
    } else {
        // Browser globals (root is window)
        root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains);
    }
}(this, function (punycode, IPv6, SLD) {
"use strict";

function URI(url, base) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
        return new URI(url, base);
    }

    if (url === undefined) {
        if (typeof location !== 'undefined') {
            url = location.href + "";
        } else {
            url = "";
        }
    }
	
	if (url === null)
		url = "";

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
        return this.absoluteTo(base);
    }

    return this;
};

var p = URI.prototype;
var hasOwn = Object.prototype.hasOwnProperty;

function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

function isArray(obj) {
    return String(Object.prototype.toString.call(obj)) === "[object Array]";
}

function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (isArray(value)) {
        for (i = 0, length = value.length; i < length; i++) {
            lookup[value[i]] = true;
        }
    } else {
        lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
        if (lookup[data[i]] !== undefined) {
            data.splice(i, 1);
            length--;
            i--;
        }
    }

    return data;
}

URI._parts = function() {
    return {
        protocol: null,
        username: null,
        password: null,
        hostname: null,
        urn: null,
        port: null,
        path: null,
        query: null,
        fragment: null,
        // state
        duplicateQueryParameters: URI.duplicateQueryParameters
    };
};
// state: allow duplicate query parameters (a=1&a=1)
URI.duplicateQueryParameters = false;
// static properties
URI.protocol_expression = /^[a-z][a-z0-9-+-]*$/i;
URI.idn_expression = /[^a-z0-9\.-]/i;
URI.punycode_expression = /(xn--)/i;
// well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
// credits to Rich Brown
// source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
// specification: http://www.ietf.org/rfc/rfc4291.txt
URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/ ;
// gruber revised expression - http://rodneyrehm.de/t/url-regex.html
URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?]))/ig;
// http://www.iana.org/assignments/uri-schemes.html
// http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
URI.defaultPorts = {
    http: "80",
    https: "443",
    ftp: "21",
    gopher: "70",
    ws: "80",
    wss: "443"
};
// allowed hostname characters according to RFC 3986
// ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
// I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
// encoding / decoding according to RFC3986
function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
        .replace(/[!'()*]/g, escape)
        .replace(/\*/g, "%2A");
}
URI.encode = strictEncodeURIComponent;
URI.decode = decodeURIComponent;
URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
};
URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
};
URI.characters = {
    pathname: {
        encode: {
            // RFC3986 2.1: For consistency, URI producers and normalizers should
            // use uppercase hexadecimal digits for all percent-encodings.
            expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
            map: {
                // -._~!'()*
                "%24": "$",
                "%26": "&",
                "%2B": "+",
                "%2C": ",",
                "%3B": ";",
                "%3D": "=",
                "%3A": ":",
                "%40": "@"
            }
        },
        decode: {
            expression: /[\/\?#]/g,
            map: {
                "/": "%2F",
                "?": "%3F",
                "#": "%23"
            }
        }
    },
    reserved: {
        encode: {
            // RFC3986 2.1: For consistency, URI producers and normalizers should
            // use uppercase hexadecimal digits for all percent-encodings.
            expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
            map: {
                // gen-delims
                "%3A": ":",
                "%2F": "/",
                "%3F": "?",
                "%23": "#",
                "%5B": "[",
                "%5D": "]",
                "%40": "@",
                // sub-delims
                "%21": "!",
                "%24": "$",
                "%26": "&",
                "%27": "'",
                "%28": "(",
                "%29": ")",
                "%2A": "*",
                "%2B": "+",
                "%2C": ",",
                "%3B": ";",
                "%3D": "="
            }
        }
    }
};
URI.encodeQuery = function(string) {
    return URI.encode(string + "").replace(/%20/g, '+');
};
URI.decodeQuery = function(string) {
    return URI.decode((string + "").replace(/\+/g, '%20'));
};
URI.recodePath = function(string) {
    var segments = (string + "").split('/');
    for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = URI.encodePathSegment(URI.decode(segments[i]));
    }

    return segments.join('/');
};
URI.decodePath = function(string) {
    var segments = (string + "").split('/');
    for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = URI.decodePathSegment(segments[i]);
    }

    return segments.join('/');
};
// generate encode/decode path functions
var _parts = {'encode':'encode', 'decode':'decode'};
var _part;
var generateAccessor = function(_group, _part) {
    return function(string) {
        return URI[_part](string + "").replace(URI.characters[_group][_part].expression, function(c) {
            return URI.characters[_group][_part].map[c];
        });
    };
};

for (_part in _parts) {
    URI[_part + "PathSegment"] = generateAccessor("pathname", _parts[_part]);
}

URI.encodeReserved = generateAccessor("reserved", "encode");

URI.parse = function(string, parts) {
    var pos, t;
    if (!parts) {
        parts = {};
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
        // escaping?
        parts.fragment = string.substring(pos + 1) || null;
        string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
        // escaping?
        parts.query = string.substring(pos + 1) || null;
        string = string.substring(0, pos);
    }

    // extract protocol
    if (string.substring(0, 2) === '//') {
        // relative-scheme
        parts.protocol = '';
        string = string.substring(2);
        // extract "user:pass@host:port"
        string = URI.parseAuthority(string, parts);
    } else {
        pos = string.indexOf(':');
        if (pos > -1) {
            parts.protocol = string.substring(0, pos);
            if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
                // : may be within the path
                parts.protocol = undefined;
            } else if (parts.protocol === 'file') {
                // the file scheme: does not contain an authority
                string = string.substring(pos + 3);
            } else if (string.substring(pos + 1, pos + 3) === '//') {
                string = string.substring(pos + 3);

                // extract "user:pass@host:port"
                string = URI.parseAuthority(string, parts);
            } else {
                string = string.substring(pos + 1);
                parts.urn = true;
            }
        }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
};
URI.parseHost = function(string, parts) {
    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
        pos = string.length;
    }

    if (string[0] === "[") {
        // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
        // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
        // IPv6+port in the format [2001:db8::1]:80 (for the time being)
        bracketPos = string.indexOf(']');
        parts.hostname = string.substring(1, bracketPos) || null;
        parts.port = string.substring(bracketPos+2, pos) || null;
    } else if (string.indexOf(':') !== string.lastIndexOf(':')) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
    } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
    }

    if (parts.hostname && string.substring(pos)[0] !== '/') {
        pos++;
        string = "/" + string;
    }

    return string.substring(pos) || '/';
};
URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
};
URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var pos = string.indexOf('@');
    var firstSlash = string.indexOf('/');
    var t;

    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
        t = string.substring(0, pos).split(':');
        parts.username = t[0] ? URI.decode(t[0]) : null;
        t.shift();
        parts.password = t[0] ? URI.decode(t.join(':')) : null;
        string = string.substring(pos + 1);
    } else {
        parts.username = null;
        parts.password = null;
    }

    return string;
};
URI.parseQuery = function(string) {
    if (!string) {
        return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
        return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
        v = splits[i].split('=');
        name = URI.decodeQuery(v.shift());
        // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
        value = v.length ? URI.decodeQuery(v.join('=')) : null;

        if (items[name]) {
            if (typeof items[name] === "string") {
                items[name] = [items[name]];
            }

            items[name].push(value);
        } else {
            items[name] = value;
        }
    }

    return items;
};

URI.build = function(parts) {
    var t = "";

    if (parts.protocol) {
        t += parts.protocol + ":";
    }

    if (!parts.urn && (t || parts.hostname)) {
        t += '//';
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === "string") {
        if (parts.path[0] !== '/' && typeof parts.hostname === "string") {
            t += '/';
        }

        t += parts.path;
    }

    if (typeof parts.query === "string" && parts.query) {
        t += '?' + parts.query;
    }

    if (typeof parts.fragment === "string" && parts.fragment) {
        t += '#' + parts.fragment;
    }
    return t;
};
URI.buildHost = function(parts) {
    var t = "";

    if (!parts.hostname) {
        return "";
    } else if (URI.ip6_expression.test(parts.hostname)) {
        if (parts.port) {
            t += "[" + parts.hostname + "]:" + parts.port;
        } else {
            // don't know if we should always wrap IPv6 in []
            // the RFC explicitly says SHOULD, not MUST.
            t += parts.hostname;
        }
    } else {
        t += parts.hostname;
        if (parts.port) {
            t += ':' + parts.port;
        }
    }

    return t;
};
URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
};
URI.buildUserinfo = function(parts) {
    var t = "";

    if (parts.username) {
        t += URI.encode(parts.username);

        if (parts.password) {
            t += ':' + URI.encode(parts.password);
        }

        t += "@";
    }

    return t;
};
URI.buildQuery = function(data, duplicates) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being Â»-._~!$&'()*+,;=:@/?Â« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = "";
    var unique, key, i, length;
    for (key in data) {
        if (hasOwn.call(data, key) && key) {
            if (isArray(data[key])) {
                unique = {};
                for (i = 0, length = data[key].length; i < length; i++) {
                    if (data[key][i] !== undefined && unique[data[key][i] + ""] === undefined) {
                        t += "&" + URI.buildQueryParameter(key, data[key][i]);
                        if (duplicates !== true) {
                            unique[data[key][i] + ""] = true;
                        }
                    }
                }
            } else if (data[key] !== undefined) {
                t += '&' + URI.buildQueryParameter(key, data[key]);
            }
        }
    }

    return t.substring(1);
};
URI.buildQueryParameter = function(name, value) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name) + (value !== null ? "=" + URI.encodeQuery(value) : "");
};

URI.addQuery = function(data, name, value) {
    if (typeof name === "object") {
        for (var key in name) {
            if (hasOwn.call(name, key)) {
                URI.addQuery(data, key, name[key]);
            }
        }
    } else if (typeof name === "string") {
        if (data[name] === undefined) {
            data[name] = value;
            return;
        } else if (typeof data[name] === "string") {
            data[name] = [data[name]];
        }

        if (!isArray(value)) {
            value = [value];
        }

        data[name] = data[name].concat(value);
    } else {
        throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
    }
};
URI.removeQuery = function(data, name, value) {
    var i, length, key;
    
    if (isArray(name)) {
        for (i = 0, length = name.length; i < length; i++) {
            data[name[i]] = undefined;
        }
    } else if (typeof name === "object") {
        for (key in name) {
            if (hasOwn.call(name, key)) {
                URI.removeQuery(data, key, name[key]);
            }
        }
    } else if (typeof name === "string") {
        if (value !== undefined) {
            if (data[name] === value) {
                data[name] = undefined;
            } else if (isArray(data[name])) {
                data[name] = filterArrayValues(data[name], value);
            }
        } else {
            data[name] = undefined;
        }
    } else {
        throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");
    }
};

URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
        if (one[pos] !== two[pos]) {
            pos--;
            break;
        }
    }

    if (pos < 1) {
        return one[0] === two[0] && one[0] === '/' ? '/' : '';
    }

    // revert to last /
    if (one[pos] !== '/') {
        pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
};

URI.withinString = function(string, callback) {
    // expression used is "gruber revised" (@gruber v2) determined to be the best solution in
    // a regex sprint we did a couple of ages ago at
    // * http://mathiasbynens.be/demo/url-regex
    // * http://rodneyrehm.de/t/url-regex.html

    return string.replace(URI.find_uri_expression, callback);
};

URI.ensureValidHostname = function(v) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    if (v.match(URI.invalid_hostname_characters)) {
        // test punycode
        if (!punycode) {
            throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-] and Punycode.js is not available");
        }

        if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
            throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-]");
        }
    }
};

p.build = function(deferBuild) {
    if (deferBuild === true) {
        this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
        this._string = URI.build(this._parts);
        this._deferred_build = false;
    }

    return this;
};

p.clone = function() {
    return new URI(this);
};

p.valueOf = p.toString = function() {
    return this.build(false)._string;
};

// generate simple accessors
_parts = {protocol: 'protocol', username: 'username', password: 'password', hostname: 'hostname',  port: 'port'};
generateAccessor = function(_part){
    return function(v, build) {
        if (v === undefined) {
            return this._parts[_part] || "";
        } else {
            this._parts[_part] = v;
            this.build(!build);
            return this;
        }
    };
};

for (_part in _parts) {                                                                                                                                                                                        
    p[_part] = generateAccessor(_parts[_part]);
}

// generate accessors with optionally prefixed input
_parts = {query: '?', fragment: '#'};
generateAccessor = function(_part, _key){
    return function(v, build) {
        if (v === undefined) {
            return this._parts[_part] || "";
        } else {
            if (v !== null) {
                v = v + "";
                if (v[0] === _key) {
                    v = v.substring(1);
                }
            }

            this._parts[_part] = v;
            this.build(!build);
            return this;
        }
    };
};

for (_part in _parts) {
    p[_part] = generateAccessor(_part, _parts[_part]);
}

// generate accessors with prefixed output
_parts = {search: ['?', 'query'], hash: ['#', 'fragment']};
generateAccessor = function(_part, _key){
    return function(v, build) {
        var t = this[_part](v, build);
        return typeof t === "string" && t.length ? (_key + t) : t;
    };
};

for (_part in _parts) {
    p[_part] = generateAccessor(_parts[_part][1], _parts[_part][0]);
}

p.pathname = function(v, build) {
    if (v === undefined || v === true) {
        var res = this._parts.path || (this._parts.urn ? '' : '/');
        return v ? URI.decodePath(res) : res;
    } else {
        this._parts.path = v ? URI.recodePath(v) : "/";
        this.build(!build);
        return this;
    }
};
p.path = p.pathname;
p.href = function(href, build) {
    var key;
    
    if (href === undefined) {
        return this.toString();
    }

    this._string = "";
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === "object" && (href.hostname || href.path);

    
    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for: 
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick 
    // (for location, not for everything...)
    if (!_URI && _object && Object.prototype.toString.call(href) !== "[object Object]") {
        href = href.toString();
    }

    if (typeof href === "string") {
        this._parts = URI.parse(href, this._parts);
    } else if (_URI || _object) {
        var src = _URI ? href._parts : href;
        for (key in src) {
            if (hasOwn.call(this._parts, key)) {
                this._parts[key] = src[key];
            }
        }
    } else {
        throw new TypeError("invalid input");
    }

    this.build(!build);
    return this;
};

// identification accessors
p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
        relative = false;
        ip4 = URI.ip4_expression.test(this._parts.hostname);
        ip6 = URI.ip6_expression.test(this._parts.hostname);
        ip = ip4 || ip6;
        name = !ip;
        sld = name && SLD && SLD.has(this._parts.hostname);
        idn = name && URI.idn_expression.test(this._parts.hostname);
        punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
        case 'relative':
            return relative;

        case 'absolute':
            return !relative;

        // hostname identification
        case 'domain':
        case 'name':
            return name;

        case 'sld':
            return sld;

        case 'ip':
            return ip;

        case 'ip4':
        case 'ipv4':
        case 'inet4':
            return ip4;

        case 'ip6':
        case 'ipv6':
        case 'inet6':
            return ip6;

        case 'idn':
            return idn;

        case 'url':
            return !this._parts.urn;

        case 'urn':
            return !!this._parts.urn;

        case 'punycode':
            return punycode;
    }

    return null;
};

// component specific input validation
var _protocol = p.protocol;
var _port = p.port;
var _hostname = p.hostname;

p.protocol = function(v, build) {
    if (v !== undefined) {
        if (v) {
            // accept trailing ://
            v = v.replace(/:(\/\/)?$/, '');

            if (v.match(/[^a-zA-z0-9\.+-]/)) {
                throw new TypeError("Protocol '" + v + "' contains characters other than [A-Z0-9.+-]");
            }
        }
    }
    return _protocol.call(this, v, build);
};
p.scheme = p.protocol;
p.port = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (v !== undefined) {
        if (v === 0) {
            v = null;
        }

        if (v) {
            v += "";
            if (v[0] === ":") {
                v = v.substring(1);
            }

            if (v.match(/[^0-9]/)) {
                throw new TypeError("Port '" + v + "' contains characters other than [0-9]");
            }
        }
    }
    return _port.call(this, v, build);
};
p.hostname = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (v !== undefined) {
        var x = {};
        URI.parseHost(v, x);
        v = x.hostname;
    }
    return _hostname.call(this, v, build);
};

// compound accessors
p.host = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (v === undefined) {
        return this._parts.hostname ? URI.buildHost(this._parts) : "";
    } else {
        URI.parseHost(v, this._parts);
        this.build(!build);
        return this;
    }
};
p.authority = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (v === undefined) {
        return this._parts.hostname ? URI.buildAuthority(this._parts) : "";
    } else {
        URI.parseAuthority(v, this._parts);
        this.build(!build);
        return this;
    }
};
p.userinfo = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (v === undefined) {
        if (!this._parts.username) {
            return "";
        }

        var t = URI.buildUserinfo(this._parts);
        return t.substring(0, t.length -1);
    } else {
        if (v[v.length-1] !== '@') {
            v += '@';
        }

        URI.parseUserinfo(v, this._parts);
        this.build(!build);
        return this;
    }
};
p.resource = function(v, build) {
    var parts;
    
    if (v === undefined) {
        return this.path() + this.search() + this.hash();
    }
    
    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
};

// fraction accessors
p.subdomain = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
            return "";
        }

        // grab domain and add another segment
        var end = this._parts.hostname.length - this.domain().length - 1;
        return this._parts.hostname.substring(0, end) || "";
    } else {
        var e = this._parts.hostname.length - this.domain().length;
        var sub = this._parts.hostname.substring(0, e);
        var replace = new RegExp('^' + escapeRegEx(sub));

        if (v && v[v.length - 1] !== '.') {
            v += ".";
        }

        if (v) {
            URI.ensureValidHostname(v);
        }

        this._parts.hostname = this._parts.hostname.replace(replace, v);
        this.build(!build);
        return this;
    }
};
p.domain = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
        build = v;
        v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
            return "";
        }

        // if hostname consists of 1 or 2 segments, it must be the domain
        var t = this._parts.hostname.match(/\./g);
        if (t && t.length < 2) {
            return this._parts.hostname;
        }

        // grab tld and add another segment
        var end = this._parts.hostname.length - this.tld(build).length - 1;
        end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
        return this._parts.hostname.substring(end) || "";
    } else {
        if (!v) {
            throw new TypeError("cannot set domain empty");
        }

        URI.ensureValidHostname(v);

        if (!this._parts.hostname || this.is('IP')) {
            this._parts.hostname = v;
        } else {
            var replace = new RegExp(escapeRegEx(this.domain()) + "$");
            this._parts.hostname = this._parts.hostname.replace(replace, v);
        }

        this.build(!build);
        return this;
    }
};
p.tld = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
        build = v;
        v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
            return "";
        }

        var pos = this._parts.hostname.lastIndexOf('.');
        var tld = this._parts.hostname.substring(pos + 1);

        if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
            return SLD.get(this._parts.hostname) || tld;
        }

        return tld;
    } else {
        var replace;
        
        if (!v) {
            throw new TypeError("cannot set TLD empty");
        } else if (v.match(/[^a-zA-Z0-9-]/)) {
            if (SLD && SLD.is(v)) {
                replace = new RegExp(escapeRegEx(this.tld()) + "$");
                this._parts.hostname = this._parts.hostname.replace(replace, v);
            } else {
                throw new TypeError("TLD '" + v + "' contains characters other than [A-Z0-9]");
            }
        } else if (!this._parts.hostname || this.is('IP')) {
            throw new ReferenceError("cannot set TLD on non-domain host");
        } else {
            replace = new RegExp(escapeRegEx(this.tld()) + "$");
            this._parts.hostname = this._parts.hostname.replace(replace, v);
        }

        this.build(!build);
        return this;
    }
};
p.directory = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
        if (!this._parts.path && !this._parts.hostname) {
            return '';
        }

        if (this._parts.path === '/') {
            return '/';
        }

        var end = this._parts.path.length - this.filename().length - 1;
        var res = this._parts.path.substring(0, end) || (this._parts.hostname ? "/" : "");

        return v ? URI.decodePath(res) : res;

    } else {
        var e = this._parts.path.length - this.filename().length;
        var directory = this._parts.path.substring(0, e);
        var replace = new RegExp('^' + escapeRegEx(directory));

        // fully qualifier directories begin with a slash
        if (!this.is('relative')) {
            if (!v) {
                v = '/';
            }

            if (v[0] !== '/') {
                v = "/" + v;
            }
        }

        // directories always end with a slash
        if (v && v[v.length - 1] !== '/') {
            v += '/';
        }

        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
        this.build(!build);
        return this;
    }
};
p.filename = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
        if (!this._parts.path || this._parts.path === '/') {
            return "";
        }

        var pos = this._parts.path.lastIndexOf('/');
        var res = this._parts.path.substring(pos+1);

        return v ? URI.decodePathSegment(res) : res;
    } else {
        var mutatedDirectory = false;
        
        if (v[0] === '/') {
            v = v.substring(1);
        }

        if (v.match(/\.?\//)) {
            mutatedDirectory = true;
        }

        var replace = new RegExp(escapeRegEx(this.filename()) + "$");
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);

        if (mutatedDirectory) {
            this.normalizePath(build);
        } else {
            this.build(!build);
        }

        return this;
    }
};
p.suffix = function(v, build) {
    if (this._parts.urn) {
        return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
        if (!this._parts.path || this._parts.path === '/') {
            return "";
        }

        var filename = this.filename();
        var pos = filename.lastIndexOf('.');
        var s, res;

        if (pos === -1) {
            return "";
        }

        // suffix may only contain alnum characters (yup, I made this up.)
        s = filename.substring(pos+1);
        res = (/^[a-z0-9%]+$/i).test(s) ? s : "";
        return v ? URI.decodePathSegment(res) : res;
    } else {
        if (v[0] === '.') {
            v = v.substring(1);
        }

        var suffix = this.suffix();
        var replace;

        if (!suffix) {
            if (!v) {
                return this;
            }

            this._parts.path += '.' + URI.recodePath(v);
        } else if (!v) {
            replace = new RegExp(escapeRegEx("." + suffix) + "$");
        } else {
            replace = new RegExp(escapeRegEx(suffix) + "$");
        }

        if (replace) {
            v = URI.recodePath(v);
            this._parts.path = this._parts.path.replace(replace, v);
        }

        this.build(!build);
        return this;
    }
};
p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (typeof segment !== 'number') {
        build = v;
        v = segment;
        segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
        throw new Error("Bad segment '" + segment + "', must be 0-based integer");
    }

    if (absolute) {
        segments.shift();
    }

    if (segment < 0) {
        // allow negative indexes to address from the end
        segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
        return segment === undefined
            ? segments
            : segments[segment];
    } else if (segment === null || segments[segment] === undefined) {
        if (isArray(v)) {
            segments = v;
        } else if (v || (typeof v === "string" && v.length)) {
            if (segments[segments.length -1] === "") {
                // empty trailing elements have to be overwritten
                // to prefent results such as /foo//bar
                segments[segments.length -1] = v;
            } else {
                segments.push(v);
            }
        }
    } else {
        if (v || (typeof v === "string" && v.length)) {
            segments[segment] = v;
        } else {
            segments.splice(segment, 1);
        }
    }

    if (absolute) {
        segments.unshift("");
    }

    return this.path(segments.join(separator), build);
};

// mutating query string
var q = p.query;
p.query = function(v, build) {
    if (v === true) {
        return URI.parseQuery(this._parts.query);
    } else if (v !== undefined && typeof v !== "string") {
        this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters);
        this.build(!build);
        return this;
    } else {
        return q.call(this, v, build);
    }
};
p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters);
    if (typeof name !== "string") {
        build = value;
    }

    this.build(!build);
    return this;
};
p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters);
    if (typeof name !== "string") {
        build = value;
    }

    this.build(!build);
    return this;
};
p.addSearch = p.addQuery;
p.removeSearch = p.removeQuery;

// sanitizing URLs
p.normalize = function() {
    if (this._parts.urn) {
        return this
            .normalizeProtocol(false)
            .normalizeQuery(false)
            .normalizeFragment(false)
            .build();
    }

    return this
        .normalizeProtocol(false)
        .normalizeHostname(false)
        .normalizePort(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
};
p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === "string") {
        this._parts.protocol = this._parts.protocol.toLowerCase();
        this.build(!build);
    }

    return this;
};
p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
        if (this.is('IDN') && punycode) {
            this._parts.hostname = punycode.toASCII(this._parts.hostname);
        } else if (this.is('IPv6') && IPv6) {
            this._parts.hostname = IPv6.best(this._parts.hostname);
        }

        this._parts.hostname = this._parts.hostname.toLowerCase();
        this.build(!build);
    }

    return this;
};
p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === "string" && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
        this._parts.port = null;
        this.build(!build);
    }

    return this;
};
p.normalizePath = function(build) {
    if (this._parts.urn) {
        return this;
    }

    if (!this._parts.path || this._parts.path === '/') {
        return this;
    }

    var _was_relative;
    var _was_relative_prefix;
    var _path = this._parts.path;
    var _parent, _pos;

    // handle relative paths
    if (_path[0] !== '/') {
        if (_path[0] === '.') {
            _was_relative_prefix = _path.substring(0, _path.indexOf('/'));
        }
        _was_relative = true;
        _path = '/' + _path;
    }
    // resolve simples
    _path = _path.replace(/(\/(\.\/)+)|\/{2,}/g, '/');
    // resolve parents
    while (true) {
        _parent = _path.indexOf('/../');
        if (_parent === -1) {
            // no more ../ to resolve
            break;
        } else if (_parent === 0) {
            // top level cannot be relative...
            _path = _path.substring(3);
            break;
        }

        _pos = _path.substring(0, _parent).lastIndexOf('/');
        if (_pos === -1) {
            _pos = _parent;
        }
        _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }
    // revert to relative
    if (_was_relative && this.is('relative')) {
        if (_was_relative_prefix){
            _path = _was_relative_prefix + _path;
        } else {
            _path = _path.substring(1);
        }
    }

    _path = URI.recodePath(_path);
    this._parts.path = _path;
    this.build(!build);
    return this;
};
p.normalizePathname = p.normalizePath;
p.normalizeQuery = function(build) {
    if (typeof this._parts.query === "string") {
        if (!this._parts.query.length) {
            this._parts.query = null;
        } else {
            this.query(URI.parseQuery(this._parts.query));
        }

        this.build(!build);
    }

    return this;
};
p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
        this._parts.fragment = null;
        this.build(!build);
    }

    return this;
};
p.normalizeSearch = p.normalizeQuery;
p.normalizeHash = p.normalizeFragment;

p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    this.normalize();
    URI.encode = e;
    URI.decode = d;
    return this;
};

p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    this.normalize();
    URI.encode = e;
    URI.decode = d;
    return this;
};

p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username("").password("").normalize();
    var t = '';
    if (uri._parts.protocol) {
        t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
        if (uri.is('punycode') && punycode) {
            t += punycode.toUnicode(uri._parts.hostname);
            if (uri._parts.port) {
                t += ":" + uri._parts.port;
            }
        } else {
            t += uri.host();
        }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path[0] !== '/') {
        t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
        var q = '';
        for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
            var kv = (qp[i] || "").split('=');
            q += '&' + URI.decodeQuery(kv[0])
                .replace(/&/g, '%26');

            if (kv[1] !== undefined) {
                q += "=" + URI.decodeQuery(kv[1])
                    .replace(/&/g, '%26');
            }
        }
        t += '?' + q.substring(1);
    }

    t += uri.hash();
    return t;
};

// resolving relative and absolute URLs
p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
        throw new Error('URNs do not have any generally defined hierachical components');
    }

    if (this._parts.hostname) {
        return resolved;
    }

    if (!(base instanceof URI)) {
        base = new URI(base);
    }

    for (i = 0, p; p = properties[i]; i++) {
        resolved._parts[p] = base._parts[p];
    }
    
    properties = ['query', 'path'];
    for (i = 0, p; p = properties[i]; i++) {
        if (!resolved._parts[p] && base._parts[p]) {
            resolved._parts[p] = base._parts[p];
        }
    }

    if (resolved.path()[0] !== '/') {
        basedir = base.directory();
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
    }

    resolved.build();
    return resolved;
};
p.relativeTo = function(base) {
    var relative = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var common, _base, _this, _base_diff, _this_diff;

    if (this._parts.urn) {
        throw new Error('URNs do not have any generally defined hierachical components');
    }

    if (!(base instanceof URI)) {
        base = new URI(base);
    }

    if (this.path()[0] !== '/' || base.path()[0] !== '/') {
        throw new Error('Cannot calculate common path from non-relative URLs');
    }

    // determine common sub path
    common = URI.commonPath(relative.path(), base.path());
    
    // no relation if there's nothing in common 
    if (!common || common === '/') {
        return relative;
    }
    
    // relative paths don't have authority
    for (var i = 0, p; p = properties[i]; i++) {
        relative._parts[p] = null;
    }
    
    _base = base.directory();
    _this = this.directory();
    
    // base and this are on the same level
    if (_base === _this) {
        relative._parts.path = './' + relative.filename();
        return relative.build();
    }
    
    _base_diff = _base.substring(common.length);
    _this_diff = _this.substring(common.length);
    
    // this is a descendant of base
    if (_base + '/' === common) {
        if (_this_diff) {
            _this_diff += '/';
        }
        
        relative._parts.path = './' + _this_diff + relative.filename();
        return relative.build();
    } 

    // this is a descendant of base
    var parents = '../';
    var _common = new RegExp('^' + escapeRegEx(common));
    var _parents = _base.replace(_common, '/').match(/\//g).length -1;

    while (_parents--) {
        parents += '../';
    }

    relative._parts.path = relative._parts.path.replace(_common, parents);
    return relative.build();
};

// comparing URIs
p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
        return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query("");
    two.query("");

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
        return false;
    }

    // query parameters have the same length, even if they're permutated
    if (one_query.length !== two_query.length) {
        return false;
    }

    one_map = URI.parseQuery(one_query);
    two_map = URI.parseQuery(two_query);

    for (key in one_map) {
        if (hasOwn.call(one_map, key)) {
            if (!isArray(one_map[key])) {
                if (one_map[key] !== two_map[key]) {
                    return false;
                }
            } else {
                if (!isArray(two_map[key])) {
                    return false;
                }

                // arrays can't be equal if they have different amount of content
                if (one_map[key].length !== two_map[key].length) {
                    return false;
                }

                one_map[key].sort();
                two_map[key].sort();

                for (var i = 0, l = one_map[key].length; i < l; i++) {
                    if (one_map[key][i] !== two_map[key][i]) {
                        return false;
                    }
                }
            }

            checked[key] = true;
        }
    }

    for (key in two_map) {
        if (hasOwn.call(two_map, key)) {
            if (!checked[key]) {
                // two contains a parameter not present in one
                return false;
            }
        }
    }

    return true;
};

// state
p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
};

return URI;
}));
;
/*	This work is licensed under Creative Commons GNU LGPL License.

	License: http://creativecommons.org/licenses/LGPL/2.1/
   Version: 0.9
	Author:  Stefan Goessner/2006
	Web:     http://goessner.net/ 
*/

function json2xml(o, tab) {
   var toXml = function(v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
         for (var i=0, n=v.length; i<n; i++)
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
      }
      else if (typeof(v) == "object") {
         var hasChild = false;
         xml += ind + "<" + name;
         for (var m in v) {
            if (m.charAt(0) == "@") {
			   if ( v[m] )
			   	xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            } else
               hasChild = true;
         }
         xml += hasChild ? ">" : "/>";
         if (hasChild) {
            for (var m in v) {
               if (m == "#text")
                  xml += v[m];
               else if (m == "#cdata")
                  xml += "<![CDATA[" + v[m] + "]]>";
               else if (m.charAt(0) != "@")
                  xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
         }
      }
      else {
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}

if (!String.prototype.encodeHTML) {
  String.prototype.encodeHTML = function () {
    return this.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;');
  };
}

/*	This work is licensed under Creative Commons GNU LGPL License.

	License: http://creativecommons.org/licenses/LGPL/2.1/
   Version: 0.9
	Author:  Stefan Goessner/2006
	Web:     http://goessner.net/ 
*/
function xml2json(xml, tab) {
   var X = {
      toObj: function(xml) {
         var o = {};
         if (xml.nodeType==1) {   // element node ..
            if (xml.attributes.length)   // element with attributes  ..
               for (var i=0; i<xml.attributes.length; i++)
                  o["@"+xml.attributes[i].nodeName.toLowerCase()] = (xml.attributes[i].nodeValue||"").toString();
            if (xml.firstChild) { // element has child nodes ..
               var textChild=0, cdataChild=0, hasElementChild=false;
               for (var n=xml.firstChild; n; n=n.nextSibling) {
                  if (n.nodeType==1) hasElementChild = true;
                  else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                  else if (n.nodeType==4) cdataChild++; // cdata section node
               }
               if (hasElementChild) {
                  if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                     X.removeWhite(xml);
                     for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType == 3)  // text node
                           o["#text"] = X.escape(n.nodeValue);
                        else if (n.nodeType == 4)  // cdata node
                           o["#cdata"] = X.escape(n.nodeValue);
                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                           if (o[n.nodeName] instanceof Array)
                              o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                           else
                              o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                        }
                        else  // first occurence of element..
                           o[n.nodeName] = X.toObj(n);
                     }
                  }
                  else { // mixed content
                     if (!xml.attributes.length)
                        o = X.escape(X.innerXml(xml));
                     else
                        o["#text"] = X.escape(X.innerXml(xml));
                  }
               }
               else if (textChild) { // pure text
                  if (!xml.attributes.length)
                     o = X.escape(X.innerXml(xml));
                  else
                     o["#text"] = X.escape(X.innerXml(xml));
               }
               else if (cdataChild) { // cdata
                  if (cdataChild > 1)
                     o = X.escape(X.innerXml(xml));
                  else
                     for (var n=xml.firstChild; n; n=n.nextSibling)
                        o["#cdata"] = X.escape(n.nodeValue);
               }
            }
            if (!xml.attributes.length && !xml.firstChild) o = null;
         }
         else if (xml.nodeType==9) { // document.node
            o = X.toObj(xml.documentElement);
         }
         else
            alert("unhandled node type: " + xml.nodeType);
         return o;
      },
      toJson: function(o, name, ind) {
         var json = name ? ("\""+name+"\"") : "";
         if (o instanceof Array) {
            for (var i=0,n=o.length; i<n; i++)
               o[i] = X.toJson(o[i], "", ind+"\t");
            json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
         }
         else if (o == null)
            json += (name&&":") + "null";
         else if (typeof(o) == "object") {
            var arr = [];
            for (var m in o)
               arr[arr.length] = X.toJson(o[m], m, ind+"\t");
            json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
         }
         else if (typeof(o) == "string")
            json += (name&&":") + "\"" + o.toString() + "\"";
         else
            json += (name&&":") + o.toString();
         return json;
      },
      innerXml: function(node) {
         var s = "";
         if ("innerHTML" in node)
            s = node.innerHTML;
         else {
            var asXml = function(n) {
               var s = "";
               if (n.nodeType == 1) {
                  s += "<" + n.nodeName;
                  for (var i=0; i<n.attributes.length;i++)
                     s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                  if (n.firstChild) {
                     s += ">";
                     for (var c=n.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                     s += "</"+n.nodeName+">";
                  }
                  else
                     s += "/>";
               }
               else if (n.nodeType == 3)
                  s += n.nodeValue;
               else if (n.nodeType == 4)
                  s += "<![CDATA[" + n.nodeValue + "]]>";
               return s;
            };
            for (var c=node.firstChild; c; c=c.nextSibling)
               s += asXml(c);
         }
         return s;
      },
      escape: function(txt) {
         return txt.replace(/[\\]/g, "\\\\")
                   .replace(/[\"]/g, '\\"')
                   .replace(/[\n]/g, '\\n')
                   .replace(/[\r]/g, '\\r');
      },
      removeWhite: function(e) {
         e.normalize();
         for (var n = e.firstChild; n; ) {
            if (n.nodeType == 3) {  // text node
               if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                  var nxt = n.nextSibling;
                  e.removeChild(n);
                  n = nxt;
               }
               else
                  n = n.nextSibling;
            }
            else if (n.nodeType == 1) {  // element node
               X.removeWhite(n);
               n = n.nextSibling;
            }
            else                      // any other node
               n = n.nextSibling;
         }
         return e;
      }
   };
   if (xml.nodeType == 9) // document node
      xml = xml.documentElement;


   // I don't need json.......
   return X.toObj(X.removeWhite(xml));


   var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
   return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}



if (!String.prototype.decodeHTML) {
  String.prototype.decodeHTML = function () {
    return this.replace(/&quot;/g, '"')
               .replace(/&gt;/g, '>')
               .replace(/&lt;/g, '<')
               .replace(/&amp;/g, '&');
  };
}
;
(function() {
	function md5cycle(x, k) {
		var a = x[0],
			b = x[1],
			c = x[2],
			d = x[3];

		a = ff(a, b, c, d, k[0], 7, -680876936);
		d = ff(d, a, b, c, k[1], 12, -389564586);
		c = ff(c, d, a, b, k[2], 17, 606105819);
		b = ff(b, c, d, a, k[3], 22, -1044525330);
		a = ff(a, b, c, d, k[4], 7, -176418897);
		d = ff(d, a, b, c, k[5], 12, 1200080426);
		c = ff(c, d, a, b, k[6], 17, -1473231341);
		b = ff(b, c, d, a, k[7], 22, -45705983);
		a = ff(a, b, c, d, k[8], 7, 1770035416);
		d = ff(d, a, b, c, k[9], 12, -1958414417);
		c = ff(c, d, a, b, k[10], 17, -42063);
		b = ff(b, c, d, a, k[11], 22, -1990404162);
		a = ff(a, b, c, d, k[12], 7, 1804603682);
		d = ff(d, a, b, c, k[13], 12, -40341101);
		c = ff(c, d, a, b, k[14], 17, -1502002290);
		b = ff(b, c, d, a, k[15], 22, 1236535329);

		a = gg(a, b, c, d, k[1], 5, -165796510);
		d = gg(d, a, b, c, k[6], 9, -1069501632);
		c = gg(c, d, a, b, k[11], 14, 643717713);
		b = gg(b, c, d, a, k[0], 20, -373897302);
		a = gg(a, b, c, d, k[5], 5, -701558691);
		d = gg(d, a, b, c, k[10], 9, 38016083);
		c = gg(c, d, a, b, k[15], 14, -660478335);
		b = gg(b, c, d, a, k[4], 20, -405537848);
		a = gg(a, b, c, d, k[9], 5, 568446438);
		d = gg(d, a, b, c, k[14], 9, -1019803690);
		c = gg(c, d, a, b, k[3], 14, -187363961);
		b = gg(b, c, d, a, k[8], 20, 1163531501);
		a = gg(a, b, c, d, k[13], 5, -1444681467);
		d = gg(d, a, b, c, k[2], 9, -51403784);
		c = gg(c, d, a, b, k[7], 14, 1735328473);
		b = gg(b, c, d, a, k[12], 20, -1926607734);

		a = hh(a, b, c, d, k[5], 4, -378558);
		d = hh(d, a, b, c, k[8], 11, -2022574463);
		c = hh(c, d, a, b, k[11], 16, 1839030562);
		b = hh(b, c, d, a, k[14], 23, -35309556);
		a = hh(a, b, c, d, k[1], 4, -1530992060);
		d = hh(d, a, b, c, k[4], 11, 1272893353);
		c = hh(c, d, a, b, k[7], 16, -155497632);
		b = hh(b, c, d, a, k[10], 23, -1094730640);
		a = hh(a, b, c, d, k[13], 4, 681279174);
		d = hh(d, a, b, c, k[0], 11, -358537222);
		c = hh(c, d, a, b, k[3], 16, -722521979);
		b = hh(b, c, d, a, k[6], 23, 76029189);
		a = hh(a, b, c, d, k[9], 4, -640364487);
		d = hh(d, a, b, c, k[12], 11, -421815835);
		c = hh(c, d, a, b, k[15], 16, 530742520);
		b = hh(b, c, d, a, k[2], 23, -995338651);

		a = ii(a, b, c, d, k[0], 6, -198630844);
		d = ii(d, a, b, c, k[7], 10, 1126891415);
		c = ii(c, d, a, b, k[14], 15, -1416354905);
		b = ii(b, c, d, a, k[5], 21, -57434055);
		a = ii(a, b, c, d, k[12], 6, 1700485571);
		d = ii(d, a, b, c, k[3], 10, -1894986606);
		c = ii(c, d, a, b, k[10], 15, -1051523);
		b = ii(b, c, d, a, k[1], 21, -2054922799);
		a = ii(a, b, c, d, k[8], 6, 1873313359);
		d = ii(d, a, b, c, k[15], 10, -30611744);
		c = ii(c, d, a, b, k[6], 15, -1560198380);
		b = ii(b, c, d, a, k[13], 21, 1309151649);
		a = ii(a, b, c, d, k[4], 6, -145523070);
		d = ii(d, a, b, c, k[11], 10, -1120210379);
		c = ii(c, d, a, b, k[2], 15, 718787259);
		b = ii(b, c, d, a, k[9], 21, -343485551);

		x[0] = add32(a, x[0]);
		x[1] = add32(b, x[1]);
		x[2] = add32(c, x[2]);
		x[3] = add32(d, x[3]);

	}

	function cmn(q, a, b, x, s, t) {
		a = add32(add32(a, q), add32(x, t));
		return add32((a << s) | (a >>> (32 - s)), b);
	}

	function ff(a, b, c, d, x, s, t) {
		return cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function gg(a, b, c, d, x, s, t) {
		return cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function hh(a, b, c, d, x, s, t) {
		return cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function ii(a, b, c, d, x, s, t) {
		return cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function md51(s) {
		txt = '';
		var n = s.length,
			state = [1732584193, -271733879, -1732584194, 271733878],
			i;
		for (i = 64; i <= s.length; i += 64) {
			md5cycle(state, md5blk(s.substring(i - 64, i)));
		}
		s = s.substring(i - 64);
		var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (i = 0; i < s.length; i++)
			tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
		tail[i >> 2] |= 0x80 << ((i % 4) << 3);
		if (i > 55) {
			md5cycle(state, tail);
			for (i = 0; i < 16; i++) tail[i] = 0;
		}
		tail[14] = n * 8;
		md5cycle(state, tail);
		return state;
	}

	/* there needs to be support for Unicode here,
	 * unless we pretend that we can redefine the MD-5
	 * algorithm for multi-byte characters (perhaps
	 * by adding every four 16-bit characters and
	 * shortening the sum to 32 bits). Otherwise
	 * I suggest performing MD-5 as if every character
	 * was two bytes--e.g., 0040 0025 = @%--but then
	 * how will an ordinary MD-5 sum be matched?
	 * There is no way to standardize text to something
	 * like UTF-8 before transformation; speed cost is
	 * utterly prohibitive. The JavaScript standard
	 * itself needs to look at this: it should start
	 * providing access to strings as preformed UTF-8
	 * 8-bit unsigned value arrays.
	 */
	function md5blk(s) { /* I figured global was faster.   */
		var md5blks = [],
			i; /* Andy King said do it this way. */
		for (i = 0; i < 64; i += 4) {
			md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
		}
		return md5blks;
	}

	var hex_chr = '0123456789abcdef'.split('');

	function rhex(n) {
		var s = '',
			j = 0;
		for (; j < 4; j++)
			s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
		return s;
	}

	function hex(x) {
		for (var i = 0; i < x.length; i++)
			x[i] = rhex(x[i]);
		return x.join('');
	}

	function md5(s) {
		return hex(md51(s));
	}

	function add32(a, b) {
		return (a + b) & 0xFFFFFFFF;
	}

	function cleanHex(input) {
		input = input.toUpperCase();
		return input.replace(/[^A-Fa-f0-9]/g, "");
	}

	var base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

	function binaryToBase64(input) {
		var ret = new Array();
		var i = 0;
		var j = 0;
		var char_array_3 = new Array(3);
		var char_array_4 = new Array(4);
		var in_len = input.length;
		var pos = 0;

		while (in_len--) {
			char_array_3[i++] = input[pos++];
			if (i == 3) {
				char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
				char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
				char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
				char_array_4[3] = char_array_3[2] & 0x3f;

				for (i = 0;
					(i < 4); i++)
					ret += base64_chars.charAt(char_array_4[i]);
				i = 0;
			}
		}

		if (i) {
			for (j = i; j < 3; j++)
				char_array_3[j] = 0;

			char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
			char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
			char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
			char_array_4[3] = char_array_3[2] & 0x3f;

			for (j = 0;
				(j < i + 1); j++)
				ret += base64_chars.charAt(char_array_4[j]);

			while ((i++ < 3))
				ret += '=';

		}

		return ret;
	}

	function convertHexToBase64(str) {
		var cleanedHex = cleanHex(str);
		var binary = [];
		for (var i = 0; i < cleanedHex.length / 2; i++) {
			var h = cleanedHex.substr(i * 2, 2);
			binary[i] = parseInt(h, 16);
		}
		return binaryToBase64(binary);
	}


	this.MD5 = {
		hex: function(s) {
			return md5(s);
		},

		base64: function(s) {
			return convertHexToBase64(md5(s));
		}
	}
})();
;
// https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

;
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

var Analytics = Class.extend({
	initialize: function(id) {
		this.id = id;

		if (!this.id) {
			return;
		}

		ga('create', this.id, 'auto');

		// Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
		ga('set', 'checkProtocolTask', function() {});
	},

	trackEvent: function(category, action, value) {
		if (!this.id) {
			return;
		}

		ga('send', 'event', category, action, value);
	},

	trackPageView: function() {
		if (!this.id) {
			return;
		}

		if (Ext.isOnline()) {
			ga('send', 'pageview');
		} else {
			ga('send', 'pageview', "http://feeder.co.extension" + document.location.pathname + document.location.search);
		}
	},

	trackInAppPageView: function() {
		if (!this.id) {
			return;
		}

		var args = [].slice.call(arguments);
		if (Ext.isOnline()) {
			ga('send', 'pageview', "inapp/" + args.join("/"));
		} else {
			ga('send', 'pageview', "http://feeder.co.extension/inapp/" + args.join("/"));
		}
	}
});

var analytics = new Analytics('UA-19457192-1');
var analyticsFAKE = new Analytics(false);

;
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.io = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

module.exports =  _dereq_('./lib/');

},{"./lib/":2}],2:[function(_dereq_,module,exports){

module.exports = _dereq_('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = _dereq_('engine.io-parser');

},{"./socket":3,"engine.io-parser":19}],3:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var transports = _dereq_('./transports');
var Emitter = _dereq_('component-emitter');
var debug = _dereq_('debug')('engine.io-client:socket');
var index = _dereq_('indexof');
var parser = _dereq_('engine.io-parser');
var parseuri = _dereq_('parseuri');
var parsejson = _dereq_('parsejson');
var parseqs = _dereq_('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Noop function.
 *
 * @api private
 */

function noop(){}

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts){
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' == typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure :
    (global.location && 'https:' == location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ?
       location.port :
       (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;

  // other options for Node.js client
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }
  }

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = _dereq_('./transport');
Socket.transports = _dereq_('./transports');
Socket.parser = _dereq_('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized,
    perMessageDeflate: this.perMessageDeflate,
    extraHeaders: this.extraHeaders
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function() {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function(transport){
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function(){
    self.onDrain();
  })
  .on('packet', function(packet){
    self.onPacket(packet);
  })
  .on('error', function(e){
    self.onError(e);
  })
  .on('close', function(){
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 })
    , failed = false
    , self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen(){
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' == msg.type && 'probe' == msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' == transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' == self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  //Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose(){
    onerror("transport closed");
  }

  //When the socket is closed while we're probing
  function onclose(){
    onerror("socket closed");
  }

  //When the socket is upgraded while we're probing
  function onupgrade(to){
    if (transport && to.name != transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  //Remove all listeners on the transport and on self
  function cleanup(){
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();

};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if  ('closed' == this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' == self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function(){
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function() {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' != this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if('function' == typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' == typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' == this.readyState || 'closed' == this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function() {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i<j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./transport":4,"./transports":5,"component-emitter":15,"debug":17,"engine.io-parser":19,"indexof":23,"parsejson":26,"parseqs":27,"parseuri":28}],4:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var parser = _dereq_('engine.io-parser');
var Emitter = _dereq_('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' == this.readyState || '' == this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' == this.readyState || 'open' == this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function(packets){
  if ('open' == this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function(data){
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"component-emitter":15,"engine.io-parser":19}],5:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies
 */

var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
var XHR = _dereq_('./polling-xhr');
var JSONP = _dereq_('./polling-jsonp');
var websocket = _dereq_('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts){
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname != location.hostname || port != opts.port;
    xs = opts.secure != isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling-jsonp":6,"./polling-xhr":7,"./websocket":9,"xmlhttprequest-ssl":10}],6:[function(_dereq_,module,exports){
(function (global){

/**
 * Module requirements.
 */

var Polling = _dereq_('./polling');
var inherit = _dereq_('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Callbacks count.
 */

var index = 0;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function(e){
    self.onError('jsonp poll error',e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  }
  else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch(e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function(){
      if (self.iframe.readyState == 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling":8,"component-inherit":16}],7:[function(_dereq_,module,exports){
(function (global){
/**
 * Module requirements.
 */

var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
var Polling = _dereq_('./polling');
var Emitter = _dereq_('component-emitter');
var inherit = _dereq_('component-inherit');
var debug = _dereq_('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty(){}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts){
  Polling.call(this, opts);

  if (global.location) {
    var isSSL = 'https:' == location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname != global.location.hostname ||
      port != opts.port;
    this.xs = opts.secure != isSSL;
  } else {
    this.extraHeaders = opts.extraHeaders;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function(opts){
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function(data, fn){
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function(err){
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function(){
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function(data){
    self.onData(data);
  });
  req.on('error', function(err){
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts){
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined != opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function(){
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' == this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.hasXDR()) {
      xhr.onload = function(){
        self.onLoad();
      };
      xhr.onerror = function(){
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function(){
        if (4 != xhr.readyState) return;
        if (200 == xhr.status || 1223 == xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function(){
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function() {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function(){
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function(data){
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function(err){
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function(fromError){
  if ('undefined' == typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch(e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function(){
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        try {
          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
        } catch (e) {
          var ui8Arr = new Uint8Array(this.xhr.response);
          var dataArray = [];
          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
            dataArray.push(ui8Arr[idx]);
          }

          data = String.fromCharCode.apply(null, dataArray);
        }
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function(){
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function(){
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

if (global.document) {
  Request.requestsCount = 0;
  Request.requests = {};
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./polling":8,"component-emitter":15,"component-inherit":16,"debug":17,"xmlhttprequest-ssl":10}],8:[function(_dereq_,module,exports){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parseqs = _dereq_('parseqs');
var parser = _dereq_('engine.io-parser');
var inherit = _dereq_('component-inherit');
var yeast = _dereq_('yeast');
var debug = _dereq_('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function() {
  var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function(){
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function(onPause){
  var pending = 0;
  var self = this;

  this.readyState = 'pausing';

  function pause(){
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function(){
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function(){
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function(){
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function(data){
  var self = this;
  debug('polling got data %s', data);
  var callback = function(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' == self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' == packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' != this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' == this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function(){
  var self = this;

  function close(){
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' == this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function(packets){
  var self = this;
  this.writable = false;
  var callbackfn = function() {
    self.writable = true;
    self.emit('drain');
  };

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function(data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' == schema && this.port != 443) ||
     ('http' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

},{"../transport":4,"component-inherit":16,"debug":17,"engine.io-parser":19,"parseqs":27,"xmlhttprequest-ssl":10,"yeast":30}],9:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var Transport = _dereq_('../transport');
var parser = _dereq_('engine.io-parser');
var parseqs = _dereq_('parseqs');
var inherit = _dereq_('component-inherit');
var yeast = _dereq_('yeast');
var debug = _dereq_('debug')('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  try {
    WebSocket = _dereq_('ws');
  } catch (e) { }
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts){
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function(){
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var self = this;
  var uri = this.uri();
  var protocols = void(0);
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }

  this.ws = BrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'buffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function(){
  var self = this;

  this.ws.onopen = function(){
    self.onOpen();
  };
  this.ws.onclose = function(){
    self.onClose();
  };
  this.ws.onmessage = function(ev){
    self.onData(ev.data);
  };
  this.ws.onerror = function(e){
    self.onError('websocket error', e);
  };
};

/**
 * Override `onData` to use a timer on iOS.
 * See: https://gist.github.com/mloughran/2052006
 *
 * @api private
 */

if ('undefined' != typeof navigator
  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
  WS.prototype.onData = function(data){
    var self = this;
    setTimeout(function(){
      Transport.prototype.onData.call(self, data);
    }, 0);
  };
}

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function(packets){
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function(packet) {
      parser.encodePacket(packet, self.supportsBinary, function(data) {
        if (!BrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' == typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        //Sometimes the websocket has already been closed but the browser didn't
        //have a chance of informing us about it yet, in that case send will
        //throw an error
        try {
          if (BrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e){
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done(){
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function(){
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function(){
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function(){
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function(){
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' == schema && this.port != 443)
    || ('ws' == schema && this.port != 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function(){
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"../transport":4,"component-inherit":16,"debug":17,"engine.io-parser":19,"parseqs":27,"ws":undefined,"yeast":30}],10:[function(_dereq_,module,exports){
// browser shim for xmlhttprequest module
var hasCORS = _dereq_('has-cors');

module.exports = function(opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch(e) { }
  }
}

},{"has-cors":22}],11:[function(_dereq_,module,exports){
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],12:[function(_dereq_,module,exports){
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],13:[function(_dereq_,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(chars){
  "use strict";

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

},{}],14:[function(_dereq_,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],15:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],16:[function(_dereq_,module,exports){

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],17:[function(_dereq_,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":18}],18:[function(_dereq_,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = _dereq_('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a  with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":25}],19:[function(_dereq_,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var keys = _dereq_('./keys');
var hasBinary = _dereq_('has-binary');
var sliceBuffer = _dereq_('arraybuffer.slice');
var base64encoder = _dereq_('base64-arraybuffer');
var after = _dereq_('after');
var utf8 = _dereq_('utf8');

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = navigator.userAgent.match(/Android/i);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = _dereq_('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if ('function' == typeof supportsBinary) {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if ('function' == typeof utf8encode) {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  // String data
  if (typeof data == 'string' || data === undefined) {
    if (data.charAt(0) == 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      try {
        data = utf8.decode(data);
      } catch (e) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!global.ArrayBuffer) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary == 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data != 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data == '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = ''
    , n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (':' != chr) {
      length += chr;
    } else {
      if ('' == length || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, true);

        if (err.type == packet.type && err.data == packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var ret = callback(packet, i + n, l);
        if (false === ret) return;
      }

      // advance cursor
      i += n;
      length = '';
    }
  }

  if (length != '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  var numberTooLong = false;
  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] == 255) break;

      if (msgLength.length > 310) {
        numberTooLong = true;
        break;
      }

      msgLength += tailArray[i];
    }

    if(numberTooLong) return callback(err, 0, 1);

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./keys":20,"after":11,"arraybuffer.slice":12,"base64-arraybuffer":13,"blob":14,"has-binary":21,"utf8":29}],20:[function(_dereq_,module,exports){

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],21:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"isarray":24}],22:[function(_dereq_,module,exports){

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{}],23:[function(_dereq_,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],24:[function(_dereq_,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],25:[function(_dereq_,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],26:[function(_dereq_,module,exports){
(function (global){
/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

module.exports = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (global.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@')
      .replace(rvalidtokens, ']')
      .replace(rvalidbraces, ''))) {
    return (new Function('return ' + data))();
  }
};
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],27:[function(_dereq_,module,exports){
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],28:[function(_dereq_,module,exports){
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

},{}],29:[function(_dereq_,module,exports){
(function (global){
/*! https://mths.be/utf8js v2.0.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			checkScalarValue(codePoint);
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, itâ€™s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			var byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				checkScalarValue(codePoint);
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.0.0',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return utf8;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],30:[function(_dereq_,module,exports){
'use strict';

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

},{}],31:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var url = _dereq_('./url');
var parser = _dereq_('socket.io-parser');
var Manager = _dereq_('./manager');
var debug = _dereq_('debug')('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if (typeof uri == 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }

  return io.socket(parsed.path);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = _dereq_('./manager');
exports.Socket = _dereq_('./socket');

},{"./manager":32,"./socket":34,"./url":35,"debug":39,"socket.io-parser":47}],32:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var eio = _dereq_('engine.io-client');
var Socket = _dereq_('./socket');
var Emitter = _dereq_('component-emitter');
var parser = _dereq_('socket.io-parser');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var debug = _dereq_('debug')('socket.io-client:manager');
var indexOf = _dereq_('indexof');
var Backoff = _dereq_('backo2');

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts){
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' == typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  this.encoder = new parser.Encoder();
  this.decoder = new parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function() {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function(){
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.engine.id;
    }
  }
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function(v){
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function(v){
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function(v){
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function(v){
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function(v){
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function(v){
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function() {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};


/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function(fn){
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function() {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function(data){
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function(){
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function(){
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function(){
  this.lastPing = new Date;
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function(){
  this.emitAll('pong', new Date - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function(data){
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function(packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function(err){
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function(nsp){
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function(){
      socket.id = self.engine.id;
    });

    if (this.autoConnect) {
      // manually call here since connecting evnet is fired before listening
      onConnecting();
    }
  }

  function onConnecting() {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function(socket){
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function(packet){
  debug('writing packet %j', packet);
  var self = this;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function(encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function() {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function(){
  debug('cleanup');

  var sub;
  while (sub = this.subs.shift()) sub.destroy();

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function(){
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' == this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function(reason){
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function(){
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function(){
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function(err){
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function(){
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function(){
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

},{"./on":33,"./socket":34,"backo2":36,"component-bind":37,"component-emitter":38,"debug":39,"engine.io-client":1,"indexof":42,"socket.io-parser":47}],33:[function(_dereq_,module,exports){

/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function(){
      obj.removeListener(ev, fn);
    }
  };
}

},{}],34:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var parser = _dereq_('socket.io-parser');
var Emitter = _dereq_('component-emitter');
var toArray = _dereq_('to-array');
var on = _dereq_('./on');
var bind = _dereq_('component-bind');
var debug = _dereq_('debug')('socket.io-client:socket');
var hasBin = _dereq_('has-binary');

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp){
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function() {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function(){
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' == this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function(){
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function(ev){
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var parserType = parser.EVENT; // default
  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
  var packet = { type: parserType, data: args };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' == typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  delete this.flags;

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function(packet){
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function(){
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' != this.nsp) {
    this.packet({ type: parser.CONNECT });
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function(reason){
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function(packet){
  if (packet.nsp != this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function(packet){
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function(id){
  var self = this;
  var sent = false;
  return function(){
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
    self.packet({
      type: type,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function(packet){
  var ack = this.acks[packet.id];
  if ('function' == typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function(){
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function(){
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function(){
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function(){
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function(){
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function(compress){
  this.flags = this.flags || {};
  this.flags.compress = compress;
  return this;
};

},{"./on":33,"component-bind":37,"component-emitter":38,"debug":39,"has-binary":41,"socket.io-parser":47,"to-array":51}],35:[function(_dereq_,module,exports){
(function (global){

/**
 * Module dependencies.
 */

var parseuri = _dereq_('parseuri');
var debug = _dereq_('debug')('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc){
  var obj = uri;

  // default to window.location
  var loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' == typeof uri) {
    if ('/' == uri.charAt(0)) {
      if ('/' == uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' != typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    }
    else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port == obj.port ? '' : (':' + obj.port));

  return obj;
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"debug":39,"parseuri":45}],36:[function(_dereq_,module,exports){

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};


},{}],37:[function(_dereq_,module,exports){
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

},{}],38:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],39:[function(_dereq_,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./debug":40,"dup":17}],40:[function(_dereq_,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18,"ms":44}],41:[function(_dereq_,module,exports){
(function (global){

/*
 * Module requirements.
 */

var isArray = _dereq_('isarray');

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
         (global.Blob && obj instanceof Blob) ||
         (global.File && obj instanceof File)
        ) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
          if (_hasBinary(obj[i])) {
              return true;
          }
      }
    } else if (obj && 'object' == typeof obj) {
      // see: https://github.com/Automattic/has-binary/pull/4
      if (obj.toJSON && 'function' == typeof obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"isarray":43}],42:[function(_dereq_,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],43:[function(_dereq_,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24}],44:[function(_dereq_,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],45:[function(_dereq_,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],46:[function(_dereq_,module,exports){
(function (global){
/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = _dereq_('isarray');
var isBuf = _dereq_('./is-buffer');

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet){
  var buffers = [];
  var packetData = packet.data;

  function _deconstructPacket(data) {
    if (!data) return data;

    if (isBuf(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i]);
      }
      return newData;
    } else if ('object' == typeof data && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key]);
      }
      return newData;
    }
    return data;
  }

  var pack = packet;
  pack.data = _deconstructPacket(packetData);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  var curPlaceHolder = 0;

  function _reconstructPacket(data) {
    if (data && data._placeholder) {
      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
      return buf;
    } else if (isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i]);
      }
      return data;
    } else if (data && 'object' == typeof data) {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key]);
      }
      return data;
    }
    return data;
  }

  packet.data = _reconstructPacket(packet.data);
  packet.attachments = undefined; // no longer useful
  return packet;
};

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((global.Blob && obj instanceof Blob) ||
        (global.File && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{"./is-buffer":48,"isarray":43}],47:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var debug = _dereq_('debug')('socket.io-parser');
var json = _dereq_('json3');
var isArray = _dereq_('isarray');
var Emitter = _dereq_('component-emitter');
var binary = _dereq_('./binary');
var isBuf = _dereq_('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'BINARY_EVENT',
  'ACK',
  'BINARY_ACK',
  'ERROR'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {
  var str = '';
  var nsp = false;

  // first is type
  str += obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    str += obj.attachments;
    str += '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' != obj.nsp) {
    nsp = true;
    str += obj.nsp;
  }

  // immediately followed by the id
  if (null != obj.id) {
    if (nsp) {
      str += ',';
      nsp = false;
    }
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    if (nsp) str += ',';
    str += json.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if ('string' == typeof obj) {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var p = {};
  var i = 0;

  // look up type
  p.type = Number(str.charAt(0));
  if (null == exports.types[p.type]) return error();

  // look up attachments if type binary
  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
    var buf = '';
    while (str.charAt(++i) != '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) != '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' == str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' == c) break;
      p.nsp += c;
      if (i == str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i == str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    try {
      p.data = json.parse(str.substr(i));
    } catch(e){
      return error();
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(data){
  return {
    type: exports.ERROR,
    data: 'parser error'
  };
}

},{"./binary":46,"./is-buffer":48,"component-emitter":49,"debug":39,"isarray":43,"json3":50}],48:[function(_dereq_,module,exports){
(function (global){

module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer);
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],49:[function(_dereq_,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15}],50:[function(_dereq_,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {})
},{}],51:[function(_dereq_,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}]},{},[31])(31)
});

;
var Platform = new (Class.extend({
	initialize: function() {
		if ( Ext.isChrome() )
			this.name = 'chrome';
		else if ( Ext.isSafari() )
			this.name = 'safari';
		else if ( Ext.isOnline() )
			this.name = 'online';
		this.loadCallbacks = [];
	},
	
	load: function(callback) {
		callback();
	}
}));

var PlatformEnv = Class.extend({
	initialize: function() {
		this.connectEvents = [];
		this.messageEvents = [];
	},
	
	onBackgroundConnect: function() { throw "implement PlatformEnv.onBackgroundConnect"; },
	
	connectToBackground: function() {
		return new (PlatformPort[Platform.name])();
	},
	
	makeCallback: function(type, originalCallback, callback) {
		callback['_' + type + 'originalCallback'] = originalCallback;
		this[type + 'Events'].push(callback);
		return callback;
	},
	
	getCallback: function(type, originalCallback) {
		var callbacks = this[type + 'Events'];
		for ( var i = 0, callback; callback = callbacks[i]; i++ )
			if ( callback['_' + type + 'originalCallback'] === originalCallback )
				return callback;
		return false;
	},
	
	fireCallback: function(type, args) {
		var callbacks = this[type + 'Events'];
		for ( var i = 0, callback; callback = callbacks[i]; i++ )
			callback.apply(this, args);
	},
	
	removeCallback: function(type, callback) {
		this[type + 'Events'].remove(callback);
	}
});

// Platform agnostic version of the chrome Port, created by chrome.extension.connect
var PlatformPort = Class.extend({
	postMessage: function(message) { throw "implement PlatformPort.postMessage"; },
	onMessage: function(callback) { throw "implement PlatformPort.onMessage"; },
	onDisconnect: function(callback) { throw "implement PlatformPort.onDisconnect"; },
	disconnect: function() { throw "implement PlatformPort.disconnect"; }
});

var UI = {};
;
PlatformEnv.chrome = PlatformEnv.extend({
	DBAdapter: 'WebSQLDatabase',

	initialize: function() {
		this._super();
	},

	onBackgroundConnect: function(callback) {
		var boundCallback = this.makeCallback('connect', callback, function(port) {
			callback(new PlatformPort.chrome(port));
		});

		chrome.extension.onConnect.addListener(boundCallback);
	},

	removeOnBackgroundConnect: function(originalCallback) {
		var wrappedCallback = this.getCallback('connect', originalCallback);
		this.removeCallback('connect', wrappedCallback);
		chrome.extension.onConnect.removeListener(wrappedCallback);
	},

	onMessage: function(callback) {
		var boundCallback = this.makeCallback('message', callback, function(msg, sender) {
			callback(msg, sender);
		});

		chrome.extension.onRequest.addListener(boundCallback);
	},

	removeOnMessage: function(callback) {
		var wrappedCallback = this.getCallback('message', callback);
		this.removeCallback('message', wrappedCallback);
		chrome.extension.onRequest.removeListener(wrappedCallback);
	},

  sendMessageToTab: function(tabId, name, message) {
    message.type = name;
    chrome.tabs.sendMessage(tabId, message);
  },

	onPopoverVisible: function(callback) {},
	removePopoverVisible: function(callback) {}
});

PlatformPort.chrome = Class.extend({
	initialize: function(port) {
		this.port = port || chrome.extension.connect();
	},

	onMessage: function(callback) {
		this.port.onMessage.addListener(function(message) {
			callback(message);
		});
	},

	onDisconnect: function(callback) {
		var port = this;
		this.port.onDisconnect.addListener(function() {
			callback(port);
		});
	},

	postMessage: function(message) {
		this.port.postMessage(message);
	},

	disconnect: function() {
		this.port.disconnect();
	}
});

;
// Application host UI methods
// Chrome

UI.chrome = {
	initialize: function() {},

	openTab: function(url, callback) {
		callback = callback || function() {};

		chrome.tabs.create({
			url: url
		}, function(tab) {
			callback(tab.id);
		});
	},

	closeTab: function(tabId, callback) {
		callback = callback || function() {};
		chrome.tabs.remove(tabId, function() {
			callback();
		});
	},

	onTabRemoved: function(callback) {
		chrome.tabs.onRemoved.addListener(callback);
	},

	removeOnTabRemoved: function(callback) {
		chrome.tabs.onRemoved.removeListener(callback);
	},

	setBadge: function(text) {
		chrome.browserAction.setBadgeText({text: text.toString()});
	},

	setBadgeIcon: function(img, tab) {
		var params = {
			path: img
		};

		if ( tab )
			params.tabId = tab;

		chrome.browserAction.setIcon(params);
	},

	currentTab: function(callback) {
		try {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				callback(tabs[0]);
			});
		} catch (e) {
			chrome.tabs.getSelected(null, function(tab) {
				callback(tab);
			});
		}
	},

	tabChangeURL: function(tabId, url) {
		chrome.tabs.update(tabId, {url: url});
	},

	getTab: function(tabId, callback) {
		chrome.tabs.get(tabId, function(tab) {
			callback({
				url: tab.url,
				title: tab.title
			});
		});
	},

	selectTab: function(tabId, callback) {
		chrome.tabs.update(tabId, {active: true}, function() {
			fireCallback(callback);
		});
	},

	openPopup: function(url, callback) {
		var win = window.open(url, null, 'width=500,height=400');
		fireCallback(callback, win);
	},

	getIntentFeedURL: function() {
		var intent = window.webkitIntent;
		var url;
		if (intent && intent.getExtra) {
		  // handle the old path
		  url = intent.getExtra("url");
		} else if ( intent ) {
		  // the new path
		  url = intent.data[0].url;
		}
		if ( !url )
			return "ERROR";
		return url;
	},

	setPopupSize: function(w, h) {
		// NoOp
	},

	closePopup: function() {
		// NoOp
	},

	showPopup: function() {
		// NoOp :'(
	}
};

UI.chrome.Notifications = new (Class.extend({
	initialize: function() {},

	image: '/icons/icon48x48.png',
	duration: 10000,

	can: function() {
		if (window.webkitNotifications) {
			return window.webkitNotifications.checkPermission() == 0;
		}
		return window.Notification.permission == "granted";
	},

	// Has to be triggered from user action
	ask: function(callback) {
		(window.webkitNotifications || window.Notification).requestPermission(callback || function() {});
	},

	show: function(title, message, options) {
		options = options || {};
		options.link = options.link || function() {};

		var note;
		if (window.webkitNotifications) {
			note = window.webkitNotifications.createNotification(this.image, title, message);
		} else {
			note = new Notification(title, {
				body: message,
				icon: this.image
			});
		}

		function closeNote() {
			if (typeof note.cancel === "function")
				note.cancel();
			else if (typeof note.close === "function")
				note.close();
		}

		note.onclick = function() {
			window.focus();
			options.link();
			closeNote();
		};

		if (typeof note.show === "function")
			note.show();

		setTimeout(function() {
			closeNote();
		}, this.duration);

		return note;
	}
}))();
;
PlatformEnv.safari = PlatformEnv.extend({
	DBAdapter: 'WebSQLDatabase',

	initialize: function() {
		this._super();
		this.popoverEvents = [];

		// If a content scripts sends a message with the name "connect"
		// We add that to a special array where we'll then send events to
		// using "dispatchMessage" when app.events.send() is called

		// So it creates a PlaformPort.safari port, which calls the onBackgroundConnect event listener
		// and then it knows how to send native events to that tab using that message
		safari.application.addEventListener('message', function(e) {
			if (e.name !== "connect")
				return;
			var msg = e.message;
			new (PlatformPort[Platform.name])(e.target, msg.type);
		}.bind(this));
	},

	onBackgroundConnect: function(callback) {
		this.makeCallback('connect', callback, function(port) {
			callback(port);
		});
	},

	removeOnBackgroundConnect: function(originalCallback) {
		var wrappedCallback = this.getCallback('connect', originalCallback);
		this.removeCallback('connect', wrappedCallback);
	},

	onMessage: function(callback) {
		var boundCallback = this.makeCallback('message', callback, function(e) {
			var msg = e.message;
			msg.type = e.name;
			callback(msg, {tab: new Platform.env.OpaqueTab(e.target)});
		});

		safari.application.addEventListener("message", boundCallback, false);
	},

	removeOnMessage: function(callback) {
		var wrappedCallback = this.getCallback('message', callback);
		this.removeCallback('message', wrappedCallback);
		safari.application.removeEventListener("message", wrappedCallback, false);
	},

	onPopoverVisible: function(callback) {
		var boundCallback = this.makeCallback('popover', callback, function() {
			callback();
		});

		safari.application.addEventListener("popover", boundCallback, true);
	},

	removePopoverVisible: function(callback) {
		var wrappedCallback = this.getCallback('popver', callback);
		this.removeCallback('popover', wrappedCallback);
		safari.application.removeEventListener("popover", wrappedCallback, false);
	},

  sendMessageToTab: function(tabId, type, message) {
    message.type = name;
    safari.self.tabs[tabId].page.dispatchMessage("message", message);
  },

	OpaqueTab: Class.extend({
		initialize: function(tab) {
			UI.__ensureId(tab);
			this.id = tab.__feederId;
			this.__tab = tab;
		}
	}),

	safariSubmitFormFromPopup: function(form) {
		var formData = this._formToObject(form);
		var data = {data: formData, action: form.action};

		var pingBackCallback = function(e) {
			if ( e.name != "safari:popupFormSubmit:ping" )
				return;
			safari.application.removeEventListener("message", pingBackCallback);
			e.target.page.dispatchMessage("safari:popupFormSubmit:contents", data);
		};
		safari.application.addEventListener("message", pingBackCallback);
		UI.openTab(Ext.path("options/form.html"));
	},

	_formToObject: function(form) {
		var inps = form.querySelectorAll("input, select");
		var data = {};
		[].slice.call(inps).forEach(function(el) {
			data[el.name] = el.value;
		})
		return data;
	}
});



PlatformPort.safari = Class.extend({
	initialize: function(tab, type) {
		if (tab) {
			this.tab = tab;
			this.type = type;

			this.tab.addEventListener("close", this.disconnect, false);
			this.tab.addEventListener("navigate", this.addNavigateAwayEventListener, false);
		} else {
			this.messageListeners = [];
		}

		this.disconnectListeners = [];

		Platform.env.fireCallback('connect', [this]);
	},

	onMessage: function(callback) {
		if (this.tab)
			1;//throw "not supported for PlatformPort.env.safari: onMessage";
		else
			this.messageListeners.push(callback);
	},

	onDisconnect: function(callback) {
		this.disconnectListeners.push(callback);
	},

	postMessage: function(message) {
		if (this.tab) {
			if (message.name == this.type)
				this.tab.page.dispatchMessage(this.type, message);
		} else {
			for ( var i = 0, callback; callback = this.messageListeners[i]; i++ )
				callback(message, this);
		}
	},

	disconnect: function() {
		for ( var i = 0, callback; callback = this.disconnectListeners[i]; i++ )
			callback(this);

		if (this.tab) {
			this.tab.removeEventListener("close", this.disconnect, false);
			this.tab.removeEventListener("navigate", this.disconnect, false);
			this.tab.removeEventListener("navigate", this.addNavigateAwayEventListener, false);
		}
	},

	// An initial "navigate" event will be sent to this Port which is when the content script it originated from
	// has finished loading. So what we do is attach this method for the first navigate event, which adds the disconnect
	// event and removes this initial event
	addNavigateAwayEventListener: function(e) {
		this.tab.addEventListener("navigate", this.disconnect, false);
		this.tab.removeEventListener("navigate", this.addNavigateAwayEventListener, false);
	}
});

;
// Application host UI methods
// Safari

UI.safari = {
	tabGUID: 1,

	initialize: function() {
		safari.application.addEventListener("activate", this.onTabChangedState, true);
		safari.application.addEventListener("open", this.onTabChangedState, true);
		safari.application.addEventListener("navigate", this.onTabChangedState, true);
		this.__tabImages = {};
		this.__tabImageUrls = {};
	},

	onTabChangedState: function(e) {
		var tab = e.target;
		if ( tab.activeTab )
			tab = tab.activeTab;
		UI.__ensureId(tab);
		if ( UI.__tabImages[tab.__feederId] && UI.__tabImageUrls[tab.__feederId] == tab.url )
			UI.setBadgeIcon(UI.__tabImages[tab.__feederId], tab.__feederId);
		else
			UI.setBadgeIcon(Config.icon.standard, tab.__feederId)
	},

	openTab: function(url, callback) {
		callback = callback || function() {};

		var tab = safari.application.activeBrowserWindow.openTab();
		tab.url = url;
		UI.__ensureId(tab);

		callback(tab);
	},

	closeTab: function(tab, callback) {
		callback = callback || function() {};
		this.__getNativeTab(tab).close();
		callback();
	},

	onTabRemoved: function(callback) {
		callback._uiWrapped = function(e) {
			if (e.command != "close-tab")
				return;
			callback();
		};
		safari.application.addEventListener("command", callback._uiWrapped, false);
	},

	removeOnTabRemoved: function(callback) {
		safari.application.removeEventListener("command", callback._uiWrapped, false);
	},

	setBadge: function(text) {
		safari.extension.toolbarItems.forEach(function(bar) {
			bar.badge = parseInt(text, 10);
		});
	},

	setBadgeIcon: function(img, tabId) {
		var tab = false;
		if ( typeof tabId !== "undefined" ) {
			tab = this.getTab(tabId);
			if ( ! tab )
				return;
			UI.__tabImages[tab.id] = img;
			UI.__tabImageUrls[tab.id] = this.__getNativeTab(tabId).url;
		}

		UI.currentTab(function(currentTab) {
			if ( ! tab || currentTab.id == tabId ) {
				safari.extension.toolbarItems.forEach(function(bar) {
					bar.image = img;
				});
			}
		});
	},

	currentTab: function(callback) {
		callback(new Platform.env.OpaqueTab(safari.application.activeBrowserWindow.activeTab));
	},

	tabChangeURL: function(tabId, url) {
		this.__getNativeTab(tabId).url = url;
	},

	// The return is only for Safari, making my life easier
	getTab: function(tabId, callback) {
		var t = false;
		for ( var i = 0, win; win = safari.application.browserWindows[i]; i++) {
			if ( ! win.tabs )
				continue;

			for ( var x = 0, tab; tab = win.tabs[x]; x++ )
				if ( tab.__feederId === tabId ) {
					var t = new Platform.env.OpaqueTab(tab);
					fireCallback(callback, new Platform.env.OpaqueTab(tab));
					return t;
				}
		}
		fireCallback(callback, false);
		return false;
	},

	__getNativeTab: function(tabId) {
		return this.getTab(tabId).__tab;
	},

	selectTab: function(tabId, callback) {
		this.__getNativeTab(tabId).active();
		fireCallback(callback);
	},

	openPopup: function(url, callback) {
		var win = window.open(url, null, 'width=500,height=400');
		fireCallback(callback, win);
	},

	getIntentFeedURL: function() {
		return false;
	},

	setPopupSize: function(w, h) {
		safari.extension.popovers[0].width = w;
		safari.extension.popovers[0].height = h;
	},

	closePopup: function() {
		safari.extension.popovers[0].hide();
	},

	showPopup: function() {
		safari.extension.toolbarItems.forEach(function(bar) {
			bar.showPopover();
		})
	},

	__ensureId: function(tab) {
		if ( typeof tab.__feederId !== "undefined" )
			return tab;
		tab.__feederId = UI.tabGUID++;
		return tab;
	}
};

UI.safari.Notifications = new (Class.extend({
	initialize: function() {},

	image: '/icons/icon48x48.png',
	duration: 15000,

	can: function() {
		return window.webkitNotifications.checkPermission() == 0;
	},

	// Has to be trigger from user action
	ask: function(callback) {
		window.webkitNotifications.requestPermission(callback || function() {});
	},

	show: function(title, message, options) {
		options.link = options.link || function() {};

		var note = window.webkitNotifications.createNotification(this.image, title, message);
		note.onclick = function() {
			window.focus();
			options.link();
			note.cancel();
		};

		note.show();

		setTimeout(function() {
			note.cancel();
		}, this.duration);

		return note;
	}
}))();
;
PlatformEnv.online = PlatformEnv.extend({
	DBAdapter: 'APIDatabase',

	initialize: function() {
		this._super();
	},

	onBackgroundConnect: function(callback) {
		this.makeCallback('connect', callback, function(port) {
			callback(port);
		});
	},

	removeOnBackgroundConnect: function(originalCallback) {
		var wrappedCallback = this.getCallback('connect', originalCallback);
		this.removeCallback('connect', wrappedCallback);
	},

	onMessage: function(callback) {
		this.makeCallback('message', callback, function(message, sender) {
			callback(message, sender);
		});
	},

	removeOnMessage: function(originalCallback) {
		var wrappedCallback = this.getCallback('message', originalCallback);
		this.removeCallback('message', wrappedCallback);
	},

  sendMessageToTab: function(tabId, message) {
    // noop????????
  },

	onPopoverVisible: function(callback) {},
	removePopoverVisible: function(callback) {}
});

PlatformPort.online = Class.extend({
	initialize: function() {
		this.messageListeners = [];
		this.disconnectListeners = [];
		Platform.env.fireCallback('connect', [this]);
	},

	onMessage: function(callback) {
		this.messageListeners.push(callback);
	},

	onDisconnect: function(callback) {
		this.disconnectListeners.push(callback);
	},

	postMessage: function(message) {
		for ( var i = 0, callback; callback = this.messageListeners[i]; i++ )
			callback(message, this);
	},

	disconnect: function() {
		for ( var i = 0, callback; callback = this.disconnectListeners[i]; i++ )
			callback();
	}
});

;
// Application host UI methods
// Online

UI.online = {
	initialize: function() {

	},

	openTab: function(url, callback) {
		window.open(url);
		fireCallback(callback);
	},

	closeTab: function(tab, callback) {
		callback = callback || function() {};
		callback();
	},

	onTabRemoved: function(callback) {
		// NoOp...
	},

	removeOnTabRemoved: function(callback) {
		// NoOp...
	},

	setBadge: function(text) {
		// NoOp...
	},

	setBadgeIcon: function(img, tab) {
		// NoOp...
	},

	currentTab: function(callback) {
		callback({id: 1});
	},

	tabChangeURL: function(tabId, url) {
		// NoOp...?
	},

	getTab: function(tabId, callback) {
		callback({id: tabId});
	},

	selectTab: function(tabId, callback) {
		fireCallback(callback);
	},

	openPopup: function(url, callback) {
		var win = window.open(url, null, 'width=500,height=400');
		fireCallback(callback, win);
	},

  closePopup: function() {

  },

	getIntentFeedURL: function() {
		return false;
	}
};

UI.online.Notifications = new (Class.extend({
	initialize: function() {},

	image: 'http://feeder.co/reader/icons/icon48x48.png',
	duration: 15000,

	can: function() {
		return window.Notification.permission == "granted";
	},

	// Has to be trigger from user action
	ask: function(callback) {
		window.Notification.requestPermission(callback || function() {});
	},

	show: function(title, message, options) {
		options.link = options.link || function() {};

		var note = new Notification(title, {
			body: message,
			icon: this.image
		});

		note.onclick = function() {
			window.focus();
			options.link();
			note.close();
		};

		setTimeout(function() {
			note.close();
		}, this.duration);

		return note;
	}
}))();

;
var Database = Class.extend({
	initialize: function(name) {
		this.connect(name);
	},

	find: function(table, primaryKey, where, how, callback) {
		var queryObject = this.buildFind(table, primaryKey, where, how);
		this.executeQuery(queryObject, callback);
		return this;
	},

	insert: function(table, primaryKey, object, callback) {
		var queryObject = this.buildInsert(table, primaryKey, object);
		this.executeQuery(queryObject, callback);
		return this;
	},

	update: function(table, primaryKey, what, where, callback) {
		var queryObject = this.buildUpdate(table, primaryKey, what, where);
		this.executeQuery(queryObject, callback);
		return this;
	},

	del: function(table, primaryKey, where, callback) {
		var queryObject = this.buildDelete(table, primaryKey, where);
		this.executeQuery(queryObject, callback);
		return this;
	},

	count: function(table, primaryKey, where, how, callback) {
		var queryObject = this.buildCount(table, primaryKey, where, how);
		this.executeQuery(queryObject, callback);
		return this;
	},


	onError: function(queryObject, message, callback) {
		// Just log error for now
		console.error("SQLERROR " + message);
		console.error(queryObject.sql, "failed with error", message);

		// Fire callback anyway?
		callback(false, {error: true, message: message});
	},

	connect: function(name) { throw "implement"; },
	executeQuery: function(queryObject) { throw "implement"; },

	/*
		Method:
			makeTable

		Create table from schema.

		Format of schema:
			A key-value object where the keys are the name of the columns,
			and values are objects which describe the column. Possible values are:

			* type (mandatory): type to be stored. Can be either: int, text or float
			* mandatory (optional): true if field is mandatory. Default is true.
			* standard (optional): Default value.

		Parameters:
			name - The name of the table
			primaryKey - The primary key to use, defaults to ID
			schema - See above for description of schema
			callback - Callback when complete
	*/

	makeTable: function(name, primaryKey, schema, callback) { throw "implement"; },

	/*
		Method:
			dropTable

		Drop table from database. Should not fail if table doesn't exist

		Parameters:
			name - Name of table
			callback - Callback when complete
	*/

	dropTable: function(name, callback) { throw "implement"; },

	/*
		Method:
			tableExists

		Check if table exists

		Parameters:
			name - Name of table
			callback - Callback when called, first parameter is a boolean which is true/false depnding on if the table exists
	*/

	tableExists: function(name, callback) { throw "implement"; },

	/*
		Method:
			addIndex

		Add index to column
	*/

	addIndex: function(table, column, callback) { throw "implement"; },

	/*
		Method:
			addField

		Add a field using a schema object, by alterint table

		Parameters:
			table
			fieldName
			fieldData
			callback
	*/

	addField: function(table, fieldName, fieldData, callback) { throw "implement"; },

	/*
		Method:
			buildFind

		Build a query for finding objects. The parameters are:

		where:

			"where" can either be the string "all" or an object. An empty object has
			the same effect as "all", i.e. don't filter anything.

			If an object, the keys are fields and the values are values to match by.

			The format of the keys can be either just the field name, e.g. "id", "title",
			or it can also contain the operand to use, e.g. "id >", "id !=".

			Example where:
				{id: 10} => id = 10
				{'id >': 10} => id > 10
				{title: "hello world", "published >": 1331985271237} => title = "hello world" and published > 1331985271237

			If the value is an array it will be used to OR together several expressions for the same field.

			Example:
				{id: [1, 1, 2, 3, 5, 8]} => (id = 1 or id = 1 or id = 2 or id = 3 or id = 5 or id = 8)
				{'id =': [1, 2]} => (id = 10 or id = 2)

			Available operands are:
				=, >, <, %, !=

		how:
			An optional object specifying:

				* limit: Either one number with the count, or an array with two elements specifing the offset and count
				* by: Order by. The format is a string with: "<field> <asc|desc>", where
				                 the second argument is optional defaulting to asc.

			Example how:
				{limit: 10} => The first 10 from the result
				{limit 10, by: 'id'} => The first 10 order by the field name id, ascending
				{limit: 1, by: 'id desc'} => One, ordering the result set by id descending

		Parameters:
			Standard -build* parameters.
	*/

	buildFind:   function(table, primaryKey, where, how) { throw "implement"; },

	/*
		Method:
			buildUpdate
	*/

	buildUpdate: function(table, primaryKey, what, where) { throw "implement"; },

	/*
		Method:
			buildInsert
	*/

	buildInsert: function(table, primaryKey, object) { throw "implement"; },

	/*
		Method:
			buildDelete
	*/

	buildDelete: function(table, primaryKey, where) { throw "implement"; },

	/*
		Method:
			buildCount
	*/

	buildCount: function(table, primaryKey, where, how) { throw "implement"; }
});

Database.instances = {};

Database.getInstance = function(name, adapter) {
	if ( ! Database.instances[name] )
		Database.instances[name] = new window[adapter || Platform.env.DBAdapter](name);

	return Database.instances[name];
};

Database.switchDatabase = function(name) {
	Database.current = Database.getInstance(name);
}

function dbLog() {
	//console.log.apply(console, arguments);
}
;
if ( ! ("bind" in Function.prototype) ) {
	Function.prototype.bind = function(bound) {
		var func = this;
		return function() {
			return func.apply(bound, arguments);
		};
	};
}

var WebSQLDatabase = Database.extend({
	connect: function(name) {
		this.db = openDatabase(name, '0.1', name.toLowerCase(), 5 * 1024 * 1024);
	},

	executeQuery: function(queryObject, callback) {
		dbLog("=== Running query\n" + queryObject.sql + ' ' + queryObject.args.join(", "));
		this.db.transaction(function(tx) {
			tx.executeSql(
				queryObject.sql,
				queryObject.args,
				function(tx, res) {
					dbLog("=== Query success");
					this.isError = false;
					this.querySuccess(queryObject, callback, tx, res);
				}.bind(this),
				function(tx, e) {
					dbLog("=== Query error", queryObject);
					this.isError = true;
					this.onError(queryObject, e.message, callback);
				}.bind(this)
			);
		}.bind(this));
	},

	querySuccess: function(query, callback, tx, res) {
		// Turn result into a nice array of objects
		var rows = [];
		for ( var i = 0; i < res.rows.length; i++ ) {
			var copy = {};
			var row = res.rows.item(i);
			for ( var key in row ) if ( row.hasOwnProperty(key) )
				copy[key] = row[key];
			rows.push(copy); // This creates a clone of the row object, since it was previously immutable
		}

		// Get some information about the query

		// Fetching insertId when not present throws an exception.
		var insertId = false;
		try { insertId = res.insertId; } catch (e) {}

		var meta = {
			insertId: insertId,
			error: false
		};

		callback(rows, meta);
	},

	makeTable: function(name, primaryKey, schema, callback) {
		primaryKey = primaryKey || 'id';

		var query = 'CREATE TABLE IF NOT EXISTS `' + name + '`';
		var args = [];

		// Build fields
		var fields = [];

		// Add id column
		fields.push("`" + primaryKey + "` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT");

		// Run through schema
		for ( var field in schema ) if ( schema.hasOwnProperty(field) )
			fields.push(this.makeColumnDefinition(field, schema[field]));

		query += ' (' + fields.join(',\n') + ')';

		this.executeQuery({
			sql: query,
			args: args
		}, callback);
	},

	makeColumnDefinition: function(field, params) {
		var typeTranslationTable = {
			"int": "integer",
			"float": "real",
			"text": "text"
		};

		var paramQuery = '`' + field + '` ';

		// Specified type
		paramQuery += ' ' + typeTranslationTable[params.type];

		// Default value
		if ( typeof params.standard !== 'undefined' ) {
			paramQuery += ' DEFAULT ' + this._escapeDefaultValue(params.standard);
		}

		// Is mandatory
		paramQuery += ' ' + (typeof params.mandatory === 'undefined' || params.mandatory ? 'NOT NULL' : '');

		return paramQuery;
	},

	addIndex: function(table, column, callback) {
		this.executeQuery({
			sql: 'CREATE INDEX IF NOT EXISTS `' + column + '` ON `' + table + '` (`' + column + '`)',
			args: []
		}, callback);
	},

	addField: function(table, fieldName, fieldData, callback) {
		var query = "ALTER TABLE `" + table + "` ADD COLUMN ";
		query += this.makeColumnDefinition(fieldName, fieldData);

		this.executeQuery({
			sql: query,
			args: []
		}, callback);
	},

	dropTable: function(name, callback) {
		this.executeQuery({
			sql: 'DROP TABLE IF EXISTS `' + name + '`',
			args: []
		}, callback);
	},

	tableExists: function(name, callback) {
		this.executeQuery({
			sql: 'SELECT * FROM `' + name + '` LIMIT 1',
			args: []
		}, function() {
			dbLog("===== %s %s", name, this.isError ? "didn't exist" : "did exist");
			callback(!this.isError);
		}.bind(this));
	},

	buildFind: function(table, primaryKey, where, how) {
		return this.buildSelect(table, primaryKey, where, how, '*');
	},

	buildSelect: function(table, primaryKey, where, how, select) {
		var query = 'SELECT ' + select + ' FROM `' + table + '`\n';
		var args = [];

		if ( where === "all" )
			where = {};

		// Build where
		var sqlWhere = this.buildWhere(where);
		query += sqlWhere.sql;

		sqlWhere.args.forEach(function(a) {
			args.push(a);
		});

		// Build order by
		if ( typeof how.by !== "undefined" ) {
			query += 'ORDER BY ';

			var bys = [];
			if ( typeof how.by === "string" )
				bys.push(how.by)
			else
				bys = how.by;

			bys.map(function(by) {
				var pieces = by.split(" ");
				var field = pieces[0];
				var order = pieces[1] || "asc";

				return "`" + field + "` " + order.toUpperCase();
			});

			query += bys.join(", ") + "\n";
		}

		// Build groupby

		if ( typeof how.groupby !== "undefined" ) {
			query += "GROUP BY ";

			query += how.groupby.map(function(table) {
				return "`" + table + "`";
			}).join(", ");

			query += "\n";
		}

		// Build limit
		if ( typeof how.limit !== "undefined" ) {
			query += 'LIMIT ';

			if ( how.limit.constructor === Array ) {
				query += '?, ?';
				args.push(how.limit[0]);
				args.push(how.limit[1]);
			} else {
				query += '?';
				args.push(how.limit);
			}
			query += '\n';
		}

		return {
			sql: query,
			args: args
		};
	},

	buildWhere: function(where) {
		var ws = [];
		var args = [];

		for ( var key in where ) if ( where.hasOwnProperty(key) && typeof where[key] !== "undefined" ) {
			// Ensure values is an array so we can concatenate several with OR
			var values = where[key].constructor === Array ? where[key] : [where[key]];

			// Fetch field name and operand, defaulting to "="
			var pieces = key.split(" ");
			var field = pieces[0];
			var operand = (pieces[1] || "=").toUpperCase();

			var sqlWhere = '`' + field + '` ';

			if (operand === "IN" || operand === "NOT_IN") {
				operand = operand.replace(/NOT_/i, "NOT ");
				sqlWhere += operand + "(" + (new Array(values.length).join("?,")) + "?)";

				ws.push(sqlWhere);
				args = args.concat(values);
			} else {
				sqlWhere +=  operand + " ?";

				// Fill an array with the sqlWhere and add all values to args
				// Then we join them together with OR (so if there only is one item in the array,
				// it won't have an OR)
				var ors = [];
				for ( var i = 0, j = values.length; i < j; i++ ) {
					var val = values[i];
					ors.push(sqlWhere);
					args.push(val);
				}
				ws.push("(" + ors.join(" OR ") + ")");
			}
		}

		// Only add "WHERE" if there is anything to filter by

		return {
			sql: ws.length ? ('WHERE ' + ws.join(" AND ") + "\n") : '',
			args: args
		};
	},

	buildUpdate: function(table, primaryKey, what, where) {
		var query = 'UPDATE `' + table + '`\n';

		var sqlSet = this.buildSet(what);
		var args = sqlSet.args;
		query += sqlSet.sql;

		var sqlWhere = this.buildWhere(where);
		query += sqlWhere.sql;
		sqlWhere.args.forEach(function(a) {
			args.push(a);
		});

		return {
			sql: query,
			args: args
		};
	},

	buildSet: function(data) {
		var query = '';
		var fields = [];
		var args = [];

		for ( var key in data ) if ( data.hasOwnProperty(key) ) {
			fields.push('`' + key + '` = ?');
			args.push(data[key]);
		}

		if ( fields.length )
			query = 'SET ' + fields.join(", ") + '\n';

		return {
			sql: query,
			args: args
		};
	},

	buildInsert: function(table, primaryKey, object) {
		if ( ! object.schema )
			throw new Error(object + " has no schema. Is not DB object");

		var query = 'INSERT INTO `' + table + '`';
		var args = [];

		var fields = [];
		var params = [];

		// Build values
		for ( var key in object ) if (object.hasOwnProperty(key) && object.schema.hasOwnProperty(key) ) {
			fields.push('`' + key + '`');

			args.push(object[key]);
			params.push('?');
		}

		query += '(' + fields.join(", ") + ')\n';
		query += 'VALUES(' + params.join(", ")  + ')';

		return {
			sql: query,
			args: args
		};
	},

	buildDelete: function(table, primaryKey, where) {
		var query = 'DELETE FROM `' + table + '`\n';

		var sqlWhere = this.buildWhere(where);

		query += sqlWhere.sql;

		return {
			sql: query,
			args: sqlWhere.args
		};
	},

	buildCount: function(table, primaryKey, where, how) {
		var select = ['COUNT(*) AS total'];
		if (how.groupby) {
			select = select.concat(how.groupby)
		}
		return this.buildSelect(table, primaryKey, where, how, select.join(","));
	},

	/*
		Method:
			_escapeDefaultValue

		This method exists because binding the default value with ? caused the browser to crash.
		It crashed in: Chrome, Safari, Opera and mobile Safari.
	*/
	_escapeDefaultValue: function(val) {
		if ( typeof val === "number" )
			return '('+val+')';
		return '"' + val + '"';
	}
});

;
if ( ! ("bind" in Function.prototype) ) {
	Function.prototype.bind = function(bound) {
		var func = this;
		return function() {
			return func.apply(bound, arguments);
		};
	};
}

var APIDatabase = Database.extend({
	initialize: function() {
		this._super.apply(this, arguments);
		this.isApi = true;
	},

	connect: function(name) {

	},

	executeQuery: function(queryObject, callback) {
		// Send API call
		var request = new Request({
			url: Config.feeder.root + '/api/db.json',
			method: 'POST',
			onComplete: function(status, text) {
				var result = tryToParseJSON(text);
				if (! result || result.error || status != 200) {
					if (result && result.error === "login_required") {
						window.top.location = Config.feeder.loginUrl + '&to=' + window.top.location.pathname;
					}
					this.onError(queryObject, result ? result.error : result, callback);
					return;
				}
				this.querySuccess.apply(this, [queryObject, callback].concat(result))
			}.bind(this),
			addFeederAuthorization: true
		});

		request.send({post: queryObject});
	},

	querySuccess: function(queryObject, callback, res) {
		// Turn result into a nice array of objects
		var rows = [];
		for ( var i = 0; i < res.rows.length; i++ )
			rows.push(res.rows[i]);

		// Get some information about the query

		// Fetching insertId when not present throws an exception.
		var insertId = false;
		try { insertId = res.insertId; } catch (e) {}

		var meta = {
			insertId: insertId,
			error: false
		};

		callback(rows, meta);
	},

	makeTable: function(name, primaryKey, schema, callback) {
		// NoOp...
		callback();
	},

	addIndex: function(table, column, callback) {
		// NoOp...
		callback();
	},

	addField: function(table, fieldName, fieldData, callback) {
		// NoOp...
		callback();
	},

	dropTable: function(name, callback) {
		// NoOp...
		callback();
	},

	tableExists: function(name, callback) {
		callback(true);
	},

	buildFind: function(table, primaryKey, where, how) {
		if ( where == "all" || where == "*" )
			where = {};
		return {
			type: 'find',
			table: table,
			where: JSON.stringify(where),
			how: JSON.stringify(how)
		};
	},

	buildCount: function(table, primaryKey, where, how) {
		if ( where == "all" || where == "*" )
			where = {};
		return {
			type: 'count',
			table: table,
			where: JSON.stringify(where),
			how: JSON.stringify(how)
		};
	},

	buildUpdate: function(table, primaryKey, what, where) {
		return {
			type: 'update',
			table: table,
			what: JSON.stringify(what),
			where: JSON.stringify(where)
		};
	},

	buildInsert: function(table, primaryKey, object) {
		return {
			type: 'insert',
			table: table,
			object: JSON.stringify(object.getValues())
		};
	},

	buildDelete: function(table, primaryKey, where) {
		return {
			type: 'delete',
			table: table,
			where: JSON.stringify(where)
		};
	}
});

;
var RESTDatabase = Database.extend({
	initialize: function() {
		this._super.apply(this, arguments);
		this.isRest = true;
	},

	connect: function(name) {},

	executeQuery: function(queryObject, callback) {
		queryObject.addFeederAuthorization = true;
		queryObject.contentType = 'json';
		queryObject.onComplete = function(status, text) {
			var result = tryToParseJSON(text);
			if (! result || result.error || status != 200) {
				this.onError(queryObject, result ? result.error : result, callback);
				return;
			}
			this.querySuccess.apply(this, [queryObject, callback].concat(result));
		}.bind(this);

		var request = new Request(queryObject);
		request.send(queryObject.sendParams);
	},

	querySuccess: function(queryObject, callback, res) {
		var resultBase = res[queryObject.table] || res[queryObject.table.replace(/s$/, '')];

		var insertId = false;
		var rows = [];
		if (resultBase) {
			if (resultBase.constructor === Array) {
				rows = resultBase;

				// Copy properties from response into our models
				if (queryObject.model && queryObject.model.constructor === Array) {
					queryObject.model.forEach(function(model, index) {
						if (resultBase[index].error) {
							model.error = true;
							return;
						}
						model.copyPropertiesFrom(resultBase[index]);
					});
				}
			} else {
				rows = [resultBase];
				insertId = resultBase.id;

				// Copy properties from response into our models
				if (queryObject.model && queryObject.model.copyPropertiesFrom)
					queryObject.model.copyPropertiesFrom(resultBase);
			}
		}

		// Get some information about the query

		var meta = {
			insertId: insertId,
			error: false
		};

		callback(rows, meta);
	},

	makeTable: function(name, primaryKey, schema, callback) {
		// NoOp...
		callback();
	},

	addIndex: function(table, column, callback) {
		// NoOp...
		callback();
	},

	addField: function(table, fieldName, fieldData, callback) {
		// NoOp...
		callback();
	},

	dropTable: function(name, callback) {
		// NoOp...
		callback();
	},

	tableExists: function(name, callback) {
		callback(true);
	},

	buildFind: function(table, primaryKey, where, how) {
		var idInUrl = false;
		if ( where == "all" || where == "*" )
			idInUrl = false;
		else if ( where[primaryKey] ) {
			idInUrl = where[primaryKey];
			delete where[primaryKey];
		}

		return {
			method: 'GET',
			url: this.urlFor(table, idInUrl),
			table: table,
			sendParams: {
				get: mergeObjects(where, how)
			}
		};
	},

	buildCount: function(table, primaryKey, where, how) {
		throw "Not possible with REST database";
	},

	buildUpdate: function(table, primaryKey, what, where) {
		if (!how[primaryKey]) {
			throw "Need primary key to update REST model";
		}

		return {
			method: 'PUT',
			url: this.urlFor(table, how[primaryKey]),
			table: table,
			sendParams: {
				post: this.makePostParams(table, what),
				get: how
			},
			model: what
		};
	},

	buildInsert: function(table, primaryKey, object) {
		return {
			method: 'POST',
			url: this.urlFor(table),
			table: table,
			sendParams: {
				post: this.makePostParams(table, object)
			},
			model: object
		};
	},

	buildDelete: function(table, primaryKey, where) {
		if (!how[primaryKey]) {
			throw "Need primary key to delete REST model";
		}

		return {
			method: 'DELETE',
			url: this.urlFor(table, where[primaryKey]),
			table: table
		};
	},

	urlFor: function(table, idInUrl) {
		return Config.feeder.adder + "/" + table + (idInUrl ? "/" + idInUrl : "");
	},

	makePostParams: function(table, params) {
		if (params.constructor === Array) {
			params = params.map(convertObject);
		} else {
			params = convertObject(params);
		}

		function convertObject(object) {
			if (object.getRESTValues)
				object = object.getRESTValues();
			else if (object.getValues)
				object = object.getValues();
			return object;
		}

		var ret = {};
		ret[table] = params;
		return ret;
	}
});

;
var Mapper = Class.extend({
	table: false,
	model: false,

	initialize: function(db) {
		this.db = db;
		this.dbStack = [];
		this.modelName = this.model;
		this.model = window[this.model].prototype;
		this.pk = this.model.primaryKey;
	},

	install: function(callback) {
		this.db.makeTable(this.table, this.pk, this.model.schema, callback || function() {});
	},

	pushDatabase: function(dbClass, transaction) {
		this.dbStack.push(this.db);
		this.db = new dbClass;

		transaction(this);

		this.db = this.dbStack.pop();
	},

	// Add a field using data from model schema
	addField: function(member, callback) {
		var memberData = this.model.schema[member];
		this.db.addField(this.table, member, memberData, callback || function() {});
	},

	addIndex: function(column, callback) {
		this.db.addIndex(this.table, column, callback || function() {});
	},

	find: function(where, how, callback) {
		// how is optional, so make sure it's an object, and if not, check if is callback
		if ( typeof how == 'function' && ! callback ) {
			callback = how;
			how = {};
		}
		var objectForRow = this.objectForRow;

		this.db.find(this.table, this.pk, where, how, function(res, meta) {
			// Process rows into Model objects
			var rows = [];
			if ( res ) {
				res.forEach(function(row) {
					rows.push(app.store.addObject(objectForRow(row)));
				});
			}

			// Fire callback with processed objects
			callback(rows, meta);
		});
	},

	massDelete: function(where, callback) {
		this.db.del(this.table, this.pk, where, function() {
			fireCallback(callback);
		});
	},

	massUpdate: function(what, where, callback) {
		this.db.update(this.table, this.pk, what, where, function() {
			fireCallback(callback);
		});
	},

	save: function(model, callback) {
		if ( model[this.pk] ) {
			this.update(model, callback);
		} else {
			this.insert(model, callback);
		}
	},

	insert: function(model, callback) {
		this.db.insert(this.table, this.pk, model, this.onSaveOrUpdate.andArguments(model, callback));
	},

	update: function(model, callback) {
		if ( ! model.isDirty() )
			return fireCallback(callback);

		var where = {};
		where[this.pk] = model[this.pk];

		this.db.update(this.table, this.pk, model.getDirty(), where, this.onSaveOrUpdate.andArguments(model, callback));
	},

	onSaveOrUpdate: function(res, meta, models, callback) {
		if (models.constructor !== Array)
			models = [models];

		for (var i = 0, j = models.length; i < j; i++) {
			var model = models[i];
			// Todo: This is wrong with the array approach
			if ( meta.insertId )
				model[this.pk] = meta.insertId;

			model.fromDB = model.getValues();
			app.store.addObject(model);
		}

		fireCallback(callback, res, meta);
	},

	remove: function(model, callback) {
		if ( ! model[this.pk] )
			throw "Remove object must have " + this.pk;

		var where = {};
		where[this.pk] = model[this.pk];

		this.db.del(this.table, this.pk, where, callback);
	},

	count: function(where, how, callback) {
		// how is optional, so make sure it's an object, and if not, check if is callback
		if ( typeof how == 'function' && ! callback ) {
			callback = how;
			how = {};
		}

		this.db.count(this.table, this.pk, where, how, function(res, meta) {
			var ret = 0;
			if (res[0] && Object.keys(res[0]).length == 2) {
				ret = {};
				for (var i = 0, r; r = res[i]; i++) {
					var idKey = Object.keys(r).filter(function(field) { return field.contains("id"); })[0];
					ret[r[idKey]] = r.total;
				}
			} else if (res[0]) {
				ret = res[0].total;
			}
			fireCallback(callback, ret);
		});
	},

	objectForRow: function(row) {
		var obj = new window[this.modelName]();
		obj.setFromDB(row);
		return obj;
	}
});

Mapper.instances = {};

Mapper.get = function(name) {
	if ( ! Mapper.instances[name] ) {
		var className = name.replace(/^\w/, function(a) { return a.toUpperCase();}) + 'Mapper';
		Mapper.instances[name] = new window[className](Database.current);
	}
	return Mapper.instances[name];
};

Mapper.switchDatabase = function(db) {
	for ( var key in Mapper.instances ) if (Mapper.instances.hasOwnProperty(key)) {
		Mapper.instances[key].db = db;
	}
}
;
var Model = Class.extend({
	schema: {},
	primaryKey: 'id',
	mapper: false,

	initialize: function(data) {
		this.model = this.mapper;
		this.mapper = Mapper.get(this.mapper);
		this.modelGUID = Model.GUID++;

		for ( var key in data ) if ( data.hasOwnProperty(key) && this.schema.hasOwnProperty(key) )
			this[key] = data[key];

		if ( typeof this.onInit === 'function' )
			this.onInit();
	},

	setFromDB: function(data) {
		this.fromDB = {};

		for ( var key in data ) if ( data.hasOwnProperty(key) ) if ( this.schema.hasOwnProperty(key) || key !== 'id')
			this.fromDB[key] = data[key];

		for ( var key in this.fromDB ) if ( this.fromDB.hasOwnProperty(key) )
			this[key] = this.fromDB[key];

		this.id = data.id;
	},

	save: function(callback) {
		return this.mapper.save(this, callback);
	},

	saveWith: function(dbClass, callback) {
		this.mapper.pushDatabase(dbClass, this.mapper.save.withArguments(this, callback));
	},

	copyPropertiesFrom: function(model) {
		for (var key in model) if (model.hasOwnProperty(key))
      if (this.schema.hasOwnProperty(key) || key === 'id')
			   this[key] = model[key];
	},

	copyDBPropertiesFrom: function(model) {
		for (var key in model.fromDB) if (model.fromDB.hasOwnProperty(key))
      if (this.schema.hasOwnProperty(key) || key === 'id')
			   this.fromDB[key] = model.fromDB[key];
	},

	isDirty: function() {
		if (!this.fromDB)
			return true;

		for (var key in this.fromDB) if (this.fromDB.hasOwnProperty(key))
			if (this.fromDB[key] != this[key])
				return true;
		return false;
	},

	getDirty: function() {
		var dirty = {};
		for ( var key in this.fromDB ) if ( this.fromDB.hasOwnProperty(key) )
			if ( this.fromDB[key] != this[key] )
				dirty[key] = this[key];
		return dirty;
	},

	getValues: function() {
		var ret = {id: this.id};
		for ( var key in this.schema ) if ( this.schema.hasOwnProperty(key) )
			ret[key] = this[key];
		return ret;
	},

	setMeta: function(key, value, callback) {
		this.ensureMeta();

		this.parsedMeta[key] = value;
		this.meta = JSON.stringify(this.parsedMeta);

		chain(this.save)
		.end(callback);
	},

	getMeta: function(key) {
		this.ensureMeta()
		return this.parsedMeta[key];
	},

	removeMeta: function(key, callback) {
		this.ensureMeta();
		delete this.parsedMeta[key];
		this.meta = JSON.stringify(this.parsedMeta);

		chain(this.save)
		.end(callback);
	},

	ensureMeta: function() {
		if ( ! this.parsedMeta && this.meta )
			this.parsedMeta = JSON.parse(this.meta);
		if ( ! this.parsedMeta )
			this.parsedMeta = {};
	}
});

Model.GUID = 0;

;
var Feed = Model.extend({
	mapper: 'feed',

	schema: {
		'type': {type: 'text', standard: 'rss', possible: ['rss']},
		'guid': {type: 'text', standard: ''},
		'title': {type: 'text'},
		'path': {type: 'text'},
		'link': {type: 'text'},
		'favicon': {type: 'text', standard: ''},
		'numposts': {type: 'int', standard: 0},
		'forceupdate': {type: 'int', standard: 0},
		'usenotifications': {type: 'int', standard: 0},
		'updateinterval': {type: 'int', standard: 0},
		'meta': {type: 'text', mandatory: false, standard: ''},
		'notifyemail': {type: 'int', standard: 0},
		'quirks': {type: 'text', standard: ''}
	},

	onInit: function() {
		this.lastUpdated = 0;
		this.isFeed = true;
		this.hasMorePosts = true;
	},

	toJSON: function() {
		return {
			isFeed: true,
			guid: this._originalId || this.id,
			path: this.path,
			title: this.title,
			favicon: this.favicon
		};
	},

	getCacheId: function() {
		return this.id;
	},

	copyPropertiesFromServerData: function(data) {
		var protectedAttributes = 'link title favicon numposts forceupdate usenotifications updateinterval meta quirks'.split(" ");

		for (var key in data) if (data.hasOwnProperty(key) && protectedAttributes.contains(key)) {
			this[key] = data[key];
		}
	},

	findConditions: function() {
		return {feed_id: this.id};
	},

	byConditions: function() {
		return Config.postsSort;
	},

	fetchPosts: function(callback) {
		this.offset = 0;
		var numPosts = this.getNumPosts();

		if (this.posts && numPosts == this.numberOfFetchedPosts) {
			return callback(this._getFromCache(), this);
		}

		console.log("fetching posts for", this.title, this.id);

		this.numberOfFetchedPosts = numPosts;

		Mapper.get('post').find(
			this.findConditions(),
			{limit: [0, numPosts+1], by: this.byConditions()},
			this.setPosts.withCallback(callback)
		);
	},

	fetchMorePosts: function(callback) {
		var feed = this;

		var numPosts = this.getNumPosts();
		this.offset = (this.offset || 0) + numPosts;

		console.log("fetching more posts for", this.title, this.id, this.offset, numPosts);

		Mapper.get('post').find(
			this.findConditions(),
			{limit: [this.offset, numPosts+1], by: this.byConditions()},
			function(posts) {
				feed.hasMorePosts = posts.length > numPosts;
				callback(posts.slice(0, numPosts));
			}
		);
	},

	setPosts: function(posts, meta, callback) {
		this.error = meta.error;
		this.posts = posts.slice(0, this.numberOfFetchedPosts);
		this.hasMorePosts = posts.length > this.numberOfFetchedPosts;

		if (this.error)
			callback(false, this);
		else
			callback(this._getFromCache(), this);
	},

	_getFromCache: function() {
		return app.store.sortedPostsForFeed(this.getCacheId()).slice(0, this.getNumPosts());
	},

	getPostsOfInterest: function(callback) {
		var postMapper = Mapper.get('post');
		var posts = [];
		chain(postMapper.find, {is_read: 0, feed_id: this.id})
		.thenSync(function(p) {
			posts = posts.concat(p);
		})
		.and(postMapper.find, {is_starred: 1, feed_id: this.id})
		.then(function(p) {
			posts = posts.concat(p);
			callback(posts);
		});
	},

	unreadPosts: function(callback) {
		this.fetchPosts(function(posts) {
			var unread = posts.filter(function(a) {
				return ! a.is_read;
			});

			callback(unread);
		});
	},

	starredPosts: function(callback) {
		this.fetchPosts(function(posts) {
			callback(posts.filter(function(p) { return !! p.is_starred; }));
		});
	},

	countUnread: function(callback) {
		fireCallback(callback, app.user.unreads.unreadCounts[this.id] || 0);
	},

	countUnreadSync: function() {
		return app.user.unreads.unreadCounts[this.id] || 0;
	},

	hasUnread: function(postWhichIsRead) {
		return app.user.unreads.forFeed(this.id) > 0;
	},

	// TODO: FIXME: Fix magic feeds
	markAllAsRead: function(callback) {
		app.user.unreads.updateForFeed(this.id, 0, {
			manual: true
		});

		app.store.postsForFeed(this.id).forEach(function(post) {
			if (! post.is_read) {
				post.is_read = 1;
				app.events.send('post:updated', { post: post.id });
			}
		});

		app.events.send('feed:updated', {
			feed: this.id,
			manual: true
		});

		chain(this.massMarkAsRead)
		.end(callback);
	},

	massMarkAsRead: function(callback) {
		// If a syncer has support for marking all as unread, do it
		if (!app.sync.can("clearAllUnread") || app.sync.can("requireLocalCacheUpdate"))
			Mapper.get('post').massUpdate({is_read: 1}, {feed_id: this.id}, callback);

		if (app.sync.can("clearAllUnread"))
			app.sync.getWith("clearAllUnread").clearAllUnread(this, callback);
	},

	deleteAllPosts: function(callback) {
		app.user.unreads.updateForFeed(this.id, 0, {
			manual: true
		});

		if ( this.posts ) {
			app.store.deleteAllPosts(this.feedId);
			this.posts = [];
		}

		Mapper.get('post').massDelete({feed_id: this.id}, callback);
	},

	// Get the real update path, with optional force update parameter
	getPath: function() {
		var path = this.path;
		if ( this.forceupdate )
			path += (path.indexOf('?') !== -1 ? '&' : '?') + 'forceupdate=' + Date.now();
		return path;
	},

	getPathDisplay: function() {
		return this.path;
	},

	traverseFolders: function(callback) {
		var folders = app.user.structure.foldersWithFeed(this.id);

		folders.forEach(function(folder) {
			do {
				callback(folder);
				folder = folder.getParent();
			} while ( folder );
		});
	},

	getFavicon: function() {
		return "http://s2.googleusercontent.com/s2/favicons?domain=" + (new URI(this.path)).domain();
	},

	getNumPosts: function() {
		return parseInt(this.numposts, 10) || app.user.preferences.get("global:postsDisplay");
	},

	loadFavicon: function() {
		// If another icon other than the default is specified, don't reload
		if ( this.favicon && this.favicon.length && ! this.favicon.contains('chrome://favicon/') )
			return;

		if ( Ext.isOnline() || app.user.isPro())
			return;
		this.forceReloadFavicon();
	},

	forceReloadFavicon: function() {
		var request = new Request({
			url: this.link,
			onComplete: this._parseFaviconRequest
		});

		request.send();
	},

	_parseFaviconRequest: function(status, text) {
		var links = text.match(/<link (.*)\/?>/g);
		var favicon = this._getFaviconFromLinks(links, this.link);

		if ( favicon ) {
			this.favicon = favicon;
		} else {
			this.favicon = this.getFavicon();
		}

		this.save();
	},

	_getFaviconFromLinks: function(links, base) {
		try {
			if ( ! links )
				return false;
			for ( var i = 0, link; link = links[i]; i++ ) {
				var attributesMatches = link.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
				var attributes = {};

				for ( var x = 0, attr; attr = attributesMatches[x]; x++ ) { try {
					var pieces = attr.split("=");
					var key = pieces.shift().trim();
					var value = pieces.join("=");

					attributes[key] = value.trimChars("'\"").trim();
				} catch(e) {} }


				if ( attributes.rel && ["icon", "shortcut icon"].contains(attributes.rel) && attributes.href && attributes.href.length ) {
					return TRYIT(function() {
						return (new URI(attributes.href, base)).toString();
					}, this);
				}
			}
			return false;
		} catch (e) {}

		return false;
	},

	hasMore: function(offset) {
		return this.hasMorePosts;
	},

	getQuirk: function(name) {
		try {
			return JSON.parse(this.quirks)[name];
		} catch (e) {
			return null;
		}
	}
});

Feed.model = "feed";

;
var Post = Model.extend({
	mapper: 'post',

	schema: {
		feed_id: {type: 'int'},
		title: {type: 'text'},
		link: {type: 'text'},
		summary: {type: 'text', mandatory: false, standard: ''}, // new
		is_read: {type: 'int', standard: 0},
		is_starred: {type: 'int', standard: 0}, // new
		published: {type: 'int'},
		guid: {type: 'text', mandatory: false}, // New
		meta: {type: 'text', mandatory: false} // new
	},

	getCacheId: function() {
		return this.id;
	},

	// Check if post is in current posts array
	// this is just a dumb (but quick) check to see if we can skip
	// database access, so all it does is check guids
	checkIfIsPostQuick: function() {
		// Fetch feed and make sure it exists
		var feed = app.user.feed(this.feed_id);
		if ( ! feed )
			return false;

		// Make sure posts are loaded
		var posts = feed.posts;
		if ( ! posts )
			return false;

		for ( var i = 0, p; p = posts[i]; i++ )
			if ( p.getGUID() === this.getGUID() )
				return p;
		return false;
	},

	checkIfIsPost: function(callbacks) {
		var postMapper = this.mapper;
		var post = this, foundPost;

		if ( foundPost = post.checkIfIsPostQuick() )
			return callbacks.yes(foundPost);

		var findParams = {
			'feed_id': post.feed_id
		};

		if ( post.guid )
			findParams.guid = post.getGUID();
		else
			findParams.link = post.link;

		// First try to find with the same link
		chain(postMapper.find, findParams).then(function(posts, meta, next) {
			if ( ! posts.length )
				return next();
			callbacks.yes(posts[0]);
			return chain.exit;
		// GUIDs are holy. If no result was found via the GUID we must assume that this post is unique.
		}).and(function(next) {
			if ( ! post.guid )
				return next();
			callbacks.no(post);
			return chain.exit;
		// Then try to find with same title, and published within 10 seconds of it
		}).then(postMapper.find, {
			'feed_id': post.feed_id,
			'title': post.title,
			'published >': post.published - 5000, // time is in milliseconds
			'published <': post.published + 5000
		}).then(function(posts) {
			if ( ! posts.length )
				callbacks.no(post);
			else
				callbacks.yes(posts[0]);
		});
	},

	markAsRead: function(callback) {
		this.mark(1, callback);
	},

	markAsUnread: function(callback) {
		this.mark(0, callback);
	},

	mark: function(isRead, callback) {
		var post = this;
		var oldUnread = post.is_read;
		post.is_read = isRead;

		var changedCount = false;
		if (this.is_read != oldUnread)
			changedCount = (oldUnread != this.is_read);

		this.mapper.save(post, function() {
			if (changedCount) {
				var newCount = app.user.unreads.unreadCounts[post.feed_id] + (isRead ? -1 : 1);
				app.user.unreads.updateForFeed(post.feed_id, newCount, {
					manual: true
				});
			}

			app.events.send('post:updated', {post: post.id});
			app.events.send('feed:updated', {
				feed: post.feed_id,
				manual: true
			});

			fireCallback(callback);
		});
	},

	toggleStar: function(callback) {
		var post = this;

		post.is_starred = +(! post.is_starred);
		this.mapper.save(post, function() {
			app.events.send('post:updated', {post: post.id});
			fireCallback(callback);
		});
	},

	getGUID: function() {
		return this.guid || this.link;
	},

	getLink: function() {
		return this.link;
	},

	getConsumePath: function() {
		return app.config.feeder.postURL.replace("{post_id}", this.guid);
	},

	getRESTValues: function() {
		var values = this.getValues();
		values.published_from_feed = this.published_from_feed;
		values.feed_id = this.adder_feed_id;
		return values;
	},

	// server GUID
	makeHash: function() {
		return MD5.hex(this.feed_id + "" + this.title + "" + Math.floor(this.published_from_feed / 10000));
	},

	makeGUID: function() {
		if ( ! this._guid && ! this.getHashFeedId() )
			throw new Error("trying to construct GUID without proper feed_id");
		return this.getHashFeedId() + ":" + (this.guid || this.makeHash());
	},

	getHashFeedId: function() {
		return this.adder_feed_id || this.feed_id;
	},

	getServerGUID: function() {
		if ( ! this._guid )
			this._guid = this.makeGUID();
		return this._guid;
	},

	getGUIDHash: function() {
		if (!this._guidHash)
			this._guidHash = Post.hashGuid(this.getServerGUID());
		return this._guidHash;
	}
});

Post.hashGuid = function(guid) {
	return MD5.base64(guid).slice(0, -2);
}
// end server GUID

Post.model = "post";

;
var Folder = Model.extend({
	mapper: 'folder',

	schema: {
		name: {type: 'text'},
		orderstring: {type: 'text', standard: ""},
		standard: {type: 'int', standard: 0},
		meta: {type: 'text', mandatory: false}
	},

	onInit: function() {
		this.isFolder = true;
		if ( ! this.orderstring )
			this.orderstring = "";
	},

	toJSON: function() {
		return {
			isFolder: true,
			name: this.name
		}
	},

	getCacheId: function() {
		return this.id;
	},

	forEachItem: function(callback) {
		return this.items().forEach(callback);
	},

	forEachFolder: function(callback) {
		return this.items().filter(function(item) {
			return item.isFolder;
		}).forEach(callback);
	},

	forEachFolderRecursively: function(callback) {
		this.forEachFolder(function(folder) {
			callback(folder);
			folder.forEachFolder(callback);
		});
	},

	allFeeds: function(callback) {
		var feeds = [];
		this.forEachItem(function(item) {
			if ( item.isFeed )
				feeds.push(item);
			else
				feeds = feeds.concat(item.allFeeds());
		});
		return feeds;
	},

	rawItems: function() {
		if ( ! this.orderstring )
			return [];

		return this.orderstring.split(",").map(function(item) {
			return item.split(":");
		});
	},

	items: function() {
		var getFeed = this.getFeed, getFolder = this.getFolder;

		return this.rawItems().map(function(item) {
			var type = item[0], id = item[1];
			return type === "f" ? getFeed(id) : getFolder(id);
		}).filter(function(a) {
			return !! a;
		});
	},

	addItem: function(model) {
		if ( model.model == "feed" )
			this.addFeed(model.id);
		else if ( model.model == "folder" )
			this.addFolder(model.id);
	},

	addFeed: function(feedId) {
		if ( this.hasFeed(feedId) )
			this.moveFeedToBack(feedId);
		else
			this.orderstring = (this.orderstring + ",f:" + feedId).trimChars(",");
	},

	addFolder: function(folderId) {
		if ( this.hasFolder(folderId) )
			this.moveFolderToBack(folderId);
		else
			this.orderstring = (this.orderstring + ",d:" + folderId).trimChars(",");
	},

	removeItem: function(model) {
		if ( model.model == "feed" )
			this.removeFeed(model.id);
		else if ( model.model == "folder" )
			this.removeFolder(model.id);
	},

	removeFeed: function(feedId) {
		this.orderstring = this.rawItems().filter(function(item) {
			return !(item[0] == "f" && item[1] == feedId);
		}).map(function(item) {
			return item.join(":");
		}).join(",");
	},

	removeFolder: function(folderId) {
		this.orderstring = this.rawItems().filter(function(item) {
			return !(item[0] == "d" && item[1] == folderId);
		}).map(function(item) {
			return item.join(":");
		}).join(",");
	},

	moveFeedToBack: function(feedId) {
		this.removeFeed(feedId);
		this.addFeed(feedId);
	},

	moveFolderToBack: function(folderId) {
		this.removeFolder(folderId);
		this.addFolder(folderId);
	},

	hasFeed: function(id) {
		return this.rawItems().some(function(item) {
			return item[0] == "f" && item[1] == id;
		});
	},

	hasFolder: function(id) {
		return this.rawItems().some(function(item) {
			return item[0] == "d" && item[1] == id;
		});
	},

	hasFolderRecursively: function(id) {
		if ( this.hasFolder(id) )
			return true;

		return this.items().some(function(item) {
			if ( ! item.isFolder ) return false;
			return item.hasFolderRecursively(id);
		});
	},

	unreadPosts: function(callback) {
		var unread = [];
		var link = chain();
		this.items().forEach(function(item) {
			link.and(item.unreadPosts);
			link.then(function(un, next) {
				unread = unread.concat(un);
				next();
			});
		});

		link.end(function() {
			callback(unread);
		});
	},

	countUnread: function(callback) {
		var feeds = this.allFeeds();
		var link = chain();
		var total = 0;
		feeds.forEach(function(feed) {
			link.and(feed.countUnread)
			link.then(function(unread, next) {
				total += unread;
				next();
			});
		});
		link.end(function() {
			callback(total);
		});
		//this.unreadPosts(function(posts) {
		//	callback(posts.length);
		//});
	},

	countUnreadSync: function() {
		var total = 0;
		this.allFeeds().forEach(function(feed) {
			total += feed.countUnreadSync();
		});
		return total;
	},

	starredPosts: function(callback) {
		var link = chain();
		var res = [];
		this.items().forEach(function(item) {
			link.and(item.starredPosts);
			link.then(function(posts, next) {
				res = res.concat(posts);
				next();
			});
		})

		link.and(function() {
			callback(res);
		});
	},

	countItems: function() {
		var total = 0;
		this.items().forEach(function(item) {
			if ( item.isFeed )
				total++;
			else
				total += item.countItems();
		});
		return total;
	},

	markAllAsRead: function(callback) {
		var folder = this;

		var link = chain();
		this.items().forEach(function(item) {
			link.and(item.markAllAsRead);
		});

		link.and(function() {
			app.events.send("folder:updated", {folder: folder.id});
			fireCallback(callback);
		});
	},

	setOrderFromArray: function(arr) {
		this.orderstring = arr.map(function(item) {
			return (item.model == 'feed' ? 'f' : 'd') + ':' + item.id;
		}).join(",");
	},

	getParent: function() {
		return app.user.structure.folderWithFolder(this.id);
	},

	getFeeds: function() {
		return this.items().filter(function(item) {
			return item.isFeed;
		});
	},

	getFolders: function() {
		return this.items().filter(function(item) {
			return item.isFolder;
		});
	},

	getFeed: function(id) {
		return this.structure ? this.structure.feed(id) : app.user.feed(id);
	},

	getFolder: function(id) {
		return this.structure ? this.structure.folder(id) : app.user.structure.folder(id);
	},

	getStructure: function() {
		var ret = [this];
		var p = this;
		while ( p = p.getParent() )
			ret.push(p);
		return ret;
	},

	feedBy: function(key, value) {
		return this.items().filter(function(item) {
			if ( item.isFolder ) return false;
			return item[key] == value;
		})[0];
	},

	folderBy: function(key, value) {
		return this.items().filter(function(item) {
			if ( ! item.isFolder ) return false;
			return item[key] == value;
		})[0];
	},

	toContainer: function() {
		var feedContainer = new FeedContainer();
		feedContainer.pushFolder("Feeds");

		this.forEachItem(function add(item) {
			if (item.isFeed)
				feedContainer.addFeed(item);
			else {
				feedContainer.pushFolder(item.name);
				item.forEachItem(add);
				feedContainer.popFolder();
			}
		});

		return feedContainer;
	}
});

Folder.model = "folder";
;
var Migration = Model.extend({
	mapper: 'migration',
	
	schema: {
		'version': {type: 'int'},
		'created': {type: 'int'}
	},

	getCacheId: function() {
		return false;
	}
});

Migration.model = "migration";

Migration.migrations = {
	1: function(callback) {
		chain(this.postMapper.addField, 'meta')
		.and(this.postMapper.addField, 'summary')
		.and(this.postMapper.addField, 'is_starred')
		.and(this.postMapper.addField, 'guid')
		
		.and(this.feedMapper.addField, 'type')
		.and(this.feedMapper.addField, 'guid')
		.and(this.feedMapper.addField, 'updateinterval')
		.and(this.feedMapper.addField, 'meta')
		 
		// Add GUIDs to all feeds
		.and(function(next) {
			chain(this.feedMapper.find, 'all')
			.then(function(res, meta, done) {
				var link = chain();
				for ( var i = 0, feed; feed = res[i]; i++ ) {
					feed.guid = feed.path;
					link.and(feed.save);
				}
				link.end(done);
			})
			.end(next);
		}.bind(this))
		
		.and(app.user.reloadFeeds)
		 	
		.end(callback);
	},

	2: function(callback) {
		chain(this.feedMapper.addField, 'notifyemail')
		.and(app.user.reloadFeeds)
		.end(callback);
	}
};

;
var Guid = Model.extend({
	mapper: "guid",

	schema: {
		hash: {type: "text"}
	},

	setFromDB: function(hash) {
		this.hash = hash;
	},

	getCacheId: function() {
		return false;
	}
});
;
var FeedOnlyUnread = Feed.extend({
	initialize: function() {
		this._super.apply(this, arguments);
		
		this.isMagic = true;
		this.onlyUnread = true;
		this.title = "All unread";
		this.favicon = app.config.defaultFavicon();
	},

	findConditions: function() {
		return {is_read: 0};
	},

	byConditions: function() {
		return 'id desc';
	},
	
	fetchPosts: function(callback) {
		this.offset = 0;

		var numPosts = this.getNumPosts();
		this.numberOfFetchedPosts = numPosts;

		Mapper.get("post").find(
			this.findConditions(),
			{by: this.byConditions(), limit: [this.offset, numPosts+1]},
			this.setPosts.withCallback(callback)
		);
	},

	_getFromCache: function() {
		return this.posts.slice(0, this.getNumPosts());
	},
	
	massMarkAsRead: function(callback) {
		app.user.unreads.clearAll(callback);
	},
	
	countUnread: function(callback) {
		fireCallback(callback, app.user.unreads.countStored());
	}
});

;
var FeedOnlyStarred = Feed.extend({
	initialize: function() {
		this._super.apply(this, arguments);
		
		this.isMagic = true;
		this.title = "All starred posts";
		this.favicon = app.config.defaultFavicon();
	},
	
	findConditions: function() {
		return {is_starred: 1};
	},

	byConditions: function() {
		return 'id desc'
	},

	fetchPosts: function(callback) {
		this.offset = 0;
		this.numberOfFetchedPosts = this.getNumPosts();

		Mapper.get('post').find(
			this.findConditions(),
			{by: this.byConditions(), limit: this.numberOfFetchedPosts+1},
			this.setPosts.withCallback(callback)
		);
	},
	
	_getFromCache: function() {
		return this.posts.slice(0, this.getNumPosts());
	},

	massMarkAsRead: function(callback) {
		var ids = this.posts.map(function(p) {
			app.store.post(p.id).is_read = 1;
			app.store.feed(p.feed_id).cacheUpdateCount();
			return p.id;
		});
		
		Mapper.get('post').massUpdate({is_read: 1}, {id: ids}, callback);
	},
	
	countUnread: function(callback) {
		fireCallback(callback, 0);
	}
});
;
var FeedMapper = Mapper.extend({
	table: 'feeds',
	model: 'Feed',

	addFeedIfNotExistsWithoutFolder: function(feed, callback) {
		feed.noFolderOnAdd = true;
		return this.addFeedIfNotExists(feed, callback);
	},

	addFeedIfNotExists: function(feed, callback) {
    if (typeof feed === "string") {
      feed = {
        path: feed,
        guid: feed
      };
    };

		chain(app.store.feedBy, 'guid', feed.guid)
		.then(function(res, next) {
			if (res) {
				feed.id = res.id;
				if ( feed.title !== res.title ) {
					res.title = feed.title;
					res.save(function(worked) {
            callback(worked);
          });
				} else {
					callback(true);
        }
				return chain.exit;
			}
			next();
		})
		.then(function(next) {
			if (feed.isError) {
				callback(false);
				return chain.exit;
			}
			next();
		})
		.and(this.addFeed, feed)
		.then(function(f) {
			if (f) {
				feed.id = f.id;
      }
			callback(true);
		});
	},

	addFeed: function(path, data, callback) {
		if ( typeof data === 'function' ) {
			callback = data;
			data = {};
		}

		if (typeof path === "object" ) {
			data = path;
			path = data.path;
		}

		data = data || {};

		var feed;
		if (data.constructor !== Feed) {
			feed = new Feed();
			feed.path = path;
			feed.guid = path;
		} else {
			feed = data;
			feed.path = path;
			feed.guid = path;
		}

		for ( var key in data ) if ( data.hasOwnProperty(key) && feed.schema.hasOwnProperty(key) )
			if (key !== "id")
				feed[key] = data[key];

		feed.noFolderOnAdd = data.noFolderOnAdd;

		chain(app.sync.processFeed, feed)
		// sync can fail to process feeds, if for example the client server cannot reach a feed
		.and(function(next) {
			if ( feed.isError ) {
				fireCallback(callback, false);
				return chain.exit;
			}
			next();
		})
		.then(this.loadAndStoreFeed, feed)
		.then(this.addFeedToStructure, feed)
		.then(function(addedFeed) {
			app.events.send('feed:added', {feed: addedFeed.id});
			fireCallback(callback, addedFeed);
		});
	},

	loadAndStoreFeed: function(feed, callback) {
		chain(app.updater.loadFeed, feed)
		.then(this.createFeedFromParser)
		.then(function(feedData, posts, next) {
			if (feedData) {
				feed.copyPropertiesFrom(feedData);
			}

			if (feedData && posts) {
				app.sqs.post("feed:add", {feed: feed, posts: posts}, next);
			} else {
				fireCallback(callback, false);
				return chain.exit;
			}
		})
		.end(callback);
	},

	createFeedFromParser: function(parser, callback) {
		if ( ! parser )
			return fireCallback(callback, false, false);

		var feed = parser.getFeed();
		var posts = parser.getPosts();

		// Mark all posts in a new feed as read initially
		posts.forEach(function(post) {
			post.is_read = 1;
		});

		fireCallback(callback, feed, posts)
	},

	addFeedToStructure: function(feed, callback) {
		if (feed.noFolderOnAdd)
			return callback(feed);
		chain(app.user.structure.addFeedToRoot, feed)
		.and(app.user.structure.save)
		.end(callback, feed);
	}
});

;
var PostMapper = Mapper.extend({
	table: 'posts',
	model: 'Post',

	install: function(callback) {
		var postMapper = this;

		this._super(function() {
			postMapper.addIndex('feed_id', callback);
		});
	},

	addPostsToFeed: function(feed, posts, callback) {
		callback = callback || function() {};

		// Set feed_id of every post
		for (var i = 0, post; post = posts[i]; i++) {
			post.feed_id = feed.id;

      if (feed.allReadOnNextCrawl) {
        post.is_read = 1;
      }
    }
    delete feed.allReadOnNextCrawl;

		if (app.user.isPro())
			return callback();

		// Add to db
		this.addPosts(posts, function() {
			callback(posts);
		});
	},

	addPosts: function(posts, callback) {
		var link = chain();

		for (var i = 0, post; post = posts[i]; i++) {
			link.chain(this.addPost, post);
		}

		link.end(callback);
	},

	addPost: function(post, callback) {
		post.checkIfIsPost({
			yes: this.syncIsRead.andArguments(post, callback), // If already post just don't
			no: this.addNewPost.withCallback(callback)
		});
	},

	// Some APIs indicate if the post is read. So we make sure we sync this correctly
	syncIsRead: function(post, originalPost, callback) {
		// If is_read or is_starred is defined
		if ( typeof originalPost.is_read !== "undefined" || typeof originalPost.is_starred !== "undefined" ) {
			// Keep track if something changed
			var changed = false;

			// First is_read
			if ( post.is_read != originalPost.is_read ) {
				post.is_read = +originalPost.is_read;
				changed = true;
			}

			// Second is_starred
			if ( post.is_starred != originalPost.is_starred ) {
				post.is_starred = +originalPost.is_starred;
				changed = true;
			}

			// If something changed, save it to database
			if ( changed )
				chain(this.save, post).end(callback, originalPost);
			else
				callback(originalPost);
		} else {
			callback(originalPost);
		}
	},

	addNewPost: function(post, callback) {
		var feed = app.user.feed(post.feed_id);

		chain(this.save, post)
		.and(function() {
			app.events.send('post:added', {post: post.id});
			app.events.send('feed:updated', {
				feed: post.feed_id,
				manual: false
			});
			callback(post);
		});
	}
});

;
var FolderMapper = Mapper.extend({
	table: 'folders',
	model: 'Folder'
});

;
var MigrationMapper = Mapper.extend({
	table: 'migrations',
	model: 'Migration',
	
	migrate: function(callback) {
		if ( Ext.isOnline()  || app.user.isPro())
			return callback();
		
		chain(this.getLatest)
		.then(this.compareVersions)
		.then(function(isUptoDate, next) {
			if ( isUptoDate ) {
				callback();
				return chain.exit;
			}
			next();
		})
		.and(this.runMigrations)
		.end(callback);
	},
	
	getLatest: function(callback) {
		var migrationMapper = this;
		
		this.find('all', {by: 'created desc'}, function(res) {
			migrationMapper.latestVersion = res[0];
			callback(res[0]);
		});
	},
	
	compareVersions: function(version, callback) {
		// No latest version? Then there is stuff to be run
		if ( ! version )
			return callback(false);
		// This is determined if there exists a migration version which is current_version+1
		// So to trigger an upgrade you simply have to add an object to Migration.migrations
		return callback(!Migration.migrations[version.version+1]);
	},
	
	runMigrations: function(callback) {
		var toRunVersion;
		if ( ! this.latestVersion )
			toRunVersion = 1;
		else
			toRunVersion = this.latestVersion.version+1;
		
		var link = chain();
		while ( Migration.migrations[toRunVersion] ) {
			link.and(this.runMigration, toRunVersion);
			toRunVersion++;
		}
		link.end(callback);
	},
	
	runMigration: function(version, callback) {
		var migrationFunction = Migration.migrations[version];
		
		migrationFunction.call({
			postMapper: Mapper.get('post'),
			feedMapper: Mapper.get('feed'),
			folderMapper: Mapper.get('folder')
		}, function() {
			var migration = new Migration();
			migration.version = version;
			migration.created = Date.now();
			
			chain(migration.save)
			.end(callback);
		});
	}
});

;
var GuidMapper = Mapper.extend({
	table: 'guids',
	model: 'Guid',
});
;
var FeederRoot = localStorage.feederRoot || "http://feeder.co";
var AdderRoot = localStorage.adderRoot || "http://spider-adder.feeder.co";
var PusherURL = localStorage.pusherURL || "http://pusher.feeder.co:3337";

if (document.location.protocol === "http:" || document.location.protocol === "https:")
	FeederRoot = localStorage.feederRoot = "http://" + document.location.host;

var Config = {
	icon: {
		addFeed: ! Ext.isSafari() ? Ext.path('icons/icon-add.png') :  Ext.path('icons/safari-icon-add.png'),
		standard: ! Ext.isSafari() ? Ext.path('icons/icon-retina.png') :  Ext.path('icons/safari-icon.png')
	},

	images: {
		folder: Ext.path('icons/folder_2x.png')
	},

	feeder: {
		root: FeederRoot,
		adder: AdderRoot + "/rss",
		payURL: FeederRoot + "/pro/payment/execute",
		connectURL: FeederRoot + "/pro?flow=ext",
		loginUrl: FeederRoot + "/login?flow=login",
		logoutUrl: FeederRoot + "/logout",
		welcomeUrl: FeederRoot + "/?pro_trial=1",
		termsUrl: FeederRoot + "/terms?inline=1",
		checkURL: FeederRoot + "/api/feeder/check",
		destroyTokenURL: FeederRoot + "/api/feeder/invalidate-token",
		postURL: FeederRoot + "/api/post/{post_id}?redirect_if_empty=true",
		profileSettingsURL: FeederRoot + "/pro/file",
		pusherURL: PusherURL,
		iosURL: "https://itunes.apple.com/us/app/feeder.co-rss-feed-reader/id668210239?mt=8"
	},

	pollTimeout: 30*1000,
	onLoadPollTimeout: 5*1000,
	retryInitializeTimeout: 10*1000,

	defaultUpdateInterval: 10*60*1000,

	maxConcurrentUpdates: 30,
	maxPostsPerFeedFile: 50,

	defaultNumPosts: 30,
	minNumberOfPosts: 105,

	feederBlog: "http://blog.feeder.co/rss",
	feederNotificationsURL: "http://notifications.feeder.co/rss",

	feederNotificationCheckInterval: 60*60*6*1000,

	optionsPageSize: {
		width: 1000,
		height: 600
	},

	popupSize: {
		width: 337,
		height: 412
	},

	defaultFavicon: function(path) {
		if ( ! path )
			return Config.defaultFaviconPath;

		if ( Ext.isChrome() ) {
			return "chrome://favicon/" + path;
		} else if ( Ext.isSafari() ) {
			return TRYIT(function() {
				return "http://s2.googleusercontent.com/s2/favicons?domain=" + (new URI(this.path)).domain();
			}, this);
		}
	},

	defaultFaviconPath: Ext.path("icons/default-icon.png"),

	postsSort: ['published desc', 'id desc']
};

;
"use strict";

var FREE_TRIAL_START_DATE = 1465201876 * 1000;

/*
	Class:
		User

	Mission:
		Make a universal interface for interacting and modifing with what a user owns.
		Including things like:

			* Installing the tables
			* Fetching feeds/posts
			* Updating feeds/posts (mark as read)
			* Removing feeds/posts
			* Preferences
*/

var User = Class.extend({
	initialize: function() {
		this.db = Database.getInstance("Feeds");
		Database.switchDatabase("Feeds");

		this.preferences = new UserPreferences();
		this.structure = new UserStructure();
		this.unreads = new UserUnreads();

		if (this.isPro()) {
			this.switchToAPIDatabase();
		}

		this.feedMapper = Mapper.get('feed');
		this.postMapper = Mapper.get('post');
		this.folderMapper = Mapper.get('folder');
	},

	destroy: function(callback) {
		this.isDestroyed = true;
		fireCallback(callback);
	},

	install: function(callback) {
		chain(this.createClientID)
		.and(this.feedMapper.install)
		.and(this.postMapper.install)
		.and(this.folderMapper.install)
		.and(this.reloadFeeds)
		.and(this.structure.install)
		.and(this.prunePosts)
		.and(this.prunePostsWithNoParent)
		.and(callback);
	},

	createClientID: function(callback) {
		if (!this.preferences.get("client_id")) {
			this.preferences.set("client_id", GUID());
		}
		// installed install installed_at
		if (!this.preferences.get("first_seen")) {
			this.preferences.set("first_seen", Date.now());
		}

		callback();
	},

	// Remove posts from feeds that have more than > 100 posts
	prunePosts: function(callback) {
		if (Ext.isOnline() || this.isPro()) {
			return callback();
		}

		var postMapper = Mapper.get("post");

		Mapper.get('feed').find('all', function(feeds) {
			var feedsChain = chain();

			feeds.forEach(function(feed) {
				feedsChain.and(postMapper.find, {feed_id: feed.id, is_starred: 0}, {by: Config.postsSort, limit: [0, Config.minNumberOfPosts]})
				.then(function(posts, meta, next) {
					if (posts.length < Config.minNumberOfPosts)
						return next();

					var ids = posts.map(function(p) {
						return p.id;
					});

					postMapper.massDelete({"id not_in": ids, feed_id: feed.id}, next);
				});
			});

			feedsChain.end(callback);
		});
	},

	prunePostsWithNoParent: function(callback) {
		if (Ext.isOnline() || this.isPro())
			return callback();

		var feedIds = [];
		this.forEachFeed(function(feed) {
			feedIds.push(feed.id);
		});

		if (feedIds.length) {
			chain(Mapper.get("post").massDelete, {"feed_id not_in": feedIds})
			.end(callback);
		} else
			callback();
	},

	reloadFeeds: function(callback) {
		app.store.clearFor(Feed);

		chain(this.feedMapper.find, 'all')
		.then(this.feedsFetched)
		.andSync(this.unreads.clearCache)
		.end(callback);
	},

	feedsFetched: function(rows, meta, callback) {
		this.FAILURE = !!meta.error;
		fireCallback(callback);
	},

	reload: function(callback) {
		chain(this.reloadFeeds)
		.and(this.structure.reloadFolders)
		.end(callback);
	},

	// Fetching 1 feed
	feed: function(id, callback) {
		if ( ! id )
			return false;
		var feed = app.store.feed(id.id || id);
		if ( callback )
			return callback(feed);
		return feed;
	},

	hasFeeds: function() {
		return app.store.feeds().length > 0;
	},

	forEachFeed: function(callback) {
		app.store.feeds().forEach(function(feed) {
			callback(feed);
		});
	},

	removeFeed: function(feedOrFeedId, callback) {
		var feed = typeof feedOrFeedId === 'object' ? feedOrFeedId : this.feed(feedOrFeedId);
    // if (!feed) {
    //   fireCallback(callback);
    //   return;
    // }

		var postMapper = this.postMapper;

		// Remove all posts
		chain(feed.deleteAllPosts)
		// Remove folder reference
		.and(this.structure.removeFeed, feed.id)
		// Remove feed
		.and(this.feedMapper.remove, feed)
		.and(function() {
			app.store.deleteObject(feed);
			app.events.send('feed:removed', {feed: feed.id, guid: feed.guid, feedType: feed.type});

			fireCallback(callback);
		});
	},

	removeFeedFromAllFolders: function(feedOrFeedId, callback) {
		var feed = typeof feedOrFeedId === 'object' ? feedOrFeedId : app.store.feed(feedOrFeedId);

		this.structure.forEachFolder(function(folder) {
			folder.removeFeed(feed.id);
		});

		chain(this.structure.saveFolders)
		.and(this.removeFeed, feed)
		.end(callback);
	},

	removeFeedIfNotInCategories: function(feedId, callback) {
		feedId = feedId.id ? feedId.id : feedId;

		// Feed exists in a category?
		if ( app.user.structure.feedInFolder(feedId) )
			return fireCallback(callback);

		return this.removeFeed(feedId, callback);
	},

	// The simple interface to adding/removing feeds
	followFeed: function(url, callback) {
		app.user.feedMapper.addFeedIfNotExists(url, callback);
	},

	unfollowFeed: function(url, item, callback) {
		var feed = app.store.feedBy("path", url);
		if ( ! feed )
			return fireCallback(callback);

		chain(app.user.removeFeedFromAllFolders, feed)
		.end(callback);
	},

	// WARNING: This MUST be run after importer has imported folders.
	fixOrphanFeeds: function(callback) {
		this.forEachFeed(function(feed) {
			if ( ! app.user.structure.feedInFolder(feed.id) ) {
				console.log("FIXING ORPHAN: %s:%d was oprhan", feed.title, feed.id);
				app.user.structure.base.addFeed(feed.id);
			}
		});

		chain(app.user.structure.base.save)
		.end(callback);
	},

	createFeedContainer: function() {
		return new FeedContainer();
	},

	createPost: function(data) {
		return new Post(data || {});
	},

	createFeed: function(data) {
		return new Feed(data || {});
	},

	create: function(className, a, b, c, d, e) {
		return new window[className](a, b, c, d, e);
	},

	hasFeedByPath: function(link) {
		return !!app.store.feedBy('path', link);
	},

	hasFeed: function(guid) {
		return !!app.store.feedBy("guid", guid);
	},

	isPro: function() {
		return !!this.preferences.get("feeder:token") || Ext.isOnline();
	},

	isLegacyUser: function() {
		return true;
		// return !this.isPro() && parseInt(this.preferences.get("first_seen"), 10) < FREE_TRIAL_START_DATE;
	},

	shouldHaveIntercom: function() {
		return this.isPro();
	},

	switchDatabase: function(name, toAdapter) {
		this.db = Database.getInstance(name, toAdapter);
		Database.switchDatabase(name);
		Mapper.switchDatabase(this.db);
	},

	switchToAPIDatabase: function() {
		this.switchDatabase("FeederAPI", "APIDatabase");
	},

	switchToLocalDatabase: function() {
		this.switchDatabase("Feeds", Platform.env.DBAdapter);
	},

	moveToLocalDatabase: function(callback) {
		this.switchToLocalDatabase();
		this.reloadDB(callback);
	},

	moveToAPIDatabase: function(callback) {
		this.switchToAPIDatabase();
		this.reloadDB(callback);
	},

	reloadDB: function(callback) {
		app.store.clearCache();
		this.unreads.clearCache();

		chain(app.user.reloadFeeds)
		.and(app.user.structure.reloadFoldersHard)
		.end(callback);
	},

	loginToPro: function(data, callback) {
		app.sync.get("feeder").loginToPro(data, callback);
	},

	signupToPro: function(data, callback) {
		app.sync.get("feeder").signupToPro(data, callback);
	},

  downgradeToLite: function(callback) {
    app.sync.get("feeder").downgradeToLite(callback);
  },

	isTrial: function() {
		return app.sync.get("feeder") && app.sync.get("feeder").checkResponse.is_trial;
	},

	trialDaysLeft: function() {
		return app.sync.get("feeder") && app.sync.get("feeder").checkResponse.days_left_on_trial;
	},

	proHasExpired: function() {
		return window.IS_EXPIRED || this.proExpired;
	},

	proTrialDaysLeft: function() {
		if (this.isTrial()) {
			var daysLeft = this.trialDaysLeft();
			if (daysLeft == 1) {
				return daysLeft + " day";
			} else {
				return daysLeft + " days";
			}
		} else {
			return "";
		}
	},

	setDidChooseToUseBasic: function(did) {
		app.user.preferences.set("didChooseToUseBasic", did);
	},

  truncateAll: function(callback) {
    chain(this.feedMapper.massDelete, {})
    .and(this.folderMapper.massDelete, {})
    .and(this.postMapper.massDelete, {})
    .end(callback);
  }
});

;
var CacheStore = Class.extend({
	initialize: function() {
		this.clearCache();
	},

	clearCache: function() {
		this.store = {};
		this.store[Feed.model] = {};
		this.store[Folder.model] = {};
		this.store[Post.model] = {};

		this.cache = {
			posts: {}
		};

		ParserStore.destroy();
	},

	addObject: function(obj) {
		var id = obj.getCacheId();

		if (!id)
			return obj;

		// New objects
		if (!this.store[obj.model][id]) {
			this.store[obj.model][id] = obj;
		// Update property for existing object
		} else {
			this.store[obj.model][id].copyPropertiesFrom(obj);
			this.store[obj.model][id].copyDBPropertiesFrom(obj);
		}

		if (obj.model == "post") {
			this.addPostToFeed(this.store[obj.model][id]);
		}

		return this.store[obj.model][id];
	},

	addPostToFeed: function(post) {
		if (!post.feed_id) {
			return;
		}

		if (!this.cache.posts[post.feed_id])
			this.cache.posts[post.feed_id] = {};

		if (this.cache.posts[post.feed_id][post.getCacheId()])
			return;

		this.cache.posts[post.feed_id][post.getCacheId()] = post;
	},

	deleteObject: function(obj) {
		delete this.store[obj.model][obj.getCacheId()];

		if (obj.model == "post") {
			this.cache.posts[obj.feed_id] = [];
		}
	},

	clearFor: function(cls) {
		this.store[cls.model] = {};
	},

	randomObjectFor: function(cls) {
		var items = Object.values(this.store[cls.model]);
		return items[Math.floor(Math.random()*items.length)] || false;
	},

	randomPost: function() {
		return this.randomObjectFor(Post);
	},

	deleteAllPosts: function(feedId) {
		if (this.cache.posts[feedId]) {
			this.postsForFeed.forEach(function(post) {
				this.deleteObject(post);
			}, this);
		}
		delete this.cache.posts[feedId];
	},

	feed: function(id) {
		return this.store[Feed.model][id];
	},

	post: function(id) {
		return this.store[Post.model][id];
	},

	folder: function(id) {
		return this.store[Folder.model][id];
	},

	feeds: function() {
		return Object.values(this.store[Feed.model]);
	},

	posts: function() {
		return Object.values(this.store[Post.model]);
	},

	postsForFeed: function(feedId) {
		if (!this.cache.posts[feedId])
			return [];
		return Object.values(this.cache.posts[feedId]);
	},

	sortedPostsForFeed: function(feedId) {
		var posts = this.postsForFeed(feedId);

		posts.sort(function(a, b) {
			if (!a.published && !b.published) {
				// FIXME: This is a hack
				// backend uses UUID
				if (app.user.isPro()) {
					if (a.created_at === b.created_at) {
						return 0;
					}

					if (a.created_at > b.created_at) {
						return -1;
					}

					return 1;
				// sqlite local uses integer
				} else {
					if (a.id === b.id) {
						return 0;
					}

					if (a.id > b.id) {
						return -1;
					}

					return 1;
				}
			}

			if (a.published == b.published) {
				return 0;
			}
			if (a.published > b.published) {
				return -1;
			}
			return 1;
		});

		return posts;
	},

	feedBy: function(attribute, val, callback) {
		var feeds = this.feeds();
		for (var i = 0, feed; feed = feeds[i]; i++) {
			if ( feed[attribute] === val ) {
				fireCallback(callback, feed);
				return feed;
			}
		}
		fireCallback(callback, false);
		return false;
	}
});

;
var UserPreferences = Class.extend({
	defaults: {
		'global:updateInterval': Config.defaultUpdateInterval,
		'global:postsDisplay': Config.defaultNumPosts,
		'global:openPostsInNewTab': true,
		'global:notifications': false,
		'global:soundNotifications': false,
		'global:hasAskedForLargeTabs': false,
		'global:disableContentHelper': false,
		'global:hasAskedToShowContentHelper': false,
		'global:tr': true,
		'popup:filter': 'all',
		'options:theme': 'normal',
		'activeTheme': 'theme-light',
		'global:useReadability': false,
		'global:showUnreadCountInBadge': true,
		'didChooseToUseBasic': false
	},

	allThemes: [
		{name: "Light", identifier: "theme-light", image: Ext.path("popup/css/gfx/theme-light.png")},
		{name: "Dark", identifier: "theme-dark", image: Ext.path("popup/css/gfx/theme-dark.png")}
	],

	initialize: function() {
		if ( this.get('activeTheme') == "theme-mint" )
			this.set('activeTheme', 'theme-light');
	},

	get: function(key) {
		var item = localStorage.getItem(key);
		try {
			item = JSON.parse(item);
		} catch (e) {
			if ( item )
				return item;
		}
		if ( item === null && typeof this.defaults[key] !== "undefined" )
			return this.defaults[key];
		return item;
	},

	set: function(key, value, quiet) {
		var oldValue = localStorage.getItem(key);
		var newValue = JSON.stringify(value);

		if ( oldValue === newValue )
			return;

		localStorage.setItem(key, newValue);

		if ( window.app && window.app.events && ! quiet )
			app.events.send("preferences:changed", {key: key});
	},

	setQuiet: function(key, value) {
		this.set(key, value, true);
	},

	remove: function(key) {
		localStorage.removeItem(key);
	},

	getAll: function() {
		var ret = {};
		for ( var key in this.defaults ) if ( this.defaults.hasOwnProperty(key) )
			ret[key] = this.get(key);
		return ret;
	}
});

;
/*
	Class:
		UserStructure

	Keeps track of the structure of the feeds.

	Stores the folders in a table. Each folder entry has an "orderstring", that works much like Google Readers.

	Example of orderstring:
		f:1,f:3,f:12,f:44,d:1,d:2

		Which corresponds to the order:

			* Feed with id #1
			* Feed with id #3
			* Feed with id #12
			* Feed with id #44
			* Folder with id #1
			* Folder with id #2
*/

var UserStructure = Class.extend({
	initialize: function() {
		this.folderMapper = Mapper.get('folder');
		this.folders = {};
		this.base = false;
	},

	install: function(callback) {
		chain(this.reloadFolders)
		.end(callback);
	},

	addStandard: function(callback) {
		var folder = new Folder();
		folder.standard = 1;
		folder.name = "Feeds";

		this.base = folder;

		var folders = this.folders;

		this.folderMapper.save(folder, function() {
			folders[folder.id] = folder;
			callback();
		});
	},

	reloadFoldersHard: function(callback) {
		this.folders = {};
		this.base = false;
		this.reloadFolders(callback);
	},

	reloadFolders: function(callback) {
		chain(this.folderMapper.find, 'all')
		.then(this.setFolders)
		.end(callback);
	},

	setFolders: function(rows, meta, callback) {
		if (meta.error) {
			this.FAILED = true;
			callback();
			return;
		}

		this.FAILED = false;

		for ( var i = 0, folder; folder = rows[i]; i++ ) {
			if ( folder.standard )
				if ( this.base ) {
					this.base.copyPropertiesFrom(folder);
					folder = this.base;
				} else
					this.base = folder;

			// We use copyPropertiesFrom to ensure any references out there are still intact
			// might be a good idea, might be retarded playing with fire. I dunno.
			if ( this.folders[folder.id] )
				this.folders[folder.id].copyPropertiesFrom(folder);
			else
				this.folders[folder.id] = folder;
		}
		if ( ! this.base ) {
			chain(this.addStandard)
			.end(callback);
		} else {
			callback();
		}
	},

	folder: function(id, callback) {
		var folder = this.folders[id];
		if ( callback )
			callback(folder);
		return folder;
	},

	save: function(callback) {
		var link = chain();
		this.forEachFolder(function(folder) {
			link.and(this.folderMapper.save, folder);
		});
		link.and(this.reloadFolders);
		link.end(callback);
	},

	addFeedToFolder: function(feedId, folderId, callback) {
		var folder = this.folder(folderId);
		folder.addFeed(feedId.id || feedId);

		app.events.send("folder:updated", {folder: folder.id});

		return fireCallback(callback);
	},

	addFolderToFolder: function(folderId, parentId, callback) {
		var folder = this.folder(folderId);
		var parentFolder = this.folder(parentId);
		parentFolder.addFolder(folderId);

		app.events.send("folder:updated", {folder: parentFolder.id});

		return fireCallback(callback);
	},

	addNewFolderToFolder: function(name, folderId, callback) {
		var newFolder = new Folder();
		newFolder.name = name;

		var parentFolder = this.folder(folderId);

		// Add new folder to database
		chain(this.folderMapper.save, newFolder)
		.then(function(res, meta, next) {
			parentFolder.addFolder(newFolder.id);
			app.events.send("folder:updated", {folder: parentFolder.id});
			next();
		})
		// Update orderstring for parent folder
		.and(this.folderMapper.save, parentFolder)
		.and(this.reloadFolders)
		.and(function() {
			fireCallback(callback, app.user.structure.folder(newFolder.id));
		});
	},

	addFeedToRoot: function(feedId, callback) {
		return this.addFeedToFolder(feedId, this.base.id, callback);
	},

	addFolderToRoot: function(name, callback) {
		return this.addFolderToFolder(name, this.base.id, callback);
	},

	findByParentAndName: function(parentId, name, callback) {
		var parent = this.folder(parentId);

		var foundFolder = false;
		this.forEachFolder(function(f) {
			if ( f.name == name && parent.hasFolder(f.id) )
				foundFolder = f;
		});

		if ( ! foundFolder ) {
			var folder = new Folder();
			folder.name = name;

			var folders = this.folders;

			chain(this.folderMapper.save, folder)
			.and(function(next) {
				folders[folder.id] = folder;
				app.events.send("folder:updated", {folder: folder.id});
				next();
			})
			.end(callback, folder);
		} else
			fireCallback(callback, foundFolder);
	},

	removeFolder: function(folder, callback) {
		chain(this.folderMapper.remove, folder)
		.and(this.removeReferenceOfFolder, folder)
		.and(this.removeChildren, folder)
		.end(callback);
	},

	removeFeed: function(feedId, callback) {
		var foldersWithFeed = this.foldersWithFeed(feedId);
		var link = chain();

		for ( var i = 0, folder; folder = foldersWithFeed[i]; i++ ) {
			folder.removeFeed(feedId);
			app.events.send("folder:updated", {folder: folder.id});
			link.and(this.saveFolder, folder);
		}

		link.end(callback);
	},

	removeReferenceOfFolder: function(folder, callback) {
		var link = chain();
		this.forEachFolder(function(f) {
			if ( ! f.hasFolder(folder.id) )
				return;
			f.removeFolder(folder.id);
			link.and(this.folderMapper.save, f);
		});
		delete this.folders[folder.id];
		link.end(callback);
	},

	removeChildren: function(folder, callback) {
		var link = chain();
		folder.forEachItem(function(item) {
			if ( item.isFeed )
				link.and(app.user.removeFeedIfNotInCategories, item);
			else
				link.and(app.user.structure.removeFolder, item);
		});
		link.end(callback);
	},

	saveFolder: function(folder, callback) {
		folder.save(function() {
			fireCallback(callback);
		});
	},

	// Just loop through each folder, without any specific order
	forEachFolder: function(callback) {
		for ( var key in this.folders) if ( this.folders.hasOwnProperty(key) )
			callback.call(this, this.folders[key]);
	},

	foldersWithFeed: function(feedId) {
		var ret = [];
		for ( var key in this.folders) if ( this.folders.hasOwnProperty(key) )
			if ( this.folders[key].hasFeed(feedId) )
				ret.push(this.folders[key]);

		if ( ! ret.length )
			ret.push(this.base);

		return ret;
	},

	feedInFolder: function(feedId) {
		var folders = this.foldersWithFeed(feedId);
		if ( folders.length > 1 )
			return true;
		return folders[0].hasFeed(feedId);
	},

	folderWithFolder: function(folderId) {
		return TRYIT(function() {
			// No parent folder
			if ( this.folder(folderId).standard )
				return false;

			for ( var key in this.folders) if ( this.folders.hasOwnProperty(key) )
				if ( this.folders[key].hasFolder(folderId) )
					return this.folders[key];
			return this.base;
		}, this);
	}
});

UserStructure.diagnose = function(fix) {
	var ids = {feeds: [], folders: []};
	console.log(UserStructure.drawTree(app.user.structure.base, 0, ids));

	console.log(ids);

	Mapper.get("folder").find("all", function(folders) {
		var orphanFolders = folders.filter(function(folder) {
			return !ids.folders.contains(folder.id);
		});

		console.log("We have %d orphan folders", orphanFolders.length);

		orphanFolders.forEach(function(folder) {
			console.log("-- %s: %s", folder.id, folder.name);
			if (fix) {
				console.log("adding to base folder");
				app.user.structure.base.addFolder(folder.id);
			}
		});

		function checkForRecursionInFolder(startFolder, ids, level) {
			ids = ids || [];
			level = level || 0;
			if (level > 100) {
				return true;
			}

			startFolder.orderstring.split(",").forEach(function(itemString) {
				var parts = itemString.split(":");
				var id = parseInt(parts[1], 10);
				if (parts[0] == "d") {
					var folder = app.store.folder(id);
					if (!folder) {
						startFolder.removeFolder(id);
						return;
					}

					ids.push(parseInt(parts[0], 10));

					if (checkForRecursionInFolder(folder, ids, level + 1)) {
						console.log("RECURSION DETECTED: removing %d from %s", id, startFolder.name);
						if (folder.standard) {
							folder.removeFolder(startFolder.id);
						} else {
							startFolder.removeFolder(id);
						}
						return;
					}
				}
			});
		}

		folders.forEach(function(folder) {
			console.log("Checking if %s contains itself", folder.id);

			if (folder.hasFolder(folder.id)) {
				console.log("xx %d: %s contains itself", folder.id, folder.name);
				if (fix) {
					folder.removeFolder(folder.id);
				}
			}

			console.log("Checking (and fixing) for recursion...", folder.id);
			checkForRecursionInFolder(folder);

			folder.save();
		})
	});
}

UserStructure.drawTree = function(fromFolder, level, ids) {
	level = level || 0;
	ids = ids || {feeds: [], folders: []};
	ids.folders.push(fromFolder.id);

	if (level > 50) {
		return "<stackleveltoodeep>";
	}

	var indent = Array(level + 1).join("--");

	var tree = [];
	fromFolder.orderstring.split(",").forEach(function(itemString) {
		var parts = itemString.split(":");
		var what = parts[0];
		var id = parseInt(parts[1], 10);

		var treeString = "";

		if (what === "f") {
			var feed = app.store.feed(id);
			if (feed) {
				treeString = "feed: " + id + " " + feed.title;
				ids.feeds.push(id);
			} else {
				treeString = "feed: " + id + " (unknown?????????)";
			}
		} else if (what === "d") {
			var folder = app.store.folder(id);
			if (folder) {
				treeString = "folder: " + id + "\n" + indent + UserStructure.drawTree(folder, level + 1, ids);
				ids.folders.push(id);
			} else {
				treeString = "folder: " + id + " (unknown?????????)";
			}
		} else {
			treeString = "unknown item: " + itemString;
		}

		tree.push(indent + treeString);
	});

	return tree.join("\n");
}

/*
var structure = new UserStructure();
structure.addFeedToFolder(feed.id, folder.id);
structure.addFolderToFolder("Hello world", folder.id);

structure.forEachFolder(function(folder) {
	folder.items();

	folder.forEachItem(function() {

	});
});*/

;
var UserUnreads = Class.extend({
	initialize: function() {
		this.unreadCounts = {};
	},

	count: function(callback) {
		if (! this._forceCount && this.unreadCounts && Object.keys(this.unreadCounts).length == app.store.feeds().length)
			return callback(app.user.unreads.countStored());
		this._forceCount = false;

		var unreadCounts = {};
		app.user.forEachFeed(function(feed) {
			unreadCounts[feed.id] = 0;
		});

		var fetchUnread = function(callback) {
			app.user.postMapper.count({is_read: 0}, {groupby: ["feed_id"]}, callback);
		}

		if (app.updater.supportsUnreadCounts()) {
			// This might be called online syncer has been initialized
			if ( ! app.sync.get("online") ) {
				this._forceCount = true;
				return callback(0);
			}

			fetchUnread = function(callback) {
				app.sync.get("online").countUnread(callback);
			};
		}

 		fetchUnread(function(rows) {
			for (var feedId in rows) if (rows.hasOwnProperty(feedId) && app.user.feed(feedId)) {
				unreadCounts[feedId] = rows[feedId];
			}
			app.user.unreads.unreadCounts = unreadCounts;

			app.events.send("feeds:recount", {
				total: app.user.unreads.countStored(),
				manual: false
			});
			callback(app.user.unreads.countStored());
		});
	},

	forceCount: function(callback) {
		this._forceCount = true;
		this.count(callback);
	},

	countStored: function() {
		var total = 0;
		for (var feedId in this.unreadCounts) if (this.unreadCounts.hasOwnProperty(feedId)) {
			total += this.unreadCounts[feedId];
		}
		return total;
	},

	updateForFeed: function(feedId, numUnread, options) {
		options = options || {};

		this.unreadCounts[feedId] = Math.max(numUnread, 0);
		app.events.send("feeds:recount", {
			total: this.countStored(),
			manual: options.manual
		});
	},

	forFeed: function(feedId) {
		return this.unreadCounts[feedId];
	},

	clearCache: function() {
		this.unreadCounts = {};
		this._forceCount = true;
	},

	zeroCache: function(options) {
		for (var key in this.unreadCounts) {
			this.unreadCounts[key] = 0;
		}

		app.events.send("feeds:recount", {
			total: 0,
			manual: options && options.manual
		});
	},

	clearAll: function(callback) {
		app.events.transaction(function(finished) {
			var updatedFeeds = [];

			// Mark all posts in memory as read
			app.store.posts().forEach(function(post) {
				if ( ! post.is_read ) {
					post.is_read = 1;
						app.events.send("post:updated", {post: post.id});

					updatedFeeds.push(post.feed_id);
				}
			});

			// Send out events for updated feeds
			updatedFeeds.unique().forEach(function(feed) {
				app.events.send("feed:updated", {
					feed: feed.id,
					manual: true
				});
			});

			// 0 unread cache
			app.user.unreads.zeroCache({
				manual: true
			});

			if (app.sync.can("clearAllUnreadEverywhere")) {
				app.sync.getWith("clearAllUnreadEverywhere").clearAllUnreadEverywhere();
			}

			if (!app.sync.can("clearAllUnreadEverywhere") || app.sync.can("requireLocalCacheUpdate")) {
				Mapper.get("post").massUpdate({is_read: 1});
			}

			// Done
			finished();
			callback();
		});
	},

	openAll: function() {
		var link = chain();
		var unreadPosts = [];

		var unreadFeed = app.user.create('FeedOnlyUnread');
		unreadFeed.numposts = 250;
		link.and(unreadFeed.fetchPosts)
		.thenSync(function(posts) {
			posts.forEach(function(post) {
				if (!post.is_read) {
					unreadPosts.push(post);
				}
			})
		});

		link.end(function() {
			app.ui.openMany(unreadPosts);
		});
	}
});

;
var FeedEvents = Class.extend({
	initialize: function() {
		this.ports = [];

		Platform.env.onBackgroundConnect(this.portConnected);
		Platform.env.onMessage(this.onMessage);
	},

	destroy: function(callback) {
		Platform.env.removeOnBackgroundConnect(this.portConnected);
		Platform.env.removeOnMessage(this.onMessage);
		fireCallback(callback);
	},

	send: function(type, msg, force) {
		msg = msg || {};
		msg.name = type;

		if ( this.queue && ! force ) {
			this.queue.push(msg);
			return;
		}
		console.log("//%s", type);

		for ( var i = 0, port; port = this.ports[i]; i++ )
			port.postMessage(msg);
	},

	sendForced: function(type, msg) {
		this.send(type, msg, true);
	},

	portConnected: function(port) {
		this.ports.push(port);
		port.onDisconnect(this.portDisconnected);
	},

	portDisconnected: function(port) {
		this.ports.remove(port);
	},

	onMessage: function(msg, sender) {
		msg.tab = sender.tab.id;
		this.send(msg.type, msg);
	},

	subscribe: function(name, callback) {
		var fakePort = {
			name: name,
			callback: callback,
			postMessage: function(msg) {
				if ( msg.name !== name )
					return;
				callback(msg);
			}
		};
		this.ports.push(fakePort);
		return fakePort;
	},

	unsubscribe: function(name, callback) {
		for ( var i = 0, port; port = this.ports[i]; i++ ) {
			if ( port.name == name && port.callback == callback )
				this.ports.remove(port);
		}
	},

	hold: function() {
		this.queue = [];
	},

	release: function() {
		var queue = this.queue;
		this.queue = false;

		// Unique queue so we only send the same message once
		// this probably won't do anything right now
		// so
		// TODO: FIXME:
		//queue = queue.unique();

		for (var i = 0, msg; msg = queue[i]; i++) {
			this.send(msg.name, msg);
		}
	},

	// Run a transaction, which holds off on events and other things and combines them until the end
	transaction: function(func) {
		app.events.hold();
		func(function() {
			app.events.release();
		});
	}
});

;
// SQS like queue to post serialized messages

var SQS = Class.extend({
	destroy: function(callback) {
		fireCallback(callback);
	},

	post: function(name) {
		console.log(">>%s", name);

		var args = [].slice.call(arguments, 1);
		var listener = SQS.listeners[name];

		if (listener) {
			listener.run.apply(listener, args);
		} else {
			throw "no sqs listener for: " + name;
		}
	}
});

SQS.consume = function(name, classVars) {
	if (!this.listeners) {
		this.listeners = {};
	}
	this.listeners[name] = new (Class.extend(classVars));
};
;
SQS.consume('post:add', {
	run: function(message, callback) {
		var feed = message.feed;
		var posts = message.posts;

		if (app.user.isPro()) {
			if (feed.type === "rss") {
				ParserStore.get("adder").addPosts(feed, posts, callback);
			} else {
				fireCallback();
			}
		} else {
			ParserStore.get("rss").addPosts(feed, posts, callback);
		}
	}
});

;
SQS.consume('feed:add', {
	run: function(message, callback) {
		var feed = message.feed;
		var posts = message.posts;

		if (app.user.isPro()) {
			if (feed.type === "rss") {
				ParserStore.get("adder").addFeed(feed, posts, callback);
			} else {
				chain(feed.save)
				.end(callback);
			}
		} else {
			ParserStore.get("rss").addFeed(feed, posts, callback);
		}
	}
});

;
var FeedFinder = Class.extend({
	initialize: function() {
		this.availableFeeds = {};
	},

	startListening: function() {
		app.events.subscribe("feedsFound", this.foundInTab);
		app.events.subscribe("shouldIActivateThePopup", this.shouldIActivateThePopup);
		app.events.subscribe("parseFeedAndReturnResults", this.parseFeedAndReturnResults);
		app.events.subscribe("shouldSubscribe", this.shouldSubscribe);
		app.events.subscribe("disableContentHelper", this.shouldDisableContentHelper);
		UI.onTabRemoved(this.tabClosed);
	},

	destroy: function(callback) {
		callback = callback || function() {};

		app.events.unsubscribe("feedsFound", this.foundInTab);
    app.events.unsubscribe("shouldIActivateThePopup", this.shouldIActivateThePopup);
		app.events.unsubscribe("parseFeedAndReturnResults", this.parseFeedAndReturnResults);
    app.events.unsubscribe("shouldSubscribe", this.shouldSubscribe);
    app.events.unsubscribe("disableContentHelper", this.shouldDisableContentHelper);
		UI.removeOnTabRemoved(this.tabClosed);

		callback();
	},

	foundInTab: function(evt) {
		this.availableFeeds[evt.tab] = evt.feeds;
		app.events.send("feeds:found", {tab: evt.tab});
	},

	feedsInCurrentTab: function(callback) {
		var availableFeeds = this.availableFeeds;

		chain(UI.currentTab)
		.then(function(tab) {
			var feeds = availableFeeds[tab.id] || [];
			callback(feeds);
		});
	},

	countFeedsInCurrentTab: function(callback) {
		this.feedsInCurrentTab(function(feeds) {
			callback(feeds.length);
		});
	},

	countFeedsInTab: function(tabId, callback) {
		callback(this.availableFeeds[tabId].length);
	},

	forEachFeed: function(callback) {
		this.feedsInCurrentTab(function(feeds) {
			feeds.forEach(callback);
		});
	},

	tabClosed: function(tabId) {
		delete this.availableFeeds[tabId];
	},

  parseFeedAndReturnResults: function(evt) {
    var path = evt.path;
    var tab = evt.tab;

    var fakeFeed = new Feed();
    fakeFeed.path = path;
    fakeFeed.type = "rss";

    var loader = FeedLoader.forFeed(fakeFeed);
    var parser = FeedParser.forFeed(fakeFeed);

    chain(loader.load)
    .then(parser.setResult)
    .then(parser.parse)
    .then(function(parser) {
      Platform.env.sendMessageToTab(evt.tab, "parsedFeedReturn", {
        feed: parser.getFeed(),
        posts: parser.getPosts(),
        following: !!app.store.feedBy('guid', path)
      });
    });
  },

  shouldIActivateThePopup: function(evt) {
    if (!app.user.preferences.get("global:disableContentHelper")) {
      Platform.env.sendMessageToTab(evt.tab, "yesYouShouldActivateThePopup", {
        hasAskedToShowContentHelper: app.user.preferences.get("global:hasAskedToShowContentHelper")
      });
    }
  },

  shouldSubscribe: function(evt) {
    var path = evt.path;
    var tab = evt.tab;

    app.user.followFeed(path, function(worked) {
      console.log("Following????", worked);
      Platform.env.sendMessageToTab(evt.tab, "subscribedWorked", {
        success: !!worked
      });
    });
  },

  shouldDisableContentHelper: function(evt) {
    if (evt.value) {
      app.user.preferences.set("global:disableContentHelper", true);
    }

    app.user.preferences.set("global:hasAskedToShowContentHelper", true);
  }
});

;
var FeedPoller = Class.extend({
	initialize: function() {},

	destroy: function(callback) {
		callback = callback || function() {};

		app.events.unsubscribe('feed:removed', this.feedRemoved);
		app.events.unsubscribe("feeder:connect", this.feederProStatusChanged);
		clearInterval(this.updateInterval);
		clearTimeout(this.startTimeout);

		callback();
	},

	startPolling: function() {
		console.log("Waiting for %s ms before starting", Config.onLoadPollTimeout);
		this.startTimeout = setTimeout(this.start, Config.onLoadPollTimeout);
		this.isStarted = false;
		this.isInitialized = true;
	},

	start: function() {
		this.checkUpdate();
		this.isStarted = true;
		this.startUpdater();
	},

	startUpdater: function() {
		this.updateInterval = setInterval(this.checkUpdate, Config.pollTimeout);
	},

	// Check for updates, called by the poller every <Config.pollTimeout:30> seconds
	checkUpdate: function() {
		console.log("=== FEED POLL CHECK UPDATE");
		app.events.send('poller:check');
		app.user.forEachFeed(this.checkIfFeedNeedsUpdate);
	},

	forceUpdate: function(callback) {
		app.user.forEachFeed(function(feed) {
			app.poller.updateFeed(feed, true);
		});

		app.events.send('poller:check', { force: true });

		fireCallback(callback);
	},

	checkIfFeedNeedsUpdate: function(feed) {
		var wait = feed.updateinterval || app.user.preferences.get('global:updateInterval');
		var lastUpdated = feed.lastUpdated;

		if (Date.now() - lastUpdated >= wait) {
			this.updateFeed(feed);
		}
	},

	updateFeed: function(feed, force) {
		app.events.send('feed:needsUpdate', {
			feed: feed.id,
			force: force
		});
	}
});

;
var FeedLoader = Class.extend({
	initialize: function(feed) {
		this.feed = feed;
	},

	load: function(callback) {
		this.request = new Request({
			url: this.pathToLoad(),
			onComplete: this.loadComplete.withCallback(callback),
			onError: function() {
				callback('', '');
			},
			timeout: 30000
		});

		this.request.send();
	},

	loadComplete: function(status, text, xml, callback) {
		callback(xml || '', (text || '').trim() || '');
	},

	pathToLoad: function() {
		return this.feed.getPath();
	},

	abort: function() {
		this.isAborted = true;
		this.request.abort();
	}
});

FeedLoader.forFeed = function(feed) {
	var klass = {
		'rss': RSSLoader,
		'online': OnlineLoader
	}[feed.type] || RSSLoader;
	return new klass(feed);
};

FeedLoader.load = function(feed, callback) {
	var loader = FeedLoader.forFeed(feed);
	var parser = FeedParser.forFeed(feed);

	feed.loader = loader;

	chain(loader.load)
	.then(parser.setResult)
	.then(parser.parse)
	.then(function(parser) {
		callback(parser);
	});
};

;
/*
	Class:
		FeedParser

	Reads an RSS with callbacks for posts
*/

var FeedParser = Class.extend({
	initialize: function(feed) {
		this.feed = feed;
		this.path = feed.path;

		this.error = false;
		this.posts = [];
		this.data = {};
	},

	setResult: function(callback) { throw "implement"; },
	parse: function(callback) { throw "implement"; },

	getFeed: function() {
		var feed = new Feed();
		feed.path = this.data.path;
		feed.copyPropertiesFromServerData(this.data);
		feed.lastUpdated = Date.now();
		feed.favicon = this.feed.favicon || "";
		feed.meta = this.feed.meta || "";
		feed.type = this.feed.type || "rss";
		feed.title = this.data.title || this.data.path;
		feed.guid = this.data.guid;
		return feed;
	},

	// Transform post data into Post-objects
	getPosts: function() {
		return this.posts.map(this.makePost);
	},

	makePost: function(post) {
		var p = new Post(post);
		p.published_from_feed = post.published_from_feed;
		p.published = p.published_from_feed || (Date.now() - post.index);
		p.feed_id = this.feed.id;
		if ( this.allAreRead )
			p.is_read = 1;
		return p;
	}
});

FeedParser.forFeed = function(feed) {
	var klass = {
		'rss': FeederRSSParser,
		'online': OnlineParser
	}[feed.type || 'rss'];
	return new klass(feed);
};

;
var FeedUpdater = Class.extend({
	initialize: function() {
		// A list of currently updating feeds
		this.updating = [];

		// A list of feeds that need update, but the queue is too crowded for
		this.waiting = [];
	},

	startListening: function() {
		// Subscribe to know when an app is eligible for update
		app.events.subscribe('feed:needsUpdate', this.eventUpdateFeed);

		// Subscribe to know when the poller is checking updates. This is when we go through the queue
		// Some platforms might even support unread counts checking
		app.events.subscribe('poller:check', this.eventPollerCheck);
	},

	destroy: function(callback) {
		this.isDestroyed = true;
		app.events.unsubscribe('feed:needsUpdate', this.eventUpdateFeed);
		app.events.unsubscribe('poller:check', this.eventPollerCheck);

		// Abort ongoing requests
		for ( var i = 0, feed; feed = this.updating[i]; i++ )
			feed.loader.abort();

		fireCallback(callback);
	},

	eventPollerCheck: function(message) {
		var force = false;
		if (message && message.force) {
			force = true;
		}

		for ( var i = 0, feed; (feed = this.waiting[i]) && i < Config.maxConcurrentUpdates; i++ )
			this.updateFeed(app.user.feed(feed));

		if (this.supportsUnreadCounts(force))
			this.checkUnreadCounts();
	},

	eventUpdateFeed: function(evt) {
		this.updateFeed(app.user.feed(evt.feed), evt.force);
	},

	// Update feed, if it can't, ie max concurrent updates is reached, skip it, and wait till next time
	updateFeed: function(feed, force) {
		// Feed might not even exist!
		if (!feed) {
			return;
		}

		// We don't update feeds on the online platform, since it's only doing an API call
		if (feed.type !== "rss" || Ext.isOnline()) {
			return;
		}

		// If is in update list, something is probably wrong, but don't update it twice
		if (this.updating.contains(feed.id)) {
			return;
		}

		// Only update <Config.maxConcurrentUpdates> feeds at a time
		if (this.updating.length >= Config.maxConcurrentUpdates && ! force){
			if (!this.waiting.contains(feed.id)) {
				this.waiting.push(feed.id);
			}
			return;
		}

		this.runUpdate(feed);
	},

	runUpdate: function(feed, callback) {
		this.waiting.remove(feed.id);
		this.updating.push(feed.id);

		chain(this.loadFeed, feed)
		.then(this.storeResults)
		.end(callback);
	},

	loadFeed: function(feed, callback) {
		feed.isUpdating = true;

		var loader = FeedLoader.forFeed(feed);
		var parser = FeedParser.forFeed(feed);
		var updating = this.updating;

		feed.loader = loader;

		chain(loader.load)
		.then(parser.setResult)
		.then(parser.parse)
		.then(function(parser) {
			feed.isUpdating = false;

			// Remove feed as updating since it isn't
			updating.remove(feed.id);

			// Could have been aborted? Don't do anything
			if (loader.isAborted){
				callback(false);
				return chain.exit;
			}

			// If an error occured send out an error event, and exit the chain
			if (parser.error){
				app.events.send('error', {code: 'PARSER_ERROR'});
				app.events.send('updater:failed', {feed: parser.feed.id});
				feed.lastUpdated = Date.now();
				callback(false);
				return chain.exit;
			}

			callback(parser);
		});
	},

	storeResults: function(parser, callback) {
		if (! parser){
			callback();
			return;
		}

		var feed = parser.feed;
		feed.loadFavicon();

		// Keep track of when last "offical" update was stored
		feed.lastUpdated = Date.now();

		// If removed while updating, don't do didly
		if (feed.deleted)
			return;

		var posts = parser.getPosts();

		if (feed.type !== "rss")
			return fireCallback(callback);

		app.sqs.post("post:add", {feed: feed, posts: posts});
	},

	supportsUnreadCounts: function(force) {
		if (Ext.isOnline() || app.user.isPro()) {
			if (app.socketIsConnected && !force) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	},

	checkUnreadCounts: function() {
		app.sync.loadUnreadCounts(this.checkUnreadCountsForNew);
	},

	checkUnreadCountsForNew: function(counts) {
		for (var feedId in counts) if (counts.hasOwnProperty(feedId)) {
			// If feed was removed
			if (! app.user.feed(feedId))
				continue;

			this.checkUnreadCountAndLastUpdatedForFeed(app.user.feed(feedId), counts[feedId].last_updated, counts[feedId].unread);
		}
	},

	checkUnreadCountAndLastUpdatedForFeed: function(feed, lastUpdated, unread) {
		var storedUnreadCountForFeed = app.user.unreads.forFeed(feed.id);
		app.user.unreads.updateForFeed(feed.id, unread, {
			manual: false
		});

		// If storedUnreadCountForFeed is undefined then it's the first time around
		// so we send a feed:updated event, which otherwise would be taken care of by the updated below
		if (typeof storedUnreadCountForFeed === "undefined") {
			app.events.send("feed:updated", {
				feed: feed.id,
				manual: false
			});
		}

		// If no previous api check has been done, or no unread counts have been stored, just wait
		if (typeof feed.apiLastUpdated === "undefined" || typeof storedUnreadCountForFeed === "undefined" ) {
			feed.apiLastUpdated = lastUpdated;
			feed.previousUnreadCount = storedUnreadCountForFeed;
			return;
		}

		// Has the feed updated since we last checked, or just that unread count has changed?
		if (feed.apiLastUpdated != lastUpdated || storedUnreadCountForFeed != unread) {
			console.log("NEEDS UPDATE: %s # %s != %s || %s != %s", feed.title, feed.apiLastUpdated, lastUpdated, storedUnreadCountForFeed, unread);

			feed.needsUpdate = true;
			feed.previousUnreadCount = storedUnreadCountForFeed;

			// Store previous api check time so we have a range to go by
			feed.previousApiLastUpdated = feed.apiLastUpdated;
			feed.apiLastUpdated = lastUpdated;

			app.events.send("feed:backendUpdated", {feed: feed.id});

			return true;
		}

		return false;
	}
});

;
/*
	Class:
		FeedSync

	Sync feeds with other clients. Do so by listening for feed:*-events, like feed:added, feed:removed.
*/

var FeedSync = Class.extend({
	initialize: function() {
		this.syncers = [];
		this.syncerMap = {};
	},

	destroy: function(callback) {
		this.run('destroy', [], callback);
	},

	isFailedState: function() {
		return this.syncers.some(function(syncer) {
			return syncer.FAILURE;
		});
	},

	run: function(command, args, callback) {
		var link = chain();
		for ( var i = 0, syncer; syncer = this.syncers[i]; i++ )
			link.and.apply(link, [syncer[command]].concat(args));

		link.end(callback);
	},

	can: function(method) {
		return !!this.getWith(method);
	},

	getWith: function(method) {
		return this.syncers.filter(function(sync) {
			return typeof sync[method] === "function";
		})[0];
	},

	// Register all syncers
	startSyncing: function(callback) {
		chain(this.reloadSyncers)
		.and(this.addFeeder)
		.end(callback);
	},

	reloadSyncers: function(callback) {
		var queue = chain();

		if (Ext.isOnline() || app.user.isPro()) {
			queue.and(this.addOnline);
		}

		queue.end(callback);
	},

	createSyncer: function(name, syncerClass, callback) {
		var syncer = new syncerClass();
		syncer.startListening();

		this.syncers.push(syncer);
		this.syncerMap[name] = syncer;

		fireCallback(callback, syncer);

		return syncer;
	},

	unconnectSyncer: function(name) {
		var syncer = this.syncerMap[name];
		if (!syncer)
			return;
		this.syncers.remove(syncer);
		delete this.syncerMap[name];
		return syncer;
	},

	removeSyncer: function(name, callback) {
		var syncer = this.unconnectSyncer(name);

		chain(syncer.destroy)
		.and(syncer.uninstall)
		.then(function(feedsWithProblems) {
			callback(feedsWithProblems);
		});
	},

	fetchUpstream: function(callback) {
		this.run('fetchUpstream', [], callback);
	},

	processFeed: function(feed, callback) {
		this.run('processFeed', [feed], callback);
	},

	reloadDownstream: function(callback) {
		this.run('reloadDownstream', [], callback);
	},

	loadUnreadCounts: function(callback) {
		var syncer = false;
		if (this.get('online'))
			syncer = this.get('online');
		if (! syncer)
			return callback(false);
		syncer.loadUnreadCounts(callback);
	},

	push: function() {
		var args = [].slice.call(arguments);
		var callback = args[args.length-1];
		var syncers = args.slice(0, -1);

		if (! syncers.length) {
			syncers = this.syncers;
		}

		var exporter = new Exporter();

		var queue = chain();
		syncers.forEach(function(sync) {
			queue.and(sync.pushUp, exporter.feeds);
		});

		queue.end(callback, exporter);
	},

	get: function(syncer) {
		return this.syncerMap[syncer];
	},

	error: function(t) {
		alert("ERROR with " + t + ".");
	},

	//
	// Feeder setup
	//

	addFeeder: function(callback) {
		return this.createSyncer("feeder", FeederSyncer, callback);
	},

	addOnline: function(callback) {
		return this.createSyncer("online", OnlineSyncer, callback);
	},

	//
	// Feed syncing
	//

	mergeContainer: function(feedContainer, callback) {
		this.currentFolder = app.user.structure.base;

		app.events.transaction(function(flushEvents) {
			chain(this.merge, feedContainer.base)
			.and(app.user.structure.save)
			.andSync(flushEvents)
			.andSync(function() {
				app.events.sendForced("sync:merge", {status: "Merge done"});
			})
			.end(callback, true);
		}.bind(this));
	},

	merge: function(folder, callback) {
		var queue = chain(), mergeItem = this.mergeItem;

		app.events.sendForced("sync:merge", {status: "Merging " + folder.name});

		folder.forEachItem(function(item) {
			queue.and(mergeItem, item);
		});

		queue.end(callback);
	},

	mergeItem: function(item, callback) {
		if (item.isFeed) {
			this.mergeFeed(item, callback);
		} else {
			this.mergeFolder(item, callback);
		}
	},

	mergeFeed: function(feed, callback) {
		var currentFolder = this.currentFolder;

		var newFeed = new Feed(feed);
		if (!feed.type) {
			feed.type = "rss";
		}
		delete newFeed.id;

		app.events.sendForced("sync:merge", {status: "Merging feed " + feed.title});

		chain(Mapper.get("feed").addFeedIfNotExistsWithoutFolder, newFeed)
		.andSync(function() {
			console.log("Was created: %d", newFeed.id)
			if (newFeed.id && !currentFolder.hasFeed(newFeed.id)) {
				console.log("adding %d to %d", currentFolder.id);
				currentFolder.addFeed(newFeed.id);
			} else {
				console.log("currentFolder already had feed");
			}
		})
		.end(callback);
	},

	mergeFolder: function(folder, callback) {
		delete folder.id;

		var syncer = this;

		app.events.sendForced("sync:merge", {status: "Merging folder " + folder.name});

		chain(app.user.structure.findByParentAndName, syncer.currentFolder.id, folder.name)
		.then(function(addedFolder) {
			if ( ! syncer.currentFolder.hasFolder(addedFolder.id) )
				syncer.currentFolder.addFolder(addedFolder.id);
			syncer.mergeNextFolder(addedFolder, folder, callback);
		});
	},

	mergeNextFolder: function(addedFolder, folder, callback) {
		var lastFolder = this.currentFolder;
		this.currentFolder = addedFolder;

		chain(this.merge, folder)
		.end(this.mergeFolderDone, lastFolder, callback);
	},

	mergeFolderDone: function(lastFolder, callback) {
		this.currentFolder = lastFolder;
		callback();
	}
});

;
var FeedContainer = Class.extend({
	initialize: function() {
		this.feeds = {};
		this.folders = {};
		
		this.feedIdCounter = 9999999;
		this.folderIdCounter = 9999999;
		
		this.base = false;
		this.folderQueue = [];
	},
	
	addFeed: function(data) {
		var originalId = data.id || false;

		var feed = new Feed(data);
		feed._originalId = originalId;
		
		// this is wrong? this.feeds[id] = feed
		if ( this.feeds[feed.guid] )
			return;
		
		if ( ! feed.favicon )
			feed.favicon = app.config.defaultFavicon(feed.path);
		
		if ( ! feed.title )
			feed.title = feed.path;
		
		if ( ! feed.type )
			feed.type = "rss";
		
		TRYIT(function() {
			if ( ! feed.link )
				feed.link = "http://" + (new URI(feed.path)).host();
		});
		
		if ( ! feed.id )
			feed.id = this.feedIdCounter++;
		this.feeds[feed.id] = feed;
		
		this.currentFolder.addFeed(feed.id);
	},
	
	addFolder: function(folder) {
		folder.id = this.folderIdCounter++;
		this.folders[folder.id] = folder;
		
		if ( this.currentFolder )
			this.currentFolder.addFolder(folder.id);
	},
	
	pushFolder: function(name) {
		var folder;
		if ( typeof name === "string" ) {
			folder = new Folder();
			folder.name = name;
		
			this.addFolder(folder);
		} else
			folder = name;
		folder.structure = this;
		
		if ( ! this.base ) {
			this.base = folder;
			folder.standard = true;
		}
		
		this.currentFolder = folder;
		this.folderQueue.push(folder);
		
		return folder;
	},
	
	popFolder: function() {
		this.folderQueue.pop();
		this.currentFolder = this.folderQueue[this.folderQueue.length-1];
	},
	
	feed: function(id) {
		return this.feeds[id];
	},
	
	folder: function(id) {
		return this.folders[id];
	},
	
	forEachFeed: function(callback) {
		for ( var key in this.feeds ) if (this.feeds.hasOwnProperty(key))
			fireCallback(callback, this.feeds[key]);
	},
	
	removeFeed: function(feed) {
		this.feedToRemove = feed;
		delete this.feeds[feed];
		this.recRemoveFeed(this.base);
	},

	recRemoveFeed: function(folder) {
		folder.removeFeed(this.feedToRemove.id);
		folder.getFolders().forEach(this.recRemoveFeed);
	},

	toJSON: function() {
		var obj = {name: "Feeds"};
		obj.items = this.base.items().map(function serialize(item) {
			if (item.isFeed)
				return item.toJSON();
			else {
				var folder = item.toJSON();
				folder.items = item.items().map(serialize);
				return folder;
			}
		});
		return JSON.stringify(obj);
	}
});
;
var FeedUnreadContainer = Class.extend({
	initialize: function() {
		this.feeds = {};
	},

	addPostFor: function(feed, post) {
		if (!this.feeds[feed.path])
			this.feeds[feed.path] = [];

		this.feeds[feed.path].push({
			title: post.title,
			link: post.link,
			guid: post.guid,
			is_read: post.is_read,
			is_starred: post.is_starred
		});
	},

	toJSON: function() {
		return JSON.stringify(this.feeds);
	}
});
;
var PUSHER_MISSING_TIME = 5 * 60 * 1000;
var PUSHER_RECONNECT_TIME = 30 * 1000;

var PusherReceiver = Class.extend({
  initialize: function(app) {
    this.app = app;
    this.app.events.subscribe("online:socketToken", this.didGetSocketToken);
    this.app.events.subscribe("feeds:recount", this.feedsDidRecount);

    // Wait 2.5 seconds before calling force update
    this.debouncedWaitUpdate = debounce(this.triggerNewPostFetch, 2500);

    // This is called whenever the socket re-connects, to get a fresh count of unreads and make sure our reference frame is correct
    this.longDebouncedWaitUpdate = debounce(this.debouncedWaitUpdate, PUSHER_RECONNECT_TIME);

    // Poll every 5 minutes if we miss something
    this.fallbackPollingTimer = setInterval(this.debouncedWaitUpdate, PUSHER_MISSING_TIME);
  },

  destroy: function(callback) {
    this.app.events.unsubscribe("online:socketToken", this.didGetSocketToken);
    this.clearInterval(this.fallbackPollingTimer);
    fireCallback(callback);
  },

  didGetSocketToken: function(message) {
    if (this.currentToken === message.token || !message.token) {
      return;
    }

    this.currentToken = message.token;
    this.connect();
  },

  connect: function() {
    if (!this.currentToken) {
      console.error("PusherReceiver.connect called before currentToken set");
      return;
    }

    if (this.socket) {
      this.socket.destroy();
    }

    this.socket = io(Config.feeder.pusherURL, {
      query: {
        token: this.currentToken
      }
    });
    this.socket.on("connect", this.didConnect);
    this.socket.on("disconnect", this.didDisconnect);
    this.socket.on("feedupdated", this.newMessageReceived);
    this.socket.on("feeds:recount", this.feedsRecountReceived);
  },

  newMessageReceived: function(message) {
    console.log("[pusher] got message", message);
    this.debouncedWaitUpdate();
  },

  didConnect: function() {
    app.socketIsConnected = true;
    console.log("[pusher]: did connect");
    this.longDebouncedWaitUpdate();
  },

  didDisconnect: function() {
    app.socketIsConnected = false;
    console.log("[pusher]: did disconnect");
  },

  triggerNewPostFetch: function() {
    if (app.user.isPro()) {
      this.app.poller.forceUpdate();
    }
  },

  feedsDidRecount: function(msg) {
    if (!this.app.socketIsConnected) {
      return;
    }

    if (!msg.manual) {
      return;
    }

    if (msg.total == this.lastBroadcastedUnreads) {
      return;
    }

    this.lastBroadcastedUnreads = msg.total;
    this.lastBroadcastTime = Date.now();

    console.log("[pusher] Unreads updated");

    this.socket.emit("feeds:recount", {
      counts: app.user.unreads.unreadCounts,
      broadCastId: this.lastBroadcastTime
    });
  },

  feedsRecountReceived: function(msg) {
    if (msg.broadCastId == this.lastBroadcastTime) {
      console.log("(got message but ignored)")
      return;
    }

    console.log("[pusher] Update counts", msg.counts);

    app.user.unreads.unreadCounts = msg.counts;
    app.events.send("feeds:recount", {
      total: app.user.unreads.countStored(),
      manual: false
    });
  }
});

;
/*
	Class:
		Importer

	Takes care of importing old folder structure to FeedReader 4.0.
	Also takes care of migrations between DB versions.
*/

var Importer = Class.extend({
	initialize: function() {
		this.migrationMapper = Mapper.get("migration");
	},

	install: function(callback) {
		if (Database.current.isApi)
			return callback();
		this.migrationMapper.install(callback);
	},

	migrateDB: function(callback) {
		if (Database.current.isApi)
			return callback();
		this.migrationMapper.migrate(callback);
	}
});

;
/*
	Class:
		Exporter

	Creates a container with the local DB. In the future this class should be made smarter, by creating an abstract container
	for foreign feed data.
*/

var Exporter = Class.extend({
	initialize: function() {
		// Build a structure with the final result
		this.buildStructure();
	},

	buildStructure: function() {
		this.feeds = app.user.createFeedContainer();
		this.feeds.pushFolder("Feeds");

		this.nestedFolders = [];

		// Merge current structure into it
		app.user.structure.base.forEachItem(this.addCurrentItem);

		// Add nested folders to bottom folder
		this.nestedFolders.forEach(function(folder) {
			this.feeds.pushFolder(folder.name);
			folder.getFeeds().forEach(this.addCurrentFeed);
			this.feeds.popFolder();
		}, this);
	},

	addCurrentItem: function(item) {
		if ( item.isFeed )
			this.addCurrentFeed(item);
		else {
			// If in base folder (since we don't support nested folders)
			if ( this.feeds.base === this.feeds.currentFolder )
				this.addCurrentFolder(item);
			else
				this.addNestedFolder(item);
		}
	},

	addCurrentFeed: function(feed) {
		if ( this.feeds.currentFolder.feedBy('path', feed.path) )
			return;
		this.feeds.addFeed(feed);
	},

	addCurrentFolder: function(folder) {
		var folderInstance = this.feeds.currentFolder.folderBy('name', folder.name);

		this.feeds.pushFolder(folderInstance || folder.name);
		folder.items().forEach(this.addCurrentItem);
		this.feeds.popFolder();
	},

	addNestedFolder: function(folder) {
		this.nestedFolders.push(folder);
		folder.getFolders().forEach(this.addNestedFolder);
	}
});
;
/*
	Class:
		Syncer
	
	Base class for syncing to services
*/

var Syncer = Class.extend({
	startListening: function() {
		app.events.subscribe('feed:added', this.feedAdded);
		app.events.subscribe('feed:updated', this.feedUpdated);
		app.events.subscribe('feed:removed', this.feedRemoved);
		app.events.subscribe('post:updated', this.postUpdated);
		app.events.subscribe('folder:updated', this.folderUpdated);
		app.events.subscribe('folder:added', this.folderAdded);
		app.events.subscribe('folder:removed', this.folderRemoved);
		app.events.subscribe('preferences:changed', this.preferencesChanged);
	},
	
	destroy: function(callback) {
		callback = callback || function() {};
		
		app.events.unsubscribe('feed:added', this.feedAdded);
		app.events.unsubscribe('feed:updated', this.feedUpdated);
		app.events.unsubscribe('feed:removed', this.feedRemoved);
		app.events.unsubscribe('post:updated', this.postUpdated);
		app.events.unsubscribe('folder:updated', this.folderUpdated);
		app.events.unsubscribe('folder:added', this.folderAdded);
		app.events.unsubscribe('folder:removed', this.folderRemoved);
		app.events.unsubscribe('preferences:changed', this.preferencesChanged);
		
		callback();
	},
	
	run: function(command, args) {
		this[command].apply(this, args);
	},

	failedInit: function() {
		this.FAILURE = true;
	},

	succeededInit: function() {
		this.FAILURE = false;
	},
	
	processFeed: function(feed, callback) { throw "implement Syncer.processFeed"; },
	
	feedAdded: function(evt, callback) { throw "implement Syncer.feedAdded"; },
	feedUpdated: function(evt, callback) { throw "implement Syncer.feedUpdated"; },
	feedRemoved: function(evt, callback) { throw "implement Syncer.feedRemoved"; },
	postUpdated: function(evt, callback) { throw "implement Syncer.postUpdated"; },
	folderUpdated: function(evt, callback) { throw "implement Syncer.folderUpdated"; },
	folderAdded: function(evt, callback) { throw "implement Syncer.folderAdded"; },
	folderRemoved: function(evt, callback) { throw "implement Syncer.folderRemoved"; },
	preferencesChanged: function(evt, callback) {},
	
	fetchUpstream: function(callback) { throw "implement Syncer.fetchUpstream"; },
	pushUp: function(order, callback) { throw "implement Syncer.pushUp"; },
	reloadDownstream: function() { throw "implement Syncer.reloadDownstream"; }

	// optionally implemented by those who support it
	//clearAllUnread: function() {},
	//clearAllUnreadEverywhere: function() {}
});

;
"use strict";

var FEEDER_SYNCER_CHECK_TIMER_INTERVAL = 60 * 60 * 1000;

var FeederSyncer = Syncer.extend({
	startListening: function() {
		this._super.apply(this, arguments);

		app.events.subscribe("feeder:connect", this.receivedConnectRequest);
		app.events.subscribe("feeder:fetchFeeds", this.receivedFetchFeedsRequest);
		app.events.subscribe("feeder:statusMightHaveChanged", this.checkToken);

		this.checkResponse = {};

		this.checkToken();
		this.checkTokenTimer = setInterval(this.checkToken, FEEDER_SYNCER_CHECK_TIMER_INTERVAL);

		if (Ext.isSafari()) {
			safari.extension.addContentScriptFromURL(Ext.path("content/feeder_api.js"), ["http://*.feeder.co/*", "https://*.feeder.co/*"], [], true);
    }
	},

	destroy: function() {
		this._super.apply(this, arguments);

		app.events.unsubscribe("feeder:connect", this.receivedConnectRequest);
		app.events.unsubscribe("feeder:fetchFeeds", this.receivedFetchFeedsRequest);
		app.events.unsubscribe("feeder:statusMightHaveChanged", this.checkToken);
		clearInterval(this.checkTokenTimer);

		if (Ext.isSafari()) {
			safari.extension.removeContentScriptFromURL(Ext.path("content/feeder_api.js"));
    }
	},

	uninstall: function(callback) {
		var oldToken = app.user.preferences.get("feeder:token");

		var removeTokenRequest = new Request({
			url: Config.feeder.destroyTokenURL,
			method: "POST"
		});

		removeTokenRequest.send({
			post: {
				client_id: app.user.preferences.get("client_id"),
				token: oldToken
			}
		});

		this.removeProPreferences();

		app.sync.removeSyncer("online");

		chain(app.user.moveToLocalDatabase)
		.and(app.user.reloadFeeds)
		.and(app.sync.reloadSyncers)
		.andSync(function() {
			app.events.send("feeder:expiredChanged");
		})
		.end(callback);
	},

	removeProPreferences: function() {
		app.user.preferences.remove("feeder:token");
		app.user.preferences.remove("feeder:email");
		app.user.preferences.remove("feeder:intercom_hash");
		app.user.preferences.remove("feeder:intercom_app_id");
	},

	receivedConnectRequest: function(evt) {
		var connectURL = evt.connectURL;
		this.doMerge = evt.doMerge;

		var clientId = app.user.preferences.get("client_id");

		var req = new Request({
			url: connectURL,
			onComplete: this.connectRequestComplete.andArguments(evt.tab)
		});

		req.send({
			get: {
				client_id: clientId
			}
		});
	},

	connectRequestComplete: function(status, text, xml, tab) {
		var resp = tryToParseJSON(text);

		if (!resp || resp.error || !resp.token) {
			return alert(resp.error || "Could not connect to Feeder account");
		}
		this.receivedToken(resp.token, resp.email);
		this.syncFeeds(this.connectDone.withArguments(tab, resp.redirect));
	},

	connectDone: function(tab, redirect) {
		UI.tabChangeURL(tab, redirect)
		app.events.send("feeder:connected");
	},

	receivedToken: function(token, email) {
		app.user.preferences.set("feeder:token", token);
		app.user.preferences.set("feeder:email", email);
	},

	checkToken: function(callback) {
		var token = app.user.preferences.get("feeder:token");
		var clientId = app.user.preferences.get("client_id");

		if (!token && !Ext.isOnline()) {
			return fireCallback(callback, false);
		}

		var req = new Request({
			url: app.config.feeder.checkURL,
			onComplete: this.checkedToken.withCallback(callback)
		});

		req.send({
			get: {
				token: token || "",
				client_id: clientId
			}
		});
	},

	checkedToken: function(status, responseText, responseXML, callback) {
		app.user.proExpired = false;

		var response = tryToParseJSON(responseText);
		this.checkResponse = response || {};

		if (response && response.is_pro) {
			app.user.preferences.set("feeder:email", response.email);
			app.user.preferences.set("feeder:id", response.user_id);
			app.user.preferences.set("feeder:intercom_hash", response.intercom_hash);
			app.user.preferences.set("feeder:intercom_app_id", response.intercom_app_id);
			fireCallback(callback, true);
		} else if (response && response.expired) {
			app.user.proExpired = true;
			fireCallback(callback, false);
		} else if (response && response.no_pro_for_token) {
			this.removeProPreferences();
			app.user.switchToLocalDatabase();
			console.error(response, "indicated invalid feeder token");
		} else {
			app.events.send("feeder:connected");
			fireCallback(callback, false);
		}

		app.events.send("feeder:expiredChanged");
	},

	syncFeeds: function(callback) {
		var opml = ExportImport.Export.exportFeeds();
		var importer = new ExportImport.Import(opml);

		var unreads = ExportImport.Export.exportUnreads();

		chain(ExportImport.Export.exportUnreads)
		.thenSync(function(unreadContainer) {
			app.sync.get("feeder").unreadContainer = unreadContainer;
		})
		.and(app.user.moveToAPIDatabase)
		.and(app.sync.addOnline)
		.and(app.user.hasFeeds() && this.doMerge ? importer.load : function(next) { next(true); })
		.thenSync(function(success) {
			if ( ! success )
				alert("There was a problem syncing your feeds");
		})
		.and(this.doMerge ? this.syncUnreads : function(next) { next(true); })
		.thenSync(function(success) {
			if ( ! success )
				alert("There was a problem syncing your feeds")
		})
		.and(app.user.unreads.forceCount)
		.end(callback);
	},

	syncUnreads: function(callback) {
		var data = this.unreadContainer.toJSON();

		// Reroute request to API
		var request = new Request({
			method: 'POST',
			url: OnlineSyncer.path('/api/sync-posts-of-interest.json'),
			onComplete: this.syncUnreadsComplete.withCallback(callback),
			addFeederAuthorization: true
		});

		request.send({post: {feeds: data}});
	},

	syncUnreadsComplete: function(status, text, xml, callback) {
		callback(status == 200);
	},

	processFeed: function(feed, callback) { fireCallback(callback); },
	preferencesChanged: function(callback) { fireCallback(callback); },
	feedAdded: function(evt, callback) { fireCallback(callback); },
	feedUpdated: function(evt, callback) { fireCallback(callback); },
	feedRemoved: function(evt, callback) { fireCallback(callback); },
	postUpdated: function(evt, callback) { fireCallback(callback); },
	folderUpdated: function(evt, callback) { fireCallback(callback); },
	folderAdded: function(evt, callback) { fireCallback(callback); },
	folderRemoved: function(evt, callback) { fireCallback(callback); },
	fetchUpstream: function(callback) { fireCallback(callback); },

	pushUp: function(order, callback) { fireCallback(callback); },

	getEmail: function() {
		return app.user.preferences.get("feeder:email");
	},

	receivedFetchFeedsRequest: function(evt) {
		var container = app.user.structure.base.toContainer().toJSON();
		app.events.send("feeder:feedsFetched", {feeds: container});
	},

	loginToPro: function(data, callback) {
		var request = new Request({
			method: "POST",
			contentType: "json",
			url: OnlineSyncer.path("/1/session.json"),
			onComplete: function(status, text, xml) {
				var resp = tryToParseJSON(text) || {};
				var token = resp.session && resp.session.token;
				if (token) {
					this.receivedToken(token, data.email);

					chain(this.syncFeeds)
					.and(this.checkToken)
					.end(function() {
						app.events.send("feeder:connected");
						callback(true, false);
					});
				} else {
					callback(false, resp.errors);
				}
			}.bind(this)
		});

		data.client_id = app.user.preferences.get("client_id");
		request.send({
			post: {
				session: data
			}
		});
	},

	signupToPro: function(data, callback) {
		var request = new Request({
			method: "POST",
			contentType: "json",
			url: OnlineSyncer.path("/1/user.json"),
			onComplete: function(status, text, xml) {
				var resp = tryToParseJSON(text) || {};
				if (resp.session) {
					this.receivedToken(resp.session.token, data.email);

					chain(this.syncFeeds)
					.and(this.checkToken)
					.end(function() {
						app.events.send("feeder:connected");
						callback(true, false);
					});
				} else {
					callback(false, resp.errors);
				}
			}.bind(this)
		});

		data.client_id = app.user.preferences.get("client_id");

		request.send({
			post: {
				user: data
			}
		});
	},

  downgradeToLite: function(callback) {
		app.user.setDidChooseToUseBasic(true);

    var proFeeds = {};
    var proFolders = {};
    var proStarred = {};
    var proUnread = {};

    var localFeeds = {};
    var localFolders = {};
    var localStarred = {};
    var localUnread = {};

    // list all feeds
    chain(Mapper.get("feed").find, {}, {})
    .thenSync(function(feeds) {
      console.log("1. feeds", feeds);
      if (!feeds) {
        callback(false);
        return chain.exit;
      }

      feeds.forEach(function(feed) {
        proFeeds[feed.id] = feed.getValues();
      });
    })
    // list all folders
    .and(Mapper.get("folder").find, {}, {})
    .thenSync(function(folders) {
      console.log("2. folders", folders);
      if (!folders) {
        callback(false);
        return chain.exit;
      }

      folders.forEach(function(folder) {
        proFolders[folder.id] = folder.getValues();
      });
    })
    // list all starred
    .and(Mapper.get("post").find, {is_starred: 1}, {limit: 1000})
    .thenSync(function(posts) {
      console.log("3. starred", posts);
      if (!posts) {
        callback(false);
        return chain.exit;
      }

      posts.forEach(function(post) {
        proStarred[post.id] = post.getValues();
      });
    })
    // list all unread
    .and(Mapper.get("post").find, {is_read: 0}, {limit: 1000})
    .thenSync(function(posts) {
      console.log("4. unreads", posts);

      if (!posts) {
        callback(false);
        return chain.exit;
      }

      posts.forEach(function(post) {
        proUnread[post.id] = post.getValues();
      });
    })

    // switch database
    .and(app.user.moveToLocalDatabase)
    .and(app.user.truncateAll)

    // add feeds, map ids
    .and(function(next) {
      console.log("5. add feeds");

      var queue = chain();
      Object.keys(proFeeds).forEach(function(feedId) {
        var localFeed = new Feed();
        localFeed.copyPropertiesFrom(proFeeds[feedId]);
        delete localFeed.id;
        localFeed.quirks = "";
        localFeed.type = "rss";
				localFeed.guid = localFeed.path;

        queue.and(localFeed.save)
        .thenSync(function(res) {
          localFeeds[feedId] = localFeed;
        });
      });
      queue.end(next);
    })
    // add folders with remapped ids
    .and(function(next) {
      console.log("6. add folders");

      var queue = chain();
      Object.keys(proFolders).forEach(function(folderId) {
        var localFolder = new Folder();
        localFolder.copyPropertiesFrom(proFolders[folderId]);
        delete localFolder.id;

        localFolder.orderstring = "";
        queue.and(localFolder.save)
        .thenSync(function(res) {
          localFolders[folderId] = localFolder;
        });
      });
      queue.end(next);
    })
    // remap folder ids
    .and(function(next) {
      console.log("7. remap folders");

      var queue = chain();
      Object.keys(proFolders).forEach(function(folderId) {
        var proFolder = proFolders[folderId];
        var localFolder = localFolders[folderId];

        localFolder.orderstring = (proFolder.orderstring || "").split(",").map(function(str) {
          var pieces = str.split(":");
          if (pieces.length != 2) {
            return false;
          }

          var id = false;
          if (pieces[0] === "f") {
            id = localFeeds[pieces[1]] && localFeeds[pieces[1]].id;
          } else if (pieces[0] === "d") {
            id = localFolders[pieces[1]] && localFolders[pieces[1]].id;
          }

          if (!id) {
            return false;
          }

          return [pieces[0], id].join(":");
        }).filter(function(a) { return !!a; }).join(",");

        queue.and(localFolder.save);
      });
      queue.end(next);
    })
    // add all starred with remapped feed id
    .and(function(next) {
      console.log("8. add starred");

      var queue = chain();
      Object.keys(proStarred).forEach(function(postId) {
        var localPost = new Post();
        localPost.copyPropertiesFrom(proStarred[postId]);
        delete localPost.id;

				localPost.published = localPost.published * 1000;

        localPost.feed_id = localFeeds[proStarred[postId].feed_id] && localFeeds[proStarred[postId].feed_id].id;
        if (!localPost.feed_id) {
          return;
        }

        queue.and(localPost.save);
      });
      queue.end(next);
    })
    // add all unread with remapped feed id
    .and(function(next) {
      console.log("8. add unread");

      var queue = chain();
      Object.keys(proUnread).forEach(function(postId) {
        var localPost = new Post();
        localPost.copyPropertiesFrom(proUnread[postId]);
        delete localPost.id;

				localPost.published = localPost.published * 1000;

        localPost.feed_id = localFeeds[proUnread[postId].feed_id] && localFeeds[proUnread[postId].feed_id].id;
        if (!localPost.feed_id) {
					debugger
          return;
        }

        queue.and(localPost.save);
      });
      queue.end(next);
    })
    .andSync(function() {
      this.removeProPreferences();
    }.bind(this))
    .and(app.user.reloadDB)
    .andSync(function() {
      app.user.forEachFeed(function(feed) {
        feed.allReadOnNextCrawl = true;
      });
    })
		.then(app.poller.forceUpdate)
		.andSync(function() {
			delete app.user.proExpired;
		})
    .end(callback);
  }
});

;
"use strict";

var OnlineSyncer = Syncer.extend({
	startListening: function() {
		this._super();
		this.guids = {};
		app.events.subscribe('feed:backendUpdated', this.eventUpdateFeed);
	},

	destroy: function() {
		this._super();
		app.events.unsubscribe('feed:backendUpdated', this.eventUpdateFeed);
	},

	eventUpdateFeed: function(evt) {
		var feed = app.user.feed(evt.feed);
		if ( ! feed )
			return feed;

		var previousApiLastUpdated = new Date(feed.previousApiLastUpdated);

		function isNewPost(post) {
			return post.created_at > previousApiLastUpdated;
		}

		feed.posts = false;
		feed.fetchPosts(function(posts) {
			var updated = feed.previousUnreadCount != app.user.unreads.forFeed(feed.id);

			posts.forEach(function(post) {
				if (!isNewPost(post))
					return;
				updated = true;
				app.events.send("post:added", {post: post.id});
			});

			if (updated) {
				app.events.send("feed:updated", {
					feed: feed.id,
					manual: false
				});
			}
		});
	},

	processFeed: function(feed, callback) {
		if (feed.type === "online") {
			return fireCallback(callback, feed);
		}

		// Reroute request to API
		var request = new Request({
			url: OnlineSyncer.path('/api/add-feed.json'),
			onComplete: this.addFeedComplete.andArguments(feed, callback),
			addFeederAuthorization: true
		});

		request.send({get: {path: feed.path}});
	},

	addFeedComplete: function(status, text, xml, feed, callback) {
		// Check if successful
		var response = tryToParseJSON(text);

		// Our servers could not find the feed. Try locally
		if (!response || !response.success) {
			console.log(response, "did not indicate success. Trying locally");
			this.tryLocalFeed(feed, callback);
			return;
		}

		feed.guid = response.guid;
		feed.type = "online";
		feed.favicon = response.favicon;

		// Done!
		fireCallback(callback);
	},

	tryLocalFeed: function(feed, callback) {
		app.updater.loadFeed(feed, function(parser) {
			if (!parser) {
				feed.isError = true;
			}

			callback(!parser);
		});
	},

	preferencesChanged: function(callback) {
		var request = new Request({
			url: OnlineSyncer.path('/api/settings.json'),
			method: 'POST',
			addFeederAuthorization: true
		});
		request.send({post: {settings: this.settingsToJSON()}});

		fireCallback(callback);
	},

	settingsToJSON: function() {
		return JSON.stringify(app.user.preferences.getAll());
	},

	fetchUpstream: function(callback) {
		var request = new Request({
			url: OnlineSyncer.path('/api/settings.json'),
			onComplete: this.restorePreferencesFromAPI.withCallback(callback),
			addFeederAuthorization: true
		});

		request.send();
	},

	restorePreferencesFromAPI: function(status, text, xml, callback) {
		var settings = tryToParseJSON(text);

		if ( !settings ) {
			this.failedInit();
			return fireCallback(callback);
		}

		this.succeededInit();

		for (var key in settings) if (settings.hasOwnProperty(key))
			app.user.preferences.setQuiet(key, settings[key]);

		var token = app.user.preferences.get("feeder:socket_token");
		if (token) {
			app.events.send("online:socketToken", { token: token });
		}

		fireCallback(callback);
	},

	// Basic wrapper around API call
	countUnread: function(callback) {
		var request = new Request({
			url: OnlineSyncer.path('/api/unread.json'),
			onComplete: function(status, res) {
				var unreads = tryToParseJSON(res);
				for (var key in unreads) if (unreads.hasOwnProperty(key))
					unreads[key] = unreads[key].unread;
				callback(unreads);
			},
			addFeederAuthorization: true
		});

		request.send();
	},

	loadUnreadCounts: function(callback) {
		var request = new Request({
			url: OnlineSyncer.path('/api/unread.json'),
			onComplete: this.loadUnreadCountsLoaded.withCallback(callback),
			addFeederAuthorization: true
		});

		request.send();
	},

	loadUnreadCountsLoaded: function(status, text, xml, callback) {
		var counts = tryToParseJSON(text);

		chain(this.loadNewFeedsNotInCounts, counts)
		.end(callback, counts);
	},

	loadNewFeedsNotInCounts: function(counts, callback) {
		var needsUpdate = Object.keys(counts).length != app.store.feeds().length;

		for (var key in counts) if (counts.hasOwnProperty(key)) {
			if (!app.user.feed(key)) {
				needsUpdate = true;
			}
		}

		if (needsUpdate) {
			app.user.reload(callback);
		} else {
			fireCallback(callback);
		}
	},

	clearAllUnread: function(feed, callback) {
		var request = new Request({
			method: 'POST',
			url: OnlineSyncer.path("/api/mark-as-read.json"),
			onComplete: function() {
				fireCallback(callback);
			},
			addFeederAuthorization: true
		});

		request.send({post: {feed_id: feed.id}});
	},

	clearAllUnreadEverywhere: function(feedId, callback) {
		var request = new Request({
			method: 'POST',
			url: OnlineSyncer.path("/api/mark-as-read.json"),
			onComplete: function() {
				fireCallback(callback);
			},
			addFeederAuthorization: true
		});

		request.send({post: {}});
	},

	feedAdded: function(evt, callback) { fireCallback(callback); },
	feedUpdated: function(evt, callback) { fireCallback(callback); },
	feedRemoved: function(evt, callback) { fireCallback(callback); },
	postUpdated: function(evt, callback) { fireCallback(callback); },
	folderUpdated: function(evt, callback) { fireCallback(callback); },
	folderAdded: function(evt, callback) { fireCallback(callback); },
	folderRemoved: function(evt, callback) { fireCallback(callback); },

	pushUp: function(order, callback) { fireCallback(callback); },
	uninstall: function(callback) { callback(); }
});

OnlineSyncer.path = function(path) {
	return Config.feeder.root + path;
};

;
// COOL FILE OF FEEDER FIXES

this.FIXES = {
	'http://www.zhihu.com/rss': {noPublished: true},
	'http://social.msdn.microsoft.com/search/en-US/feed?query=blogs&refinement=109': {noPublished: true, noGUID: true},
	'http://www.lebikini.com/programmation/rss': {noPublished: true}
}

if (typeof module !== "undefined") {
	module.exports = this.FIXES;
}
;
(function() {
	var parseTo$, parseRoot;
	var moment, entities, Class, URI, FIXES;

	if (this.jQuery) {
		moment = this.moment;
		Class = this.Class;
		URI = this.URI;
		FIXES = this.FIXES;

		parseTo$ = function(text) {
			return jQuery;
		}

		parseRoot = function(text, $) {
			var xml = new DOMParser().parseFromString(text, 'text/xml');
			var root = xml.documentElement;

			// If parsing as XML failed, try and parse as HTML, because HTML is so lovely
			if (! root || root.querySelector('parsererror')) {
				// Try to parse as HTML instead
				// TODO: FIXME: Strip <script>-tags and <img>-tags
				var placeholder = document.createElement('parse-xml');
				placeholder.innerHTML = text;

				root = placeholder.firstElementChild;
			}

			if (! root)
				return false;
			return jQuery(root);
		}

		entities = {
			decode: function(text) {
				return jQuery("<textarea />")
					.html(text)
					.text()
					// Attempt to strip out HTML tags
					.replace(/<(?:.|\n)*?>/gm, '');
			}
		}
	} else {
		moment = require('moment');
		entities = require('entities');
		Class = require('root-class');

		URI = require('./uri');

		FIXES = require('./fixes');

		parseTo$ = function(text) {
			return require('cheerio').load(text, {
				xmlMode: true,
				lowerCaseTags: true
			});
		}

		parseRoot = function(text, $) {
			return $.root().children().first();
		}
	}

	var RSSParser = Class.extend({
		initialize: function(feed) {
			this.feed = feed;
			this.path = feed.path;

			this.maxPostsPerFeed = 250;

			this.error = false;
			this.posts = [];
			this.data = {};

			this.fixes = FIXES[this.path] || {};

			this.rootElement = false;
		},

		setResult: function(text, callback) {
			callback = typeof callback === 'function' ? callback : function() {};

			if (!text) {
				this.error = true;
				callback();
				return;
			}

			text = RSSParser.trimChars(text);

			try {
				this.$ = parseTo$(text);
				this.rootElement = parseRoot(text, this.$);
			} catch (e) {
			 	this.rootElement = false;
			}

			if (! this.rootElement) {
				this.error = true;
				this.errorMessage = "no root element";
				callback();
				return;
			}

			callback();
		},

		parse: function(callback) {
			callback = typeof callback === 'function' ? callback : function() {};

			try {
				this.doParse(function() {});

				var min;
				var max;

				this.posts.forEach(function(post) {
					if (post.published_from_feed) {
						if (typeof min === "undefined") {
							min = post.published_from_feed;
						}
						if (typeof max === "undefined") {
							max = post.published_from_feed;
						}
						min = Math.min(post.published_from_feed, min);
						max = Math.max(post.published_from_feed, max);
					}
				});

				var diff = max - min;
				// 100 milliseconds
				allSamePublished = isNaN(diff) || (diff < 100);

				if (allSamePublished) {
					this.feedHasBrokenPublishedDate();
				}

				callback(this);
			} catch(e) {
				this.error = true;
				this.errorMessage = "could not parse: " + e.message;
				this.errorException = e;
				callback(this);
			}
		},

		doParse: function(callback) {
			this.currentCallback = callback;
			var rootElement = this.rootElement;

			if (this.error) {
				this.currentCallback(this);
				return;
			}

			// Test for RSS
			var type = false;

			if (this.rootElement.is("rss, rdf, rdf\\:rdf"))
				type = 'rss';
			else if (this.rootElement.is("feed"))
				type = 'atom';

			if (! type) {
				this.error = true;
				this.errorMessage = "not compatible " + rootTag;
				this.currentCallback(this);
				return;
			}

			try {
				switch ( type ) {
					case 'rss':
						this.parseRSSResponse(rootElement);
						break;

					case 'atom':
						this.parseAtomResponse(rootElement);
						break;
				}

				this.feed.title = this.data.title;
				this.feed.link = this.data.link;
				this.currentCallback(this);
			} catch (e) {
				this.error = true;
				this.errorMessage = "could not parse " + type + ": " + e.message;
				this.errorException = e;
				this.currentCallback(this);
			}
		},

		parseRSSResponse: function(rootElement) {
      var link = this.parseLink(rootElement);

			if (! link) {
				link = this.path;
			}

			this.data.link = link;
			this.path = link;

			this.data.favicon = 'chrome://favicon/' + this.getDomain(this.data.link);

			var titleEl = rootElement.find('title').first();
			this.data.title = RSSParser.trimChars(titleEl.text());

			var posts = rootElement.find('item');
			for ( var i = 0, post; (post = posts[i]); i++ ) {
				post = this.$(post);

				var titleElement = post.find('title').first();
				var linkElements = post.find('link, guid[isPermaLink]:not([isPermaLink="false"])');
				var guidElement = this.getGuid(post);
				if (!linkElements.length) {
					if (guidElement.text().match(/^http:\/\//))
						linkElements = guidElement;
				}

				if (! titleElement.length || ! linkElements.length)
					if (!guidElement.length)
						continue;

				// Fulhax for itunes feeds
				var enclosureElement = post.find('enclosure');
				var podcastURL = enclosureElement.length ? enclosureElement.attr('url') : false;
				var fallbackElement = podcastURL ? podcastURL : false;
				// end fulhax

				var link;
				if (linkElements.length)
					link = this.parsePostLink(linkElements);
				else
					link = fallbackElement;
				if (! link)
					continue;

				var descriptionElement = post.find('content,content\\:encoded,description');
				var summary = descriptionElement.text();

				this.foundPost({
					title: titleElement.text() || link,
					link: this.resolveURL(link),
					published_from_feed: this.getDate(post),
					guid: guidElement.text(),
					summary: summary,
					index: i
				});
			}
		},

		parseAtomResponse: function(rootElement) {
			var titleEl = rootElement.find('title').first();

			this.data.link = this.parseLink(rootElement);
			this.data.title = RSSParser.trimChars(titleEl.length ? titleEl.text() : this.data.link);
			this.data.favicon = 'chrome://favicon/' + this.getDomain(this.data.link);

			this.path = this.data.link;

			var posts = rootElement.find('entry');
			for ( var i = 0, post; (post = posts[i]); i++ ) {
				post = this.$(post);

				var titleElement = post.find('title').first();
				var linkElements = post.find('link');
				var guidElement = this.getGuid(post);

				if (! titleElement.length || ! linkElements.length)
					continue;

				var link = this.parsePostLink(linkElements);

				var descriptionElement = post.find('content,content\\:encoded,description');
				var summary = descriptionElement.text();

				this.foundPost({
					title: titleElement.text() || link,
					link: this.resolveURL(link),
					published_from_feed: this.getDate(post),
					guid: guidElement.text() || '',
					summary: summary,
					index: i
				});
			}
		},

		parseLink: function(rootElement) {
			var links = rootElement.find('link');
			var $ = this.$;

			// Find link
			links = links.filter(function(index, l) {
				return ! RSSParser.matchTag($(l), 'entry');
			}).toArray();

      var link;
			var links = [].slice.call(rootElement.find('link')).filter(function(el) {
				return el.parent != rootElement[0];
			});

      var chosenLink = false;

			for ( var i = 0, l; l = links[i]; i++ ) {
				l = this.$(l);
        if (l.attr("rel") && l.attr("rel") !== "alternate") {
          continue;
        }
				link = RSSParser.cleanData(l.text());
        if (!link) {
          link = RSSParser.cleanData(l.attr("href"));
        }
        if (link) {
          chosenLink = links[i];
          break;
        }
			}

			if (!link)
				return "";

			var href = RSSParser.trimChars(link);
			return RSSParser.resolveFrom(chosenLink, href);
		},

		resolveURL: function(link) {
			if (/http?:\/\//.test(link))
				return link;
			var linkURI = new URI(link);
			if (!linkURI.protocol()) {
				var uri = new URI(link, this.path)
				uri.protocol("http");
				return uri.toString();
			}
			return link;
		},

		parsePostLink: function(links) {
			var $ = this.$;

			links = links.toArray().sort(function(a, b) {
				var ap = pointsForObject($(a));
				var bp = pointsForObject($(b));
				if (ap == bp)
					return 0;
				return ap > bp ? -1 : 1;
			});
			var link = links[0];
			if (!link)
				return false;

			link = this.$(link);

			var href = RSSParser.trimChars(link.attr("href") || link.text());
			return RSSParser.resolveFrom(link, href);

			function pointsForObject(a) {
				if (a.attr("isPermaLink") === "false")
					return -10;
				var rel = a.attr("rel");
				var type = a.attr("type");
				var points = -1;
				if (rel == "alternate")
					points += 2;
				if (type == "text/html")
					points += 2;
				return points;
			}
		},

		getGuid: function(post) {
			return post.find("guid, id").first();
		},

		getDate: function(post) {
			var datePublished = post.find('published, updated, pubDate, dc\\:date, date, created, issued').first();

			var date;
			if (datePublished.text()) {
				var txtDate = datePublished.text();
				date = moment(txtDate).toDate();
			}

			if (! date || date === "Invalid Date" || isNaN(date.getTime()))
				date = 0
			else
				date = date.getTime();

			if (this.fixes.noPublished)
				return 0;

			return date;
		},

		foundPost: function(data) {
			if (! data.title || ! data.link)
				return;

			data.title = entities.decode(RSSParser.trimChars(data.title));
			data.link = RSSParser.trimChars(data.link);
			data.summary = data.summary;

			// If not http or https is present, or some other weird protocol, just assume it's relative
			if (! data.link.match(/^(http|https):/) && ! data.link.match(/^[a-zA-Z0-9-]+:/)) {
				var domain = this.getDomain(this.path);
				data.link = RSSParser.trimChars(domain, '/') + data.link;
			}

			if (this.fixes.noGUID)
				delete data.guid;
			this.posts.push(data);
		},

		getDomain: function(link) {
			return RSSParser.trimChars(link.substr(0, (link.indexOf("/", link.indexOf('.')) + 1) || link.length), '/') + '/';
		},

		feedHasBrokenPublishedDate: function() {
			this.posts.forEach(function(post) {
				post.published_from_feed = 0;
			});
		}
	});

	RSSParser.matchTag = function(el, tagName) {
		do {
			if (el.is(tagName))
				return el;
		} while ( (el = el.parent()) && el.length );
		return false;
	}

	RSSParser.resolveFrom = function(ref, url) {
		var bases = [];
		var el = ref[0];
		while ( el && el.attribs ) {
			if (el.attribs["xml:base"])
				bases.push(el.attribs["xml:base"])
			el = el.parent;
		}

		if (! bases.length)
			return url;

		return new URI(url, bases.reduce(function(a, b) {
			return new URI(a, b).toString();
		})).toString();
	};

	RSSParser.trimChars = function(str, charlist) {
		if (!charlist) {
			return (str || "").trim();
		}

		charlist = charlist || ' \r\n\t';
	    var l = 0, i = 0;

	    var ret = str || "";

	    l = ret.length;
	    for (i = 0; i < l; i++) {
	        if (charlist.indexOf(ret.charAt(i)) === -1) {
	            ret = ret.substring(i);
	            break;
	        }
	    }

	    l = ret.length;
	    for (i = l - 1; i >= 0; i--) {
	        if (charlist.indexOf(ret.charAt(i)) === -1) {
	            ret = ret.substring(0, i + 1);
	            break;
	        }
	    }

	    return charlist.indexOf(ret.charAt(0)) === -1 ? ret : '';
	};

	RSSParser.cleanData = function(string) {
		return (string || "").replace(/<!\[CDATA\[(.*)\]\]>/, function(a, b) { return b; }).trim();
	};

	this.RSSParser = RSSParser;

	if (typeof module !== "undefined") {
		module.exports = RSSParser;
	}
})();

;
var ParserStore = Class.extend({
	destroy: function() {
		// Override if needed
	},

	addFeed: function() {
		throw "override ParserStore.addFeed";
	},

	addPosts: function() {
		throw "override ParserStore.addPosts";
	}
});

ParserStore.instances = {};

ParserStore.get = function(name) {
	var stores = {
		rss: LocalStore,
		adder: AdderStore
	};

	if (!this.instances[name]) {
		this.instances[name] = new (stores[name])();
	}

	return this.instances[name];
};

ParserStore.destroy = function(callback) {
	for (var key in this.instances) if (this.instances.hasOwnProperty(key)) {
		this.instances[key].destroy();
	}
	this.instances = {};
	fireCallback(callback);
};
;
var AdderStore = ParserStore.extend({
	initialize: function() {
		this.guids = {};

		app.events.subscribe("feed:removed", this.eventFeedsRemoved);
	},

	destroy: function() {
		app.events.unsubscribe("feed:removed", this.eventFeedsRemoved);
	},

	addFeed: function(feed, posts, callback) {
		chain(feed.saveWith, RESTDatabase)
		.thenSync(function() {
			// HAXHAHXAHAXHHXAHX the feed.id returned from the adder is not the same
			// as the user feed created by the api. the user feed guid is the adder id
			feed.guid = feed.id;
			delete feed.id;

			var originalFeed = app.store.feedBy("guid", feed.guid);
			if (originalFeed) {
				feed.id = originalFeed.id;
				callback();
				return chain.exit;
			}
		})
		.and(this.addPosts, feed, posts)
		.and(feed.save)
		.end(callback);
	},

	addPosts: function(feed, posts, callback) {
		posts.forEach(function(post) {
			post.adder_feed_id = feed.guid;
			post.feed_id = feed.id;
		});

		chain(this.loadGuids, feed)
		.andSync(function() {
			posts = posts.filter(this.isNewPost);
			if (!posts.length) {
				fireCallback(callback);
				return chain.exit;
			}
		}.bind(this))
		.and(function(next) {
			Mapper.get("post").pushDatabase(RESTDatabase, function(mapper) {
				mapper.save(posts, next);
			});
		})
		.andSync(this.addGuidsIfSuccessful, posts)
		.end(callback);
	},

	addGuidsIfSuccessful: function(posts) {
		posts.forEach(function(post) {
			if (!post.error)
				this.addGuidForPost(post);
		}, this);
	},

	addGuid: function(feedId, guidHash) {
		if (!this.guids[feedId])
			this.guids[feedId] = {};
		this.guids[feedId][guidHash] = true;
	},

	addGuidForPost: function(post) {
		this.addGuid(post.feed_id, post.getGUIDHash());
	},

	hasGuid: function(post) {
		//
		//
		//   !!!!!!!!!!!!!! THIS IS WRONG!!!!!!!!!!!!!!!!
		//	 In addPosts we run post.feed_id = feed.guid
		//   which makes these posts feed_id != user_feed_id, which is expected everywhere else
		//      should we:
		//       1. have another concept of "adder_guid" to not confuse the rest of the codebase?
		//       2. Only use feed.guid for this.guids[feed.guid][postHash] = true?
		//
		//

		return !!(this.guids[post.feed_id] && this.guids[post.feed_id][post.getGUIDHash()]);
	},

	isNewPost: function(post) {
		return !this.hasGuid(post);
	},

	loadGuids: function(feed, callback) {
		if (!feed.id || this.guids[feed.id])
			return fireCallback(callback);

		var self = this;

		Mapper.get("guid").pushDatabase(RESTDatabase, function(mapper) {
			chain(mapper.find, {id: feed.guid})
			.thenSync(function(guids, meta) {
				guids.forEach(function(guid) {
					self.addGuid(feed.id, guid.hash);
				});
			})
			.end(callback);
		});
	},

	eventFeedsRemoved: function(evt) {
		console.log("removing guids for: %d", evt.feed);
		delete this.guids[evt.feed];
	}
});

;
var LocalStore = ParserStore.extend({
	addFeed: function(feed, posts, callback) {
		chain(feed.save)
		.and(Mapper.get("post").addPostsToFeed, feed, posts)
		.end(callback);
	},

	addPosts: function(feed, posts, callback) {
		chain(app.user.postMapper.addPostsToFeed, feed, posts)
		.andSync(app.user.unreads.clearCache)
		.and(app.user.unreads.count)
		.end(callback);
	}
});

;
var FeederRSSParser = FeedParser.extend({
	initialize: function(feed) {
		this._super(feed);
		this.parser = new RSSParser({path: feed.path});
	},

	setResult: function(xml, text, callback) {
		rssLog("Parsing", this.path);
		this.parser.setResult(text, callback);
	},

	parse: function(callback) {
		chain(this.parser.parse)
		.andSync(this.setDataFromParser)
		.andSync(this.logErrors)
		.end(callback, this);
	},

	setDataFromParser: function() {
		this.data = this.parser.data;
		this.data.path = this.path;
		this.data.guid = this.path;
		this.error = this.parser.error;
		this.posts = (this.parser.posts || []);

		this.posts = this.posts.sort(function(a, b) {
			if (!a.published_from_feed && !b.published_from_feed) {
				if (a.index > b.index) {
					return 1;
				} else if (a.index < b.index) {
					return -1;
				} else {
					return 0;
				}
			} else {
				if (a.published_from_feed < b.published_from_feed) {
					return 1;
				} else if (a.published_from_feed > b.published_from_feed) {
					return -1;
				} else {
					return 0;
				}
			}
		});

		this.posts = this.posts.slice(0, 100);
	},

	logErrors: function() {
		if (this.error) {
			rssLog("Error parsing", this.feed.path, this.parser.errorMessage);
		} else {
			rssLog("Completed parsing", this.feed.path);
		}
	}
});

function rssLog() {
	console.log.apply(console, arguments);
}

;
var RSSLoader = FeedLoader.extend({
	
});

;
var OnlineParser = FeedParser.extend({
	setResult: function(res, callback) {
		this.result = res;
		if ( ! this.result )
			this.error = true;

		fireCallback(callback);
	},

	parse: function(callback) {
		if ( this.error )
			return fireCallback(callback, this);

		this.data.title = this.result.title;
		this.data.path = this.result.path;
		this.data.link = this.result.link;
		this.data.favicon = this.result.favicon;
		this.data.guid = this.result.guid;
		this.findPosts();

		fireCallback(callback, this);
	},

	findPosts: function() {
		this.result.posts.forEach(this.parsePost);
	},

	parsePost: function(item) {
		this.posts.push({
			title: item.title,
			link: item.link,
			summary: item.summary || '',
			guid: item.guid,
			published: item.published
		});
	}
});

;
var OnlineLoader = FeedLoader.extend({
	load: function(callback) {
		var request = new Request({
			url: Config.feeder.root + '/api/feeds/' + this.feed.guid + '.json',
			onComplete: this.loadComplete.withCallback(callback)
		});
		
		request.send();
	},
	
	loadComplete: function(status, text, xml, callback) {
		callback(tryToParseJSON(text));
	}
});
;
var AppUI = Class.extend({
	initialize: function() {

	},

	startListening: function() {
		app.events.subscribe("post:updated", this.postUpdated);
		app.events.subscribe("post:added", this.postAdded);
		app.events.subscribe("feed:updated", this.feedUpdated);
		app.events.subscribe("feed:removed", this.feedRemoved);
		app.events.subscribe("feeds:found", this.feedsFound);
		app.events.subscribe("feeds:recount", this.setBadge);
		app.events.subscribe("preferences:changed", this.preferencesChanged);
	},

	destroy: function(callback) {
		app.events.unsubscribe("post:updated", this.postUpdated);
		app.events.unsubscribe("post:added", this.postAdded);
		app.events.unsubscribe("feed:updated", this.feedUpdated);
		app.events.unsubscribe("feed:removed", this.feedRemoved);
		app.events.unsubscribe("feeds:found", this.feedsFound);
		app.events.unsubscribe("feeds:recount", this.setBadge);
		app.events.unsubscribe("preferences:changed", this.preferencesChanged);

		fireCallback(callback);
	},

	postUpdated: function(evt) {
		this.setBadge();
	},

	postAdded: function(evt) {
		this.setBadge();

		var post = app.store.post(evt.post);
		var feed = app.store.feed(post.feed_id);

		if ( post && feed && ! post.is_read && (app.user.preferences.get('global:notifications') || feed.usenotifications) && UI.Notifications.can() ) {
			UI.Notifications.show(feed.title, post.title, {
				link: function() {
					post.markAsRead();
					UI.openTab(post.getLink());
				}
			});
		}

		if ( post && feed && !post.is_read && (app.user.preferences.get('global:soundNotifications') || feed.getMeta("soundNotifications")) ) {
			this.playSound();
		}
	},

	playSound: function() {
		if (!this.audioElement) {
			this.audioElement = document.createElement("audio");
			this.audioElement.autoplay = false;
			this.audioElement.src = "library/media/alert.mp3";
		}

		this.audioElement.play();
	},

	feedUpdated: function(evt) {
		this.setBadge();
	},

	feedRemoved: function(evt) {
		this.setBadge();
	},

	setBadge: function() {
		if (Ext.isOnline())
			return;

		if (app.user.preferences.get("global:showUnreadCountInBadge") == false) {
			UI.setBadge("");
			return;
		}

		var unread = app.user.unreads.countStored();
		unread = unread > 999 ? "999+" : unread;
		UI.setBadge(unread || "");
	},

	feedsFound: function(evt) {
		app.finder.countFeedsInTab(evt.tab, function(num) {
			if ( num )
				UI.setBadgeIcon(Config.icon.addFeed, evt.tab);
			else
				UI.setBadgeIcon(Config.icon.standard, evt.tab);
		});
	},

	preferencesChanged: function(evt) {
		if (evt.key !== "global:showUnreadCountInBadge")
			return;

		this.setBadge();
	},

	openManyById: function(posts) {
		posts = posts.map(function(id) {
			return app.store.post(id);
		});

		this.openMany(posts);
	},

	openMany: function(posts) {
		posts.forEach(function(post) {
			post.markAsRead();
		});

		posts.forEach(function(post) {
			UI.openTab(post.getLink());
		});
	}
});

;
var FeederNotifications = Class.extend({
	initialize: function() {
		setInterval(this.check, Config.feederNotificationCheckInterval);
	},

	check: function(callback) {
		if (Ext.isOnline())
			return fireCallback(callback);

		var request = new Request({
			url: Config.feederNotificationsURL,
			onComplete: this.loaded.withCallback(callback)
		});

		request.send({get: {id: app.user.preferences.get("client_id"), _random: Date.now()}});
	},

	loaded: function(status, res, xml, callback) {
		var emptyFeed = new Feed({
			path: Config.feederNotificationsURL
		});

		var parser = new FeederRSSParser(emptyFeed);
		parser.useSummary = true;

		chain(parser.setResult, xml, res)
		.and(parser.parse)
		.end(this.parsed, parser, callback);
	},

	parsed: function(parser, callback) {
		var posts = parser.getPosts();

		if (! posts[0])
			this.current = false;
		else {
			this.current = this.encodeText(posts[0].summary);
			this.currentId = posts[0].guid;
		}

		if (app.user.preferences.get("notifications:hide") == this.currentId) {
			this.current = false;
		}

		fireCallback(callback);
	},

	encodeText: function(text) {
		return text.replace ? text.replace(/feeder pro/, 'feeder <span class="pro-badge">pro</span>') : text;
	},

	hideCurrent: function() {
		if (this.currentId) {
			this.current = false;
			app.user.preferences.set("notifications:hide", this.currentId);
		}
	}
});
;
var ExportImport = {
  fs: false,

  Export: new (Class.extend({
    initialize: function() {

    },

    downloadFile: function() {
      var feedOPMLText = this.exportFeeds();
      ExportImport.writeFileQuick(feedOPMLText);
    },

    exportFeeds: function() {
      return '<?xml version="1.0" encoding="UTF-8"?>'
        + json2xml({
          'opml': {
            '@version': '1.0',
            'head': {'title': 'Feeder - RSS Feed Reader'},
            'body': {
              'outline': this.toOutlines(app.user.structure.base)
            }
          }
        });
    },

    toOutlines: function(folder) {
      var lastOutlines = this.outlines;
      this.outlines = [];

      // folder.name == Folder name
      // folder.children == The folders
      // folder.feeds == The order and feeds of a folder

      folder.forEachItem(this.toOutlineFromItem);

      var outlines = this.outlines;
      this.outlines = lastOutlines;

      return outlines;
    },

    toOutlineFromItem: function(item, index) {
      var outline = item.isFeed ? this.toOutlineFromFeed(item) : this.toOutlineFromFolder(item);
      if ( ! outline )
        return;
      this.outlines.push(outline);
    },

    toOutlineFromFeed: function(feed) {
      if ( ! feed || ! feed.path )
        return null;

      return {
        '@text': (feed.title || feed.path).encodeHTML(),
        '@title': (feed.title || feed.path).encodeHTML(),
        '@type': 'rss',
        '@xmlUrl': feed.path.encodeHTML(),
        '@htmlUrl': (feed.link || "").encodeHTML(),
        '@rssfr-numPosts': feed.numPosts,
        '@rssfr-forceUpdate': feed.forceUpdate,
        '@rssfr-favicon': (feed.favicon || "").encodeHTML(),
        '@rssfr-useNotifications': feed.useNotifications,
        '@rssfr-updateInterval': feed.updateInterval,
      };
    },

    toOutlineFromFolder: function(folder) {
      if ( ! folder || ! folder.name )
        return null;

      return {
        '@title': folder.name.encodeHTML(),
        '@text': folder.name.encodeHTML(),
        'outline': this.toOutlines(folder)
      };
    },

    exportUnreads: function(callback) {
      var container = new FeedUnreadContainer();
      var link = chain();

      app.user.forEachFeed(function(feed) {
        link.and(feed.getPostsOfInterest)
        link.thenSync(function(posts) {
          posts.forEach(function(post) {
            container.addPostFor(feed, post);
          });
        });
      });

      link.end(callback, container);
    }
  })),

  Import: Class.extend({
    initialize: function(data) {
      this.data = data;
    },

    load: function(callback) {
      this.feedContainer = app.user.createFeedContainer();

      if ( ! this.tryLoadOPML() )
        this.tryLoadOldJSON();

      if ( this.isError )
        return callback(false);

      chain(app.sync.mergeContainer, this.feedContainer)
      .then(function(res, next) {
        if (!res) {
          callback(false);
          return chain.exit;
        }
        next();
      })
      .and(app.sync.push)
      .end(callback, true)
    },

    tryLoadOPML: function() {
      var doc = (new DOMParser()).parseFromString(this.data, 'text/xml');

      if ( ! doc ) {
        this.isError = true;
        return false;
      }

      var data = xml2json(doc);
      this._data = data;

      if ( ! data || ! data.body || ! data.body.outline ) {
        this.isError = true;
        return false;
      }

      this.convertOPML(data);

      return true;
    },

    tryLoadOldJSON: function() {
      var data;
      try {
        data = JSON.parse(this.data);
      }
      catch (e) {}

      if (!data || !data.feeds || !data.folders || !data.folders[0])
        return false;

      this.feedMap = data.feeds;

      this.parseOldFolder(data.folders[0]);
      this.isError = false;

      return true;
    },

    convertOPML: function(data) {
      this.outlineToFolder({'@title': 'Feeds', outline: data.body.outline});
    },

    outlineToFolder: function(outlineFolder) {
      var folder = this.feedContainer.pushFolder(outlineFolder['@title'] || outlineFolder['@text']);

      if ( ! outlineFolder.outline ) {
        this.feedContainer.popFolder();
        return
      }

      var items = ensureArray(outlineFolder.outline).map(this.outlineToItem);
      items.clean();

      this.feedContainer.popFolder();

      return folder;
    },

    outlineToItem: function(outline) {
      if ( outline['@xmlurl'] )
        return this.outlineToFeed(outline);
      else if ( outline['@title'] || outline['@text'] )
        return this.outlineToFolder(outline);
      return false;
    },

    outlineToFeed: function(outline) {
      return this.feedContainer.addFeed({
        path: outline['@xmlurl'],
        guid: outline['@xmlurl'],
        link: outline['@htmlurl'],
        title: outline['@title'] || outline['@text'] || outline['@htmlurl'] || outline['@xmlurl'],
        favicon: outline['@rssfr-favicon'],
        numPosts: outline['@rssfr-numposts'],
        forceUpdate: outline['@rssfr-forceupdate'],
        useNotifications: outline['@rssfr-usenotifications']
      });
    },

    parseOldFolder: function(folder) {
      this.feedContainer.pushFolder(folder.name);

      folder.feeds.forEach(function(item) {
        this.parseItem(item, folder);
      }, this);

      this.feedContainer.popFolder();
    },

    parseItem: function(item, folder) {
      if ( typeof item === 'number' )
        this.parseFolder(item, folder);
      else
        this.parseFeed(item, folder);
    },

    parseFeed: function(feedUrl) {
      var feedData = this.feedMap[feedUrl];

      if ( ! feedData )
        feedData = {};

      feedData.path = feedUrl;
      feedData.guid = feedUrl;

      this.feedContainer.addFeed(feedData)
    },

    parseFolder: function(folderId, parentFolder) {
      var folder = parentFolder.children[folderId];
      if ( ! folder )
        return;

      this.parseOldFolder(folder);
    }
  }),

  writeFileQuick: function(contents) {
    var form = document.createElement("form");
    form.action = "http://feeder.co/opml/";
    form.method = "POST";
    form.target = "_blank";

    var text = document.createElement("input");
    text.type = "hidden";
    text.name = "opml";
    text.value = contents;

    var explanation = document.createElement("input");
    explanation.name = "explanation";
    explanation.value = "Why are sending your OPML data to our servers? This is because there is no good way for us to create files and have them downloaded to the users computer. Nothing about this request is stored or looked at. If you disagree with this, please: feeder.co/support";
    explanation.type = "hidden";

    form.appendChild(text);
    form.appendChild(explanation);

    if (Ext.isSafari()) {
      Platform.env.safariSubmitFormFromPopup(form);
      return;
    }

    document.body.appendChild(form);

    form.submit();

    setTimeout(function() { form.parentNode.removeChild(form); }, 500);
  }
};

function ensureArray(thing) {
  return thing instanceof Array ? thing : [thing];
}

;
UI = UI[Platform.name];
Platform.env = new PlatformEnv[Platform.name];

UI.initialize();
;
var Application = Class.extend({
	initialize: function() {
		console.log("Hello");

		this.id = Application.counterID++;
		this.retryTimes = 0;

		this.store = new CacheStore(this);
	},

	destroy: function(callback) {
		this.isDestroyed = true;

		chain(this.poller.destroy)
		.and(this.updater.destroy)
		.and(this.finder.destroy)
		.and(this.ui.destroy)
		.and(this.sync.destroy)
		.and(this.user.destroy)
		.and(this.events.destroy)
		.and(this.sqs.destroy)
		.and(this.pusher.destroy)
		.and(ParserStore.destroy)
		.and(function() {
			callback();
		});
	},

	'get ready to rumble!': function(callback) {
		this.config = Config;

		this.user = new User(this); // The "user"

		this.events   = new FeedEvents(this);  // Push out updates when new feeds are available
		this.sqs      = new SQS(this);         // SQS like queue to post serialized messages to
		this.poller   = new FeedPoller(this);  // Keep track of when feeds need to be updated
		this.updater  = new FeedUpdater(this); // Load and parse RSS feeds
		this.finder   = new FeedFinder(this);  // Listen for RSS feeds
		this.sync     = new FeedSync(this);    // Sync everything with external services, like feeder online :S
		this.notifications = new FeederNotifications(); // Search a special "feed" for notifications
		this.pusher   = new PusherReceiver(this);

		this.ui = new AppUI(this); // Take care of platform specific UI settings that can only be set from the background

		var importer = new Importer(this);

		chain(this.user.install)
		.and(importer.install)
		.and(importer.migrateDB)
		.and(this.user.fixOrphanFeeds)
		.and(this.ready)
		.then(callback);
	},

	ready: function(callback) {
		var application = this;

		chain(this.sync.startSyncing)
		.and(this.sync.fetchUpstream)
		.and(function() {
			app.user.unreads.count(function() {});

			if (! app.isFailedState()) {
				app.startListeners();
			} else {
				setTimeout(app.retryInitialize, Config.retryInitializeTimeout)
			}

			application.ui.setBadge();
			application.loaded();

			window.backendIsLoaded = true;
			backendLoadComplete();

			callback(application);
		});
	},

	onLoad: function(callback) {
		if ( this.isLoaded )
			return fireCallback(callback);
		this.onLoadCallback = callback;
	},

	loaded: function() {
		this.isLoaded = true;
		fireCallback(this.onLoadCallback);
	},

	startListeners: function() {
		this.updater.startListening();
		this.poller.startPolling();
		this.finder.startListening();
		this.ui.startListening();
		this.notifications.check();
	},

	isFailedState: function() {
		return app.sync.isFailedState() || app.user.FAILED || app.user.structure.FAILED;
	},

	// Retry can either:
	//  - fail, in which case we say so
	//  - work, in which case we say so
	retryInitialize: function(callback) {
		console.log("Asked to retry (%s time)", this.retryTimes);

		// Only retry 2 times
		//  1. Upon backend load, we wait X seconds, and retry
		//  2. After popup is loaded first time, and we realize the backend is broken
		if (app.retryTimes >= 2)
			return fireCallback(callback, false);

		console.log("... Retrying");

		app.retryTimes++;

		chain(app.sync.fetchUpstream)
		.then(function() {
			if (app.isFailedState())
				return fireCallback(callback, false);

			app.startListeners();
			chain(app.user.reload)
			.end(callback, true);
		});
	},

	test: function(testCase) {
		TestCases[testCase]();
	}
});

Application.counterID = 0;

var isBackground = true;

// ✔

;
var TestCases = {
	'online: add local feed': function() {
		console.assert(app.user.isPro());
		console.assert(!Ext.isOnline());

		app.user.feedMapper.addFeed("http://gallows.blogg.se/index.rss?t=" + Date.now(), function(feed) {
			feed.fetchPosts(function(posts) {
				console.assert(posts.length > 10);
			});
		});
	},

	'online: add multiple posts': function() {
		function randomPost() {
			var a = new Post({
				title: "lol",
				guid: Math.random(),
				link: "http://localhost/?" + Date.now(),
				published: Date.now()
			});
			a.published_from_feed = a.published;
			return a;
		};

		ParserStore.get("adder").addPosts(app.store.feeds()[1], [randomPost(), randomPost(), randomPost()]);
	},

	'everfeed': function() {
		app.user.feedMapper.addFeed("http://localhost/random/everfeed.php?t=" + Date.now());
	},

	'reload posts': function() {
		app.poller.forceUpdate();
	}
};
;
// Traverse the parents and find a background page
var bg = Ext.getBackgroundPage();
var run = bg === window;

var backendListeners, backendIsLoaded, onAppReady;
var isMainJs = true

if (run) {
	backendIsLoaded = false;
	backendListeners = [];

	onAppReady = function(fn, loadingCallback) {
		if (backendIsLoaded) {
			return fn();
		}
		backendListeners.push(fn);
		fireCallback(loadingCallback);
	}

	function backendLoadComplete() {
		backendListeners.forEach(function(callback) {
			callback();
		});
		backendListeners = [];
	}

	window.app = new Application();

	chain(Platform.load)
	.and(app['get ready to rumble!'])
	.end(function() {
		// Done init
	});
}

var HEADERS_TO_STRIP_LOWERCASE = [
  'content-security-policy',
  'x-frame-options',
];

var FEEDER_SERVERS = [/feeder.co/, /feeder.dev:3000/];

var CORSBlocker = {
	init: function() {
		this.feederTabs = {};
		this.listenerAdded = false;
	},

	urlMatchesFeederServers: function(url) {
		return FEEDER_SERVERS[0].test(url) || FEEDER_SERVERS[1].test(url);
	},

	addTabOrRemoveIfNeeded: function(tab) {
		if (this.urlMatchesFeederServers(tab.url)) {
			this.addHeaderListenerIfNeeded(tab.id);
		} else {
			this.removeHeaderListener(tab.id);
		}
	},

	addHeaderListenerIfNeeded: function(tabId) {
		if (this.feederTabs[tabId]) {
			return;
		}

		var params = [this.headerListener.bind(this), {
			urls: ["<all_urls>"],
			tabId: tabId
		}, ["blocking", "responseHeaders"]];

		chrome.webRequest.onHeadersReceived.addListener(params[0], params[1], params[2]);

		this.feederTabs[tabId] = params;
	},

	removeHeaderListener: function(tabId) {
		if (!this.feederTabs[tabId]) {
			return;
		}

		var params = this.feederTabs[tabId];

		chrome.webRequest.onHeadersReceived.removeListener(params[0]);

		delete this.feederTabs[tabId];
	},

	headerListener: function(details) {
		return {
      responseHeaders: details.responseHeaders.filter(function(header) {
        return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
      })
    };
  }
};

if (window.chrome && window.chrome.tabs) {
	CORSBlocker.init();

	chrome.tabs.query({}, function(tabs) {
		tabs.forEach(function(tab) {
			CORSBlocker.addTabOrRemoveIfNeeded(tab);
		});
	});

	chrome.tabs.onCreated.addListener(function(tab) {
		CORSBlocker.addTabOrRemoveIfNeeded(tab);
	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		CORSBlocker.addTabOrRemoveIfNeeded(tab);
	});

	chrome.tabs.onRemoved.addListener(function(tabId) {
		CORSBlocker.removeHeaderListener(tabId);
	});
}
