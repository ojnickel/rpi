var LocalStore = ParserStore.extend({
	addFeed: function(feed, posts, callback) {
		chain(feed.save)
		.and(Mapper.get("post").addPostsToFeed, feed, posts)
		.end(callback);
	},

	addPosts: function(feed, posts, callback) {
		chain(app.user.postMapper.addPostsToFeed, feed, posts)
		.andSync(app.user.unreads.clearCache)
		.and(app.user.unreads.count)
		.end(callback);
	}
});
