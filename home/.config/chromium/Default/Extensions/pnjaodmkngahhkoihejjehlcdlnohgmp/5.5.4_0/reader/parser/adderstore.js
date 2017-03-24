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
