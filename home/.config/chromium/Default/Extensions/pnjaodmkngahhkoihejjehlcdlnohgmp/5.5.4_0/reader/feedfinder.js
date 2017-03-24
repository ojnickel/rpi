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
