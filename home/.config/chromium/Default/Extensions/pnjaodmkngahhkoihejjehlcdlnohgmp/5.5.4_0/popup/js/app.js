if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) { // lol
	if (window.chrome && !chrome.extension) {// lol
		chrome.extension = window.parent.chrome.extension; // lol
	}
} // lol

var app, Platform, UI;

// -- PLACEHOLDER TRANSLATION FUNCTION
function _(a) {
	var args = Array.prototype.slice.call(arguments, 1);
	return a.replace(/%s/g, function() {
		return args.shift();
	});
}
// -- END PLACEHOLDER

var isLoaded = false;
var isLoadedDone = false;

function runOnLoad(callback, errorCallback) {
	Init.callbacks.push({success: callback, error: errorCallback || function() {}});
}

function reloadProClasses() {
	if (app.user.isPro() || Ext.isOnline()) {
		$(document.body).addClass("is-pro");
	} else {
		$(document.body).removeClass("is-pro");
	}
}

var Init = {
	callbacks: [],

	// In this method the backend might not even exist yet, nor has the popup fully loaded
	start: function() {
		Init.errorHide();

		if (Init.backendDoesntExistYet()) {
			Init.reloadWaitingForBackendToExist();
			return;
		}

		Init.initGlobalVariables();
		if (Ext.isChrome()) {
			Init.chromeFixPortScopingIssues();
		}

		if (!Ext.isOnline()) {
			Init.activateIntercom();
		}

		app.events.subscribe("feeder:expiredChanged", this.activateIntercom);

		window.addEventListener('unload', Init.popupCleanup, false);
		window.addEventListener('load', Init.onDOMLoad, false);
	},

	// In this page the popup has fully loaded, but we don't know if the backend is here yet
	// It might be that the backend is error'd
	onDOMLoad: function() {
		if (Ext.isMobile()) {
			Init.mobileHideScrollBars();
		}

		window.isLoaded = true;

		setTimeout(function() {
			window.isLoadedDone = true;
		}, 50);

		Init.removeLoader();

		Ext.getBackgroundPage().onAppReady(Init.onAppReady, Init.backendShowIsLoading);
	},

	// On this page the backend is loaded and exists, but it might still be errored
	onAppReady: function() {
		Init.initGlobalVariables();
		reloadProClasses();

		analytics.trackPageView();
		Init.initPageViewTracking();

		Init.removeLoader();
		Init.errorHide();

		Init.fireCallbacks();
	},

	activateIntercom: function() {
    if (window.Intercom && app.user.shouldHaveIntercom()) {
  		Intercom('boot', {
  			app_id: app.user.preferences.get("feeder:intercom_app_id"),
  			client_id: app.user.preferences.get("client_id"),
        email: app.user.preferences.get("feeder:email"),
        user_id: app.user.preferences.get("feeder:id"),
        user_hash: app.user.preferences.get("feeder:intercom_hash"),
  			widget: {
  				activator: ".intercom-activator"
  			}
  		});

			console.log("boot intercom")
    } else if (window.Intercom) {
			window.Intercom("shutdown");

			console.log("shut down intercom")
		}
	},

	initGlobalVariables: function() {
		app = Ext.getBackgroundPage().app;
		Platform = Ext.getBackgroundPage().Platform;
		// A bit hacky, but don't track events in theme iframe
		if (window.document && window.document.location && window.document.location.href.indexOf("theme=") !== -1) {
			analytics = Ext.getBackgroundPage().analyticsFAKE;
		} else {
			analytics = Ext.getBackgroundPage().analytics;
		}
		UI = Ext.getBackgroundPage().UI;
	},

	fireCallbacks: function() {
		var isError = app.isFailedState();
		for (var i = 0; i < Init.callbacks.length; i++) {
			var callbacks = Init.callbacks[i];
			if (isError)
				callbacks.error();
			else
				callbacks.success();
		}
	},

	backendIsInBrokenState: function() {
		return Ext.getBackgroundPage().app.isFailedState();
	},

	askBackendToRetryInitialize: function() {
		Init.backendShowIsLoading();
		Ext.getBackgroundPage().app.retryInitialize(function(succeeded) {
			if (! succeeded) {
				Init.errorShow();
				Init.removeLoader()
				return;
			}
			Init.onAppReady();
		});
	},

	mobileHideScrollBars: function() {
		$('.popup-content').css('min-height', $(window).height() + 60);
		window.scrollTo(0, 0);
	},

	initPageViewTracking: function() {
		Platform.env.onPopoverVisible(analytics.trackPageView);
	},

	popupCleanup: function() {
		Platform.env.removePopoverVisible(analytics.trackPageView);
		app.events.unsubscribe("feeder:expiredChanged", Init.activateIntercom);
	},

	chromeFixPortScopingIssues: function() {
		// Ugly hack because Chrome sucks
		Ext.getBackgroundPage().PlatformPort.chrome.prototype.initialize = function(port) {
			this.port = port || chrome.extension.connect();
		};
		// \Ugly hack because Chrome sucks
	},

	backendShowIsLoading: function() {
		if (document.getElementById("ERROR"))
			document.getElementById("ERROR").style.display = "none";

		Init.loader = document.getElementById('backend-is-loading');
		Init.loader.style.display = "block";

		Init.loaderErrorTimer = setTimeout(function() {
			Init.removeLoader();
			Init.errorShow();
		}, 20*1000);
	},

	removeLoader: function() {
		if ( ! Init.loader )
			return;

		Init.loader.style.display = "none";
		clearTimeout(Init.loaderErrorTimer);
	},

	errorHide: function() {
		if (document.getElementById("ERROR")) {
			document.getElementById("ERROR").style.display = "none";
		}
	},

	errorShow: function() {
		if (document.getElementById("ERROR")) {
			document.getElementById("ERROR").style.display = "block";
		}
	},

	backendDoesntExistYet: function() {
		return !Ext.isOnline() && (!Ext.getBackgroundPage() || !Ext.getBackgroundPage().onAppReady);
	},

	backendPageHasntEvenLoadedYet: function() {
		return Ext.isOnline() && !Ext.getBackgroundPage().onAppReady;
	},

	reloadWaitingForBackendToExist: function() {
		setTimeout(function() {
			document.location.reload();
		}, 5000);
	}
};

Init.start();
