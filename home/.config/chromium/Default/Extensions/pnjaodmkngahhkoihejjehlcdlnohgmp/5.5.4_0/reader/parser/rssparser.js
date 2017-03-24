var FeederRSSParser = FeedParser.extend({
	initialize: function(feed) {
		this._super(feed);
		this.parser = new RSSParser({path: feed.path});
	},

	setResult: function(xml, text, callback) {
		rssLog("Parsing", this.path);
		this.parser.setResult(text, callback);
	},

	parse: function(callback) {
		chain(this.parser.parse)
		.andSync(this.setDataFromParser)
		.andSync(this.logErrors)
		.end(callback, this);
	},

	setDataFromParser: function() {
		this.data = this.parser.data;
		this.data.path = this.path;
		this.data.guid = this.path;
		this.error = this.parser.error;
		this.posts = (this.parser.posts || []);

		this.posts = this.posts.sort(function(a, b) {
			if (!a.published_from_feed && !b.published_from_feed) {
				if (a.index > b.index) {
					return 1;
				} else if (a.index < b.index) {
					return -1;
				} else {
					return 0;
				}
			} else {
				if (a.published_from_feed < b.published_from_feed) {
					return 1;
				} else if (a.published_from_feed > b.published_from_feed) {
					return -1;
				} else {
					return 0;
				}
			}
		});

		this.posts = this.posts.slice(0, 100);
	},

	logErrors: function() {
		if (this.error) {
			rssLog("Error parsing", this.feed.path, this.parser.errorMessage);
		} else {
			rssLog("Completed parsing", this.feed.path);
		}
	}
});

function rssLog() {
	console.log.apply(console, arguments);
}
