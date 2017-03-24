var CacheStore = Class.extend({
	initialize: function() {
		this.clearCache();
	},

	clearCache: function() {
		this.store = {};
		this.store[Feed.model] = {};
		this.store[Folder.model] = {};
		this.store[Post.model] = {};

		this.cache = {
			posts: {}
		};

		ParserStore.destroy();
	},

	addObject: function(obj) {
		var id = obj.getCacheId();

		if (!id)
			return obj;

		// New objects
		if (!this.store[obj.model][id]) {
			this.store[obj.model][id] = obj;
		// Update property for existing object
		} else {
			this.store[obj.model][id].copyPropertiesFrom(obj);
			this.store[obj.model][id].copyDBPropertiesFrom(obj);
		}

		if (obj.model == "post") {
			this.addPostToFeed(this.store[obj.model][id]);
		}

		return this.store[obj.model][id];
	},

	addPostToFeed: function(post) {
		if (!post.feed_id) {
			return;
		}

		if (!this.cache.posts[post.feed_id])
			this.cache.posts[post.feed_id] = {};

		if (this.cache.posts[post.feed_id][post.getCacheId()])
			return;

		this.cache.posts[post.feed_id][post.getCacheId()] = post;
	},

	deleteObject: function(obj) {
		delete this.store[obj.model][obj.getCacheId()];

		if (obj.model == "post") {
			this.cache.posts[obj.feed_id] = [];
		}
	},

	clearFor: function(cls) {
		this.store[cls.model] = {};
	},

	randomObjectFor: function(cls) {
		var items = Object.values(this.store[cls.model]);
		return items[Math.floor(Math.random()*items.length)] || false;
	},

	randomPost: function() {
		return this.randomObjectFor(Post);
	},

	deleteAllPosts: function(feedId) {
		if (this.cache.posts[feedId]) {
			this.postsForFeed.forEach(function(post) {
				this.deleteObject(post);
			}, this);
		}
		delete this.cache.posts[feedId];
	},

	feed: function(id) {
		return this.store[Feed.model][id];
	},

	post: function(id) {
		return this.store[Post.model][id];
	},

	folder: function(id) {
		return this.store[Folder.model][id];
	},

	feeds: function() {
		return Object.values(this.store[Feed.model]);
	},

	posts: function() {
		return Object.values(this.store[Post.model]);
	},

	postsForFeed: function(feedId) {
		if (!this.cache.posts[feedId])
			return [];
		return Object.values(this.cache.posts[feedId]);
	},

	sortedPostsForFeed: function(feedId) {
		var posts = this.postsForFeed(feedId);

		posts.sort(function(a, b) {
			if (!a.published && !b.published) {
				// FIXME: This is a hack
				// backend uses UUID
				if (app.user.isPro()) {
					if (a.created_at === b.created_at) {
						return 0;
					}

					if (a.created_at > b.created_at) {
						return -1;
					}

					return 1;
				// sqlite local uses integer
				} else {
					if (a.id === b.id) {
						return 0;
					}

					if (a.id > b.id) {
						return -1;
					}

					return 1;
				}
			}

			if (a.published == b.published) {
				return 0;
			}
			if (a.published > b.published) {
				return -1;
			}
			return 1;
		});

		return posts;
	},

	feedBy: function(attribute, val, callback) {
		var feeds = this.feeds();
		for (var i = 0, feed; feed = feeds[i]; i++) {
			if ( feed[attribute] === val ) {
				fireCallback(callback, feed);
				return feed;
			}
		}
		fireCallback(callback, false);
		return false;
	}
});
