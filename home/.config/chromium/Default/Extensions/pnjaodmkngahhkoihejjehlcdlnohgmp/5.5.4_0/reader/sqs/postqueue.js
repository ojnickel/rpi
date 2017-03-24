SQS.consume('post:add', {
	run: function(message, callback) {
		var feed = message.feed;
		var posts = message.posts;

		if (app.user.isPro()) {
			if (feed.type === "rss") {
				ParserStore.get("adder").addPosts(feed, posts, callback);
			} else {
				fireCallback();
			}
		} else {
			ParserStore.get("rss").addPosts(feed, posts, callback);
		}
	}
});
