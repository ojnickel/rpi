var TestCases = {
	'online: add local feed': function() {
		console.assert(app.user.isPro());
		console.assert(!Ext.isOnline());

		app.user.feedMapper.addFeed("http://gallows.blogg.se/index.rss?t=" + Date.now(), function(feed) {
			feed.fetchPosts(function(posts) {
				console.assert(posts.length > 10);
			});
		});
	},

	'online: add multiple posts': function() {
		function randomPost() {
			var a = new Post({
				title: "lol",
				guid: Math.random(),
				link: "http://localhost/?" + Date.now(),
				published: Date.now()
			});
			a.published_from_feed = a.published;
			return a;
		};

		ParserStore.get("adder").addPosts(app.store.feeds()[1], [randomPost(), randomPost(), randomPost()]);
	},

	'everfeed': function() {
		app.user.feedMapper.addFeed("http://localhost/random/everfeed.php?t=" + Date.now());
	},

	'reload posts': function() {
		app.poller.forceUpdate();
	}
};