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
