var AppUI = Class.extend({
	initialize: function() {

	},

	startListening: function() {
		app.events.subscribe("post:updated", this.postUpdated);
		app.events.subscribe("post:added", this.postAdded);
		app.events.subscribe("feed:updated", this.feedUpdated);
		app.events.subscribe("feed:removed", this.feedRemoved);
		app.events.subscribe("feeds:found", this.feedsFound);
		app.events.subscribe("feeds:recount", this.setBadge);
		app.events.subscribe("preferences:changed", this.preferencesChanged);
	},

	destroy: function(callback) {
		app.events.unsubscribe("post:updated", this.postUpdated);
		app.events.unsubscribe("post:added", this.postAdded);
		app.events.unsubscribe("feed:updated", this.feedUpdated);
		app.events.unsubscribe("feed:removed", this.feedRemoved);
		app.events.unsubscribe("feeds:found", this.feedsFound);
		app.events.unsubscribe("feeds:recount", this.setBadge);
		app.events.unsubscribe("preferences:changed", this.preferencesChanged);

		fireCallback(callback);
	},

	postUpdated: function(evt) {
		this.setBadge();
	},

	postAdded: function(evt) {
		this.setBadge();

		var post = app.store.post(evt.post);
		var feed = app.store.feed(post.feed_id);

		if ( post && feed && ! post.is_read && (app.user.preferences.get('global:notifications') || feed.usenotifications) && UI.Notifications.can() ) {
			UI.Notifications.show(feed.title, post.title, {
				link: function() {
					post.markAsRead();
					UI.openTab(post.getLink());
				}
			});
		}

		if ( post && feed && !post.is_read && (app.user.preferences.get('global:soundNotifications') || feed.getMeta("soundNotifications")) ) {
			this.playSound();
		}
	},

	playSound: function() {
		if (!this.audioElement) {
			this.audioElement = document.createElement("audio");
			this.audioElement.autoplay = false;
			this.audioElement.src = "library/media/alert.mp3";
		}

		this.audioElement.play();
	},

	feedUpdated: function(evt) {
		this.setBadge();
	},

	feedRemoved: function(evt) {
		this.setBadge();
	},

	setBadge: function() {
		if (Ext.isOnline())
			return;

		if (app.user.preferences.get("global:showUnreadCountInBadge") == false) {
			UI.setBadge("");
			return;
		}

		var unread = app.user.unreads.countStored();
		unread = unread > 999 ? "999+" : unread;
		UI.setBadge(unread || "");
	},

	feedsFound: function(evt) {
		app.finder.countFeedsInTab(evt.tab, function(num) {
			if ( num )
				UI.setBadgeIcon(Config.icon.addFeed, evt.tab);
			else
				UI.setBadgeIcon(Config.icon.standard, evt.tab);
		});
	},

	preferencesChanged: function(evt) {
		if (evt.key !== "global:showUnreadCountInBadge")
			return;

		this.setBadge();
	},

	openManyById: function(posts) {
		posts = posts.map(function(id) {
			return app.store.post(id);
		});

		this.openMany(posts);
	},

	openMany: function(posts) {
		posts.forEach(function(post) {
			post.markAsRead();
		});

		posts.forEach(function(post) {
			UI.openTab(post.getLink());
		});
	}
});
