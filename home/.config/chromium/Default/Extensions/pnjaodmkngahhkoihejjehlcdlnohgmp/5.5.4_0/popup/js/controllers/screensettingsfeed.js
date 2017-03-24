Screen.SettingsFeed = Controller.extend({
	template: 'screen#settings-feed',

	events: {
		'click .done': 'done',
		'click .delete': 'confirmRemoveFeed',
		'change .user-defined-enabled input': 'toggleUserDefinedUpdate',
		'blur .user-defined-seconds input': 'ensureUserDefinedInRange'
	},

	inAppURL: function() {
	  return ["settings-feed", this.folder.id, this.feed.id];
	},

	start: function(feed, folder) {
		this.feed = feed || {};
		this.folder = folder || {};
	},

	onVisible: function() {
		this.ui.postsDisplay.min = 5;
		this.ui.postsDisplay.max = 80;

		this.ui.updateInterval.min = 1;
		this.ui.updateInterval.max = 60;

		this.template.data.setModel(this.feed);

		this.titleField = this.template.element.find('input[name=title]');
		this.pathField = this.template.element.find('input[name=path]');

		this.ui.postsDisplay.set(this.feed.getNumPosts());
		this.ui.notifications.set(!!this.feed.usenotifications);

		this.ui.updateInterval.onChange(this.updateIntervalSliderChanged);

		this.updateIntervalCheckbox = this.template.element.find('.user-defined-enabled input');
		this.updateIntervalInput = this.template.element.find('.user-defined-seconds input');

		if (this.feed.getMeta("userDefinedInterval")) {
			this.updateIntervalCheckbox.attr("checked", true);
		}

		this.ui.soundNotifications.set(!!this.feed.getMeta("soundNotifications"));

		this.updateUpdateIntervalInput();

		this.titleField.val(this.feed.title);
		this.pathField.val(this.feed.path);

		this.toggleUserDefinedUpdate();
	},

	updateUpdateIntervalInput: function() {
		var TEN_MINUTES = 60 * 10;

		var interval = (this.feed.updateinterval || app.config.defaultUpdateInterval) / 1000;
		if (!app.user.isLegacyUser()) {
			if (!app.user.isPro() && interval < TEN_MINUTES) {
				interval = TEN_MINUTES;
			}
		}
		this.updateIntervalInput.val(interval);
		this.ui.updateInterval.set(interval / 60);

		PUI.UpdateInterval.applyForUserAndSlider(app.user, this.ui.updateInterval);
	},

	done: function() {
		var feed = this.feed;

		this.feed.title = this.titleField.val();
		this.feed.numposts = Math.round(this.ui.postsDisplay.value);
		this.feed.usenotifications = +this.ui.notifications.isToggled();

		var userDefined = !!this.updateIntervalCheckbox.is(":checked");
		this.feed.setMeta("userDefinedInterval", userDefined);

		var soundNotifications = this.ui.soundNotifications.isToggled();
		this.feed.setMeta("soundNotifications", soundNotifications);

		if (!userDefined) {
			this.feed.updateinterval = this.getUpdateIntervalFromSlider();
		} else {
			this.feed.updateinterval = this.getUpdateIntervalFromInput();
		}

		if (this.feed.updateinterval == app.config.defaultUpdateInterval) {
			this.feed.updateinterval = 0;
		}

		if (this.feed.numposts == app.config.defaultNumPosts) {
			this.feed.numposts = 0;
		}

		chain(this.feed.save)
		.and(this.vc.popScreen)
		.and(function() {
			app.events.send('feed:updated', {
				feed: feed.id,
				reason: 'name',
				manual: true
			});
		});
	},

	getUpdateIntervalFromSlider: function() {
		return Math.round(this.ui.updateInterval.value)*1000*60;
	},

	getUpdateIntervalFromInput: function() {
		return this.updateIntervalInput.val()*1000;
	},

	confirmRemoveFeed: function() {
		PUI.confirm(_("Are you sure you want remove this feed?"))
		.yes(this.removeFeed);
	},

	toggleUserDefinedUpdate: function() {
		var container = this.template.element.find('.user-defined-update-interval');
		var isEnabled = this.updateIntervalCheckbox.is(":checked");

		if (isEnabled) {
			container.addClass("is-enabled");
			this.ensureUserDefinedSeconds();
		} else {
			container.removeClass("is-enabled");
			this.setIntervalFromSlider();
		}
	},

	ensureUserDefinedSeconds: function() {
		var current = this.updateIntervalInput.val();
		var num = parseInt(current, 10);

		if (isNaN(num)) {
			this.setIntervalFromSlider();
		}
		this.ensureUserDefinedInRange();
	},

	setIntervalFromSlider: function() {
		this.updateIntervalInput.val(this.getUpdateIntervalFromSlider() / 1000);
	},

	ensureUserDefinedInRange: function() {
		if (this.getUpdateIntervalFromInput() < 5000) {
			this.updateIntervalInput.val(5);
		}
	},

	updateIntervalSliderChanged: function() {
		this.setIntervalFromSlider();
	},

	removeFeed: function() {
		this.folder.removeFeed(this.feed.id);

		chain(app.user.removeFeedIfNotInCategories, this.feed.id)
		.and(this.folder.save)
		.and(this.vc.popScreen);
	}
});
