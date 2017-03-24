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
