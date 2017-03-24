/*
	Class:
		Exporter

	Creates a container with the local DB. In the future this class should be made smarter, by creating an abstract container
	for foreign feed data.
*/

var Exporter = Class.extend({
	initialize: function() {
		// Build a structure with the final result
		this.buildStructure();
	},

	buildStructure: function() {
		this.feeds = app.user.createFeedContainer();
		this.feeds.pushFolder("Feeds");

		this.nestedFolders = [];

		// Merge current structure into it
		app.user.structure.base.forEachItem(this.addCurrentItem);

		// Add nested folders to bottom folder
		this.nestedFolders.forEach(function(folder) {
			this.feeds.pushFolder(folder.name);
			folder.getFeeds().forEach(this.addCurrentFeed);
			this.feeds.popFolder();
		}, this);
	},

	addCurrentItem: function(item) {
		if ( item.isFeed )
			this.addCurrentFeed(item);
		else {
			// If in base folder (since we don't support nested folders)
			if ( this.feeds.base === this.feeds.currentFolder )
				this.addCurrentFolder(item);
			else
				this.addNestedFolder(item);
		}
	},

	addCurrentFeed: function(feed) {
		if ( this.feeds.currentFolder.feedBy('path', feed.path) )
			return;
		this.feeds.addFeed(feed);
	},

	addCurrentFolder: function(folder) {
		var folderInstance = this.feeds.currentFolder.folderBy('name', folder.name);

		this.feeds.pushFolder(folderInstance || folder.name);
		folder.items().forEach(this.addCurrentItem);
		this.feeds.popFolder();
	},

	addNestedFolder: function(folder) {
		this.nestedFolders.push(folder);
		folder.getFolders().forEach(this.addNestedFolder);
	}
});