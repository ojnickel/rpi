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
