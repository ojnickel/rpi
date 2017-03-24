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