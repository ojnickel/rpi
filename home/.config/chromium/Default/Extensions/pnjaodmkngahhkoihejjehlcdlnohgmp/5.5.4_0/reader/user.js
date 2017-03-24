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
