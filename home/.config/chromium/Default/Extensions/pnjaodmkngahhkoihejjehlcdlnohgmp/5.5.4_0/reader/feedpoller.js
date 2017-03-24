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
