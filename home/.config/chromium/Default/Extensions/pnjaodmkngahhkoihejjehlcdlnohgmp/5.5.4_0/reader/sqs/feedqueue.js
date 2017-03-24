SQS.consume('feed:add', {
	run: function(message, callback) {
		var feed = message.feed;
		var posts = message.posts;

		if (app.user.isPro()) {
			if (feed.type === "rss") {
				ParserStore.get("adder").addFeed(feed, posts, callback);
			} else {
				chain(feed.save)
				.end(callback);
			}
		} else {
			ParserStore.get("rss").addFeed(feed, posts, callback);
		}
	}
});
