/*
	Class:
		FeedParser

	Reads an RSS with callbacks for posts
*/

var FeedParser = Class.extend({
	initialize: function(feed) {
		this.feed = feed;
		this.path = feed.path;

		this.error = false;
		this.posts = [];
		this.data = {};
	},

	setResult: function(callback) { throw "implement"; },
	parse: function(callback) { throw "implement"; },

	getFeed: function() {
		var feed = new Feed();
		feed.path = this.data.path;
		feed.copyPropertiesFromServerData(this.data);
		feed.lastUpdated = Date.now();
		feed.favicon = this.feed.favicon || "";
		feed.meta = this.feed.meta || "";
		feed.type = this.feed.type || "rss";
		feed.title = this.data.title || this.data.path;
		feed.guid = this.data.guid;
		return feed;
	},

	// Transform post data into Post-objects
	getPosts: function() {
		return this.posts.map(this.makePost);
	},

	makePost: function(post) {
		var p = new Post(post);
		p.published_from_feed = post.published_from_feed;
		p.published = p.published_from_feed || (Date.now() - post.index);
		p.feed_id = this.feed.id;
		if ( this.allAreRead )
			p.is_read = 1;
		return p;
	}
});

FeedParser.forFeed = function(feed) {
	var klass = {
		'rss': FeederRSSParser,
		'online': OnlineParser
	}[feed.type || 'rss'];
	return new klass(feed);
};
