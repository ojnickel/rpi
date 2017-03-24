var Post = Model.extend({
	mapper: 'post',

	schema: {
		feed_id: {type: 'int'},
		title: {type: 'text'},
		link: {type: 'text'},
		summary: {type: 'text', mandatory: false, standard: ''}, // new
		is_read: {type: 'int', standard: 0},
		is_starred: {type: 'int', standard: 0}, // new
		published: {type: 'int'},
		guid: {type: 'text', mandatory: false}, // New
		meta: {type: 'text', mandatory: false} // new
	},

	getCacheId: function() {
		return this.id;
	},

	// Check if post is in current posts array
	// this is just a dumb (but quick) check to see if we can skip
	// database access, so all it does is check guids
	checkIfIsPostQuick: function() {
		// Fetch feed and make sure it exists
		var feed = app.user.feed(this.feed_id);
		if ( ! feed )
			return false;

		// Make sure posts are loaded
		var posts = feed.posts;
		if ( ! posts )
			return false;

		for ( var i = 0, p; p = posts[i]; i++ )
			if ( p.getGUID() === this.getGUID() )
				return p;
		return false;
	},

	checkIfIsPost: function(callbacks) {
		var postMapper = this.mapper;
		var post = this, foundPost;

		if ( foundPost = post.checkIfIsPostQuick() )
			return callbacks.yes(foundPost);

		var findParams = {
			'feed_id': post.feed_id
		};

		if ( post.guid )
			findParams.guid = post.getGUID();
		else
			findParams.link = post.link;

		// First try to find with the same link
		chain(postMapper.find, findParams).then(function(posts, meta, next) {
			if ( ! posts.length )
				return next();
			callbacks.yes(posts[0]);
			return chain.exit;
		// GUIDs are holy. If no result was found via the GUID we must assume that this post is unique.
		}).and(function(next) {
			if ( ! post.guid )
				return next();
			callbacks.no(post);
			return chain.exit;
		// Then try to find with same title, and published within 10 seconds of it
		}).then(postMapper.find, {
			'feed_id': post.feed_id,
			'title': post.title,
			'published >': post.published - 5000, // time is in milliseconds
			'published <': post.published + 5000
		}).then(function(posts) {
			if ( ! posts.length )
				callbacks.no(post);
			else
				callbacks.yes(posts[0]);
		});
	},

	markAsRead: function(callback) {
		this.mark(1, callback);
	},

	markAsUnread: function(callback) {
		this.mark(0, callback);
	},

	mark: function(isRead, callback) {
		var post = this;
		var oldUnread = post.is_read;
		post.is_read = isRead;

		var changedCount = false;
		if (this.is_read != oldUnread)
			changedCount = (oldUnread != this.is_read);

		this.mapper.save(post, function() {
			if (changedCount) {
				var newCount = app.user.unreads.unreadCounts[post.feed_id] + (isRead ? -1 : 1);
				app.user.unreads.updateForFeed(post.feed_id, newCount, {
					manual: true
				});
			}

			app.events.send('post:updated', {post: post.id});
			app.events.send('feed:updated', {
				feed: post.feed_id,
				manual: true
			});

			fireCallback(callback);
		});
	},

	toggleStar: function(callback) {
		var post = this;

		post.is_starred = +(! post.is_starred);
		this.mapper.save(post, function() {
			app.events.send('post:updated', {post: post.id});
			fireCallback(callback);
		});
	},

	getGUID: function() {
		return this.guid || this.link;
	},

	getLink: function() {
		return this.link;
	},

	getConsumePath: function() {
		return app.config.feeder.postURL.replace("{post_id}", this.guid);
	},

	getRESTValues: function() {
		var values = this.getValues();
		values.published_from_feed = this.published_from_feed;
		values.feed_id = this.adder_feed_id;
		return values;
	},

	// server GUID
	makeHash: function() {
		return MD5.hex(this.feed_id + "" + this.title + "" + Math.floor(this.published_from_feed / 10000));
	},

	makeGUID: function() {
		if ( ! this._guid && ! this.getHashFeedId() )
			throw new Error("trying to construct GUID without proper feed_id");
		return this.getHashFeedId() + ":" + (this.guid || this.makeHash());
	},

	getHashFeedId: function() {
		return this.adder_feed_id || this.feed_id;
	},

	getServerGUID: function() {
		if ( ! this._guid )
			this._guid = this.makeGUID();
		return this._guid;
	},

	getGUIDHash: function() {
		if (!this._guidHash)
			this._guidHash = Post.hashGuid(this.getServerGUID());
		return this._guidHash;
	}
});

Post.hashGuid = function(guid) {
	return MD5.base64(guid).slice(0, -2);
}
// end server GUID

Post.model = "post";
