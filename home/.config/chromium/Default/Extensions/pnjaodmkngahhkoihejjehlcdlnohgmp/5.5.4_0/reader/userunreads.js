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
