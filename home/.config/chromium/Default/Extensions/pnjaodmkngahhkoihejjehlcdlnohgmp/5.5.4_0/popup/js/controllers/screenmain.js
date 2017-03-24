Screen.Main = Screen.Feeds.extend({
	template: 'screen#main',

	events: {
		'click .global-settings': 'showSettings',
		'click .add': 'showAdd',
		'click .reload': 'reloadSync',
		'click .organize': 'startOrganizeMode',
		'click #filter-settings .all': 'filterAll',
		'click #filter-settings .starred': 'filterStarred',
		'click #filter-settings .unread': 'filterUnread',
		'click .tooltip-button': 'showTooltip'
	},

	inAppURL: function() {
    return ["main"];
  },

	start: function(options) {
		this._super();

		this.options = options || {};

		this.feedList = this.template.element.find('.tpl-feed-list');

		this.updateAvailable();
		this.updateUnread();

		this.setActiveFilter();

		this.vc.listener.listen("feeds:found", this.feedsFound);
		this.vc.listener.listen("feeds:recount", this.feedsCountChanged);
		this.vc.listener.listen("post:added", this.postAdded);

		this.setupContextMenu();

		if (app.user.structure.base) {
			this.initializeFolder();
		} else {
			runOnLoad(this.initializeFolder, this.errorOnLoad);
		}
	},

	setupContextMenu: function() {
		if (this.tooltipMenu) {
			this.tooltipMenu.destroy();
		}

		var options = {
			'<span class="icons wrench"></span> Settings [global-settings]': this.showSettings,
			'<span class="icons sort-list"></span> Organize your feeds [organize]': this.startOrganizeMode,
			'<span class="icons reload"></span> Reload feeds [reload]': this.reloadSync
		}
		if (app.user.shouldHaveIntercom()) {
			options['<span class="icons help"></span> Support [reload]'] = this.triggerIntercom;
		}
		this.tooltipMenu = new PUI.ContextMenu(options, document.body, 0, 0, {destroyOnHide: false, elementPosition: this.template.el('.tooltip-button')});
	},

	onFeedConnectChanged: function() {
		this.setupContextMenu();
	},

	errorOnLoad: function() {
		PUI.alertError("Error loading everything.");
		this.stopScreenLoading();
		this.showError();
	},

	initializeFolder: function() {
		this.setFolder(app.user.structure.base);
		this.populate();
	},

	populate: function() {
		this.clearCurrentNoScreen();
		this._super();
	},

	onPopupVisible: function() {
		this.updateAvailable();

		// This happens when we have just changed syncer, for example to Feeder pro
		if (this.folder !== app.user.structure.base) {
			this.setFolder(app.user.structure.base);
			this.populate();
		}
	},

	onPopupHide: function() {
		if (this.vc.currentFilter === 'unread') {
			this.populate();
		}
	},

	onClearAllUnread: function(callback) {
		this.updateUnread();
		fireCallback(callback);
	},

	destroy: function() {
		this._super();
		this.tooltipMenu.destroy();
		this.vc.listener.unlisten("feeds:found", this.feedsFound);
		this.vc.listener.unlisten("feeds:recount", this.feedsCountChanged);
		this.clearCurrentNoScreen();
	},

	feedsFound: function() {
		this.updateAvailable();
	},

	updateUnread: function() {
		this.setUnread(app.user.unreads.countStored());
	},

	updateAvailable: function() {
		app.finder.countFeedsInCurrentTab(this.setNewFeeds);
	},

	feedsCountChanged: function(evt) {
		this.setUnread(evt.total);

		if (this.items) {
			for (var i = 0; i < this.items.length; i++) {
				var oldCount = this.items[i].get('count');
				var count = this.items[i].model.countUnreadSync()
				if (oldCount != count) {
					this.items[i].set('count', count);
				}
			}
		}
	},

	setUnread: function(unread) {
		this.template.set('num_unread', unread > 9999 ? "9999" : unread);
	},

	setNewFeeds: function(num) {
		this.template.set('num_feeds', num);
		if (!num) {
			this.template.element.find('.add .bubble').hide();
		} else {
			this.template.element.find('.add .bubble').show();
		}
	},

	showTooltip: function(e) {
		e.preventDefault();
		this.tooltipMenu.show();
		return false;
	},

	showAdd: function() {
		this.vc.showAddScreen();
	},

	showSettings: function() {
		this.vc.showSettingsScreen();
	},

	reloadSync: function() {
		chain(this.showLoading)
		.then(app.sync.fetchUpstream)
		.then(app.poller.forceUpdate)
		.and(this.hideLoading);
	},

	showLoading: function(callback) {
		this.template.element.find('.settings').addClass('loading');
		fireCallback(callback);
	},

	hideLoading: function(callback) {
		this.template.element.find('.settings').removeClass('loading');
		fireCallback(callback);
	},

	filterAll: function() {
		analytics.trackEvent("Popup", "change-filter", "all");
		this.vc.setCurrentFilter("all");
		this.setActiveFilter();
		this.populate();
	},

	filterStarred: function() {
		analytics.trackEvent("Popup", "change-filter", "starred");
		this.vc.setCurrentFilter("starred");
		this.setActiveFilter();
		this.populate();
	},

	filterUnread: function() {
		analytics.trackEvent("Popup", "change-filter", "unread");
		this.vc.setCurrentFilter("unread");
		this.setActiveFilter();
		this.populate();
	},

	// Just set the active filter li in the topbar
	setActiveFilter: function() {
		var type = this.vc.currentFilter;
		this.template.element.find('#filter-settings .current').removeClass('current');
		this.template.element.find('#filter-settings .' + type).addClass('current');
	},

	onPopulated: function() {
		if (this.items.length || this.hideNoScreen || !this.vc.currentFilter) {
			return;
    }

		if (this.error || (this.postsPage && this.postsPage.error)) {
			this.showError();
			return;
		}

		var className = 'No' + this.vc.currentFilter.upperCaseFirst();
		if (this.vc.currentFilter === 'all') {
			this.endOrganize();
			className = 'NoFeeds';
		}

		this.currentNoScreen = new Screen[className]();
		this.currentNoScreen.onDone = this.currentNoScreenCallback;
		this.feedList.parent().append(this.currentNoScreen.template.container);

		this.template.element.addClass('no-feeds');

		// If is first time
		if (this.vc.currentFilter === 'all' && !app.user.isPro() && !app.user.isLegacyUser() && !app.user.preferences.get("didChooseToUseBasic")) {
			this.currentSignupScreen = new Screen.Signup();
			this.currentSignupScreen.onSuccess = this.onPopupVisible;
			this.feedList.parent().append(this.currentSignupScreen.template.container);
		}

		if (!localStorage.hasSeenWelcome && this.vc.currentFilter === 'all' && !Ext.isOnline()) {
			localStorage.hasSeenWelcome = true;

			this.currentWelcomeScreen = new Screen.Welcome();
			this.feedList.parent().append(this.currentWelcomeScreen.template.container);
		}

		this.disableFolderUpdates = true;
	},

	currentNoScreenCallback: function() {
		this.clearCurrentNoScreen();
		this.populate();
	},

	clearCurrentNoScreen: function() {
		this.template.element.removeClass('no-feeds');

		if (this.currentNoScreen) {
			this.currentNoScreen.template.element.remove();
			this.currentNoScreen.destroy();
		}

		if (this.currentWelcomeScreen) {
			this.currentWelcomeScreen.template.element.remove();
			this.currentWelcomeScreen.destroy();
		}

		this.disableFolderUpdates = false;
	},

	highlightSyncSettings: function() {
		$('.tpl-screen-import-export').hide();

		this.importModal = new PUI.ScreenModal(Screen.ImportExport);
		this.importModal.show();
		this.importModal.instance.importDoneCallback = this.importModalDone;

		this.importModal.onDestroy = this.importClosed;
	},

	importClosed: function() {
		$('.tpl-screen-import-export').show();
		this.importModal.destroy();
	},

	importModalDone: function(res) {
		$('.tpl-screen-import-export').show();
		this.importModal.destroy();
	},

	fromWebintent: function() {
		var url = UI.getIntentFeedURL();
		PUI.confirm("Subscribe to:\n" + url)
		.yes(this.subscribeToIntent);
	},

	subscribeToIntent: function() {
		var url = UI.getIntentFeedURL();

		app.user.feedMapper.addFeed(url, function(feed) {
			if (!feed) {
				PUI.alert("Could not subscribe to feed...");
			}
		});
	},

	startOrganizeMode: function() {
		if (this.vc.currentFilter && this.vc.currentFilter !== 'all') {
			this.filterAll();
		}

		// this.startOrganize();
		this.openOptionsPage();
	},

	triggerIntercom: function() {
		$(".intercom-activator:first").click();
	},

	getFeed: function() {
		if (this.postsPage.feed && this.postsPage.feed) {
			return this.postsPage.feed;
		}
		return false;
	},

	navForward: function() {
		if (this.postsPage) {
			this.postsPage.navForward.apply(this, arguments);
		} else {
			this._super.apply(this, arguments);
		}
	},

	navigateTo: function() {
		if (this.postsPage) {
			this.postsPage.navigateTo.apply(this, arguments);
		} else {
			this._super.apply(this, arguments);
		}
	},

	postAdded: function(e) {
		if (this.vc.currentFilter == 'unread' && this.postsPage) {
			this.postsPage.addMoreAvailable();
		}
	},

	id: function() {
		return {id: 'Main', active: this.currentIndex};
	}
});

Screen.Main.fromId = function(params) {
	return new Screen.Main(params);
};
